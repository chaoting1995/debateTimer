import React from "react";
import { Walle } from 'modules/walle/resources/walle.type';

export type WallesContextType = {
  list: Walle[];
  addItem: (newItem: Walle) => void;
  getItem: (id: string) => Walle | undefined;
  editItem: (updatedItem: Walle) => void;
  deleteItem: (id: string) => void;
  reorderList: (sourceIndex: number, destinationIndex: number) => void;
  toggleItemDisabled: (id: string, contentID: string) => void;
  fiexedWalleDisableds: string[];
  toggleFiexedWalleDisabled: (walleContentID: string, disabled: boolean) => void;
};

export const WallesContext = React.createContext({} as WallesContextType);