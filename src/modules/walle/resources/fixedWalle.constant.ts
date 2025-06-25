import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { FixedWalleSetting } from 'modules/walle/resources/fixedWalle.type';
import { WALLE_MODE_LABEL } from 'modules/walle/resources/walle.constant';
import { DEFAULT_WALLE_COMPLETE_FROM_CSV, DEFAULT_WALLE_COMBINED_FROM_CSV } from 'modules/walle/resources/walle.generate';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';

export const DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING = 'DT_LOCALSTORAGE_KEY_FIXED_WALLE_SETTING';

// disabled 的真實資料，來自 DEFAULT_FIXED_WALLE_SETTING.disableds
export const DEFAULT_FIXED_WALLE_CONTENTS_COMPLETE: WalleContent[] = DEFAULT_WALLE_COMPLETE_FROM_CSV
  .map(item =>  ({ ...item, disabled: false }));
export const DEFAULT_FIXED_WALLE_CONTENTS_COMBINED: WalleContent[] = DEFAULT_WALLE_COMBINED_FROM_CSV
  .map(item =>  ({ ...item, disabled: false }));

export const DEFAULT_FIXED_WALLE_SETTING : FixedWalleSetting = {
  disableds: []
};

export const FIXED_WALLE_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/19Kq4FNRxRojCDajOtSCdS38d_cSB_MZnXRY0Od-tDig';


export const FIXED_WALLES: Walle[] = [
  {
    id: 'debate-fixed-walle-combined',
    name: `瓦力二號-${WALLE_MODE_LABEL[EnumWalleMode.Combined]}`,
    mode: EnumWalleMode.Combined,
    contents: DEFAULT_FIXED_WALLE_CONTENTS_COMBINED,
  },
  {
    id: 'debate-fixed-walle-complete',
    name: `瓦力二號-${WALLE_MODE_LABEL[EnumWalleMode.Complete]}`,
    mode: EnumWalleMode.Complete,
    contents: DEFAULT_FIXED_WALLE_CONTENTS_COMPLETE,
  },
]