import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';

export type Walle = {
  id: string;
  name: string;
  mode: EnumWalleMode;
  contents:  Array<WalleContent>;
}

export type WalleContent = {
  id: string;
  disabled: boolean;
  category: string;
  content: string;
}

export type WalleContentCategoryGroup = {
  category: string;
  walleContents: WalleContent[];
};

/*
walles        抽題器，列表
walle         抽題器
walleContents 辯題選項，列表
walleContent  辯題選項
*/