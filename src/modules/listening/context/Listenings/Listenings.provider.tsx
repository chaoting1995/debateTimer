import React from 'react';

import { Listening } from 'modules/listening/resources/listening.type';
import ResourceListening from 'modules/listening/resources/listening.resource';

import { ListeningsContext } from './Listenings.context';

type Props = {
  children: React.ReactNode;
};

const ListeningsProvider = (props: Props) => {
  const [list, setList] = React.useState<Listening[]>([]);

  React.useEffect(() => {
    const _list = ResourceListening.getListenings();
    setList(_list);
  }, []);

  const addItem = React.useCallback((newItem: Listening) => {
    const _list = ResourceListening.getListenings();
    _list.push(newItem);
    ResourceListening.updateListenings(_list);
    setList(_list);
  }, []);
  
  const getItem = React.useCallback((id: string) => {
    const _list = ResourceListening.getListenings();
    return _list.find(item => item.id === id);
  }, []);

  const editItem = React.useCallback((updatedItem: Listening) => {
    const _list = ResourceListening.getListenings();
    const index = _list.findIndex(item => item.id === updatedItem.id);
    if (index === -1) return;
    _list.splice(index, 1, updatedItem);
    
    ResourceListening.updateListenings(_list);
    setList(_list);
  }, []);

  const deleteItem = React.useCallback((id: string) => {
    const _list = ResourceListening.getListenings();
    const index = _list.findIndex(item => item.id === id);
    if (index === -1) return;
    _list.splice(index, 1);

    ResourceListening.updateListenings(_list);
    setList(_list);
  }, []);

  const reorderList = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    const _list = ResourceListening.getListenings();
    // 從 source.index 剪下被拖曳的元素
    const [removed] = _list.splice(sourceIndex, 1);
    //在 destination.index 位置貼上被拖曳的元素
    _list.splice(destinationIndex, 0, removed);

    ResourceListening.updateListenings(_list);
    setList(_list);
  }, []);

  return (
    <ListeningsContext.Provider value={{ list, addItem, getItem, editItem, deleteItem, reorderList }}>
      {props.children}
    </ListeningsContext.Provider>
  );
};

export default ListeningsProvider;