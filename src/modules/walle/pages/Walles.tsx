
import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { 
  Trash, 
  PencilSimple, 
  Plus, 
  DotsSixVertical,
  Circle,
  ChartPieSlice,
} from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from '@mui/material';

import ServiceRoute from 'routes/route.service';
import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from 'styles/basic.style';
import { DragDrog, ListEmptyBox } from 'components';
import { PAGE_TITLE, PAGE_DESCRIPTION, pageLinks } from 'routes/route.constants';
import usePopup from 'context/Popup/usePopup';
import useWalles from 'modules/walle/context/Walles/useWalles';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import { FIXED_WALLES } from 'modules/walle/resources/fixedWalle.constant';
import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { WALLE_LABEL } from 'modules/walle/resources/walle.constant';

const Walles: React.FC = () => {
  const popup = usePopup();
  const wallesProvider = useWalles();
  
  const walleModeIconCreator: Record<EnumWalleMode, React.ReactNode> = {
    [EnumWalleMode.Combined]: <ChartPieSlice size={26} weight='thin' />,
    [EnumWalleMode.Complete]: <Circle size={26} weight='thin' />
  }

  const handleDelete = (walleID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: `確定刪除${WALLE_LABEL}?`
    });
  
    if(!isConfirm) return;
    wallesProvider.deleteItem(walleID);
    popup.notice({ message: '刪除成功', duration: 1000 });
  }

  const handleDragEnd = (sourceIndex: number, destinationIndex: number) => {
    wallesProvider.reorderList(sourceIndex, destinationIndex);
  };

  return <Layout
    mainClassName={cx('DT-Walles', style)}
    title={`自訂${WALLE_LABEL}`}
    homeLink={pageLinks.walle}
    renderButtons={
      <IconButton component={Link} to={pageLinks.walleAdd}>
        <Plus size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags
      title={`${PAGE_TITLE.walle} | 自訂${WALLE_LABEL}`} 
      description={PAGE_DESCRIPTION.walle} />
    {/* Fixed Walle: start */}
    <List disablePadding>
      {FIXED_WALLES.map(item => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            component={Link} 
            to={ServiceRoute.toPageLinkWithParams(pageLinks.walleID, { id: item.id })}
          >
            {walleModeIconCreator[item.mode]}
            <div className='item-name'>{item.name}</div>
          </ListItemButton>
          <ListItemSecondaryAction className='item-actions'>
            <div className='contents-amount'>{item.contents.length <= 99 ? item.contents.length : '99+'}</div>
            <IconButton 
              disabled
              component={Link} 
              to={ServiceRoute.toPageLinkWithParams(pageLinks.walleEditID, { id: item.id })}
            >
              <PencilSimple size={26} weight='light'/>
            </IconButton>
            <IconButton disabled onClick={handleDelete(item.id)}>
              <Trash size={26} weight='light' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    {/* Fixed Walle: end */}
    <hr className='walles-divider'/>
    </List>
    {wallesProvider.list.length === 0 && 
      <ListEmptyBox label={WALLE_LABEL} pageLink={pageLinks.walleAdd} />}
    <List disablePadding>
      <DragDrog
        className='list-drag-drog'
        onDragEnd={handleDragEnd}
        list={wallesProvider.list}
        renderRow={(item, _, dragHandleProps) => (
          <ListItem key={item.id} disablePadding {...dragHandleProps}>
            <ListItemButton
              component={Link} 
              to={ServiceRoute.toPageLinkWithParams(pageLinks.walleID, { id: item.id })}
            >
              <DotsSixVertical size={26} weight='light'/>
              <div className='item-name'>{item.name}</div>
            </ListItemButton>
            <ListItemSecondaryAction className='item-actions'>
              <div className='contents-amount'>{item.contents.length <= 99 ? item.contents.length : '99+'}</div>
              <IconButton 
                component={Link} 
                to={ServiceRoute.toPageLinkWithParams(pageLinks.walleEditID, { id: item.id })}
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

export default Walles;

const style = css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};
  font-size: 20px;
  
  .walles-divider {
    margin: 0;
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