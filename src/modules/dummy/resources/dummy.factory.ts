import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import ServiceFormat from 'services/format.service';
import { Dummy, DummySetting } from 'modules/dummy/resources/dummy.type';

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


const createDummySetting = (response: DummySetting): DummySetting => {
  const objectName = 'DummySetting';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    dummyDisabled: ServiceFormat.toArray<string>(response['dummyDisabled'])
  };
};


const FactoryDummy = {
  createDummy,
  createDummys,
  createDummySetting
};

export default FactoryDummy;
