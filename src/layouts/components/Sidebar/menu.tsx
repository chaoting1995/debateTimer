import { Timer, ChatsCircle, BoxingGlove } from '@phosphor-icons/react';

import { pageLinks, PAGE_TITLE } from 'routes/route.constants';
import { SidebarMenuItem } from 'layouts/components/Sidebar/components/SidebarMenu/SidebarMenu';

const menu: Array<SidebarMenuItem> = [
  {
    label: PAGE_TITLE.timer,
    path: pageLinks.timer,
    icon: <Timer />,
  },
  {
    label: PAGE_TITLE.dummy,
    path: pageLinks.dummy,
    icon: <BoxingGlove />,
  },
  {
    label: PAGE_TITLE.walle,
    path: pageLinks.walle,
    icon: <ChatsCircle />,
  },
];

export default menu;
