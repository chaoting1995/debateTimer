import React from 'react';

import { Walle } from 'modules/walle/resources/walle.type';
import ResourceWalle from 'modules/walle/resources/walle.resource';

import { WallesContext } from './Walles.context';

type Props = {
  children: React.ReactNode;
};

const WallesProvider = (props: Props) => {
  const [list, setList] = React.useState<Walle[]>([]);

  const addItem = React.useCallback((newItem: Walle) => {
    const _list = ResourceWalle.getWalles();
    _list.push(newItem);

    ResourceWalle.updateWalles(_list);
    setList(_list);
  }, []);

  const getItem = React.useCallback((id: string) => {
    const _list = ResourceWalle.getWalles();
    return _list.find(item => item.id === id);
  }, []);

  const editItem = React.useCallback((updatedItem: Walle) => {
    const _list = ResourceWalle.getWalles();
    const index = _list.findIndex(item => item.id === updatedItem.id);
    if (index === -1) return;
    _list.splice(index, 1, updatedItem);
    
    ResourceWalle.updateWalles(_list);
    setList(_list);
  }, []);

  const deleteItem = React.useCallback((id: string) => {
    const _list = ResourceWalle.getWalles();
    const index = _list.findIndex(item => item.id === id);
    if (index === -1) return;
    _list.splice(index, 1);

    ResourceWalle.updateWalles(_list);
    setList(_list);
  }, []);

  const reorderList = React.useCallback((sourceIndex: number, destinationIndex: number) => {
    const _list = ResourceWalle.getWalles();
    // 從 source.index 剪下被拖曳的元素
    const [removed] = _list.splice(sourceIndex, 1);
    //在 destination.index 位置貼上被拖曳的元素
    _list.splice(destinationIndex, 0, removed);

    ResourceWalle.updateWalles(_list);
    setList(_list);
  }, []);

  const toggleItemDisabled = React.useCallback((id: string, contentID: string) => {
    const _list = ResourceWalle.getWalles();
    const index = _list.findIndex(item => item.id === id);

    if (index === -1) return;
    const newItem: Walle = _list[index];
    
    const contentsItem = newItem.contents.find(item => item.id === contentID);
    if (!contentsItem) return;
    newItem.contents = newItem.contents.map(contentItem => {
      if(contentItem.id === contentID) {
        contentItem.disabled = !contentItem.disabled;
      }
      return contentItem;
    })

    _list.splice(index, 1, newItem);
    ResourceWalle.updateWalles(_list);
    setList(_list);
  }, []);
  
  React.useEffect(() => {
    const _list = ResourceWalle.getWalles();
    setList(_list);
  }, []);
  
  return (
    <WallesContext.Provider value={{ list, addItem, getItem, editItem, deleteItem, reorderList, toggleItemDisabled }}>
      {props.children}
    </WallesContext.Provider>
  );
};

export default WallesProvider;