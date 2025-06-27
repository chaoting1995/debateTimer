import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { List, X } from '@phosphor-icons/react';

import useDialog from 'hooks/useDialog';
import useTop from 'hooks/useTop';
import Logo from 'assets/logo.svg?react';
import { breakpoints, styleSettingColor, styleSettingHeight, styleSettingZIndex } from 'styles/variables.style';
import Sidebar from 'layouts/components/Sidebar/Sidebar';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
// import SidebarMenu from 'layouts/components/Sidebar/components/SidebarMenu/SidebarMenu';
// import menu from 'layouts/components/Sidebar/menu';

type Props = {
  renderButtons?: React.ReactNode;
  title?: React.ReactNode;
  homeLink?: string;
};

const Header = (props: Props) => {
  const [isTop] = useTop();
  const [openDrawer, handleOpenDrawer, handleCloseDrawer, handleToggleDrawer] = useDialog(false);

  const handleToggleDrawerWithTrakingHeaderButtonMenu = () => {
    handleToggleDrawer();
    ServiceGA4.event(GA_EVENT.Header_Button_Menu);
  };

  return (
    <header className={cx('DT-Header', style(isTop))}>
      <div className='header-fixed'>
        <div className='header-container'>
          <div className='header-to-home'>
            {!props.homeLink ? (
              <div className='header-logo'><Logo /></div>
            ) : (
              <Link className='header-logo' to={props.homeLink}><Logo /></Link>
            )}
            <h1 className='header-title'>{props.title}</h1>
          </div>
          <div className='header-button-group'>
            {/* <SidebarMenu className='header-menu' list={menu} /> */}
            {props.renderButtons && props.renderButtons}
            <IconButton className='header-menu-button' title='menu' onClick={handleToggleDrawerWithTrakingHeaderButtonMenu}>
              {openDrawer ? <X size={28} weight='light'/> : <List size={28} weight='light'/>}
            </IconButton>
          </div>
        </div>
      </div>
      <Sidebar open={openDrawer} onOpen={handleOpenDrawer} onClose={handleCloseDrawer} />
    </header>
  );
};

export default Header;

const style = (_isTop: boolean) => css`
  position: relative;
  height: ${styleSettingHeight.header};
  width: 100%;
  background-color: ${styleSettingColor.background.dark};
  color: ${styleSettingColor.text.primary};

  .header-fixed {
    position: fixed;
    top: 0px;
    z-index: ${styleSettingZIndex.header};
    width: 100%;
    height: ${styleSettingHeight.header};
    background-color: ${styleSettingColor.background.dark};
    transition: 0.5s;
    box-shadow: ${_isTop
    ? 'unset'
    : '0 2.8px 2.2px 0 rgb(178 183 219 / 1%), 0 6.7px 5.3px 0 rgb(178 183 219 / 2%), 0 12.5px 10px 0 rgb(178 183 219 / 3%), 0 22.3px 17.9px 0 rgb(178 183 219 / 3%),0 41.8px 33.4px 0 rgb(178 183 219 / 4%), 0 100px 80px 0 rgb(178 183 219 / 5%)'};

    .header-container {
      margin: 0 auto;
      padding: 9px 16px;
      box-sizing: border-box;
      width: 100%;
      max-width: ${breakpoints.sm};
      height: 100%;
      display: flex;
      /* flex-wrap: wrap; */
      align-items: center;

      .header-to-home {
        margin-right: auto; 
        display: flex;
        justify-content: center;
        align-items: center;
        
        & > * {
          width: fit-content;
        }

        .header-logo {
          margin-right: 5px;
          display: inline-block;
          width: 30px;
          height: 30px;
    
          svg {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }
        }
        
        .header-title {
          margin: 0;
          font-size: 22px;
          font-weight: normal;
        }
      }

      .header-button-group {
        display: flex;
        align-items: center;
        gap: 5px;

        .MuiIconButton-root {
          color: ${styleSettingColor.text.primary};
        }
      }

      .header-menu {
        margin-left: auto;
        display: flex;

        @media(max-width: ${breakpoints.md}) {
          display: none;
        }

        .MuiButtonBase-root {
          padding: 0 8px;
          box-sizing: border-box;
        }

        .MuiListItemIcon-root {
          font-size: 16px;
          min-width: 23px;
          color: ${styleSettingColor.text.primary};
        }

        .MuiTypography-root {
          font-size: 16px;
        }
      }

      .header-to-timers {
        margin-left: 8px;
      }
    }
  }
`;