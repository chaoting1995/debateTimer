import React from 'react'
import { useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { List, ListItemButton, ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';

import useWalles from 'modules/walle/context/Walles/useWalles';
import UtilAudio from 'utils/audio';
import { styleLineEllipsis } from 'styles/basic.style';
import { styleSettingColor } from 'styles/variables.style';
import { WalleContent } from 'modules/walle/resources/walle.type';

type Props = {
  className?: string;
  walleContents: WalleContent[];
  hideEmptyBox?: true;
  onChangeWalleContent: (WalleContent: WalleContent) => void;
}

const WalleContentList: React.FC<Props> = (props) => {
const { id } = useParams<{ id: string }>();
  const wallesProvider = useWalles();

  const handleChangeWalle = React.useCallback((_walleContent: WalleContent) => () => {
    props.onChangeWalleContent(_walleContent);
    UtilAudio.audioClick();
  },[props]);

  const handleToggleWalleDisabled = React.useCallback((contentID: string) => () => {
    wallesProvider.toggleItemDisabled(id ? id : wallesProvider.list[0].id, contentID);
  }, [id, wallesProvider])

  if (props.walleContents.length === 0 && !props.hideEmptyBox) {
    return (
      <List disablePadding className={cx('DT-WalleContentList', style, props.className)}>
        <div className='empty-box'>
          <div>(尚無攻防選項)</div>
        </div>
      </List>
    )
  }

  return (
    <List disablePadding className={cx('DT-WalleContentList', style, props.className)}>
      {props.walleContents.map((item) => 
        <ListItem key={item.id} disablePadding className={cx({'walle-pull-off': item.disabled})}>
          <ListItemButton onClick={handleChangeWalle(item)}>
            <div className='item-name'>{item.content}</div>
          </ListItemButton>
          <ListItemSecondaryAction className='item-actions'>
            <IconButton onClick={handleToggleWalleDisabled(item.id)}>
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

export default WalleContentList;

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
    
    &.walle-pull-off {
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