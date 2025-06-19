import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import ServiceFormat from 'services/format.service';
import { Dummy } from 'modules/dummy/resources/dummy.type';

const createDummy = (response: Dummy): Dummy => {
  const objectName = 'Dummy';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    id: ServiceFormat.toString(response['id']),
    name: ServiceFormat.toString(response['name']),
    content: ServiceFormat.toString(response['content'])
  };
};

const createDummys = (response: Dummy[]): Dummy[] => {
  return ServiceFormat.toObjectArray<Dummy>(response, createDummy);
};

const FactoryDummy = {
  createDummy,
  createDummys
};

export default FactoryDummy;
