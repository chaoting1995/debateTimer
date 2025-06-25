import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import ServiceFormat from 'services/format.service';
import { Walle, WalleContent, WalleContentCategoryGroup } from 'modules/walle/resources/walle.type';
import { EnumWalleMode, IsEnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { ErrorCreateObjectByColumnEnum } from 'api/errors/errorCreateObjectByColumnEnum.class';

const createWalle = (response: Walle): Walle => {
  const objectName = 'Walle';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  if (!IsEnumWalleMode(response['mode'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'mode',
      response['mode'],
      Object.values(EnumWalleMode),
    );
  }

  return {
    id: ServiceFormat.toString(response['id']),
    name: ServiceFormat.toString(response['name']),
    mode: response['mode'],
    contents: createWalleContents(response['contents'])
  };
};

const createWalles = (response: Walle[]): Walle[] => {
  return ServiceFormat.toObjectArray<Walle>(response, createWalle);
};

const createWalleContent = (response: WalleContent): WalleContent => {
  const objectName = 'WalleContent';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    id: ServiceFormat.toString(response['id']),
    disabled: ServiceFormat.toBoolean(response['disabled']),
    category: ServiceFormat.toString(response['category']),
    content: ServiceFormat.toString(response['content']),
  };
};

const createWalleContents = (response: WalleContent[]): WalleContent[] => {
  return ServiceFormat.toObjectArray<WalleContent>(response, createWalleContent);
};

const createWalleContentCategoryGroups = (walleContents: WalleContent[]): WalleContentCategoryGroup[] => {
  return walleContents.reduce((acc: WalleContentCategoryGroup[], walleContent: WalleContent) => {
    // 未分類的物件，「分類命名」為「無分類」
    const categoryName = walleContent.category === '' ? '無分類' : walleContent.category;

    // 尋找是否已有相同分類的物件
    let categoryGroup = acc.find(group => group.category === categoryName);

    // 如果沒有，則建立一個新的分類群組
    if (!categoryGroup) {
      categoryGroup = { category: categoryName, walleContents: [] };
      acc.push(categoryGroup);
    }

    // 將辯題加入對應的分類群組中
    categoryGroup.walleContents.push(walleContent);

    return acc;
  }, []);
};

const FactoryWalle = {
  createWalle,
  createWalles,
  createWalleContentCategoryGroups
};

export default FactoryWalle;
