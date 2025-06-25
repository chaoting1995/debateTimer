
import { FixedWalleSetting } from 'modules/walle/resources/fixedWalle.type';
import FactoryFixedWalle from 'modules/walle/resources/fixedWalle.factory';
import { DEFAULT_FIXED_WALLE_SETTING, DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING } from 'modules/walle/resources/fixedWalle.constant';

const getFixedWalleSetting = (): FixedWalleSetting => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING);
  if (!jsonString) return JSON.parse(JSON.stringify(DEFAULT_FIXED_WALLE_SETTING));
  return FactoryFixedWalle.createFixedWalleSetting(JSON.parse(jsonString));
};

const updateFixedWalleSettingWalleDisabled = (walleID: string, disabled: boolean): string[] => {
  const fixedWalleSetting = getFixedWalleSetting();
  const newWalleDisabled = [...fixedWalleSetting.disableds];
  const index = newWalleDisabled.indexOf(walleID);
  const isExist = index > -1;

  if (disabled && !isExist) {
    newWalleDisabled.push(walleID);
  }

  if (!disabled && isExist) {
    newWalleDisabled.splice(index, 1);
  }
  
  const jsonString = JSON.stringify({
    ...fixedWalleSetting,
    walleDisabled: newWalleDisabled
  });
  localStorage.setItem(DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING, jsonString);

  return newWalleDisabled;
};

const ResourceFixedWalle = {
  getFixedWalleSetting,
  updateFixedWalleSettingWalleDisabled
};

export default ResourceFixedWalle;