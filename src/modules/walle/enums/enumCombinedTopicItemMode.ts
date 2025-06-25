export enum EnumCombinedTopicItemMode {
  FrontItem = 'frontItem', // 辯題前項
  BackItem = 'backItem'    // 辯題後項
}

export const IsEnumTopicItemItem = (input: EnumCombinedTopicItemMode): input is EnumCombinedTopicItemMode => {
  return Object.values(EnumCombinedTopicItemMode).includes(input) ? true : false;
};
