export enum EnumCombinedMiddleItemMode {
  Causal = 'causal',   // 因果性辯題
  Compare = 'compare', // 比較性辯題
}

export const IsEnumTopicMiddleItemMode = (input: EnumCombinedMiddleItemMode): input is EnumCombinedMiddleItemMode => {
  return Object.values(EnumCombinedMiddleItemMode).includes(input) ? true : false;
};
