import React from 'react';

import { DummyContent } from 'modules/dummy/resources/dummy.type';
import { DEFAUT_DUMMY_CONTENT } from 'modules/dummy/resources/dummy.constant';
// import ServiceUtil from 'services/util.service';

export type UseSlotMachine = {
  enableDummyContents: DummyContent[];
  dummyContent: DummyContent;
  isSpinning: boolean;
  onSpin: (isSpeech: boolean) => DummyContent | undefined;
  onChange: (dummyContent: DummyContent) => void;
}

const useSlotMachine = (dummyContents: DummyContent[]): UseSlotMachine => {
  const enableDummyContents = React.useMemo(() => {
    return dummyContents.filter(item => !item.disabled);
  }, [dummyContents]);

  const [isSpinning, setIsSpinning] = React.useState(false);

  const [dummyContent, setDummyContent] = React.useState<DummyContent>(DEFAUT_DUMMY_CONTENT);

  const onChange = React.useCallback((_dummyContent: DummyContent) => {
    setDummyContent(_dummyContent);
  }, []);

  const onSpin = React.useCallback((isSpeech: boolean, excludeDummy?: DummyContent): DummyContent | undefined => {
    if (enableDummyContents.length <= 1) return;

    const newDummyContents = enableDummyContents.filter(item => item.id !== excludeDummy?.id);
    const randomIndex = Math.floor(Math.random() * newDummyContents.length);
    const chosenDummyContent = newDummyContents[randomIndex];

    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setDummyContent(chosenDummyContent);
      return chosenDummyContent;
      // if(isSpeech) ServiceUtil.speakText(chosenDummyContent.content);
    }, 2000);

  }, [enableDummyContents]);

  React.useEffect(() => {
    if (enableDummyContents.length === 0) return;
    setDummyContent(enableDummyContents[0]);
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