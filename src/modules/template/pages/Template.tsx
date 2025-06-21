import React from 'react'
import { css, cx } from '@emotion/css';

import { styleSettingColor } from 'styles/variables.style';
import { PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';

const Template: React.FC = () => {

  return <Layout title={PAGE_TITLE.timer} mainClassName={cx('DT-Template', style)}>
    <HeadTags title={PAGE_TITLE.timer} description={PAGE_DESCRIPTION.timer} />
  </Layout>;
}

export default Template;

const style = css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.secondary};
`;