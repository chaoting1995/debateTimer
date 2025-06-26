import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';

import { Button } from 'components';

enum EnumMode {
  Add = 'add',
  Empty = 'empty',
  Error = 'error',
}

type Props = {
  className?: string;
  label: string;
  mode?: 'add' | 'empty' | 'error';
  pageLink?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const ListEmptyBox = (props: Props) => {

const descriptionLabel: Record<EnumMode, string> = {
  [EnumMode.Add]: `尚無${props.label}`,
  [EnumMode.Empty]: `尚無${props.label}`,
  [EnumMode.Error]: `網址錯誤`,
}

const buttonLabel: Record<EnumMode, string> = {
  [EnumMode.Add]: `新增${props.label}`,
  [EnumMode.Empty]: `前往${props.label}列表`,
  [EnumMode.Error]: `前往${props.label}列表`,
}

  if (props.children) {
    return <div className={cx('DT-ListEmptyBox', style, props.className)}>
      <div>{descriptionLabel[!props.mode ? EnumMode.Add : props.mode]}</div>
      {props.children}
    </div>
  }

  return <div className={cx('DT-ListEmptyBox', style, props.className)}>
    <div>{descriptionLabel[!props.mode ? EnumMode.Add : props.mode]}</div>
    {props.pageLink && 
      <Button variant='outlined' color="inherit" component={Link} to={props.pageLink}>
        {buttonLabel[!props.mode ? EnumMode.Add : props.mode]}
      </Button>}
    {props.onClick &&
      <Button variant='outlined' color="inherit" onClick={props.onClick}>
        {buttonLabel[!props.mode ? EnumMode.Add : props.mode]}
      </Button>}
  </div>
};

export default ListEmptyBox;

const style = css`
  padding: 8px 16px;
  padding-top: 40px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;

  .MuiButtonBase-root {
    margin-top: 10px;
    font-size: 18px;
  }
`;