
import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Trash, PencilSimple, Plus, DotsSixVertical } from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from '@mui/material';

import ServiceRoute from 'routes/route.service';
import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from 'styles/basic.style';
import { DragDrog } from 'components';
import { PAGE_TITLE, PAGE_DESCRIPTION, pageLinks } from 'routes/route.constants';
import usePopup from 'context/Popup/usePopup';
import useListenings from 'modules/listening/context/Listenings/useListenings';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import Layout from 'layouts/Layout';
import { HeadTags, Button } from 'components';

const ITEM_NAME = '戰場判斷表';

const Listenings: React.FC = () => {
  const popup = usePopup();
  const listeningsProvider = useListenings();

  const trakingHeaderButtonAddListening = () => {    
    ServiceGA4.event(GA_EVENT.Header_Button_Add_Timer);
  };

  const trakingButtonEditListening = (name: string, owner: string) => () => {
    const newGaEvent = {
      ...GA_EVENT.Listenings_Button_Edit_Listening,
      label: `${GA_EVENT.Listenings_Button_Edit_Listening.label}_Name:${name}_Owner:${owner}`
    }

    ServiceGA4.event(newGaEvent);
  };

  const handleDelete = (listeningID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: `確定刪除${ITEM_NAME}?`
    });
  
    if (!isConfirm) return;
    listeningsProvider.deleteItem(listeningID);
    ServiceGA4.event(GA_EVENT.Listenings_Button_Delete_Listening);
  }

  const handleDragEnd = (sourceIndex: number, destinationIndex: number) => {
    listeningsProvider.reorderList(sourceIndex, destinationIndex);
  };

  return <Layout
    mainClassName={cx('DT-Listenings', style)}
    title={PAGE_TITLE.listenings}
    renderButtons={
      <IconButton component={Link} to={pageLinks.listening} onClick={trakingHeaderButtonAddListening}>
        <Plus size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.listenings} | ${PAGE_TITLE.listenings}`} 
      description={PAGE_DESCRIPTION.listening} />
    {listeningsProvider.list.length === 0 && <div className='list-empty-box'>
      <div>尚無{ITEM_NAME}</div>
      <Button variant='outlined' className='add-button' component={Link} to={pageLinks.listening}>新增{ITEM_NAME}</Button>
    </div>}
    <List disablePadding>
      <DragDrog
        className='list-drag-drog'
        onDragEnd={handleDragEnd}
        list={listeningsProvider.list}
        renderRow={(item, _, dragHandleProps) => (
          <ListItem key={item.id} disablePadding {...dragHandleProps}>
            <ListItemButton>
              <DotsSixVertical size={26} weight='light'/>
              <div className='item-name'>{item.name}</div>
            </ListItemButton>
            <ListItemSecondaryAction className='item-actions'>
              <IconButton 
                component={Link} 
                to={ServiceRoute.toPageLinkWithParams(pageLinks.listeningID, { id: item.id })}
                onClick={trakingButtonEditListening(item.name, item.owner)}>
                <PencilSimple size={26} weight='light'/>
              </IconButton>
              <IconButton onClick={handleDelete(item.id)}>
                <Trash size={26} weight='light' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      />
    </List>
  </Layout>;
};

export default Listenings;

const style = css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};
  font-size: 20px;
  
  .list-empty-box {
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

  .list-drag-drog {
    .dd-droppable {
      width: 100%;
  
      .dd-drappable {
        width: 100%;
      }

      .dd-drappable.dragging {
        .MuiListItem-root > .MuiListItemButton-root {
          background-color: ${styleSettingColor.gray};
          border-top: 1px solid ${styleSettingColor.disabled};
        }
      }
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