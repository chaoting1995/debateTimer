import { Dummy, DummySetting } from 'modules/dummy/resources/dummy.type';

export const DT_LOCALSTORAGE_KEY_DUMMY_SETTING = 'DT_LOCALSTORAGE_KEY_DUMMY_SETTING';

export const DT_LOCALSTORAGE_KEY_DUMMYS = 'DT_LOCALSTORAGE_KEY_DUMMYS';

export const DEFAULT_DUMMYS: Array<Dummy> = [
  {
    id: 'debate-dummy-001',
    name: '正方論點集',
    content:'',
  },
  {
    id: 'debate-dummy-002',
    name: '反方論點集',
    content:'',
  },
]

export const DEFAULT_DUMMY: Dummy = {
  id: 'debate-dummy-000',
  name: '(目前無設定木人樁)',
  content: '',
};

export const EMPTY_DUMMY: Dummy = {
  id: '',
  name: '',
  content: '',
};

export const DEFAULT_DUMMY_SETTING : DummySetting = {
  dummyDisabled: []
};