import React from 'react';
import { css, cx } from '@emotion/css';
import { CardActionArea } from '@mui/material';

import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';
import UtilAudio from 'utils/audio';
import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';
import useSlotMachine from 'modules/dummy/hooks/useSlotMachine';
import { DummyDescription, DummyController, DummyContentListDrawer } from 'modules/dummy';

type Props = {
  dummy: Dummy;
  className?: string;
};

const DummyModeNormal = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);
  const slotMachine = useSlotMachine(props.dummy.contents);

  const handleClickDummyContentBox = () => {
    handleOpen();
    UtilAudio.audioClick();
  };
  
  const handleChangeDummyContent = (_dummyContent: DummyContent) => {
    slotMachine.onChange(_dummyContent);
    handleClose();
  };

  return <div className={cx('DT-DummyModeNormal', style, props.className)}>
    <div className='top-section'>
      <div className='dummy-contnet-box'>
        <CardActionArea onClick={handleClickDummyContentBox}>
          {slotMachine.dummyContent.content}
        </CardActionArea>
      </div>
    </div>
    <div className='bottom-section'>
      <DummyDescription dummy={props.dummy} />
      <DummyController 
        onSpin={slotMachine.onSpin} 
        disabledOnSpin={slotMachine.isSpinning || slotMachine.enableDummyContents.length <= 1} 
      />
    </div>
    <BottomDrawer open={open} onOpen={handleOpen} onClose={handleClose}>
      <DummyContentListDrawer 
        open={open} 
        dummyContents={props.dummy.contents} 
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

  .dummy-contnet-box {
    width: 100%;

    .MuiCardActionArea-root {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 10px;
      box-sizing: border-box;
      border-radius: 15px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
`;