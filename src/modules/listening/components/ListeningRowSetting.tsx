import React from 'react'
import { css, cx } from '@emotion/css';
import { List, ListItemButton, ListItem } from '@mui/material';
import { PaintRoller, ArrowUp, ArrowDown, Copy, Broom, Trash } from '@phosphor-icons/react';

import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { ListeningRow } from 'modules/listening/resources/listening.type';
import { BG_DARK, BG_DEFAULT } from 'modules/listening';

type Props = {
  className?: string;
  listeningRow: ListeningRow;
  onInsertAbove: () => void;
  onInsertBelow: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBackgoundColor: (bg: string) => () => void;
  onClearContents: () => void;
}

const ListeningRowSetting: React.FC<Props> = (props) => {
  const bgAction = props.listeningRow.bg === BG_DEFAULT ? {
    icon: <PaintRoller weight='duotone' />,
    label: '深色背景',
    action: props.onBackgoundColor(BG_DARK)
  } : {
    icon: <PaintRoller />,
    label: '預設背景',
    action: props.onBackgoundColor(BG_DEFAULT)
  };

  const actionOptions = [
    bgAction,
    {
      icon: <ArrowUp />,
      label: '向上新增',
      action: props.onInsertAbove
    },
    {
      icon: <ArrowDown />,
      label: '向下新增',
      action: props.onInsertBelow
    },
    {
      icon: <Copy />,
      label: '建立副本',
      action: props.onDuplicate
    },
    {
      icon: <Broom />,
      label: '清除',
      action: props.onClearContents
    },
    {
      icon: <Trash />,
      label: '刪除',
      action: props.onDelete
    },
  ]

  return (
    <div className={cx('DT-ListeningRowSetting', style, props.className)}>
      <BottomDrawerHeader children='單列設定' />
      <BottomDrawerBody>
        <List disablePadding>
          {actionOptions.map((item) => 
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={item.action}>
                {item.icon}
                <div className='item-label'>{item.label}</div>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </BottomDrawerBody>
    </div>
  )
}

export default ListeningRowSetting;

const style = css`
  overflow: hidden;
  border-radius: inherit;
  
  .item-label {
    margin-left: 10px;
  }

  .MuiListItem-root > .MuiListItemButton-root {
    font-size: 16px;
    min-height: 40px;
  }
`;