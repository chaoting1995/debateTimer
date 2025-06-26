import React from 'react';

import { WalleContent } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE_CONTENT } from 'modules/walle/resources/walle.constant';

export type UseSlotMachine = {
  enableWalleContents: WalleContent[];
  walleContent: WalleContent;
  isSpinning: boolean;
  onSpin: (excludeWalle?: WalleContent) => Promise<WalleContent | undefined>;
  onChange: (walleContent: WalleContent) => void;
}

const useSlotMachine = (walleContents: WalleContent[], isBackItem?: boolean): UseSlotMachine => {
  const enableWalleContents = React.useMemo(() => {
    return walleContents.filter(item => !item.disabled);
  }, [walleContents]);

  const [isSpinning, setIsSpinning] = React.useState(false);

  const [walleContent, setWalleContent] = React.useState<WalleContent>(DEFAULT_WALLE_CONTENT);

  const onChange = React.useCallback((_walleContent: WalleContent) => {
    setWalleContent(_walleContent);
  }, []);

  const onSpin = React.useCallback((excludeWalle?: WalleContent): Promise<WalleContent | undefined> => {
    return new Promise((resolve) => {

      if (enableWalleContents.length <= 1) return resolve(undefined);
      
      const newWalles = enableWalleContents.filter(item => item.id !== excludeWalle?.id);
      const randomIndex = Math.floor(Math.random() * newWalles.length);
      const chosenWalleContent = newWalles[randomIndex];
      
      setIsSpinning(true);
      setTimeout(() => {
        setIsSpinning(false);
        setWalleContent(chosenWalleContent);
        return resolve(chosenWalleContent);
      }, 2000);
    });
  }, [enableWalleContents]);

  React.useEffect(() => {
    if (enableWalleContents.length === 0) return;

    const defaultFrontItem = enableWalleContents[0];
    const defaultBackItem = enableWalleContents[1];

    if (!isBackItem) {
      setWalleContent(defaultFrontItem);
      return;
    } 

    if (!defaultBackItem) {
      setWalleContent(defaultFrontItem);
      return;
    } 
    
    setWalleContent(defaultBackItem);
  }, [enableWalleContents, isBackItem]);
  
  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enableWalleContents.length);
        const randomWalle = enableWalleContents[randomIndex];
        setWalleContent(randomWalle);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, enableWalleContents]);

  return {
    enableWalleContents,
    walleContent,
    onChange,
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;