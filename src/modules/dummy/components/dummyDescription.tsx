import React from 'react';
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { styleSettingColor } from 'styles/variables.style';
import { Dummy } from 'modules/dummy/resources/dummy.type';

dayjs.extend(duration);

type Props = {
  dummy: Dummy;
};

const DummyDescription = (props: Props) => {

  return <div className={cx('DT-DummyDescription', style)}>
    <div className='info-name'>{props.dummy.name}</div>
  </div>;
};

export default DummyDescription;

const style = css`
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: ${styleSettingColor.background.light};
  
  .info-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .info-ring-time {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
  }
`;