import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import ServiceFormat from 'services/format.service';
import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';

const createDummy = (response: Dummy): Dummy => {
  const objectName = 'Dummy';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    id: ServiceFormat.toString(response['id']),
    name: ServiceFormat.toString(response['name']),
    contents: createDummyContents(response['contents'])
  };
};

const createDummys = (response: Dummy[]): Dummy[] => {
  return ServiceFormat.toObjectArray<Dummy>(response, createDummy);
};

const createDummyContent = (response: DummyContent): DummyContent => {
  const objectName = 'DummyContent';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    id: ServiceFormat.toString(response['id']),
    disabled: ServiceFormat.toBoolean(response['disabled']),
    content: ServiceFormat.toString(response['content']),
  };
};

const createDummyContents = (response: DummyContent[]): DummyContent[] => {
  return ServiceFormat.toObjectArray<DummyContent>(response, createDummyContent);
};


const FactoryDummy = {
  createDummy,
  createDummys
};

export default FactoryDummy;
