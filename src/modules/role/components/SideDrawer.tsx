import React from 'react';
import { css, cx } from '@emotion/css';

import { styleSettingColor } from 'styles/variables.style';
import { Button } from 'components';
import { EnumSide } from 'modules/role/enums/enumSide';
import { SidePicker, type EnumSideWithNull } from 'modules/role';
import UtilAudio from 'utils/audio';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
}

const SideDrawer = (props: Props) => {
  const [side, setSide] = React.useState<EnumSideWithNull>(null)
  
  const handleChangeSide = (_side: EnumSideWithNull) => {
    setSide(prevState => prevState === _side ? null : _side);
  };

  const handleDraw = () => {
    const sides = Object.values(EnumSide);
    const randomSide = sides[Math.floor(Math.random() * sides.length)];
    setSide(randomSide);
    UtilAudio.audioClick();
    ServiceGA4.event(GA_EVENT.SideDrawer_Button_Draw);
  };

  return (
    <div className={cx('DT-SideDrawer', props.className, style)}>
      <div className='side-picker-title'>持方</div>
      <SidePicker side={side} onChange={handleChangeSide} />
      {!side && <Button variant='outlined' onClick={handleDraw}>
        抽籤
      </Button>}
    </div>
  )
}

export default SideDrawer;

const style = css`
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: 1s;

  .side-picker-title {
    font-size: 20px;
    font-weight: bold;
  }

  .side-button-group {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 16px;
    
    &.selected-side-button-group {
      gap: unset;
    }
  }

  .MuiCardActionArea-root {
    background-color: rgba(217, 217, 217, 0.26);
    border: 1px solid #D9D9D9;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 50%;
    opacity: 1;
    transition: opacity 0.5s ease, width 0.5s ease;

    &.selected-side,
    &.selected-side:hover {
      background-color: unset;
      border: unset;
    }

    &.hide-card {
      width: 0;
      opacity: 0;
      padding: 0;

      .side-text {
        display: none;
      }
    }

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    .side-text {
      color: ${styleSettingColor.text.secondary};
      font-size: 18px;
    }
  }
`;
