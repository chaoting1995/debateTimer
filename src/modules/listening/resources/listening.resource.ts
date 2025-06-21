import { DEFAULT_LISTENINGS, DT_LOCALSTORAGE_KEY_LISTENINGS } from 'modules/listening/resources/listening.constant';
import FactoryListening from 'modules/listening/resources/listening.factory';
import { Listening } from 'modules/listening/resources/listening.type';

const getListenings = (): Listening[] => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_LISTENINGS);
  if (!jsonString) return DEFAULT_LISTENINGS;
  return FactoryListening.createListenings(JSON.parse(jsonString));
};

const updateListenings = (listenings: Listening[]) => {
  const jsonString = JSON.stringify(listenings);
  localStorage.setItem(DT_LOCALSTORAGE_KEY_LISTENINGS, jsonString);
};

const ResourceListening = {
  getListenings,
  updateListenings,
};

export default ResourceListening;