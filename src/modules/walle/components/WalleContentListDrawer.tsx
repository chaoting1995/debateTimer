import React from 'react'
import { css, cx } from '@emotion/css';
import { Gear } from '@phosphor-icons/react';
import { IconButton } from '@mui/material';

import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import useDialog from 'hooks/useDialog';
import { WalleContentList, WalleContentListSetting } from 'modules/walle';
import { WALLE_CONTENT_LABEL } from 'modules/walle/resources/walle.constant';
import { FIXED_WALLES } from "modules/walle/resources/fixedWalle.constant";
import WalleContentCategoryGroups from "modules/walle/components/WalleContentCategoryGroups";
// import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  open?: boolean;
  children?: React.ReactNode;
  walle: Walle;
  onChangeWalleContent: (walleContent: WalleContent) => void;
}

const WalleContentListDrawer: React.FC<Props> = (props) => {
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);
  
  const [fixedWalle] = React.useState<Walle | undefined>(FIXED_WALLES.find(item => item.id === props.walle.id));

  const handleOpenSettingWithTraking = React.useCallback(() => {
    handleOpenSetting();
    // ServiceGA4.event(GA_EVENT.WalleListDrawer_Button_Settting);
  }, [handleOpenSetting]);

  // 依 props.open 判斷，每次開啟彈窗，就重置 openSetting
  React.useEffect(() => {
    if (props.open) handleCloseSetting();
  },[props.open, handleCloseSetting])

  if (openSetting) {
    return <WalleContentListSetting 
      className={cx(style, props.className)}
      onClose={handleCloseSetting}
      walle={props.walle} 
    />
  }

  return (
    <div className={cx('DT-WalleListDrawer', style, props.className)}>
      <BottomDrawerHeader
        children={`${WALLE_CONTENT_LABEL}列表`}
        rightSide={
          <IconButton onClick={handleOpenSettingWithTraking}>
            <Gear size={28} weight='light'/>
          </IconButton>
        }
      />
      <BottomDrawerBody>
        {fixedWalle 
        ? <WalleContentCategoryGroups 
            walleContents={props.walle.contents} 
            renderWalleContentList={(_walleContents) => 
              <WalleContentList 
                hideEmptyBox 
                walleContents={_walleContents} 
                onChangeWalleContent={props.onChangeWalleContent} 
              />}
          />
        : <WalleContentList 
            hideEmptyBox 
            walleContents={props.walle.contents} 
            onChangeWalleContent={props.onChangeWalleContent} 
          />
        }
      </BottomDrawerBody>
    </div>
  )
}

export default WalleContentListDrawer;

const style = css`
  overflow: hidden;
  border-radius: inherit;
`;