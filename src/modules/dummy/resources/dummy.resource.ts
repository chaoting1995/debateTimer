import { DEFAULT_DUMMYS, DT_LOCALSTORAGE_KEY_DUMMYS } from 'modules/dummy/resources/dummy.constant';
import FactoryDummy from 'modules/dummy/resources/dummy.factory';
import { Dummy } from 'modules/dummy/resources/dummy.type';

const getDummys = (): Dummy[] => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_DUMMYS);
  if (!jsonString) return DEFAULT_DUMMYS;
  return FactoryDummy.createDummys(JSON.parse(jsonString));
};

const updateDummys = (dummys: Dummy[]) => {
  const jsonString = JSON.stringify(dummys);
  localStorage.setItem(DT_LOCALSTORAGE_KEY_DUMMYS, jsonString);
};

const ResourceDummy = {
  getDummys,
  updateDummys,
};

export default ResourceDummy;