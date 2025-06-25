import React from 'react'
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';

import { styleSettingColor } from 'styles/variables.style';
import { TEMPLATE_TIMERS } from 'modules/timer/resources/timer.constant';
import { Timer } from 'modules/timer/resources/timer.type';
import {Button, BottomDrawerHeader, BottomDrawerBody } from 'components';

type Props = {
  className?: string;
  onClose: () => void;
  onUseTemplateTimer: (timer: Timer) => void;
}

const TimerEditorSetting = (props: Props) => {
  const handleUseTemplateTimer = React.useCallback((timer: Timer) => () => {
    props.onUseTemplateTimer(timer);
    props.onClose();
  }, [props])

  return (
    <div className={cx('DT-TimerEditorSetting', style, props.className)}>
      <BottomDrawerHeader
        children='進階設定'
        rightSide={
          <IconButton onClick={props.onClose}>
            <XCircle size={28} weight='light' />
          </IconButton>
        }
      />
      <BottomDrawerBody paddingTop paddingHorizental>
        <div className="setting-title">使用模板</div>
        <div className='template-button-group'>
          {(JSON.parse(JSON.stringify(TEMPLATE_TIMERS)) as Timer[]).map((item) => (
            <Button key={item.name} variant='outlined' color="secondary" onClick={handleUseTemplateTimer(item)}>
              {item.name}
            </Button>
          ))}
        </div>
      </BottomDrawerBody>
    </div>
  )
}

export default TimerEditorSetting;

const style = css`    
  .setting-title {
    margin-bottom: 10px;
    font-size: 18px;
    color: ${styleSettingColor.background.dark};
  }
  
  .setting-subtitle {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${styleSettingColor.text.secondary};
  }
  
  .template-button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

