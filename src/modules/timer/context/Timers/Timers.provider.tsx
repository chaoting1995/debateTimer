import React from 'react';

import { Timer } from 'modules/timer/resources/timer.type';
import ResourceTimer from 'modules/timer/resources/timer.resource';

import { TimersContext } from './Timers.context';

type Props = {
  children: React.ReactNode;
};

const TimersProvider = (props: Props) => {
  const [list, setList] = React.useState<Timer[]>([]);

  React.useEffect(() => {
    const _list = ResourceTimer.getTimers();
    setList(_list);
  }, []);

  const addItem = React.useCallback((newItem: Timer) => {
    const _list = ResourceTimer.getTimers();
    _list.push(newItem);

    ResourceTimer.updateTimers(_list);
    setList(_list);
  }, []);

  const getItem = React.useCallback((id: string) => {
    const _list = ResourceTimer.getTimers();
    return _list.find(item => item.id === id);
  }, []);

  const editItem = React.useCallback((updatedItem: Timer) => {
    const _list = ResourceTimer.getTimers();
    const index = _list.findIndex(item => item.id === updatedItem.id);
    if (index === -1) return;
    _list.splice(index, 1, updatedItem);
    
    ResourceTimer.updateTimers(_list);
    setList(_list);
  }, []);

  const deleteItem = React.useCallback((id: string) => {
    const _list = ResourceTimer.getTimers();
    const index = _list.findIndex(item => item.id === id);
    if (index === -1) return;
    _list.splice(index, 1);

    ResourceTimer.updateTimers(_list);
    setList(_list);
  }, []);

  const reorderList = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    const _list = ResourceTimer.getTimers();
    // 從 source.index 剪下被拖曳的元素
    const [removed] = _list.splice(sourceIndex, 1);
    //在 destination.index 位置貼上被拖曳的元素
    _list.splice(destinationIndex, 0, removed);

    ResourceTimer.updateTimers(_list);
    setList(_list);
  }, []);

  return (
    <TimersContext.Provider value={{ list, addItem, getItem, editItem, deleteItem, reorderList }}>
      {props.children}
    </TimersContext.Provider>
  );
};

export default TimersProvider;