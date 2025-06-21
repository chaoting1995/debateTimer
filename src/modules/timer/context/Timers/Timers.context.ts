import React from "react";
import { Timer } from 'modules/timer/resources/timer.type';

export type TimersContextType = {
  list: Timer[];
  addItem: (newItem: Timer) => void;
  getItem: (id: string) => Timer | undefined;
  editItem: (updatedItem: Timer) => void;
  deleteItem: (id: string) => void;
  reorderList: (sourceIndex: number, destinationIndex: number) => void;
};

export const TimersContext = React.createContext({} as TimersContextType);