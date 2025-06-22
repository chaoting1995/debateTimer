import React from 'react';
import { css, cx } from '@emotion/css';
import { Play, Pause, CallBell, ArrowCounterClockwise } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import { CircleButton } from 'components';
import UtilAudio from 'utils/audio';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

const TimerController = (props: Props) => {
  const onTrigger = () => {
    if (props.isRunning) {
      props.onPause();
    } else {
      props.onStart();
      ServiceGA4.event(GA_EVENT.Timer_Button_Play);
    }
  };

  const onResetWithPuase = () => {
    props.onReset();
  };

  return <div className={cx('DT-TimerController', props.className, style)}>
    <CircleButton onClick={onTrigger}>
      {props.isRunning 
        ? <Pause size={40} weight='thin'/> 
        : <Play size={40} weight='thin'/>
      }
    </CircleButton>
    <CircleButton onClick={onResetWithPuase}>
      <ArrowCounterClockwise size={40} weight='thin'/>
    </CircleButton>
    <CircleButton onClick={UtilAudio.audioBell}>
      <CallBell size={40} weight='thin'/>
    </CircleButton>
  </div>;
};

export default TimerController;

const style = css`
  display: flex;
  justify-content: center;
  gap: 20px;

  .MuiIconButton-root {
    height: 85px;
    width: 85px;
    min-width: 85px;
    border: 1px solid ${styleSettingColor.text.primary};
    color: ${styleSettingColor.text.primary};

    @media(max-width: 300px) {
      height: 65px;
      width: 65px;
      min-width: 65px;
    }
  }
`;

