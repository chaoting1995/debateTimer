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
walles        攻防群組，列表
walle         攻防群組
walleContents 攻防子項，列表
walleContent  攻防子項
*/