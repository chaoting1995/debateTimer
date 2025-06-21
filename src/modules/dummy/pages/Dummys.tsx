
import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Trash, PencilSimple, Plus } from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from 'styles/basic.style';
import { PAGE_TITLE, PAGE_DESCRIPTION, pageLinks } from 'routes/constants';
import usePopup from 'context/Popup/usePopup';
import useDialog from 'hooks/useDialog';
import useDummys from 'modules/dummy/context/Dummys/useDummys';
import { Dummy } from 'modules/dummy/resources/dummy.type';
import { EMPTY_DUMMY } from 'modules/dummy/resources/dummy.constant';
import DummyEditor from 'modules/dummy/components/DummyEditor';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import { BottomDrawer, Button } from 'components';

const Dummys: React.FC = () => {
  const popup = usePopup();
  const [open, handleOpen, handleClose] = useDialog(false);
  const { dummys, addDummy, editDummy, deleteDummy } = useDummys();
  const [selectedDummy, setSelectedDummy] = React.useState<Dummy>(EMPTY_DUMMY); 

  const handleOpenEditor = React.useCallback((dummyID?: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    let _dummy: Dummy = EMPTY_DUMMY;

    if (dummyID) {
      _dummy = dummys.find(item => item.id === dummyID) || EMPTY_DUMMY;
    };
    
    setSelectedDummy(_dummy);
    handleOpen();
    
    if (dummyID) {
      // ServiceGA4.event(GA_EVENT.Dummys_Button_Edit_Dummy);
    } else {
      // ServiceGA4.event(GA_EVENT.Header_Button_Add_Dummy);
    }
  }, [handleOpen, dummys])

  const handleSave =  React.useCallback((dummy: Dummy) => {
    if (!selectedDummy.id) {
      addDummy(dummy);
    } else {
      editDummy(dummy.id, dummy);
    };

    handleClose();
  }, [addDummy, editDummy, selectedDummy, handleClose]);

  const handleDelete = (dummyID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: '確定刪除計時器?'
    });
  
    if(!isConfirm) return;
    deleteDummy(dummyID)
  }

  return <Layout
    mainClassName={cx('DT-Dummys', style)}
    title={PAGE_TITLE.dummys}
    homeLink={pageLinks.dummy}
    renderButtons={
      <IconButton onClick={handleOpenEditor()}>
        <Plus size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.dummy} | ${PAGE_TITLE.dummys}`} 
      description={PAGE_DESCRIPTION.dummy} />
    {dummys.length === 0 && <div className='dummys-empty-box'>
      <div>尚無計時器</div>
      <Button variant='outlined' className='add-button' onClick={handleOpenEditor()}>新增計時器</Button>
    </div>}
    <List disablePadding>
      {dummys.map((item) => <ListItem key={item.id} disablePadding>
        <ListItemButton 
          component={Link} 
          to={`${pageLinks.dummyID.replace(':id', item.id)}`}
          // onClick={handleTrakingDummysItemToDummy(item.name, item.mode)}
        >
          <div className='item-name'>{item.name}</div>
        </ListItemButton>
        <ListItemSecondaryAction className='item-actions'>
          <IconButton onClick={handleOpenEditor(item.id)}>
            <PencilSimple size={26} weight='light'/>
          </IconButton>
          <IconButton onClick={handleDelete(item.id)}>
            <Trash size={26} weight='light' />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>)}
    </List>
    {open && <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      {/* <DummyEditor dummy={selectedDummy} onSave={handleSave} /> */}
      <div>123</div>
    </BottomDrawer>}
  </Layout>;
};

export default Dummys;

const style = css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};
  font-size: 20px;
  
  .dummys-empty-box {
    padding: 8px 16px;
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;

    .add-button {
      margin-top: 10px;
      font-size: 18px;
    }
  }

  .MuiListItem-root {
    padding-right: 0;
  }

  .MuiListItem-root > .MuiListItemButton-root {
    padding-right: 16px;
    padding-left: 16px;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid ${styleSettingColor.disabled};
  }

  .item-name {
    width: calc(100% - 42px - 42px);
    ${styleLineEllipsis(1)}
  }

  .item-actions {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .MuiIconButton-root {
    color: ${styleSettingColor.text.secondary};
  }
`;