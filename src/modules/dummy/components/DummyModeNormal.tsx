import React from 'react';
import { css, cx } from '@emotion/css';

import useDialog from 'hooks/useDialog';
import useSlotMachine from 'modules/dummy/hooks/useSlotMachine';
import UtilAudio from 'utils/audio';
import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';
import { BottomDrawer, CardActionArea } from 'components';
import { DummyDescription, DummyController, DummyContentListDrawer } from 'modules/dummy';
import ServiceUtil from 'services/util.service';

type Props = {
  className?: string;
  dummy: Dummy;
};

const DummyModeNormal = (props: Props) => {
  const slotMachine = useSlotMachine(props.dummy.contents);

  const [open, handleOpen, handleClose] = useDialog(false);
  const [isSpeech, setIsSpeech] = React.useState<boolean>(true);

  const handleClickDummyContentBox = React.useCallback(() => {
    handleOpen();
    UtilAudio.audioClick();
  }, [handleOpen]);
  
  const handleChangeDummyContent = React.useCallback((_dummyContent: DummyContent) => {
    slotMachine.onChange(_dummyContent);
    handleClose();
    if (isSpeech) ServiceUtil.speakText(_dummyContent.content);
  }, [isSpeech, slotMachine, handleClose]);

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
        {slotMachine.enableDummyContents.length === 0
            ? '(尚無可見的攻防)'
            : slotMachine.dummyContent?.content}
      </CardActionArea>
    </div>
    <div className='bottom-section'>
      <DummyDescription dummy={props.dummy} />
      <DummyController 
        isSpeech={isSpeech}
        onToggleMuteSpeech={handleToggleMuteSpeech(slotMachine.dummyContent.content)}
        onSpin={slotMachine.onSpin} 
        disabledOnSpin={slotMachine.isSpinning || slotMachine.enableDummyContents.length <= 1} 
      />
    </div>
    <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      <DummyContentListDrawer 
        open={open}
        dummy={props.dummy} 
        onChangeDummyContent={handleChangeDummyContent}
      />
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