import React from "react";
import { css, cx } from "@emotion/css";
import { PuffLoader } from "react-spinners";

import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string;
};

const Loading = (props: Props) => {
  return <div className={cx("DD-Loading", style, props.className)}>
    <PuffLoader color={styleSettingColor.background.dark} />
  </div>;
};

export default Loading;

const style = css`
  min-height: inherit;
  width: 100%;
  margin: auto; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

