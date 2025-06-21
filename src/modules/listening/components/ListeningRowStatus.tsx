import React from 'react'
import { css, cx } from '@emotion/css';

import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { styleSettingColor } from 'styles/variables.style';

type Prpos = {
  className?: string;
  status: EnumArgumentStatus;
  children?: React.ReactNode;
}

const ListeningRowStatus: React.FC<Prpos> = (props) => {

  return <div className={cx('DT-ListeningRowStatus', style, props.className, props.status)}>
    {props.children}
  </div>;
}

export default ListeningRowStatus;

const style = css`
  width: fit-content;
  padding: 1px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  white-space: nowrap;

  &.${EnumArgumentStatus.Unselected} {
    color:  ${styleSettingColor.text.gray};
  }

  &.${EnumArgumentStatus.HP100} {
    background-color: #CEEAB4;
    color: #24754D;
  }

  &.${EnumArgumentStatus.HP90} {
    background-color: #FFC1A0;
    color: #4F4028;
  }

  &.${EnumArgumentStatus.HP10} {
    background-color: #FFE196;
    color: #8E5326;
  }
  
  &.${EnumArgumentStatus.HP0Disassembly},
  &.${EnumArgumentStatus.HP0Obfuscation},
  &.${EnumArgumentStatus.HP0InitFail} {
    background-color: #FFC8C2;
    color: #B52221;
  }
  
  &.${EnumArgumentStatus.Lose},
  &.${EnumArgumentStatus.Other},
  &.${EnumArgumentStatus.Unknown} {
    background-color: #D4D4D4;
    color: #5E5E5E;
  }
`;