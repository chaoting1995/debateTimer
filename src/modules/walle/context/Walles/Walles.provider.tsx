import React from 'react';

import { Walle } from 'modules/walle/resources/walle.type';
import { WallesContext } from './Walles.context';
import { FixedWalleSetting } from 'modules/walle/resources/fixedWalle.type';
import ResourceWalle from 'modules/walle/resources/walle.resource';
import ResourceFixedWalle from 'modules/walle/resources/fixedWalle.resource';
import { FIXED_WALLES } from 'modules/walle/resources/fixedWalle.constant';

type Props = {
  children: React.ReactNode;
};

const WallesProvider = (props: Props) => {
  const [fixedList, setFixedList] = React.useState<Walle[]>(FIXED_WALLES);

  const [list, setList] = React.useState<Walle[]>([]);

  const addItem = React.useCallback((newItem: Walle) => {
    const _list = ResourceWalle.getWalles();
    _list.push(newItem);

    ResourceWalle.updateWalles(_list);
    setList(_list);
  }, []);

  const getItem = React.useCallback((id: string) => {
    const _list = ResourceWalle.getWalles();
    // setList(_list);
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

  // fixed walle
  const getFixedWalle = React.useCallback((id: string) => {
    return fixedList.find(item => item.id === id);
  }, [fixedList]);

  // fixed walle
  const toggleFiexedWalleDisabled = React.useCallback((walleContentID: string) => {
    ResourceFixedWalle.updateFixedWalleSettingDisabled(walleContentID);
    setFixedList(prevState => {
      const newState: Walle[] = JSON.parse(JSON.stringify(prevState));
      newState.map(_walle => {
        _walle.contents = _walle.contents.map(_content => {
          if (_content.id === walleContentID) {
            _content.disabled = !_content.disabled;
          }
          return _content;
        });
        return _walle;
      });
      return newState;
    });
  }, []);

  React.useEffect(() => {
    const _list = ResourceWalle.getWalles();
    setList(_list);
  }, []);
  
  // fixed walle
  React.useEffect(() => {
    const fixedWalleSetting: FixedWalleSetting = ResourceFixedWalle.getFixedWalleSetting();
    const _fixedList: Walle[] = JSON.parse(JSON.stringify(FIXED_WALLES));
    _fixedList.map(_walle => {
      _walle.contents = _walle.contents.map(_content => {
        _content.disabled = fixedWalleSetting.disableds.includes(_content.id);
        return _content;
      });
      return _walle;
    });
    setFixedList(_fixedList);
  }, []);
  
  return (
    <WallesContext.Provider value={{ 
      list, 
      addItem, 
      getItem, 
      editItem, 
      deleteItem, 
      reorderList, 
      toggleItemDisabled,
      getFixedWalle,
      toggleFiexedWalleDisabled
    }}>
      {props.children}
    </WallesContext.Provider>
  );
};

export default WallesProvider;