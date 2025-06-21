import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { FileText, NotePencil, UserCircle } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import usePopup from 'context/Popup/usePopup';
import { Status, STATUS_LOADED, STATUS_ERROR, STATUS_LOADING } from 'modules/form/form';
import ServiceRoute from 'routes/route.service';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { styleSettingColor } from 'styles/variables.style';
import Layout from 'layouts/Layout';
import { HeadTags, Button, Loading } from 'components';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import useFormColumn from 'modules/form/useFormColumn';
import { 
  Listening as TypeListening, 
  ListeningRow as TypeListeningRow
} from 'modules/listening/resources/listening.type';
import { 
  createDefaultSetting, 
  ListeningRows as ListeningRowsEditor,
  useListenings,
  argumentStatusWordingForSheet
 } from 'modules/listening';

const Listening: React.FC = () => {
  const popup = usePopup();
  const { id } = useParams<{ id: string }>();
  const navigae = useNavigate();
  const { getItem: getListening, addItem: addListening, editItem: editListening } = useListenings();
  const [listening, setListening] = React.useState<TypeListening>(createDefaultSetting());
  const [listeningStatus, setListeningStatus] = React.useState<Status>(STATUS_LOADED);
  const [sendStatus, setSendStatus] = React.useState<Status>(STATUS_LOADED);

  const columnName = useFormColumn<string>({
    value: listening.name,
    defaultValue: '',
    placeholder: '戰場判斷表名稱，如：01/01 XXvsYY',
  });

  const columnOwner = useFormColumn<string>({
    value: listening.owner,
    defaultValue: '',
    placeholder: '撰寫者名稱',
  });

  const [columnRows, setColumnRows] = React.useState<TypeListeningRow[]>(listening.rows);

  const handleSave = React.useCallback((newListening: Partial<TypeListening>): TypeListening => {
    // formListening 物件，轉換成 listening 物件
    const _listening: TypeListening = getListening(id || '') || createDefaultSetting();
    if (!id) _listening.id = `listening-${uuidv4()}`;
    for(const key of Object.keys(newListening)) {
      const typedKey = key as keyof TypeListening;
      if (typedKey === undefined) continue;
      if (newListening[typedKey] === undefined) continue;
      (_listening[typedKey] as TypeListening[typeof typedKey]) = newListening[typedKey];
    }

    if (!id) {
      addListening(_listening);
      navigae(ServiceRoute.toPageLinkWithParams(pageLinks.listeningID, { id: _listening.id }));
    } else {
      editListening(_listening);
    };

    return _listening;
  }, [addListening, editListening, getListening, id, navigae]);
  
  const handleChangeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
    columnName.onChange(event.target.value);
  };

  const handleChangeColumnOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
    columnOwner.onChange(event.target.value);
  };

  const handleChangeColumnRows: React.Dispatch<React.SetStateAction<TypeListeningRow[]>> = React.useCallback((updater) => {
    let updatedRows!: TypeListeningRow[];
    setColumnRows(prevState => {
      updatedRows = typeof updater === 'function' 
        ? (updater as (prev: TypeListeningRow[]) => TypeListeningRow[])(prevState) 
        : updater;
      return updatedRows;
    });
  }, []);

  const handleUpload = async () => {
    // formListening 物件，轉換成 listening 物件
    const newListening: Partial<TypeListening> = {
      name: columnName.value,
      owner: columnOwner.value,
      updatedAt: dayjs().valueOf(),
      rows: columnRows
    }

    const _listening = handleSave(newListening);

    const API_URL = 'https://script.google.com/macros/s/AKfycbwcCmdoryTnEG7Dwz61FhwzKvht0ZPYJw5H1lBp-uiO7CPvVKA5uJnrtJOXg4JxWaKw/exec';

    const rowsWithStatusWording = _listening.rows.map(item => ({ 
      ...item,
      column2: argumentStatusWordingForSheet[item.column2],
    }));
    
    const queryParams = new URLSearchParams({
      id: _listening.id,
      name: _listening.name,
      owner: _listening.owner,
      updatedAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      rows: JSON.stringify(rowsWithStatusWording)
    }).toString();

    setSendStatus(STATUS_LOADING);
    try {
      const response = await fetch(`${API_URL}?${queryParams}`, {
        method: 'GET',
        mode: 'no-cors',
      });
      
      popup.notice(({ message: '送出成功' }));
      setSendStatus(STATUS_LOADED);
      const result = await response.json();
      if (result.status === '成功') {
        alert('資料已成功傳送到 Google Sheets');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const trakingHeaderButtonToList = () => {
    ServiceGA4.event(GA_EVENT.Header_Button_Listenings);
  };

  React.useEffect(() => {
    if (!id) return;
    setListeningStatus(STATUS_LOADING);
    
    const _listening = getListening(id);
    if (!_listening) {
      setListeningStatus({ ...STATUS_ERROR, message: '「網址錯誤」或「戰場判斷表已遭刪除」' });
      return;
    }
    
    setListening(_listening);
    setColumnRows(_listening.rows)
    setListeningStatus(STATUS_LOADED);
  }, [id, getListening]);

  if (listeningStatus.loading || listeningStatus.hasError) {
    return (
      <Layout 
        title={PAGE_TITLE.listening} 
        homeLink={pageLinks.listenings}
        mainClassName={cx('DT-Listening', style)}
        renderButtons={
          <IconButton component={Link} to={pageLinks.listenings} onClick={trakingHeaderButtonToList}>
            <FileText size={28} weight='light' />
          </IconButton>
        }
      >
        <HeadTags title={PAGE_TITLE.listening} description={PAGE_DESCRIPTION.listening} />
        {listeningStatus.loading ? (
          <div className='status-box'><Loading /></div>
        ) : listeningStatus.hasError && (
          <div className='status-box'>
            <p>{listeningStatus.message}</p>
            <Button variant='outlined' component={Link} to={pageLinks.listenings}>回歷史紀錄頁</Button>
          </div>
        )}
      </Layout>
    )
  }

  return <Layout 
    title={PAGE_TITLE.listening} 
    homeLink={pageLinks.listenings}
    mainClassName={cx('DT-Listening', style)}
    renderButtons={
      <IconButton component={Link} to={pageLinks.listenings} onClick={trakingHeaderButtonToList}>
        <FileText size={28} weight='light' />
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.listening} description={PAGE_DESCRIPTION.listening} />
    <Input
      name='listening-name'
      className='listening-name'
      placeholder={columnName.placeholder}
      autoFocus
      value={columnName.value}
      onChange={handleChangeColumnName}
      startAdornment={
        <InputAdornment position='start'>
          <NotePencil size={28} weight='light' color={styleSettingColor.text.secondary} />
        </InputAdornment>
      }
    />
    <Input
      name='listening-owner'
      className='listening-name'
      placeholder={columnOwner.placeholder}
      value={columnOwner.value}
      onChange={handleChangeColumnOwner}
      startAdornment={
        <InputAdornment position='start'>
          <UserCircle size={28} weight='light' color={styleSettingColor.text.secondary} />
        </InputAdornment>
      }
    />
    <div className='listening-body'>
      <ListeningRowsEditor listeningRows={columnRows} setColumnRows={handleChangeColumnRows} />
      <Button 
        variant='outlined' 
        className='send-button' 
        onClick={handleUpload} 
        loading={sendStatus.loading} 
        disabled={sendStatus.loading}
      >保存 & 送出</Button>
      <div className='listening-hint-save-solution-bottom'>
        {!!listening.updatedAt && 
          `上次發送時間 ${dayjs(listening.updatedAt).format('YYYY/MM/DD HH:mm:ss')}`}
      </div>
    </div>
  </Layout>;
}

export default Listening;

const style = css`
  background-color: ${styleSettingColor.background.white};
  color: ${styleSettingColor.text.secondary};

  .status-box {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .listening-name {
    width: 100%;
    border-bottom: 1px solid ${styleSettingColor.disabled};
    
    &.MuiInputBase-root {
      font-size: 18px;
      padding: 8px 16px;
      box-sizing: border-box;

      &:after {
        border-bottom: unset;
      }

      &:hover:before,
      &:before {
        border-bottom: unset;
      }

      fieldset {
        border-width: 0;
      }

      .MuiInputBase-input {
        padding: 0;
      }
    }
  }

  .listening-body {
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .listening-hint-save-solution-bottom {
    width: 100%;
    margin-top: 8px;
    font-size: 12px;
    color: ${styleSettingColor.text.gray};
  }

  .save-button.MuiButton-root,
  .send-button.MuiButton-root {
    margin-top: 8px;
    width: 100%;
    min-width: 250px;
    font-size: 18px;
  }
  
  .send-button.MuiButton-root {
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;