import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';

export const DT_LOCALSTORAGE_KEY_DUMMYS = 'DT_LOCALSTORAGE_KEY_DUMMYS';

export const EMPTY_DUMMY_CONTENT: DummyContent = {
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
  },
    {
    id: 'debate-dummy-003',
    name: '反方論點集2',
    contents: JSON.parse(JSON.stringify(DEFAULT_DUMMY_CONTENTS)),
  },
    {
    id: 'debate-dummy-004',
    name: '反方論點集3',
    contents: JSON.parse(JSON.stringify(DEFAULT_DUMMY_CONTENTS)),
  },
    {
    id: 'debate-dummy-005',
    name: '反方論點集4',
    contents: JSON.parse(JSON.stringify(DEFAULT_DUMMY_CONTENTS)),
  },
]

export const DEFAULT_DUMMY: Dummy = {
  id: '',
  name: '',
  contents: [],
}

export const EMPTY_DUMMY: Dummy = {
  id: '',
  name: '',
  contents: [],
}