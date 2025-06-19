import React from 'react';

import { Dummy } from 'modules/dummy/resources/dummy.type';
import { EMPTY_DUMMY } from 'modules/dummy/resources/dummy.constant';
import useDummys from 'modules/dummy/context/Dummys/useDummys';

export type UseSlotMachine = {
  enableDummys: Dummy[];
  dummy: Dummy;
  isSpinning: boolean;
  onSpin: () => Dummy | undefined;
  onChange: (dummy: Dummy) => void;
}

const useSlotMachine = (dummys: Dummy[], dummyBackItem?: boolean): UseSlotMachine => {
  const { dummyDisabled } = useDummys();
  const enableDummys = React.useMemo(() => {
    return dummys.filter(item => !dummyDisabled.includes(item.id));
  }, [dummys, dummyDisabled])

  const [isSpinning, setIsSpinning] = React.useState(false);
  const defaultItem = React.useMemo(() => {
    if (enableDummys.length === 0) return EMPTY_DUMMY;

    const defaultFrontItem = enableDummys[0];
    const defaultBackItem = enableDummys[1]
    if (!dummyBackItem) return defaultFrontItem;
    if (!defaultBackItem) return defaultFrontItem;
    return defaultBackItem;
  }, [enableDummys, dummyBackItem])

  const [dummy, setDummy] = React.useState<Dummy>(defaultItem);

  const onChange = React.useCallback((_dummy: Dummy) => {
    setDummy(_dummy);
  }, []);

  const onSpin = React.useCallback((excludeDummy?: Dummy) => {
    if (enableDummys.length <= 1) {
      return;
    }

    const newDummys = enableDummys.filter(item => item.id !== excludeDummy?.id);
    const randomIndex = Math.floor(Math.random() * newDummys.length);
    const chosenDummy = newDummys[randomIndex];

    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setDummy(chosenDummy);
    }, 2000);

    return chosenDummy;
  }, [enableDummys]);

  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enableDummys.length);
        const randomDummy = enableDummys[randomIndex];
        setDummy(randomDummy);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, enableDummys]);

  return {
    enableDummys,
    dummy,
    onChange,
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;