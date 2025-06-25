import React from 'react'
import { css, cx } from '@emotion/css';
import { CardActionArea } from '@mui/material';

import { styleSettingColor } from 'styles/variables.style';

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomizedCardActionArea: React.FC<Props> = (props) => {
  return (
    <CardActionArea 
      className={cx('DT-CardActionArea', style, props.className)} 
      disabled={props.disabled}
      onClick={props.onClick} 
    >
      {props.children}
    </CardActionArea>
  )
}

export default CustomizedCardActionArea;

const style = css`
  &.MuiCardActionArea-root {
    width: 100%;
    min-height: 64px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 15px;
    font-size: 30px;
    color: ${styleSettingColor.text.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    white-space: pre-line;

    &.Mui-disabled {
      opacity: 0.5, font 1;
    }
  }
`;