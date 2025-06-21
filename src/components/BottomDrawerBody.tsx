import React from "react";
import { css, cx } from "@emotion/css";

import useInnerHeight from 'hooks/useInnerHeight';
import { styleSettingColor } from "styles/variables.style";

type Props = {
  className?: string;
  children: React.ReactNode;
  gap?: boolean;
  center?: boolean;
  paddingHorizental?: boolean;
  paddingTop?: boolean;
};

const BottomDrawerBody = (props: Props) => {
  const [innerHeight] = useInnerHeight();

  return (
    <div className={cx(
      'DT-BottomDrawerBody', 
      style(innerHeight), 
      props.className,
      { 
        'gap': props.gap,
        'center': props.center,
        'padding-horizental': props.paddingHorizental,
        'padding-top': props.paddingTop,
      }
    )}>
      {props.children}
    </div>
  );
};

export default BottomDrawerBody;

const style = (_innerHeight: number) => css`
  width: 100%;
  max-height: calc(${_innerHeight}px * 0.9 - 32px - 32px);
  overflow-y: auto;
  padding-bottom: 32px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;

  font-size: 18px;
  color: ${styleSettingColor.text.secondary};
  
  &.gap {
    gap: 5px;
  }
  
  &.center {
    align-items: center;
  }

  &.padding-horizental {
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
  }

  &.padding-top {
    padding-top: 16px;
    box-sizing: border-box;
  }

  .MuiButton-root,
  .MuiButton-root:hover {
    font-size: 18px;
    font-weight: normal;
  }
`;