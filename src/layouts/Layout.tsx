import React from 'react';
import { css, cx } from '@emotion/css';

import { breakpoints, styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import useScrollHandler from 'hooks/useScrollHandler';
import useInnerHeight from 'hooks/useInnerHeight';
import Header from 'layouts/components/Header';

type Props = {
  children?: React.ReactNode;
  mainClassName?: string;
  layoutClassName?: string;
  title?: string;
  homeLink?: string; 
  renderButtons?: React.ReactNode;
};

const Layout = (props: Props) => {
  useScrollHandler();
  const [innerHeight] = useInnerHeight();

  return (
    <div className={cx('DT-Layout', style(innerHeight), props.layoutClassName)}>
      <Header renderButtons={props.renderButtons} title={props.title} homeLink={props.homeLink}/>
      <main id='websiteTop' className={props.mainClassName}>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.light}ee;
  
  main {
    margin: 0 auto;
    width: 100%;
    max-width: ${breakpoints.sm};
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    width: 100%;
  }
`;