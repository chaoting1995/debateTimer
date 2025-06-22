import React from 'react';

import { Dummy } from 'modules/dummy/resources/dummy.type';
import ResourceDummy from 'modules/dummy/resources/dummy.resource';

import { DummysContext } from './Dummys.context';

type Props = {
  children: React.ReactNode;
};

const DummysProvider = (props: Props) => {
  const [list, setList] = React.useState<Dummy[]>([]);

  React.useEffect(() => {
    const _list = ResourceDummy.getDummys();
    setList(_list);
  }, []);

  const addItem = React.useCallback((newItem: Dummy) => {
    const _list = ResourceDummy.getDummys();
    _list.push(newItem);

    ResourceDummy.updateDummys(_list);
    setList(_list);
  }, []);

  const getItem = React.useCallback((id: string) => {
    const _list = ResourceDummy.getDummys();
    return _list.find(item => item.id === id);
  }, []);

  const editItem = React.useCallback((updatedItem: Dummy) => {
    const _list = ResourceDummy.getDummys();
    const index = _list.findIndex(item => item.id === updatedItem.id);
    if (index === -1) return;
    _list.splice(index, 1, updatedItem);
    
    ResourceDummy.updateDummys(_list);
    setList(_list);
  }, []);

  const deleteItem = React.useCallback((id: string) => {
    const _list = ResourceDummy.getDummys();
    const index = _list.findIndex(item => item.id === id);
    if (index === -1) return;
    _list.splice(index, 1);

    ResourceDummy.updateDummys(_list);
    setList(_list);
  }, []);

  const reorderList = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    const _list = ResourceDummy.getDummys();
    // 從 source.index 剪下被拖曳的元素
    const [removed] = _list.splice(sourceIndex, 1);
    //在 destination.index 位置貼上被拖曳的元素
    _list.splice(destinationIndex, 0, removed);

    ResourceDummy.updateDummys(_list);
    setList(_list);
  }, []);

  return (
    <DummysContext.Provider value={{ list, addItem, getItem, editItem, deleteItem, reorderList }}>
      {props.children}
    </DummysContext.Provider>
  );
};

export default DummysProvider;