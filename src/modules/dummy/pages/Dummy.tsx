import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { PencilSimpleLine } from '@phosphor-icons/react';

import { DummyModeNormal } from "modules/dummy";
import { pageLinks } from 'routes/constants';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/constants';
import { Dummy as TypeDummy } from 'modules/dummy/resources/dummy.type';
import { DEFAULT_DUMMY } from 'modules/dummy/resources/dummy.constant';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import useDummys from "modules/dummy/context/Dummys/useDummys";

const Dummy: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();

  const { dummys } = useDummys();
  const [dummy, setDummy] = React.useState<TypeDummy>(dummys.length === 0 ? DEFAULT_DUMMY : dummys[0]);

  const handleTrakingHeaderButtonDummys = () => {
    // ServiceGA4.event(GA_EVENT.Header_Button_Dummys);
  };
  
  React.useEffect(() => {
    if (!id) return;
    const currentDummy = dummys.find(item => item.id === id);
    if (!currentDummy) return;
    console.log('currentDummy',currentDummy)
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
    <HeadTags title={PAGE_TITLE.dummy} description={PAGE_DESCRIPTION.dummy} />
    <DummyModeNormal dummy={dummy} className='dummy-mode' />
  </Layout>;
}

export default Dummy;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.primary};

  .dummy-mode {
    padding: 20px 0;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;