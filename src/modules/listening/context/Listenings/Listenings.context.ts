import React from "react";
import { Listening } from 'modules/listening/resources/listening.type';

export type ListeningsContextType = {
  list: Listening[];
  addItem: (newItem: Listening) => void;
  getItem: (id: string) => Listening | undefined;
  editItem: (updatedItem: Listening) => void;
  deleteItem: (id: string) => void;
  reorderList: (sourceIndex: number, destinationIndex: number) => void;
};

export const ListeningsContext = React.createContext({} as ListeningsContextType);