import React from 'react';

import { Dummy } from 'modules/dummy/resources/dummy.type';
import ResourceDummy from 'modules/dummy/resources/dummy.resource';

import { DummysContext } from './Dummys.context';

type Props = {
  children: React.ReactNode;
};

const DummysProvider = (props: Props) => {
  const [dummys, setDummys] = React.useState<Dummy[]>([]);

  React.useEffect(() => {
    setDummys(ResourceDummy.getDummys());
  }, []);

  const addDummy = (dummy: Dummy) => {
    const updatedDummys = [...dummys, dummy];
    setDummys(updatedDummys);
    ResourceDummy.updateDummys(updatedDummys);
  };

  const getDummy = (id: string) => {
    return dummys.find(dummy => dummy.id === id);
  };

  const editDummy = (id: string, updatedDummy: Partial<Dummy>) => {
    const updatedDummys = dummys.map(dummy =>
      dummy.id === id ? { ...dummy, ...updatedDummy } : dummy
    );
    setDummys(updatedDummys);
    ResourceDummy.updateDummys(updatedDummys);
  };

  const deleteDummy = (id: string) => {
    const updatedDummys = dummys.filter(dummy => dummy.id !== id);
    setDummys(updatedDummys);
    ResourceDummy.updateDummys(updatedDummys);
  };

  return (
    <DummysContext.Provider 
      value={{ 
        dummys, 
        addDummy, 
        getDummy, 
        editDummy, 
        deleteDummy,
      }}>
        {props.children}
    </DummysContext.Provider>
  );
};

export default DummysProvider;