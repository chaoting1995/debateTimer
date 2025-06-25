import ReactGA from 'react-ga4';
import env from 'modules/env/env';

import ga4EventConfig from 'modules/ga4/ga4EventConfig.generate';

export const init = () => {
  return ReactGA.initialize(env.evaluationID);
};

// custom pageview with the location from react router
export const pageView = (path: string) => {
  return ReactGA.send({ hitType: 'pageview', page: path });
};

type Param = {
  category: string;
  action: string;
  label: string;
};

// custom event with label being an optional parameter
export const event = (param: Param) => ReactGA.event(
  param.label,
  {
  category: param.category,
  action: param.action,
  label: param.label,
  params: {
    header_type: param.category,
    button_name: param.label
  }
});

type GA4EventConfigKeys = keyof typeof ga4EventConfig;
export const GA_EVENT: Record<GA4EventConfigKeys, Param> = ga4EventConfig;
// demo: ServiceGA4.event(GA_EVENT.Clint_UserNftList_Click);

const ServiceGA4 = {
  init,
  pageView,
  event,
  GA_EVENT
};

export default ServiceGA4;