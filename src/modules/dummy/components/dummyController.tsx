import React from 'react';
import { css, cx } from '@emotion/css';
import { 
  ArrowsClockwise, 
 } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import { CircleButton } from 'components';
import UtilAudio from 'utils/audio';
// import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  onSpin: () => void;
  disabledOnSpin?: boolean;
};

const DummyController = (props: Props) => {
  const handleSpin = () => {
    props.onSpin();
    UtilAudio.audioRolling();
    // ServiceGA4.event(GA_EVENT.DummyCreator_Button_SpinDummy);
  };

  return (
    <div className={cx('DT-DummyController', props.className, style)}>
      <CircleButton onClick={handleSpin} disabled={props.disabledOnSpin}>
        <ArrowsClockwise size={40} weight="thin"/>
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
