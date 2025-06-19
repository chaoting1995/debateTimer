import { DEFAULT_DUMMYS, DT_LOCALSTORAGE_KEY_DUMMYS, DT_LOCALSTORAGE_KEY_DUMMY_SETTING, DEFAULT_DUMMY_SETTING } from 'modules/dummy/resources/dummy.constant';
import FactoryDummy from 'modules/dummy/resources/dummy.factory';
import { Dummy, DummySetting } from 'modules/dummy/resources/dummy.type';

const getDummys = (): Dummy[] => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_DUMMYS);
  if (!jsonString) return DEFAULT_DUMMYS;
  return FactoryDummy.createDummys(JSON.parse(jsonString));
};

const updateDummys = (dummys: Dummy[]) => {
  const jsonString = JSON.stringify(dummys);
  localStorage.setItem(DT_LOCALSTORAGE_KEY_DUMMYS, jsonString);
};

const getDummySetting = (): DummySetting => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_DUMMY_SETTING);
  if (!jsonString) return DEFAULT_DUMMY_SETTING;
  return FactoryDummy.createDummySetting(JSON.parse(jsonString));
};

const updateDummySettingDummyDisabled = (dummyID: string, disabled: boolean): string[] => {
  const dummySetting = getDummySetting();
  const newDummyDisabled = [...dummySetting.dummyDisabled];
  const index = newDummyDisabled.indexOf(dummyID);
  const isExist = index > -1;

  if (disabled && !isExist) {
    newDummyDisabled.push(dummyID);
  }

  if (!disabled && isExist) {
    newDummyDisabled.splice(index, 1);
  }
  
  const jsonString = JSON.stringify({
    ...dummySetting,
    dummyDisabled: newDummyDisabled
  });
  localStorage.setItem(DT_LOCALSTORAGE_KEY_DUMMY_SETTING, jsonString);

  return newDummyDisabled;
};

const ResourceDummy = {
  getDummys,
  updateDummys,
  getDummySetting,
  updateDummySettingDummyDisabled
};

export default ResourceDummy;