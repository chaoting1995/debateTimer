export enum EnumTemplateStatus {
  Open = 'Open',
  Close = 'close'
}


export const IsEnumTemplateStatus = (input: EnumTemplateStatus): input is EnumTemplateStatus => {
  return Object.values(EnumTemplateStatus).includes(input) ? true : false;
};
