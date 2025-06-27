import React from 'react';
import { css, cx } from '@emotion/css';

import { BottomDrawer, CardActionArea } from 'components';
import { WalleContentListDrawer, WalleDescription, WalleController }  from 'modules/walle';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE_CONTENT, COMBINED_MIDDLE_ITEM_MODE_LABEL, COMBINED_MIDDLE_ITEM_LABEL, WALLE_CONTENT_LABEL } from 'modules/walle/resources/walle.constant';
import { EnumCombinedMiddleItemMode } from 'modules/walle/enums/enumCombinedMiddleItemMode';
import { EnumCombinedTopicItemMode } from 'modules/walle/enums/enumCombinedTopicItemMode';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'hooks/useSlotMachine';
import UtilAudio from 'utils/audio';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  walle: Walle;
};

const WalleModeCombined = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);

  const slotMachineWalleFrontItem = useSlotMachine(props.walle.contents, DEFAULT_WALLE_CONTENT);
  const slotMachineWalleBackItem = useSlotMachine(props.walle.contents, DEFAULT_WALLE_CONTENT, true);
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

  const [middleItemMode, setMiddleItemMode] = React.useState(EnumCombinedMiddleItemMode.Causal);

  const handleChangeMiddleItemMode = React.useCallback((_middleItemMode: EnumCombinedMiddleItemMode) => () => {
    const switchMiddleItemMode: Record<EnumCombinedMiddleItemMode, EnumCombinedMiddleItemMode> = {
      [EnumCombinedMiddleItemMode.Causal]: EnumCombinedMiddleItemMode.Compare,
      [EnumCombinedMiddleItemMode.Compare]: EnumCombinedMiddleItemMode.Causal,
    };
    UtilAudio.audioClick();
    setMiddleItemMode(switchMiddleItemMode[_middleItemMode]);

    const trackingSwitchMiddleItemMode: Record<EnumCombinedMiddleItemMode, () => void> = {
      [EnumCombinedMiddleItemMode.Causal]: () => ServiceGA4.event(GA_EVENT.Walle_Button_TopicMiddleItemMode_Compare),
      [EnumCombinedMiddleItemMode.Compare]: () => ServiceGA4.event(GA_EVENT.Walle_Button_TopicMiddleItemMode_Causal),
    };
    trackingSwitchMiddleItemMode[_middleItemMode]();
  }, []);

  const handleChangeWalleContent = (_walleContent: WalleContent) => {
    slotMachineWalleByTopicItemMode[topicItemMode].onChange(_walleContent);
    handleClose();
    UtilAudio.audioClick();
    ServiceGA4.event(GA_EVENT.Walle_Button_Select_WalleContent_Combined);
  };

  const handleSpin = React.useCallback(async () => {
    UtilAudio.audioRolling();
    const chosenWalleContent = await slotMachineWalleFrontItem.onSpin();
    if (chosenWalleContent) slotMachineWalleBackItem.onSpin(false, chosenWalleContent);
    ServiceGA4.event(GA_EVENT.Walle_Button_Spin_WalleContent_Combined);
  }, [slotMachineWalleBackItem, slotMachineWalleFrontItem]);

  return (
    <div className={cx('DT-WalleModeCombined', style, props.className)}>
      <div className='top-section'>
        <CardActionArea onClick={handleOpenWalleContentsDrawer(EnumCombinedTopicItemMode.FrontItem)}>
          {getWalleContent(slotMachineWalleByTopicItemMode[EnumCombinedTopicItemMode.FrontItem].item)}
          </CardActionArea>
        <CardActionArea onClick={handleChangeMiddleItemMode(middleItemMode)}>
          {COMBINED_MIDDLE_ITEM_LABEL[middleItemMode]}
        </CardActionArea>
        <CardActionArea onClick={handleOpenWalleContentsDrawer(EnumCombinedTopicItemMode.BackItem)}>
          {getWalleContent(slotMachineWalleByTopicItemMode[EnumCombinedTopicItemMode.BackItem].item)}
        </CardActionArea>
        {slotMachineWalleFrontItem.enableList.length <= 1 && 
          <div>溫馨提示：無法抽選，可抽選數量需 {'>'} 1</div>
        }
      </div>
      <div className='bottom-section'>
        <WalleDescription walle={props.walle}>
          <div>中項模式：{COMBINED_MIDDLE_ITEM_MODE_LABEL[middleItemMode]}</div>
        </WalleDescription>
        <WalleController
          onSpin={handleSpin}
          disabledOnSpin={
            slotMachineWalleFrontItem.isSpinning
            || slotMachineWalleBackItem.isSpinning
            || slotMachineWalleFrontItem.enableList.length <= 1
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
