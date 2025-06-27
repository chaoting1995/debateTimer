import React from 'react';
import { css, cx } from '@emotion/css';

import { BottomDrawer, CardActionArea } from 'components';
import { WalleContentListDrawer, WalleDescription, WalleController }  from 'modules/walle';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE_CONTENT, WALLE_CONTENT_LABEL } from 'modules/walle/resources/walle.constant';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'hooks/useSlotMachine';
import UtilAudio from 'utils/audio';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  walle: Walle;
};

const TopicModeComplete = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);

  const slotMachine = useSlotMachine(props.walle.contents, DEFAULT_WALLE_CONTENT);

  const handleOpenWalleContentsDrawer = () => {
    handleOpen();
    UtilAudio.audioClick();
    ServiceGA4.event(GA_EVENT.Walle_Button_Open_WalleContentListDrawer);
  };

  const handleChangeWalleContent = (_walleContent: WalleContent) => {
    slotMachine.onChange(_walleContent);
    handleClose();
    UtilAudio.audioClick();
    ServiceGA4.event(GA_EVENT.Walle_Button_Select_WalleContent_Complete);
  };

  const handleSpin = React.useCallback(() => {
    UtilAudio.audioRolling();
    slotMachine.onSpin();
    ServiceGA4.event(GA_EVENT.Walle_Button_Spin_WalleContent_Complete);
  }, [slotMachine]);

  return (
    <div className={cx('DT-TopicModeComplete', style, props.className)}>
      <div className='top-section'>
        <CardActionArea onClick={handleOpenWalleContentsDrawer}>
          {slotMachine.enableList.length === 0 
            ? `(尚無可見的${WALLE_CONTENT_LABEL})`
            : slotMachine.item?.content}
        </CardActionArea>
        {slotMachine.enableList.length <= 1 && 
          <div>溫馨提示：無法抽選，可抽選數量需 {'>'} 1 </div>
        }
      </div>
      <div className='bottom-section'>
        <WalleDescription walle={props.walle} />
        <WalleController
          onSpin={handleSpin}
          disabledOnSpin={slotMachine.isSpinning || slotMachine.enableList.length <= 1} 
        />
      </div>
      <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
        <WalleContentListDrawer open={open} walle={props.walle} onChangeWalleContent={handleChangeWalleContent} />
      </BottomDrawer>
    </div>
  );
};

export default TopicModeComplete;

const style = css`
  .top-section {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .bottom-section {
    width: 100%;
  }
`;
