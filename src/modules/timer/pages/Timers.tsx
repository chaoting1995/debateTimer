
import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Trash, PencilSimple, Plus, DotsSixVertical } from '@phosphor-icons/react';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';
import { styleLineEllipsis } from 'styles/basic.style';
import { DragDrog, ListEmptyBox } from 'components';
import { PAGE_TITLE, PAGE_DESCRIPTION, pageLinks } from 'routes/route.constants';
import { DEFAULT_TIMER, TIMER_LABEL } from 'modules/timer/resources/timer.constant';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { Timer } from 'modules/timer/resources/timer.type';
import { BottomDrawer } from 'components';
import ServiceRoute from 'routes/route.service';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import usePopup from 'context/Popup/usePopup';
import useTimers from 'modules/timer/context/Timers/useTimers';
import useDialog from 'hooks/useDialog';
import TimerEditor from 'modules/timer/components/TimerEditor';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

const Timers: React.FC = () => {
  const popup = usePopup();
  const timersProvider = useTimers();
  
  const [open, handleOpen, handleClose] = useDialog(false);
  const [selectedTimer, setSelectedTimer] = React.useState<Timer>(DEFAULT_TIMER); 

  const trackingHeaderButtonAdd = () => ServiceGA4.event(GA_EVENT.Header_Button_Add_Timer);
  const trackingTimersButtonAdd = () => ServiceGA4.event(GA_EVENT.Timers_Button_Add_Timer);
  const trackingTimersButtonEdit = () => ServiceGA4.event(GA_EVENT.Timers_Button_Edit_Timer);
  const trackingTimersButtonDelete = () => ServiceGA4.event(GA_EVENT.Timers_Button_Delete_Timer);
  const trackingTimersButtonView = (name: string, mode: EnumTimerMode) => () => {
    const newGaEvent = {
      ...GA_EVENT.Timers_Button_View_Timer,
      label: `${GA_EVENT.Timers_Button_View_Timer.label}:${name}:${mode}`
    }
    ServiceGA4.event(newGaEvent);
  };

  const handleOpenEditor = React.useCallback((_timerID?: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const _timer: Timer = timersProvider.list.find(item => item.id === _timerID) || DEFAULT_TIMER;

    setSelectedTimer(_timer);
    handleOpen();
    if (_timerID) trackingTimersButtonEdit();
    if (!_timerID) trackingHeaderButtonAdd();
  }, [handleOpen, timersProvider.list])

  const handleDelete = (_timerID: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    
    const isConfirm = await popup.confirm({ 
      title: `確定刪除${TIMER_LABEL}?`
    });
  
    if (!isConfirm) return;
    timersProvider.deleteItem(_timerID);
    popup.notice({ message: '刪除成功', duration: 1000 });
    trackingTimersButtonDelete();
  }

  const handleDragEnd = (sourceIndex: number, destinationIndex: number) => {
    timersProvider.reorderList(sourceIndex, destinationIndex);
  };

  const handleSave =  React.useCallback((_timer: Timer) => {
    if (!selectedTimer.id) {
      timersProvider.addItem(_timer);
    } else {
      timersProvider.editItem(_timer);
    };

    handleClose();
  }, [timersProvider, selectedTimer, handleClose]);

  return <Layout
    mainClassName={cx('DT-Timers', style)}
    title={`自訂${TIMER_LABEL}`}
    homeLink={pageLinks.timer}
    renderButtons={
      <IconButton onClick={handleOpenEditor()}>
        <Plus size={28} weight='light' />
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.timerWithVersion} | 自訂${TIMER_LABEL}`} 
      description={PAGE_DESCRIPTION.timer} />
    {timersProvider.list.length === 0 && 
      <ListEmptyBox label={TIMER_LABEL} onClick={handleOpenEditor()} onTrack={trackingTimersButtonAdd} />}
    <List disablePadding>
      <DragDrog
        className='list-drag-drog'
        onDragEnd={handleDragEnd}
        list={timersProvider.list}
        renderRow={(item, _, dragHandleProps) => (
          <ListItem key={item.id} disablePadding {...dragHandleProps}>
            <ListItemButton
              component={Link} 
              to={ServiceRoute.toPageLinkWithParams(pageLinks.timerID, { id: item.id })}
              onClick={trackingTimersButtonView(item.name, item.mode)}
            >
              <DotsSixVertical size={26} weight='light'/>
              <div className='item-name'>{item.name}</div>
            </ListItemButton>
            <ListItemSecondaryAction className='item-actions'>
              <IconButton onClick={handleOpenEditor(item.id)}>
                <PencilSimple size={26} weight='light' />
              </IconButton>
              <IconButton onClick={handleDelete(item.id)}>
                <Trash size={26} weight='light' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      />
    </List>
    {open && <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      <TimerEditor timer={selectedTimer} onSave={handleSave} />
    </BottomDrawer>}
  </Layout>;
};

export default Timers;

const style = css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};
  font-size: 20px;

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