import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { TextField, IconButton } from '@mui/material';
import { Trash, Eye, EyeSlash } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';

import { pageLinks } from 'routes/route.constants';
import usePopup from 'context/Popup/usePopup';
import useDialog from 'hooks/useDialog';
import useFormColumn from 'modules/form/useFormColumn';
import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';
import { styleSettingColor } from 'styles/variables.style';
import { Status, STATUS_LOADED, STATUS_ERROR } from 'modules/form/form';
import { Button } from 'components';
import { DummyEditorBatchAdd } from 'modules/dummy';
import useCopyDummy from 'modules/dummy/hooks/useCopyDummy';
import { useFloatingButton } from 'hooks/useFloatingButton';

const GROUP_TITLE = '攻防群組';
const ITEM_TITLE = '攻防子項';

export type ColumContentsItemWithStatus = {
  id: string;
  disabled: boolean;
  content: string;
  status: Status;
};

type Props = {
  className?: string;
  dummy: Dummy;
  onSave: (dummy: Dummy) => void;
};

const DummyEditor = (props: Props) => {
  const navigae = useNavigate();
  const popup = usePopup();
  const onCopyDummy = useCopyDummy();
  const { ref, isBottom } = useFloatingButton<HTMLDivElement>(1.0);

  const [isEdited, setIsEdited] = React.useState(false);
  const [openBatchAdd, handleOpenBatchAdd, handleCloseBatchAdd] = useDialog(false);
  const columnName = useFormColumn<string>({
    value: props.dummy.name,
    defaultValue: '',
    placeholder: `請輸入${GROUP_TITLE}名稱`,
    verifyRules: { require: true },
  });

  const [columnContents, setColumnContents] = React.useState<ColumContentsItemWithStatus[]>([]);

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdited(true);
    columnName.onChange(event.target.value);
  },[columnName]);

  const handleChangeContents = React.useCallback((contentID: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdited(true);
    setColumnContents((prevState) => {
      const newState: ColumContentsItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
      newState.map((item) => {
        if (item.id !== contentID) return item;
        item.content = event.target.value;
        return item;
      });
      return newState;
    });
  }, []);
  
  const handleCopyDummy = () => onCopyDummy(columnName.value, columnContents);

  const handleBatchAddContentsItem = React.useCallback((columnContents: DummyContent[]) => {
    setIsEdited(true);
    setColumnContents((prevState) => [
      ...prevState, 
      ...columnContents.map(item => ({
        ...item,
        status: STATUS_LOADED
      } as ColumContentsItemWithStatus))]);
  }, []);

  const handleAddContentsItem = React.useCallback(() => {
    setColumnContents((prevState) => {
      const newState: ColumContentsItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
      const newColumContentsItemWithStatus: ColumContentsItemWithStatus = {
          id: `debate-dummy-content-${uuidv4()}`,
          disabled: false,
          content: '',
          status: STATUS_LOADED
      };
      newState.push(newColumContentsItemWithStatus);
      return newState;
    });
  }, []);

  const handleToggleContentItemDisabled = React.useCallback((contentID: string) => () => {
    setColumnContents((prevState) => {
      const newState: ColumContentsItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
      return newState.map(item => {
        if (item.id === contentID) item.disabled = !item.disabled;
        return item;
      });
    });
  }, []);

  const handleDeleteContentItem = React.useCallback((contentID: string, index: number) => async () => {
    const isConfirm = await popup.confirm({ 
      title: `確定刪除${ITEM_TITLE} ${index + 1} ?`,
    });

    if(!isConfirm) return;
    
    setColumnContents((prevState) => {
      const newState: ColumContentsItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
      return newState.filter(item => item.id !== contentID);
    });
  
    popup.notice({ message: '刪除成功', duration: 1000 });
  }, [popup]);

  const customVarifyContents = React.useCallback((): boolean => {
    const setRrrorStatus = (_id: string, message: string) => {
      setColumnContents((prevState) => {
        const newState: ColumContentsItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
        newState.map((element) => {
          if (element.id !== _id) return element;
          element.status = { ...STATUS_ERROR, message };
          return element;
        });
        return newState;
      });
    };

    const removeRrrorStatus = (id: string) => {
      setColumnContents((prevState) => {
        const newState: ColumContentsItemWithStatus[] = JSON.parse(JSON.stringify(prevState));
        newState.map((element) => {
          if (element.id !== id) return element;
          element.status = STATUS_LOADED;
          return element;
        });
        return newState;
      });
    };

    let isValid = true;

    for (const item of columnContents) {
      const conditionEmptyString = item.content === '';
      if (conditionEmptyString) {
        setRrrorStatus(item.id, '此欄位必填');
        isValid = false;
        continue;
      }

      if (isValid) removeRrrorStatus(item.id);
    }

    return isValid;
  }, [columnContents]);

  const handleBack = React.useCallback(async () => {
    if (!isEdited) {
      navigae(pageLinks.dummys);
      return;
    }

    const isConfirm = await popup.confirm({ 
      title: `編輯尚未儲存，確定放棄編輯?`,
    });

    if (!isConfirm) return;
    
    navigae(pageLinks.dummys);
  }, [navigae, isEdited, popup]);

  const handleSave = React.useCallback(() => {
    let isValid = true;
    if (!columnName.onVarify()) isValid = false;
    if (!customVarifyContents()) isValid = false;
    if (!isValid) return;

    // formDummy 物件，轉換成 dummy 物件
    const newDummy: Dummy = {
      id: props.dummy?.id || `debate-dummy-${uuidv4()}`,
      name: columnName.value,
      contents: columnContents.map(item => ({
        id: item.id,
        disabled: item.disabled,
        content: item.content.trim(),
      } as DummyContent)),
    };

    props.onSave(newDummy);
    popup.notice({ message: '儲存成功', duration: 1000 });
  }, [columnName, columnContents, customVarifyContents, props, popup]);

  React.useEffect(() => {
    const newColumnContents = props.dummy.contents.map(item => ({
      ...item, 
      status: STATUS_LOADED
    }))
    setColumnContents(newColumnContents);
  }, [props.dummy]);

  if (openBatchAdd) {
    return (
      <DummyEditorBatchAdd 
        name={columnName.value}
        onClose={handleCloseBatchAdd}
        onSave={handleBatchAddContentsItem}
        className={props.className}
      />
    )
  }
  return (
    <div className={cx('DT-DummyEditor', style, props.className)}>
      <TextField
        variant='standard'
        fullWidth
        multiline
        margin='normal'
        placeholder={columnName.placeholder}
        value={columnName.value}
        onChange={handleChangeName}
        error={columnName.status.hasError}
        helperText={columnName.status.message}
      />
      <div className='buttons-group'>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleOpenBatchAdd}
        >
          批量新增
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          disabled={columnContents.length === 0}
          onClick={handleCopyDummy}
        >
          複製全部
        </Button>
      </div>
      {columnContents.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className='content-action-group'>
            <div className='content-title'>{`${ITEM_TITLE} ${index + 1}`}</div>
            <IconButton className='disabled-button' size='small' onClick={handleToggleContentItemDisabled(item.id)}>
              {item.disabled 
                ? <EyeSlash size={25} weight='light'/> 
                : <Eye size={25} weight='light'/> 
              }
            </IconButton>
            <IconButton className='delete-button' size='small' onClick={handleDeleteContentItem(item.id, index)}>
              <Trash size={25} weight='light'/>
            </IconButton>
          </div>
          <TextField
            variant='outlined'
            fullWidth
            multiline
            InputProps={{
              sx: { backgroundColor: 'white' },
            }}
            type='text'
            placeholder={`請輸入${ITEM_TITLE}`}
            value={item.content}
            onChange={handleChangeContents(item.id)}
            error={item.status.hasError}
            helperText={item.status.message}
          />
        </React.Fragment>
      ))}
      <Button variant='outlined' fullWidth className='add-button' color='secondary' onClick={handleAddContentsItem}>
        新增
      </Button>
      <div ref={ref} className='bottom-ref'></div>
      <div className={cx('buttons-group', {'floating': !isBottom })}>
        <Button variant='outlined' fullWidth className='back-button' color='secondary' onClick={handleBack}>
          返回
        </Button>
        <Button variant='outlined' fullWidth className='save-button' onClick={handleSave}>
          儲存
        </Button>
      </div>
    </div>
  );
};

export default DummyEditor;

const style = css`
  .MuiInput-root {
    font-size: 18px;
  }

  .MuiFormHelperText-root {
    position: absolute;
    bottom: -22px;
  }

  .buttons-group {
    width: 100%;
    margin: 10px 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    .MuiButton-root,
    .MuiButton-root:hover {
      width: 100%;
      font-size: 18px;
    }

    &.floating {
      margin: 0 auto;
      width: 100%;
      max-width: 500px;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px 16px;
      background-color: ${styleSettingColor.gray}db;
      border-top: 1px solid #ccc;
      text-align: center;
      z-index: 1000;
    }
  }

  .content-action-group {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;

    .content-title {
      margin-right: auto;
    }
  }

  .add-button.MuiButton-root,
  .add-button.MuiButton-root:hover {
    margin: 30px 0 10px;
    font-size: 18px;
  }

  .save-button.MuiButton-root,
  .save-button.MuiButton-root:hover {
    font-size: 18px;
    background-color: ${styleSettingColor.background.dark}1a;
  }

  .bottom-ref {
    width: 100%;
    height: 1px;
  }
`;
