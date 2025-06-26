import React from 'react';
import { css, cx } from '@emotion/css';
import { ArrowsClockwise, MaskHappy } from '@phosphor-icons/react';

import { CircleButton, Dialog } from 'components';
import { styleSettingColor } from 'styles/variables.style';
import UtilAudio from 'utils/audio';
import useDialog from 'hooks/useDialog';
import { RolePicker } from 'modules/role';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  onSpin: () => void;
  disabledOnSpin?: boolean;
};

const WalleController = (props: Props) => {
  const [open, handleOpen, handleClose] = useDialog(false);

  const handleSpin = () => {
    props.onSpin();
    UtilAudio.audioRolling();
    ServiceGA4.event(GA_EVENT.Dummy_Button_Spin_DummyContent);
  };

  return (
    <div className={cx('DT-WalleController', props.className, style)}>
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

export default WalleController;

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
