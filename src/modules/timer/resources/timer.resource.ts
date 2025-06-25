import { EXAMPLE_TIMERS, DT_LOCALSTORAGE_KEY_TIMERS } from 'modules/timer/resources/timer.constant';
import FactoryTimer from 'modules/timer/resources/timer.factory';
import { Timer } from 'modules/timer/resources/timer.type';

const getTimers = (): Timer[] => {
  const jsonString = localStorage.getItem(DT_LOCALSTORAGE_KEY_TIMERS);
  if (!jsonString) return JSON.parse(JSON.stringify(EXAMPLE_TIMERS));
  return FactoryTimer.createTimers(JSON.parse(jsonString));
};

const updateTimers = (timers: Timer[]) => {
  const jsonString = JSON.stringify(timers);
  localStorage.setItem(DT_LOCALSTORAGE_KEY_TIMERS, jsonString);
};

const ResourceTimer = {
  getTimers,
  updateTimers,
};

export default ResourceTimer;