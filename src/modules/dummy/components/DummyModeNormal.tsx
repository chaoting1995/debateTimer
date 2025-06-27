import React from 'react';
import { css, cx } from '@emotion/css';

import { BottomDrawer, CardActionArea } from 'components';
import { DummyDescription, DummyController, DummyContentListDrawer } from 'modules/dummy';
import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';
import { DEFAUT_DUMMY_CONTENT, DUMMY_CONTENT_LABEL } from 'modules/dummy/resources/dummy.constant';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'hooks/useSlotMachine';
import UtilAudio from 'utils/audio';
import ServiceUtil from 'services/util.service';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  dummy: Dummy;
};

const DummyModeNormal = (props: Props) => {
  const slotMachine = useSlotMachine(props.dummy.contents, DEFAUT_DUMMY_CONTENT);

  const [open, handleOpen, handleClose] = useDialog(false);
  const [isSpeech, setIsSpeech] = React.useState<boolean>(true);

  const handleClickDummyContentBox = React.useCallback(() => {
    handleOpen();
    UtilAudio.audioClick();
    ServiceGA4.event(GA_EVENT.Dummy_Button_Open_DummyContentListDrawer);
  }, [handleOpen]);
  
  const handleChangeDummyContent = React.useCallback((_dummyContent: DummyContent) => {
    slotMachine.onChange(_dummyContent);
    UtilAudio.audioClick();
    handleClose();
    if (isSpeech) ServiceUtil.speakText(_dummyContent.content);
    ServiceGA4.event(GA_EVENT.Dummy_Button_Select_DummyContent);
  }, [isSpeech, slotMachine, handleClose]);
  
  const handleSpin = React.useCallback(async () => {
    UtilAudio.audioRolling();
    const chosenDummyContent = await slotMachine.onSpin(true);
    if (chosenDummyContent && isSpeech) ServiceUtil.speakText(chosenDummyContent.content);
    ServiceGA4.event(GA_EVENT.Dummy_Button_Spin_DummyContent);
  },[isSpeech, slotMachine]);

  const handleToggleMuteSpeech = React.useCallback((text: string) => () => {
    setIsSpeech(prevState => {
      if (prevState) window.speechSynthesis.cancel();
      if (!prevState) ServiceUtil.speakText(text);
      return !prevState
    });
  }, []);

  return <div className={cx('DT-DummyModeNormal', style, props.className)}>
    <div className='top-section'>
      <CardActionArea disabled={Boolean(props.dummy.contents.length === 0)} onClick={handleClickDummyContentBox}>
        {slotMachine.enableList.length === 0
            ? `(尚無可見的${DUMMY_CONTENT_LABEL})`
            : slotMachine.item?.content}
      </CardActionArea>
      {slotMachine.enableList.length <= 1 && 
        <div>溫馨提示：無法抽選，可抽選數量需 {'>'} 1 </div>
      }
    </div>
    <div className='bottom-section'>
      <DummyDescription dummy={props.dummy} />
      <DummyController 
        isSpeech={isSpeech}
        onToggleMuteSpeech={handleToggleMuteSpeech(slotMachine.item.content)}
        onSpin={handleSpin} 
        disabledOnSpin={slotMachine.isSpinning || slotMachine.enableList.length <= 1} 
      />
    </div>
    <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      <DummyContentListDrawer open={open} dummy={props.dummy} onChangeDummyContent={handleChangeDummyContent} />
    </BottomDrawer>
  </div>
};

export default DummyModeNormal;

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