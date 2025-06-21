import React from 'react';

import { DummyContent } from 'modules/dummy/resources/dummy.type';
import { EMPTY_DUMMY_CONTENT } from 'modules/dummy/resources/dummy.constant';

export type UseSlotMachine = {
  enableDummyContents: DummyContent[];
  dummyContent: DummyContent;
  isSpinning: boolean;
  onSpin: () => DummyContent | undefined;
  onChange: (dummyContent: DummyContent) => void;
}

const useSlotMachine = (dummyContents: DummyContent[]): UseSlotMachine => {
  const enableDummyContents = React.useMemo(() => {
    return dummyContents.filter(item => !item.disabled);
  }, [dummyContents])

  const [isSpinning, setIsSpinning] = React.useState(false);
  const defaultItem = React.useMemo(() => {
    if (enableDummyContents.length === 0) return EMPTY_DUMMY_CONTENT;
    return enableDummyContents[0];
  }, [enableDummyContents])

  const [dummyContent, setDummyContent] = React.useState<DummyContent>(defaultItem);

  const onChange = React.useCallback((_dummyContent: DummyContent) => {
    setDummyContent(_dummyContent);
  }, []);

  const onSpin = React.useCallback((excludeDummy?: DummyContent) => {
    if (enableDummyContents.length <= 1) return;

    const newDummys = enableDummyContents.filter(item => item.id !== excludeDummy?.id);
    const randomIndex = Math.floor(Math.random() * newDummys.length);
    const chosenDummy = newDummys[randomIndex];

    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setDummyContent(chosenDummy);
    }, 2000);

    return chosenDummy;
  }, [enableDummyContents]);

  React.useEffect(() => {
    if (isSpinning) {
      const intervalID = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * enableDummyContents.length);
        const randomDummy = enableDummyContents[randomIndex];
        setDummyContent(randomDummy);
      }, 80);

      return () => clearInterval(intervalID);
    }
  }, [isSpinning, enableDummyContents]);

  return {
    enableDummyContents,
    dummyContent,
    onChange,
    isSpinning,
    onSpin,
  }
}

export default useSlotMachine;