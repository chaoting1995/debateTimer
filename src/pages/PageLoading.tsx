import React from 'react';
import { css, cx } from '@emotion/css';
import { PuffLoader } from 'react-spinners';

import useInnerHeight from 'hooks/useInnerHeight';

import { styleSettingColor } from 'styles/variables.style';

const PageLoading = () => {
  const [innerHeight] = useInnerHeight();

  return <div className={cx('DT-PageLoading', style(innerHeight))}>
    <PuffLoader color={styleSettingColor.primary} />
  </div>;
};

export default PageLoading;

const style = (_innerHeight: number) => css`
  height: ${_innerHeight}px;
  background-color: ${styleSettingColor.gray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

