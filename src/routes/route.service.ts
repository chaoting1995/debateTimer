import ServiceFormat from 'services/format.service';

export type PageParams = {
  [paramKey: string]: string | number;
};

const toPageLinkWithParams = (pageLink: string, params: PageParams) => {
  for (const key in params) {
    pageLink = pageLink.replace(`:${key}`, ServiceFormat.toString(params[key]));
  }

  return pageLink;
};

const ServiceRoute = {
  toPageLinkWithParams,
};

export default ServiceRoute;