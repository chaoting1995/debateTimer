import React from 'react';
import { css, cx } from '@emotion/css';

import { styleSettingColor } from 'styles/variables.style';
import { Walle } from 'modules/walle/resources/walle.type';

type Props = {
  walle: Walle;
  children?: React.ReactNode;
};

const WalleDescription = (props: Props) => {

  return <div className={cx('DT-WalleDescription', style)}>
    <div className='info-name'>{props.walle.name}</div>
    {props.children}
  </div>;
};

export default WalleDescription;

const style = css`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  background-color: ${styleSettingColor.background.light};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 18px;

  .info-name {
    font-size: 24px;
    font-weight: bold;
    white-space: pre-line;
  }
`;