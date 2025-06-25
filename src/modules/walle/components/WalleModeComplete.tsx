import React from 'react';
import { css, cx } from '@emotion/css';

import UtilAudio from 'utils/audio';
import { BottomDrawer, CardActionArea } from 'components';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'modules/walle/hooks/useSlotMachine';
import { WalleContentListDrawer, WalleDescription, WalleController }  from 'modules/walle';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import { EMPTY_WALLE_CONTENT } from 'modules/walle/resources/walle.constant';

type Props = {
  className?: string;
  walle: Walle;
};

const TopicModeComplete = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);

  const slotMachine = useSlotMachine(props.walle.contents);

  const handleOpenWalleContentsDrawer = () => {
    handleOpen();
    UtilAudio.audioClick();
  };

  const getWalleContent = React.useCallback((_walleContent: WalleContent) => {
    return props.walle.contents.length === 0 
      ? EMPTY_WALLE_CONTENT.content
      : _walleContent?.content || EMPTY_WALLE_CONTENT.content
  }, [props.walle.contents.length]);

  const handleChangeWalleContent = (_walleContent: WalleContent) => {
    slotMachine.onChange(_walleContent);
    handleClose();
  };

  return (
    <div className={cx('DT-TopicModeComplete', style, props.className)}>
      <div className='top-section'>
        <CardActionArea onClick={handleOpenWalleContentsDrawer}>
          {getWalleContent(slotMachine.walleContent)}
          </CardActionArea>
      </div>
      <div className='bottom-section'>
        <WalleDescription walle={props.walle}>
          {slotMachine.enableWalleContents.length <= 1 && 
            <div>溫馨提示：無法抽題，辯題可選數量需 {'>'} 1 </div>
          }
        </WalleDescription>
        <WalleController
          onSpin={slotMachine.onSpin}
          disabledOnSpin={slotMachine.isSpinning || slotMachine.enableWalleContents.length <= 1} 
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
