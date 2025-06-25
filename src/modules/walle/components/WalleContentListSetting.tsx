import React from 'react'
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import ServiceRoute from 'routes/route.service';
import { pageLinks } from 'routes/route.constants';
import { Walle } from 'modules/walle/resources/walle.type';
import { styleSettingColor } from 'styles/variables.style';
import { BottomDrawerHeader, BottomDrawerBody, Button } from 'components';
import useCopyWalle from 'modules/walle/hooks/useCopyWalle';
import { FIXED_WALLE_GOOGLE_SHEET_URL } from 'modules/walle/resources/fixedWalle.constant';

type Props = {
  className?: string;
  onClose: () => void;
  walle: Walle;
  isFixedWalle: boolean;
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
      <BottomDrawerBody center gap paddingTop paddingHorizental>
        {props.isFixedWalle ? (
          <Button variant='outlined' className='setting-button' href={FIXED_WALLE_GOOGLE_SHEET_URL} target='_blank'>
            檔案下載
          </Button>
        ) : (
          <Button variant='outlined' className='setting-button' component={Link} to={ServiceRoute.toPageLinkWithParams(pageLinks.walleEditID, { id: props.walle.id })}>
            前往編輯
          </Button>
        )}
        <Button variant='outlined' className='setting-button' onClick={handleCopyWalle}>
          複製全部
        </Button>
      </BottomDrawerBody>
    </div>
  )
}

export default WalleContentListSetting;

const style = css`  
  .setting-button.MuiButton-root {
    width: fit-content;
    color: ${styleSettingColor.background.dark};
  }
`;

