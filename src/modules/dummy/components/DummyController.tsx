import React from 'react';
import { css, cx } from '@emotion/css';
import { ArrowsClockwise, UserMinus, UserSound } from '@phosphor-icons/react';

import { CircleButton } from 'components';
import { styleSettingColor } from 'styles/variables.style';
import { DummyContent } from "modules/dummy/resources/dummy.type";
import UtilAudio from 'utils/audio';
import ServiceUtil from "services/util.service";
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  isSpeech: boolean;
  onToggleMuteSpeech: () => void;
  onSpin: (isSpeech: boolean) => DummyContent | undefined;
  disabledOnSpin?: boolean;
};

const DummyController = (props: Props) => {
  
  const handleSpin = React.useCallback(() => {
    UtilAudio.audioRolling();
    const chosenDummyContent = props.onSpin(props.isSpeech);
    if (chosenDummyContent && props.isSpeech) ServiceUtil.speakText(chosenDummyContent.content);
    ServiceGA4.event(GA_EVENT.Dummy_Button_Spin_DummyContent);
  },[props]);

  const handleToggleMuteSpeech = React.useCallback(() => () => {
    props.onToggleMuteSpeech();
  }, [props]);
  

  return (
    <div className={cx('DT-DummyController', props.className, style)}>
      <CircleButton onClick={handleSpin} disabled={props.disabledOnSpin}>
        <ArrowsClockwise size={40} weight='thin'/>
      </CircleButton>
      <CircleButton onClick={handleToggleMuteSpeech()}>
        {props.isSpeech 
          ? <UserSound size={40} weight='thin'/> 
          : <UserMinus size={40} weight='thin'/>
        }
      </CircleButton>
    </div>
  );
};

export default DummyController;

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
