import ServiceFormat from 'services/format.service';
import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import { FixedWalleSetting } from 'modules/walle/resources/fixedWalle.type';

const createFixedWalleSetting = (response: FixedWalleSetting): FixedWalleSetting => {
  const objectName = 'FixedWalleSetting';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    disableds: ServiceFormat.toArray<string>(response['disableds'])
  };
};

const FactoryFixedWalle = {
  createFixedWalleSetting
};

export default FactoryFixedWalle;
