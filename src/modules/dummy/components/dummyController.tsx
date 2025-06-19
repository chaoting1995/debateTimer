import React from 'react';
import { css, cx } from '@emotion/css';
import { 
  ArrowsClockwise, 
  MaskHappy,
  Circle,
  ChartPieSlice,
 } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import { CircleButton, Dialog } from 'components';
import UtilAudio from 'utils/audio';
import useDialog from 'hooks/useDialog';
import { RolePicker } from 'modules/role';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import useTopic from 'modules/topic/context/Topic/useTopic';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

const switchTopicMode:  Record<EnumTopicMode, EnumTopicMode> = {
  [EnumTopicMode.Complete]: EnumTopicMode.Combined,
  [EnumTopicMode.Combined]: EnumTopicMode.Complete
}

type Props = {
  className?: string;
  onSpin: () => void;
  disabledOnSpin?: boolean;
};

const TopicController = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);
  
  const { topicMode, onChangeTopicMode } = useTopic();
  const topicModeIconCreator: Record<EnumTopicMode, React.ReactNode> = {
    [EnumTopicMode.Combined]: <Circle size={40} weight="thin"/>,
    [EnumTopicMode.Complete]: <ChartPieSlice size={40} weight="thin"/>
  }

  const topicModeOnTracking: Record<EnumTopicMode, () => void> = {
    [EnumTopicMode.Combined]: () => ServiceGA4.event(GA_EVENT.TopicCreator_Button_TopicMode_Combined),
    [EnumTopicMode.Complete]: () => ServiceGA4.event(GA_EVENT.TopicCreator_Button_TopicMode_Complete)
  }

  const handleToggle = () => {
    onChangeTopicMode(switchTopicMode[topicMode]);
    topicModeOnTracking[switchTopicMode[topicMode]]();
    UtilAudio.audioClick();
  };

  const handleSpin = () => {
    props.onSpin();
    UtilAudio.audioRolling();
    ServiceGA4.event(GA_EVENT.TopicCreator_Button_SpinTopic);
  };

  return (
    <div className={cx('DT-TopicController', props.className, style)}>
      <CircleButton onClick={handleToggle}>
        {topicModeIconCreator[topicMode]}
      </CircleButton>
      <CircleButton onClick={handleSpin} disabled={props.disabledOnSpin}>
        <ArrowsClockwise size={40} weight="thin"/>
      </CircleButton>
      <CircleButton onClick={handleOpen}>
        <MaskHappy size={40} weight="thin"/>
      </CircleButton>
      {open && 
        <Dialog className={styleDialog} open={open} onClose={handleClose} hideCloseButton>
          <RolePicker />
        </Dialog>
      }
    </div>
  );
};

export default TopicController;

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

    &.Mui-disabled {
      color: ${styleSettingColor.text.primary};
      opacity: 0.5;
    }

    @media(max-width: 300px) {
      height: 65px;
      width: 65px;
      min-width: 65px;
    }
  }
`;

const styleDialog = css`
  .MuiPaper-root.MuiDialog-paper {
    min-width: 250px;
  }
`;
