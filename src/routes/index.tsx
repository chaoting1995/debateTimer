import React from 'react';
import { Navigate , RouteObject } from 'react-router-dom';

import { PAGE_LINK } from 'routes/route.constants';
import NotFound from 'pages/NotFound';
import { Timers, Timer } from 'modules/timer';
import { TopicCreator } from 'modules/topic';
import { Listening, Listenings } from 'modules/listening';
import { Dummys, Dummy } from 'modules/dummy';
// import Maintenance = from /'pages/Maintenance/Maintenance';

const routes: Array<RouteObject> = [
  {
    index: true,
    element: <Navigate to={PAGE_LINK.timer} replace />
  },
  {
    path: '',
    element: <Timer />,
  },
  {
    path: PAGE_LINK.timer,
    element: <Timer />,
  },
  {
    path: PAGE_LINK.timerID,
    element: <Timer />,
  },
  {
    path: PAGE_LINK.timers,
    element: <Timers />,
  },
  {
    path: PAGE_LINK.topicCreator,
    element: <TopicCreator />,
  },
  {
    path: PAGE_LINK.listening,
    element: <Listening />,
  },
  {
    path: PAGE_LINK.listeningID,
    element: <Listening />,
  },
  {
    path: PAGE_LINK.listenings,
    element: <Listenings />,
  },
  {
    path: PAGE_LINK.dummy,
    element: <Dummy />,
  },
  {
    path: PAGE_LINK.dummyID,
    element: <Dummy />,
  },
  {
    path: PAGE_LINK.dummys,
    element: <Dummys />,
  },
  // {
  //   path: '',
  //   element: <Maintenance />,
  // },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;