import React from 'react';

export const SLOT_MACHINE_ERROR_MESSEGE = '溫馨提示：無法抽選，可抽選數量需 > 1';

export type UseSlotMachine<T> = {
  enableList: T[];
  item: T;
  isSpinning: boolean;
  onSpin: (withDelay?: boolean,excludeItem?: T) => Promise<T | undefined>;
  onChange: (item: T) => void;
};

const useSlotMachine = <T extends { id: string; disabled?: boolean }>(
  list: T[],
  defaultItem: T,
  isBackItem?: boolean
): UseSlotMachine<T> => {
  const enableList = React.useMemo(() => {
    return list.filter(item => !item.disabled);
  }, [list]);

  const [item, setItem] = React.useState<T>(defaultItem);
  const [isSpinning, setIsSpinning] = React.useState(false);

  const onChange = React.useCallback((newContent: T) => {
    setItem(newContent);
  }, []);

  const onSpin = React.useCallback((withDelay?: boolean, excludeItem?: T):Promise< T | undefined> => {
    return new Promise((resolve) => {

      if (enableList.length <= 1) return resolve(undefined);
      
      const newList = enableList.filter(item => item.id !== excludeItem?.id);
      const randomIndex = Math.floor(Math.random() * newList.length);
      const chosenItem = newList[randomIndex];
      
      setIsSpinning(true);
      setTimeout(() => {
        setIsSpinning(false);
        setItem(chosenItem);
        if (withDelay) return resolve(chosenItem);
      }, 2000);
      
      if (!withDelay) return resolve(chosenItem);
    });
  }, [enableList]);

  React.useEffect(() => {
    if (enableList.length === 0) return;

    const defaultFrontItem = enableList[0];
    const defaultBackItem = enableList[1];

    if (!isBackItem) {
      setItem(defaultFrontItem);
      return;
    } 

    if (!defaultBackItem) {
      setItem(defaultFrontItem);
      return;
    } 
    
    setItem(defaultBackItem);
    setItem(enableList[0]);
  }, [enableList, isBackItem]);

  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enableList.length);
        const randomItem = enableList[randomIndex];
        setItem(randomItem);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, enableList]);

  return {
    enableList,
    item,
    isSpinning,
    onSpin,
    onChange,
  };
};

export default useSlotMachine;
