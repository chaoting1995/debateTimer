
import { FixedWalleSetting } from 'modules/walle/resources/fixedWalle.type';
import FactoryFixedWalle from 'modules/walle/resources/fixedWalle.factory';
import { DEFAULT_FIXED_WALLE_SETTING, DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING } from 'modules/walle/resources/fixedWalle.constant';

const getFixedWalleSetting = (): FixedWalleSetting => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING);
  if (!jsonString) return JSON.parse(JSON.stringify(DEFAULT_FIXED_WALLE_SETTING));
  return FactoryFixedWalle.createFixedWalleSetting(JSON.parse(jsonString));
};

const updateFixedWalleSettingDisabled = (walleContentID: string): FixedWalleSetting => {
  const fixedWalleSetting = getFixedWalleSetting();
  const newDisableds = fixedWalleSetting.disableds;
  
  const isExist = newDisableds.includes(walleContentID);
  if (isExist) {
    const index = newDisableds.indexOf(walleContentID)
    newDisableds.splice(index, 1);
  } else {
    newDisableds.push(walleContentID);
  }
  
  const newFixedWalleSetting = { ...fixedWalleSetting, disableds: newDisableds};
  const jsonString = JSON.stringify(newFixedWalleSetting);
  localStorage.setItem(DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING, jsonString);
  return newFixedWalleSetting;
};

const ResourceFixedWalle = {
  getFixedWalleSetting,
  updateFixedWalleSettingDisabled
};

export default ResourceFixedWalle;