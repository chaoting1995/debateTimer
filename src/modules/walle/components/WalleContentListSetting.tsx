import React from 'react'
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { BottomDrawerHeader, BottomDrawerBody, Button } from 'components';
import { styleSettingColor } from 'styles/variables.style';
import { pageLinks } from 'routes/route.constants';
import { Walle } from 'modules/walle/resources/walle.type';
import { FIXED_WALLE_GOOGLE_SHEET_URL } from 'modules/walle/resources/fixedWalle.constant';
import ServiceRoute from 'routes/route.service';
import useCopyWalle from 'modules/walle/hooks/useCopyWalle';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  onClose: () => void;
  walle: Walle;
  isFixedWalle: boolean;
}

const WalleContentListSetting = (props: Props) => {  
  const onCopyWalle = useCopyWalle();

  const trackingWalleButtonToEditWalle = () => ServiceGA4.event(GA_EVENT.Walle_Button_Open_WalleContentListSettingDrawer);
  const trackingWalleButtonCopyWalle = () => ServiceGA4.event(GA_EVENT.Walle_Button_Copy_Walle);
  const trackingWalleButtonDownloadFixedWalles = () => ServiceGA4.event(GA_EVENT.Walle_Button_Download_FixedWalles);

  const handleCopyWalle = () => {
    onCopyWalle(props.walle.name, props.walle.contents);
    trackingWalleButtonCopyWalle();
  }
  
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
          <Button 
            variant='outlined' 
            className='setting-button' 
            href={FIXED_WALLE_GOOGLE_SHEET_URL} 
            target='_blank'
            onClick={trackingWalleButtonDownloadFixedWalles}
          >
            檔案下載
          </Button>
        ) : (
          <Button 
            variant='outlined' 
            className='setting-button' 
            component={Link} 
            to={ServiceRoute.toPageLinkWithParams(pageLinks.walleEditID, { id: props.walle.id })}
            onClick={trackingWalleButtonToEditWalle}
          >
            前往編輯
          </Button>
        )}
        <Button 
          variant='outlined' 
          className='setting-button' 
          onClick={handleCopyWalle}
        >
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

