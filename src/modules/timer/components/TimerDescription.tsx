import React from 'react';
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { styleSettingColor } from 'styles/variables.style';
import { Timer } from 'modules/timer/resources/timer.type';

dayjs.extend(duration);

type Props = {
  timer: Timer;
};

const TimerDescription = (props: Props) => {
  const formatSeconds = (seconds: number): string => {
    const durationValue = dayjs.duration(seconds, 'seconds');

    if (seconds >= 3600) {
      return durationValue.format('H時m分s秒');
    }

    if (seconds >= 60) {
      const minutePart = durationValue.minutes();
      const secondPart = durationValue.seconds();
      return secondPart === 0
        ? `${minutePart}分`
        : durationValue.format('m分s秒');
    }

    return durationValue.format('s秒');
  };

  return <div className={cx('DT-TimerDescription', style)}>
    <div className='info-name'>{props.timer.name}</div>
    <div>
      {props.timer.ring.map((item, index) => <div key={index} className='info-ring-time'>
        <div>第{index + 1}次鈴響：</div>
        <div>{formatSeconds(item)}</div>
      </div>
      )}
    </div>
  </div>;
};

export default TimerDescription;

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
