import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { Listening, ListeningRow } from 'modules/listening/resources/listening.type';

export const DT_LOCALSTORAGE_KEY_LISTENINGS = 'DT_LOCALSTORAGE_KEY_LISTENINGS';

export const BG_DARK = '#BEBEBE';
export const BG_DEFAULT = '#FFFFFF';

export const DEFAULT_LISTENING_ROW: ListeningRow = {
  id: '',
  column1: '',
  column2: EnumArgumentStatus.Unselected,
  bg : BG_DEFAULT,
}

const DEFAULT_LISTENING_ROWS: ListeningRow[] = [
  {
    id: 'listening-positive',
    column1: '正方',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DARK
  },
  {
    ...DEFAULT_LISTENING_ROW,
    id: 'listening-positive-1',
  },
  {
    ...DEFAULT_LISTENING_ROW,
    id: 'listening-positive-2',
  },
  {
    id: 'listening-negative',
    column1: '反方',
    column2: EnumArgumentStatus.Unselected,
    bg: BG_DARK
  },
  {
    ...DEFAULT_LISTENING_ROW,
    id: 'listening-negative-1',
  },
  {
    ...DEFAULT_LISTENING_ROW,
    id: 'listening-negative-2',
  },
];

const DEFAULT_LISTENING: Listening = {
  id: '',
  name: '',
  owner: '',
  updatedAt: 0,
  rows: [...DEFAULT_LISTENING_ROWS.map(item => ({...item}))]
}

export const createDefaultSetting = (): Listening => {
  return ({
    ...DEFAULT_LISTENING,
    rows: [...DEFAULT_LISTENING_ROWS.map(item => ({...item}))]
  });
}

export const DEFAULT_LISTENINGS: Array<Listening> = [];

export const LISTENING_ROWS_HEAD = {
  id: 'thead',
  column1: '標題',
  column2: '狀態',
  bg: 'rgba(212, 212, 212, 0.49)'
};

export const argumentStatusWording: Record<EnumArgumentStatus, string> = {
  [EnumArgumentStatus.Unselected]: '未選擇',
  [EnumArgumentStatus.HP100]: '完全成立',
  [EnumArgumentStatus.HP90]: '削弱',
  [EnumArgumentStatus.HP10]: '極大削弱',
  [EnumArgumentStatus.HP0InitFail]: '初步不成立',
  [EnumArgumentStatus.HP0Disassembly]: '擊倒(拆掉)',
  [EnumArgumentStatus.HP0Obfuscation]: '擊倒(打糊)',
  [EnumArgumentStatus.Lose]: '掉點',
  [EnumArgumentStatus.Unknown]: '未知',
  [EnumArgumentStatus.Other]: '其他',
};

export const argumentStatusWordingForSheet: Record<EnumArgumentStatus, string> = {
  [EnumArgumentStatus.Unselected]: '',
  [EnumArgumentStatus.HP100]: '✅ 完全成立',
  [EnumArgumentStatus.HP90]: '🔺 削弱',
  [EnumArgumentStatus.HP10]: '🔺🔺 極大削弱',
  [EnumArgumentStatus.HP0InitFail]: '❌ 初步不成立',
  [EnumArgumentStatus.HP0Disassembly]: '❌ 擊倒(拆掉)',
  [EnumArgumentStatus.HP0Obfuscation]: '❌ 擊倒(打糊)',
  [EnumArgumentStatus.Lose]: '❓ 掉點',
  [EnumArgumentStatus.Unknown]: '❓未知',
  [EnumArgumentStatus.Other]: '🔶 其他',
};