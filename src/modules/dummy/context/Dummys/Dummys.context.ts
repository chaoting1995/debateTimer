import React from "react";
import { Dummy } from 'modules/dummy/resources/dummy.type';

export type DummysContextType = {
  dummys: Dummy[];
  addDummy: (dummy: Dummy) => void;
  getDummy: (id: string) => Dummy | undefined;
  editDummy: (id: string, updatedDummy: Partial<Dummy>) => void;
  deleteDummy: (id: string) => void;
  dummyDisabled: string[];
  onChangeDummyDisabled: (dummyID: string, disabled: boolean) => void;
};

export const DummysContext = React.createContext({} as DummysContextType);