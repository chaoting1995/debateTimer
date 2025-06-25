import React from 'react';
import { cx, css } from '@emotion/css';
import { Button } from '@mui/material';

import ImgError from 'assets/img-error.svg?react';
import { styleSettingColor } from 'styles/variables.style';

type PropsComponentErrorMessage = {
  className?: string;
  title?: string;
  message?: string;
  disabled?: boolean;
  onRetry?: React.MouseEventHandler<HTMLButtonElement>;
  buttonRetryLabel?: string;
  renderButton?: () => JSX.Element;
};

const ErrorMessage = (props: PropsComponentErrorMessage) => {

  return <div className={cx('DT-ErrorMessage', style, props.className)}>
    <div className='dd-error-message-img-box'>
      <ImgError />
    </div>
    <div className='dd-error-message-info-box'>
      {props.title &&
        <div className='dd-error-message-title'>
          {props.title}
        </div>}
      {props.message &&
        <div className='dd-error-message-description'>
          {props.message}
        </div>}
    </div>
    <div className='dd-error-message-button-box'>
      {props.onRetry &&
        <Button variant='contained' disabled={props.disabled} onClick={props.onRetry} >
          {props.buttonRetryLabel || 'Retry'}
        </Button>}
      {props.renderButton && props.renderButton()}
    </div>
  </div>;
};

export default ErrorMessage;

const style = css`
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .dd-error-message-img-box {
    margin-bottom: 8px;
    width: 200px;
    height: 200px;

    & > svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      -webkit-filter: grayscale(75%);
      filter: grayscale(75%);
    }
  }

  .dd-error-message-info-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .dd-error-message-title {
      margin-bottom: 10px;
      color: ${styleSettingColor.text.primary};
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
    }

    .dd-error-message-description {
      margin-bottom: 10px;
      color: ${styleSettingColor.text.secondary};
      font-size: 14px;
      text-align: center; 
    }
  }

  .dd-error-message-button-box {
    button, a {
      text-transform: none;
    }
  }
`;