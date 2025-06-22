import React from 'react'
import { css, cx } from '@emotion/css';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { List, ListItemButton, ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';

import UtilAudio from 'utils/audio';
import { styleLineEllipsis } from 'styles/basic.style';
import { styleSettingColor } from 'styles/variables.style';
import { DummyContent } from 'modules/dummy/resources/dummy.type';

type Props = {
  className?: string;
  dummyContents: DummyContent[];
  hideEmptyBox?: true;
  onChangeDummyContent: (DummyContent: DummyContent) => void;
}

const DummyContentList: React.FC<Props> = (props) => {
  const handleChangeDummy = React.useCallback((_dummyContent: DummyContent) => () => {
    props.onChangeDummyContent(_dummyContent);
    UtilAudio.audioClick();
  },[props]);

  const handleToggleDummyDisabled = React.useCallback((dummyContentID: string) =>  () => {
    console.log(dummyContentID);
  }, [])

  if (props.dummyContents.length === 0 && !props.hideEmptyBox) {
    return (
      <List disablePadding className={cx('DT-DummyContentList', style, props.className)}>
        <div className='empty-box'>
          <div>尚無攻防選項</div>
        </div>
      </List>
    )
  }

  return (
    <List disablePadding className={cx('DT-DummyContentList', style, props.className)}>
      {props.dummyContents.map((item) => 
        <ListItem key={item.id} disablePadding className={cx({'dummy-pull-off': item.disabled})}>
          <ListItemButton onClick={handleChangeDummy(item)}>
            <div className='item-name'>{item.content}</div>
          </ListItemButton>
          <ListItemSecondaryAction className='item-actions'>
            <IconButton onClick={handleToggleDummyDisabled(item.id)}>
              {item.disabled ? (
                <EyeSlash size={26} weight='light' />
              ) : (
                <Eye size={26} weight='light'/>
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
  )
}

export default DummyContentList;

const style = css`
  .empty-box {
    padding: 8px 16px;
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
  }

  .MuiListItem-root {
    padding-right: 0;
    
    &.dummy-pull-off {
      color: ${styleSettingColor.disabled};
    }
  }

  .MuiListItem-root > .MuiListItemButton-root {
    padding-right: 16px;
    padding-left: 16px;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid ${styleSettingColor.disabled};
  }

  .item-name {
    width: calc(100% - 42px);
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