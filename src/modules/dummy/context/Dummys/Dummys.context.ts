import React from "react";
import { Dummy } from 'modules/dummy/resources/dummy.type';

export type DummysContextType = {
  list: Dummy[];
  addItem: (newItem: Dummy) => void;
  getItem: (id: string) => Dummy | undefined;
  editItem: (updatedItem: Dummy) => void;
  deleteItem: (id: string) => void;
  reorderList: (sourceIndex: number, destinationIndex: number) => void;
};

export const DummysContext = React.createContext({} as DummysContextType);