export enum EnumDummyContentAddMode {
  Batch = 'batch',
  Single = 'single'
}


export const IsEnumDummyContentAddMode = (input: EnumDummyContentAddMode): input is EnumDummyContentAddMode => {
  return Object.values(EnumDummyContentAddMode).includes(input) ? true : false;
};
