import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import ServiceFormat from 'services/format.service';
import { Walle, WalleContent } from 'modules/walle/resources/walle.type';
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
    content: ServiceFormat.toString(response['content']),
  };
};

const createWalleContents = (response: WalleContent[]): WalleContent[] => {
  return ServiceFormat.toObjectArray<WalleContent>(response, createWalleContent);
};


const FactoryWalle = {
  createWalle,
  createWalles
};

export default FactoryWalle;
