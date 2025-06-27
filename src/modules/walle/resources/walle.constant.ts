import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { EnumCombinedMiddleItemMode } from 'modules/walle/enums/enumCombinedMiddleItemMode';

export const WALLE_LABEL = '抽題器';
export const WALLE_CONTENT_LABEL = '辯題選項';

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
}

export const DT_LOCALSTORAGE_KEY_WALLES = 'DT_LOCALSTORAGE_KEY_WALLES';

export const DEFAULT_WALLE_CONTENT: WalleContent = {
  id: '',
  disabled: false,
  category: '',
  content: ''
}

export const EXAMPLE_WALLE_CONTENTS: WalleContent[] = Array(5)
  .fill('')
 .map((_, index) => ({
     id: `debate-walle-content-00${index + 1}`,
     disabled: false,
     category: '',
     content: `${WALLE_CONTENT_LABEL} ${index + 1}`,
   }));

export const EXAMPLE_WALLES: Walle[] = [
  {
    id: 'debate-walle-001',
    name: `瓦力二號-${WALLE_MODE_LABEL[EnumWalleMode.Combined]}(範例)`,
    mode: EnumWalleMode.Combined,
    contents: JSON.parse(JSON.stringify(EXAMPLE_WALLE_CONTENTS)),
  }
]

export const DEFAULT_WALLE: Walle = {
  id: '',
  name: '',
  mode: EnumWalleMode.Combined,
  contents: [],
}