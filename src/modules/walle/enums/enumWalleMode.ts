export enum EnumWalleMode {
  Combined = 'combined', // 組合辯題
  Complete = 'complete', // 完整辯題
}

export const IsEnumWalleMode = (input: EnumWalleMode): input is EnumWalleMode => {
  return Object.values(EnumWalleMode).includes(input) ? true : false;
};
