import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Timer as TypeTimer } from 'modules/timer/resources/timer.type';
import { DEFAULT_TIMER, TIMER_LABEL } from 'modules/timer/resources/timer.constant';
import { TimerModeNormal, TimerModeCrossfire } from 'modules/timer';
import { EnumTimerMode } from 'modules/timer/enums/enumTimerMode';
import { HeadTags, ListEmptyBox } from 'components';
import { useTimers } from 'modules/timer';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

const Timer: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const timersProvider = useTimers();
  // list 有資料，則預設顯示第一個；無資料，則預設顯示預設值
  const [timer, setTimer] = React.useState<TypeTimer>(DEFAULT_TIMER);

  const creator: Record<EnumTimerMode, React.ReactNode> = {
    [EnumTimerMode.Normal]: <TimerModeNormal className='timer-mode' timer={timer} />,
    [EnumTimerMode.Crossfire]: <TimerModeCrossfire className='timer-mode' timer={timer} />
  }

  const trackingHeaderButtonToList = () => ServiceGA4.event(GA_EVENT.Header_Button_To_Timers);

  React.useEffect(() => {
    const _timer = !id ? timersProvider.list[0] : timersProvider.getItem(id);
    if (!_timer) return;
    setTimer(_timer);
  }, [id, timersProvider]);

  return <Layout 
    title={PAGE_TITLE.timer} 
    mainClassName={cx('DT-Timer', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.timers} onClick={trackingHeaderButtonToList}>
        <FileText size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.timerWithVersion} description={PAGE_DESCRIPTION.timer} />
    {timersProvider.list.length === 0  ? (
      <ListEmptyBox label={TIMER_LABEL} mode='empty' pageLink={pageLinks.timers} onTrack={trackingHeaderButtonToList} />
    ) : id && !timer.id ? (
      <ListEmptyBox label={TIMER_LABEL} mode='error' pageLink={pageLinks.timers} onTrack={trackingHeaderButtonToList} />
    ) : (
      creator[timer.mode]
    )}
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