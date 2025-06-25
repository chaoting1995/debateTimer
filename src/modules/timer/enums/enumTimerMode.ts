export enum EnumTimerMode {
  Normal = "normal",       // 一般辯論
  Crossfire = "crossfire"  // 自由辯論
}


export const IsEnumTimerMode = (input: EnumTimerMode): input is EnumTimerMode => {
  return Object.values(EnumTimerMode).includes(input) ? true : false;
};
