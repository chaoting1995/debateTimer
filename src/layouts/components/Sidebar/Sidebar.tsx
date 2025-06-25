import React from 'react';
import { css, cx } from '@emotion/css';
import { SwipeableDrawer } from '@mui/material';

import basicStyle from 'styles/basic.style';
import { styleSettingColor, styleSettingHeight, styleSettingZIndex } from 'styles/variables.style';
import SidebarMenu from 'layouts/components/Sidebar/components/SidebarMenu/SidebarMenu';
import menu from 'layouts/components/Sidebar/menu';

type Props = {
  className?: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const Sidebar = (props: Props) => {
  return (
    <SwipeableDrawer
      className={cx('DT-Sidebar', style, props.className)}
      anchor='right'
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}>
      <SidebarMenu list={menu} onClose={props.onClose} />
    </SwipeableDrawer>
  );
};

export default Sidebar;
const style = css`
  &.MuiDrawer-root {
    z-index: ${styleSettingZIndex.sidebar};
  }

  .MuiPaper-root {
    width: 80%;
    max-width: 300px;
    margin-top: ${styleSettingHeight.header};
  }

  .title {
    color: ${styleSettingColor.disabled};
    font-size: 14px;
    padding: 16px 16px 0;
    box-sizing: border-box;
  }

  ${basicStyle}
`;
