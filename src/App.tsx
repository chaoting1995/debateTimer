import React from 'react';
import { useRoutes, useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import routes from 'routes';
import PageLoading from 'pages/PageLoading';
import TimersProvider from 'modules/timer/context/Timers/Timers.provider';
import TopicProvider from 'modules/topic/context/Topic/Topic.provider';
import DummysProvider from 'modules/dummy/context/Dummys/Dummys.provider';
// import OfflineHandle from 'components/OfflineHandle';
import ServiceGA4 from 'modules/ga4/services/ga4.service';
import { HelmetProvider } from 'react-helmet-async';
import { theme } from 'styles/muiTheme';
import { isDev } from 'modules/env/env';
import UtilAudio from 'utils/audio';
import PopupProvider from 'context/Popup/Popup.provider';

function App() {
  const [searchParams] = useSearchParams();

  if (!isDev && !searchParams.get('avoidGA')) ServiceGA4.init();
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };

  const element = useRoutes(routes);

  React.useEffect(() => {
    return () => {
      UtilAudio.cleanupAudio();
    }
  }, [])

  return (<>
      <React.Suspense fallback={<PageLoading />}>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <PopupProvider>
              <TopicProvider>
                <TimersProvider>
                  <DummysProvider>
                    {element}
                  </DummysProvider>
                </TimersProvider>
              </TopicProvider>
            </PopupProvider>
          </ThemeProvider>
        </HelmetProvider>
      </React.Suspense>
      {/* <OfflineHandle /> */}
  </>
  );
}

export default App;