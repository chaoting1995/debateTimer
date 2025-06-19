import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { PencilSimpleLine } from '@phosphor-icons/react';

import DummyDescription from 'modules/dummy/components/dummyDescription';
import { pageLinks } from 'routes/constants';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/constants';
import { Dummy as TypeDummy } from 'modules/dummy/resources/dummy.type';
import { DummyController }  from 'modules/dummy';
import { DEFAULT_DUMMY, DEFAULT_DUMMYS } from 'modules/dummy/resources/dummy.constant';
import useSlotMachine from 'modules/dummy/hooks/useSlotMachine';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import useDummys from "modules/dummy/context/Dummys/useDummys";

const Dummy: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const slotMachine = useSlotMachine(DEFAULT_DUMMYS);

  const { dummys } = useDummys();
  const [dummy, setDummy] = React.useState<TypeDummy>(DEFAULT_DUMMY);
  // const [dummy, setDummy] = React.useState<TypeDummy>(dummys.length === 0 ? DEFAULT_DUMMY : dummys[0]);

  const handleTrakingHeaderButtonDummys = () => {
    // ServiceGA4.event(GA_EVENT.Header_Button_Dummys);
  };
  
  React.useEffect(() => {
    if (!id) return;
    const currentDummy = dummys.find(item => item.id === id);
    if (!currentDummy) return;
    setDummy(currentDummy);
  }, [id, dummys]);

  return <Layout 
    title={PAGE_TITLE.dummy} 
    mainClassName={cx('DT-Dummy', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.dummys} onClick={handleTrakingHeaderButtonDummys}>
        <PencilSimpleLine size={28} weight="light"/>
      </IconButton>
    }>
    <DummyDescription dummy={dummy} />
    <DummyController 
      onSpin={slotMachine.onSpin} 
      disabledOnSpin={slotMachine.isSpinning || slotMachine.enableDummys.length <= 1} 
    />
    <HeadTags title={PAGE_TITLE.dummy} description={PAGE_DESCRIPTION.dummy} />
  </Layout>;
}

export default Dummy;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.secondary};

  min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
`;