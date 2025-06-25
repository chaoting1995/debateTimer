import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { DummyModeNormal } from "modules/dummy";
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Dummy as TypeDummy } from 'modules/dummy/resources/dummy.type';
import { DEFAULT_DUMMY } from 'modules/dummy/resources/dummy.constant';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import useDummys from "modules/dummy/context/Dummys/useDummys";

const Dummy: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const dummysProvider = useDummys();
  // list 有資料，則預設顯示第一個；無資料，則預設顯示預設值
  const [dummy, setDummy] = React.useState<TypeDummy>(DEFAULT_DUMMY);

  React.useEffect(() => {
    if (id) return;
    if (dummysProvider.list.length === 0) return;
    setDummy(dummysProvider.list[0]);
  }, [id, dummysProvider.list]);

  React.useEffect(() => {
    if (!id) return;
    const _dummy = dummysProvider.getItem(id);
    if (!_dummy) return;
    setDummy(_dummy);
  }, [id, dummysProvider]);

  return <Layout 
    title={PAGE_TITLE.dummy} 
    mainClassName={cx('DT-Dummy', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.dummys}>
        <FileText size={28} weight="light"/>
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