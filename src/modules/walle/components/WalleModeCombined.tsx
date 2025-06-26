import React from 'react';
import { css, cx } from '@emotion/css';

import UtilAudio from 'utils/audio';
import { BottomDrawer, CardActionArea } from 'components';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'modules/walle/hooks/useSlotMachine';
import { WalleContentListDrawer, WalleDescription, WalleController }  from 'modules/walle';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import { COMBINED_MIDDLE_ITEM_MODE_LABEL, COMBINED_MIDDLE_ITEM_LABEL, WALLE_CONTENT_LABEL } from 'modules/walle/resources/walle.constant';
import { EnumCombinedMiddleItemMode } from 'modules/walle/enums/enumCombinedMiddleItemMode';
import { EnumCombinedTopicItemMode } from 'modules/walle/enums/enumCombinedTopicItemMode';

type Props = {
  className?: string;
  walle: Walle;
};

const WalleModeCombined = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);

  const slotMachineWalleFrontItem = useSlotMachine(props.walle.contents);
  const slotMachineWalleBackItem = useSlotMachine(props.walle.contents, true);
  const slotMachineWalleByTopicItemMode = {
    [EnumCombinedTopicItemMode.FrontItem]: slotMachineWalleFrontItem,
    [EnumCombinedTopicItemMode.BackItem]: slotMachineWalleBackItem
  };

  const [topicItemMode, setTopicItemMode] = React.useState<EnumCombinedTopicItemMode>(EnumCombinedTopicItemMode.FrontItem)
  const handleOpenWalleContentsDrawer = (_topicItemMode: EnumCombinedTopicItemMode) => () => {
    handleOpen();
    UtilAudio.audioClick();
    setTopicItemMode(_topicItemMode)
  };
  
  const getWalleContent = React.useCallback((_walleContent: WalleContent) => {
    return props.walle.contents.length === 0 
      ? `(無設定${WALLE_CONTENT_LABEL})`
      : _walleContent?.content
  }, [props.walle.contents.length]);

  const handleChangeWalleContent = (_walleContent: WalleContent) => {
    slotMachineWalleByTopicItemMode[topicItemMode].onChange(_walleContent);
    handleClose();
  };

  const [middleItemMode, setMiddleItemMode] = React.useState(EnumCombinedMiddleItemMode.Causal);
  const handleChangeMiddleItemMode = React.useCallback((_middleItemMode: EnumCombinedMiddleItemMode) => () => {
    const switchMiddleItemMode: Record<EnumCombinedMiddleItemMode, EnumCombinedMiddleItemMode> = {
      [EnumCombinedMiddleItemMode.Causal]: EnumCombinedMiddleItemMode.Compare,
      [EnumCombinedMiddleItemMode.Compare]: EnumCombinedMiddleItemMode.Causal,
    };
    UtilAudio.audioClick();
    setMiddleItemMode(switchMiddleItemMode[_middleItemMode]);
  }, []);

  const handleSpin = () => {
    const chosenWalleContent = slotMachineWalleFrontItem.onSpin();
    if (chosenWalleContent) slotMachineWalleBackItem.onSpin(chosenWalleContent);
  };

  return (
    <div className={cx('DT-WalleModeCombined', style, props.className)}>
      <div className='top-section'>
        <CardActionArea onClick={handleOpenWalleContentsDrawer(EnumCombinedTopicItemMode.FrontItem)}>
          {getWalleContent(slotMachineWalleByTopicItemMode[EnumCombinedTopicItemMode.FrontItem].walleContent)}
          </CardActionArea>
        <CardActionArea onClick={handleChangeMiddleItemMode(middleItemMode)}>
          {COMBINED_MIDDLE_ITEM_LABEL[middleItemMode]}
        </CardActionArea>
        <CardActionArea onClick={handleOpenWalleContentsDrawer(EnumCombinedTopicItemMode.BackItem)}>
          {getWalleContent(slotMachineWalleByTopicItemMode[EnumCombinedTopicItemMode.BackItem].walleContent)}
        </CardActionArea>
      </div>
      <div className='bottom-section'>
        <WalleDescription walle={props.walle}>
          <div>中項模式：{COMBINED_MIDDLE_ITEM_MODE_LABEL[middleItemMode]}</div>
          {slotMachineWalleFrontItem.enableWalleContents.length <= 1 && 
            <div>溫馨提示：無法抽題，辯題可選數量需 {'>'} 1</div>
          }
        </WalleDescription>
        <WalleController
          onSpin={handleSpin}
          disabledOnSpin={
            slotMachineWalleFrontItem.isSpinning
            || slotMachineWalleBackItem.isSpinning
            || slotMachineWalleFrontItem.enableWalleContents.length <= 1
          }
        />
      </div>
      <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
        <WalleContentListDrawer open={open} walle={props.walle} onChangeWalleContent={handleChangeWalleContent} />
      </BottomDrawer>
    </div>
  );
};

export default WalleModeCombined;

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
