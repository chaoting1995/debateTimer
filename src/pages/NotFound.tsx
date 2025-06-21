import React from "react";
import { Link } from "react-router-dom";
import { css, cx } from "@emotion/css";
import { Button } from "@mui/material";

import useInnerHeight from "hooks/useInnerHeight";

import basicStyle from "styles/basic.style";
import { styleSettingColor } from "styles/variables.style";
import { styleContainerSection } from "styles/page.style";
import { pageLinks } from "routes/route.constants";

const NotFound = () => {
  const [innerHeight] = useInnerHeight();

  return <div className={cx("DD-NotFound", style(innerHeight))}>
    <main>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <div className="dd-divider" />
      <div className="info-box">
        <p>We could not find what you were looking for.</p>
        <p>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p>
      </div>
      <Button variant="outlined" component={Link} to={pageLinks.timer} >Back to home</Button>
    </main>
  </div>;
};

export default NotFound;

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
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: ${styleSettingColor.text.primary};
    font-size: 36px;
  }
  
  p {
    font-size: 14px;
    color: ${styleSettingColor.text.secondary};
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
    width: 150px;
    height: 150px;

    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      -webkit-filter: grayscale(75%);
      filter: grayscale(75%);
    }
  }
`;