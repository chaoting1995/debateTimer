import { useNavigate } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import TestTag from 'components/TestTag';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';
import { pageLinks } from 'routes/route.constants';

export type SidebarMenuItem = {
  label: string;
  path?: string,
  link?: string,
  isBlank?: boolean,
  icon: JSX.Element;
};

type Props = {
  className?: string;
  list: Array<SidebarMenuItem>;
  onClose?: () => void;
};

const SidebarMenu = (props: Props) => {
  const navigate = useNavigate();
  const redirectWithAnchor = (link: string, target: string = '_self') => {
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = target;
    anchor.click();
  };

  const trackingMenuItemToPage = (path: string) => {
    if (path === pageLinks.timer) {
      ServiceGA4.event(GA_EVENT.Menu_Item_To_Timer);
    }

    if (path === pageLinks.topicCreator) {
      ServiceGA4.event(GA_EVENT.Menu_Item_To_TopicCreator);
    }
  };

  const handleToPage = (path: string | undefined, link: string | undefined, isBlank: boolean | undefined) => () => {
    if (path) {
      trackingMenuItemToPage(path);
      navigate(path);
    }

    if (link) {
      if(!isBlank) {
        redirectWithAnchor(link)
      } else {
        redirectWithAnchor(link, '_blank');
      }
    }

    if (props.onClose) props.onClose();
  };

  return (
    <List className={cx('SidebarMenu', style, props.className)}>
      {props.list.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton onClick={handleToPage(item.path, item.link, item.isBlank)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem className='version-info'>v{process.env.VERSION} <TestTag /></ListItem>
    </List>
  );
};

const style = css`
  &.MuiList-root {
    padding-top: 0;
    padding-bottom: 0;
    height: 100%;
  }

  .version-info,
  .MuiButtonBase-root {
    padding: 14px 24px;
    box-sizing: border-box;
  }

  .MuiListItemIcon-root {
    font-size: 20px;
    min-width: 30px;
    color: ${styleSettingColor.text.secondary}
  }

  .MuiTypography-root {
    font-size: 20px;
  }

  .version-info {
    color: ${styleSettingColor.text.gray};
    position: absolute;
    bottom: ${styleSettingHeight.header};
  }
`;

export default SidebarMenu;