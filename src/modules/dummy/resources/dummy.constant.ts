import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';

export const DT_LOCALSTORAGE_KEY_DUMMYS = 'DT_LOCALSTORAGE_KEY_DUMMYS';

export const EMPTY_DUMMY_CONTENT: DummyContent = {
  id: 'debate-dummy-content-000',
  disabled: false,
  content: '(無設定攻防內容)'
}

export const DEFAUT_DUMMY_CONTENT: DummyContent = {
  id: '',
  disabled: false,
  content: ''
}

export const DEFAULT_DUMMY_CONTENTS: Array<DummyContent> = [
  {
    id: 'debate-dummy-content-001',
    disabled: false,
    content: '內容 1'
  },
  {
    id: 'debate-dummy-content-002',
    disabled: false,
    content: '內容 2'
  }
]

export const DEFAULT_DUMMYS: Array<Dummy> = [
  {
    id: 'debate-dummy-001',
    name: '正方論點集',
    contents: JSON.parse(JSON.stringify(DEFAULT_DUMMY_CONTENTS)),
  },
  {
    id: 'debate-dummy-002',
    name: '反方論點集',
    contents: JSON.parse(JSON.stringify(DEFAULT_DUMMY_CONTENTS)),
  }
]

export const DEFAULT_DUMMY: Dummy = {
  id: '',
  name: '',
  contents: [],
}

export const EMPTY_DUMMY: Dummy = {
  id: 'debate-dummy-000',
  name: '(無設定木人樁)',
  contents: [],
}