import { EXAMPLE_WALLES, DT_LOCALSTORAGE_KEY_WALLES } from 'modules/walle/resources/walle.constant';
import FactoryWalle from 'modules/walle/resources/walle.factory';
import { Walle } from 'modules/walle/resources/walle.type';

const getWalles = (): Walle[] => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_WALLES);
  if (!jsonString) return JSON.parse(JSON.stringify(EXAMPLE_WALLES));
  return FactoryWalle.createWalles(JSON.parse(jsonString));
};

const updateWalles = (walles: Walle[]) => {
  const jsonString = JSON.stringify(walles);
  localStorage.setItem(DT_LOCALSTORAGE_KEY_WALLES, jsonString);
};

const ResourceWalle = {
  getWalles,
  updateWalles,
};

export default ResourceWalle;