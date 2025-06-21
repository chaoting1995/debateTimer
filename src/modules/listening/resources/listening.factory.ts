import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import { ErrorCreateObjectByColumnEnum } from 'api/errors/errorCreateObjectByColumnEnum.class';
import ServiceFormat from 'services/format.service';
import { Listening, ListeningRow } from 'modules/listening/resources/listening.type';
import { EnumArgumentStatus, IsEnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';

const createListeningRow = (response: ListeningRow): ListeningRow => {
  const objectName = 'ListeningRow';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  if (!IsEnumArgumentStatus(response['column2'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'column2',
      response['column2'],
      Object.values(EnumArgumentStatus),
    );
  }

  return {
    id: ServiceFormat.toString(response['id']),
    column1: ServiceFormat.toString(response['column1']),
    column2: response['column2'],
    bg: ServiceFormat.toString(response['bg'])
  };
};

const createListeningRows = (responses: ListeningRow[]): ListeningRow[] => {
  return ServiceFormat.toObjectArray<ListeningRow>(responses, createListeningRow);
};

const createListening = (response: Listening): Listening => {
  const objectName = 'Listening';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  return {
    id: ServiceFormat.toString(response['id']),
    name: ServiceFormat.toString(response['name']),
    owner: ServiceFormat.toString(response['owner']),
    updatedAt: ServiceFormat.toNumber(response['updatedAt']),
    rows: createListeningRows(response['rows'])
  };
};

const createListenings = (response: Listening[]): Listening[] => {
  return ServiceFormat.toObjectArray<Listening>(response, createListening);
};

const FactoryListening = {
  createListening,
  createListenings
};

export default FactoryListening;
