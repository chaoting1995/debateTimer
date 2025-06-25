import React from 'react';
import { css, cx } from '@emotion/css';

import useInnerHeight from 'hooks/useInnerHeight';
import ImgMaintenance from 'assets/img-maintenance.svg?react';

import basicStyle from 'styles/basic.style';
import { styleSettingColor } from 'styles/variables.style';
import { styleContainerSection } from 'styles/page.style';

const Maintenance = () => {
  const [innerHeight] = useInnerHeight();

  return (
    <div className={cx('DT-Maintenance', style(innerHeight))}>
      <main>
        <h1>We are</h1>
        <h2>Under Maintenance</h2>
        <div className='dd-divider' />
        <div className='info-box'>
          <p>⚒️ DefiDolly is temporarily under maintenance</p>
          <p>❤️ Dear DefiDolly Community! We apologize for the inconvenience but a bit of time is needed to fix some issues!</p>
          <p>We'll return soon! We ask for your support and patience until the issues are being resolved fully.</p>
          <p>Contact us:&nbsp;
            <a href='mailto:info@defidolly.org'>
              info@defidolly.org
            </a>
          </p>
        </div>
        <div className='img-box'>
          <ImgMaintenance />
        </div>
      </main>
    </div>
  );
};

export default Maintenance;

const style = (_innerHeight: number) => css`
  ${basicStyle}
 
  height: ${_innerHeight}px;
  background-color: ${styleSettingColor.gray};
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    ${styleContainerSection}
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  
  h1 {
    margin-top: 0;
    margin-bottom: 10px;
    color: ${styleSettingColor.disabled};
    font-size: 60px;
    font-weight: 500;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: ${styleSettingColor.text.primary};
    font-size: 36px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    color: ${styleSettingColor.text.secondary};
  }

  a {
    text-decoration: underline;
  }

  .dd-divider {
    height: 1px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .info-box {
    margin-bottom: 20px;
  }

  .img-box {
    margin-bottom: 20px;
    width: 154px;
    height: 200px;

    & > svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;