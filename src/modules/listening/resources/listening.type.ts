import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';

export type ListeningRow = {
  id: string;
  column1: string;
  column2: EnumArgumentStatus;
  bg: string
};

export type Listening = {
  id: string;
  name: string;
  owner: string;
  updatedAt: number;
  rows: ListeningRow[];
};