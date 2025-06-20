export type Dummy = {
  id: string;
  name: string;
  contents:  Array<DummyContent>;
}

export type DummyContent = {
  id: string;
  disabled: boolean;
  content: string;
}