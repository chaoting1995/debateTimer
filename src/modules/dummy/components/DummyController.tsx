import React from 'react';
import { css, cx } from '@emotion/css';
import { ArrowsClockwise, UserMinus, UserSound } from '@phosphor-icons/react';

import { CircleButton } from 'components';
import { styleSettingColor } from 'styles/variables.style';

type Props = {
  className?: string;
  onSpin: () => void;
  disabledOnSpin?: boolean;
  isSpeech: boolean;
  onToggleMuteSpeech: () => void;
};

const DummyController = (props: Props) => {

  return (
    <div className={cx('DT-DummyController', props.className, style)}>
      <CircleButton onClick={props.onSpin} disabled={props.disabledOnSpin}>
        <ArrowsClockwise size={40} weight='thin'/>
      </CircleButton>
      <CircleButton onClick={props.onToggleMuteSpeech}>
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
