import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';

export const DUMMY_LABEL = '攻防群組';
export const DUMMY_CONTENT_LABEL = '攻防子項';

export const DT_LOCALSTORAGE_KEY_DUMMYS = 'DT_LOCALSTORAGE_KEY_DUMMYS';

export const EMPTY_DUMMY_CONTENT: DummyContent = {
  id: 'debate-dummy-content-000',
  disabled: false,
  content: `(無設定${DUMMY_CONTENT_LABEL})`
}

export const DEFAUT_DUMMY_CONTENT: DummyContent = {
  id: '',
  disabled: false,
  content: ''
}

export const EXAMPLE_DUMMY_CONTENTS: DummyContent[] = Array(5)
  .fill('')
  .map((_, index) => ({
    id: `debate-dummy-content-00${index + 1}`,
    disabled: false,
    content: `${DUMMY_CONTENT_LABEL} ${index + 1}`,
  }));

export const EXAMPLE_DUMMYS: Dummy[] = [
  {
    id: 'debate-dummy-001',
    name: '2025ＸＸ盃-正方論點(範例)',
    contents: JSON.parse(JSON.stringify(EXAMPLE_DUMMY_CONTENTS)),
  },
  {
    id: 'debate-dummy-002',
    name: '2025ＸＸ盃-反方論點(範例)',
    contents: JSON.parse(JSON.stringify(EXAMPLE_DUMMY_CONTENTS)),
  }
]

export const DEFAULT_DUMMY: Dummy = {
  id: '',
  name: '',
  contents: [],
}

export const EMPTY_DUMMY: Dummy = {
  id: 'debate-dummy-000',
  name: `(無設定${DUMMY_LABEL})`,
  contents: [],
}