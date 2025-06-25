import React from 'react'
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';

import { Walle } from 'modules/walle/resources/walle.type';
import { styleSettingColor } from 'styles/variables.style';
import { BottomDrawerHeader, BottomDrawerBody, Button } from 'components';
import useCopyWalle from 'modules/walle/hooks/useCopyWalle';

type Props = {
  className?: string;
  onClose: () => void;
  walle: Walle;
}

const WalleContentListSetting = (props: Props) => {  
  const onCopyWalle = useCopyWalle();
  const handleCopyWalle = () => onCopyWalle(props.walle.name, props.walle.contents);
  
  return (
    <div className={cx('DT-WalleContentListSetting', style, props.className)}>
      <BottomDrawerHeader
        children='進階設定'
        rightSide={
          <IconButton onClick={props.onClose}>
            <XCircle size={28} weight='light' />
          </IconButton>
        }
      />
      <BottomDrawerBody center paddingTop paddingHorizental>
        <Button variant='outlined' className='download-button' onClick={handleCopyWalle}>
          複製全部
        </Button>
      </BottomDrawerBody>
    </div>
  )
}

export default WalleContentListSetting;

const style = css`    
  .setting-title {
    margin-bottom: 10px;
    font-size: 18px;
    color: ${styleSettingColor.background.dark};
  }
  
  .setting-subtitle {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${styleSettingColor.text.secondary};
  }
  
  .download-button.MuiButton-root {
    width: fit-content;
    color: ${styleSettingColor.background.dark};
  }

  .template-button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

