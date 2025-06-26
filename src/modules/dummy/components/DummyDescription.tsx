import React from 'react';
import { css, cx } from '@emotion/css';

import { styleSettingColor } from 'styles/variables.style';
import { Dummy } from 'modules/dummy/resources/dummy.type';

type Props = {
  dummy: Dummy;
  children?: React.ReactNode;
};

const DummyDescription = (props: Props) => {

  return <div className={cx('DT-DummyDescription', style)}>
    <div className='info-name'>{props.dummy.name}</div>
    {props.children}
  </div>;
};

export default DummyDescription;

const style = css`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  background-color: ${styleSettingColor.background.light};
  
  .info-name {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    white-space: pre-line;
  }
`;