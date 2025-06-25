import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { EnumCombinedMiddleItemMode } from 'modules/walle/enums/enumCombinedMiddleItemMode';

export const WALLE_NAME = '辯題抽選器';
export const WALLE_CONTENT_NAME = '辯題選項';

export const WALLE_MODE_LABEL: Record<EnumWalleMode, string> = {
  [EnumWalleMode.Complete]: '完整辯題',
  [EnumWalleMode.Combined]: '組合辯題',
}

export const COMBINED_MIDDLE_ITEM_MODE_LABEL: Record<EnumCombinedMiddleItemMode, string> = {
  [EnumCombinedMiddleItemMode.Causal]: '因果性辯題',
  [EnumCombinedMiddleItemMode.Compare]: '比較性辯題',
}

export const COMBINED_MIDDLE_ITEM_LABEL: Record<EnumCombinedMiddleItemMode, string> = {
  [EnumCombinedMiddleItemMode.Causal]: '有利於/有害於',
  [EnumCombinedMiddleItemMode.Compare]: '重於',
};

export const DT_LOCALSTORAGE_KEY_WALLES = 'DT_LOCALSTORAGE_KEY_WALLES';

export const EMPTY_WALLE_CONTENT: WalleContent = {
  id: 'debate-walle-content-000',
  disabled: false,
  content: `(無設定${WALLE_CONTENT_NAME})`
}

export const DEFAULT_WALLE_CONTENT: WalleContent = {
  id: '',
  disabled: false,
  content: ''
}

export const DEFAULT_WALLE_CONTENTS: WalleContent[] = [
  {
    id: 'debate-walle-content-001',
    disabled: false,
    
    content: `${WALLE_CONTENT_NAME} 1`
  },
  {
    id: 'debate-walle-content-002',
    disabled: false,
    
    content: `${WALLE_CONTENT_NAME} 2`
  }
]

export const DEFAULT_WALLES: Walle[] = [
  {
    id: 'debate-walle-001',
    name: `瓦力二號(${WALLE_MODE_LABEL[EnumWalleMode.Combined]})`,
    mode: EnumWalleMode.Combined,
    contents: JSON.parse(JSON.stringify(DEFAULT_WALLE_CONTENTS)),
  },
  {
    id: 'debate-walle-002',
    name: `瓦力二號(${WALLE_MODE_LABEL[EnumWalleMode.Complete]})`,
    mode: EnumWalleMode.Complete,
    contents: JSON.parse(JSON.stringify(DEFAULT_WALLE_CONTENTS)),
  },
]

export const DEFAULT_WALLE: Walle = {
  id: '',
  name: '',
  mode: EnumWalleMode.Combined,
  contents: [],
}

export const EMPTY_WALLE: Walle = {
  id: 'debate-walle-000',
  name: `(無設定${WALLE_NAME})`,
  mode: EnumWalleMode.Combined,
  contents: [],
}
