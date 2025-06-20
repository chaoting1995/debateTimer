import React from 'react';
import { css, cx } from '@emotion/css';

import { Dummy } from 'modules/dummy/resources/dummy.type';
import { DEFAULT_DUMMYS } from 'modules/dummy/resources/dummy.constant';
import useSlotMachine from 'modules/dummy/hooks/useSlotMachine';
import DummyDescription from 'modules/dummy/components/dummyDescription';
import DummyController from 'modules/dummy/components/dummyController';
type Props = {
  dummy: Dummy;
  className?: string;
};
const DummyModeNormal = (props: Props) => {
  const slotMachine = useSlotMachine(props.dummy.contents);

  return <div className={cx('DT-DummyModeNormal', style, props.className)}>
    <div>123</div>
    <div className='bottom-section'>
      <DummyDescription dummy={props.dummy} />
      <DummyController 
        onSpin={slotMachine.onSpin} 
        disabledOnSpin={slotMachine.isSpinning || slotMachine.enableDummyContents.length <= 1} 
      />
    </div>
  </div>;
};

export default DummyModeNormal;

const style = css`
  .bottom-section {
    width: 100%;
  }
`;