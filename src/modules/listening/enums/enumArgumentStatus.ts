export enum EnumArgumentStatus {
  Unselected = 'Unselected',                   // 未選擇
  HP100 = 'HP100',                             // 完全成立
  HP90 = 'HP90',                               // 削弱
  HP10 = 'HP10',                               // 極大削弱
  HP0InitFail = 'HP0InitFail',               // 初步不成立
  HP0Obfuscation = 'HP0Obfuscation',         // 擊倒(打糊)
  HP0_Obfuscation = 'HP0_Obfuscation',       // 擊倒(打糊)
  HP0Disassembly = 'HP0Disassembly',         // 擊倒(拆掉)
  HP0Countermeasures = 'HP0Countermeasures', // 擊倒(相抗)
  Lose = 'Lose',                               // 掉點
  Unknown = 'Unknown',                         // 未知
  Other = 'Other',                             // 其他
}

export const IsEnumArgumentStatus = (input: EnumArgumentStatus): input is EnumArgumentStatus => {
  return Object.values(EnumArgumentStatus).includes(input) ? true : false;
};
