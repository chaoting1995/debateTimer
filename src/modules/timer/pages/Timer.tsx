import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { pageLinks } from 'routes/route.constants';
import Layout from 'layouts/Layout';
import { DEFAULT_TIMER } from 'modules/timer/resources/timer.constant';
import { Timer as TypeTimer } from 'modules/timer/resources/timer.type';
import TimerModeNormal from 'modules/timer/components/TimerModeNormal';
import TimerModeCrossfire from 'modules/timer/components/TimerModeCrossfire';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import useInnerHeight from 'hooks/useInnerHeight';
import { HeadTags } from 'components';
import { PAGE_TITLE, PAGE_DESCRIPTION } from "routes/route.constants";
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import { useTimers } from 'modules/timer';

const Timer: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const { list: timers, getItem: getTimerItem } = useTimers();
  const [timer, setTimer] = React.useState<TypeTimer>(timers.length === 0 ? DEFAULT_TIMER : timers[0]);

  const creator: Record<EnumTimerMode, React.ReactNode> = {
    [EnumTimerMode.Normal]: <TimerModeNormal timer={timer} className='timer-mode' />,
    [EnumTimerMode.Crossfire]: <TimerModeCrossfire timer={timer} className='timer-mode' />
  }

  const trakingHeaderButtonToList = () => {
    ServiceGA4.event(GA_EVENT.Header_Button_Timers);
  };

  React.useEffect(() => {
    if (!id) return;
    const _timer = getTimerItem(id);
    if (!_timer) return;
    setTimer(_timer);
  }, [id, timers, getTimerItem]);

  return <Layout 
    title={PAGE_TITLE.timer} 
    mainClassName={cx('DT-Timer', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.timers} onClick={trakingHeaderButtonToList}>
        <FileText size={28} weight="light"/>
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.timerWithVersion} description={PAGE_DESCRIPTION.timer}/>
    {creator[timer.mode]}
  </Layout>;
};

export default Timer;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.primary};

  .timer-mode {
    padding: 20px 0;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;