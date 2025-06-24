
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
import useDummys from 'modules/dummy/context/Dummys/useDummys';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import { Button } from 'components';

const ITEM_NAME = '木人樁';

const Dummys: React.FC = () => {
  const popup = usePopup();
  const dummysProvider = useDummys();

  const handleDelete = (dummyID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: `確定刪除${ITEM_NAME}?`
    });
  
    if(!isConfirm) return;
    dummysProvider.deleteItem(dummyID);
    popup.notice({ message: '刪除成功', duration: 1000 });
  }

  const handleDragEnd = (sourceIndex: number, destinationIndex: number) => {
    dummysProvider.reorderList(sourceIndex, destinationIndex);
  };

  return <Layout
    mainClassName={cx('DT-Dummys', style)}
    title={PAGE_TITLE.dummys}
    homeLink={pageLinks.dummy}
    renderButtons={
      <IconButton 
        component={Link} 
        to={pageLinks.dummyAdd}
      >
        <Plus size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.dummy} | ${PAGE_TITLE.dummys}`} 
      description={PAGE_DESCRIPTION.dummy} />
    {dummysProvider.list.length === 0 && <div className='list-empty-box'>
      <div>尚無{ITEM_NAME}</div>
      <Button 
        variant='outlined' 
        className='add-button' 
        component={Link} 
        to={pageLinks.dummyAdd}
        >
          新增{ITEM_NAME}
        </Button>
    </div>}
    <List disablePadding>
      <DragDrog
        className='list-drag-drog'
        onDragEnd={handleDragEnd}
        list={dummysProvider.list}
        renderRow={(item, _, dragHandleProps) => (
          <ListItem key={item.id} disablePadding {...dragHandleProps}>
            <ListItemButton
              component={Link} 
              to={ServiceRoute.toPageLinkWithParams(pageLinks.dummyID, { id: item.id })}
            >
              <DotsSixVertical size={26} weight='light'/>
              <div className='item-name'>{item.name}</div>
            </ListItemButton>
            <ListItemSecondaryAction className='item-actions'>
              <div className='contents-amount'>{
              item.contents.length <= 99
                ? item.contents.length
                : '99+'
              }</div>
              <IconButton 
                component={Link} 
                to={ServiceRoute.toPageLinkWithParams(pageLinks.dummyEditID, { id: item.id })}
              >
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

export default Dummys;

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
    width: calc(100% - 42px - 42px - 70px);
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

  .contents-amount {
    font-size: 20px;
    text-align: center;
    font-weight: lighter;
    width: 26px;
    height: 26px;
    padding: 8px;
  }
`;