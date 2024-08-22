import React from "react";
import { css, cx } from "@emotion/css";

import { breakpoints, styleSettingColor, styleSettingHeight } from "styles/variables.style";
import useScrollHandler from "hooks/useScrollHandler";
import useInnerHeight from "hooks/useInnerHeight";

import Header from "layouts/components/Header";

type Props = {
  children?: React.ReactNode;
  mainClassName?: string;
  layoutClassName?: string;
};

const Layout = (props: Props) => {
  useScrollHandler();
  const [innerHeight] = useInnerHeight();

  return (
    <div className={cx("DD-Layout", style(innerHeight), props.layoutClassName)}>
      <Header />
      <main id="websiteTop" className={props.mainClassName}>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.light};
  color: ${styleSettingColor.text.primary};

  main {
    margin: 0 auto;
    width: 100%;
    max-width: ${breakpoints.sm};
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    width: 100%;
    background-color: ${styleSettingColor.background.default};
  }
`;