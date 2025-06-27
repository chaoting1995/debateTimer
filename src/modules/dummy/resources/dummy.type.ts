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

/*
dummys        攻防組，列表
dummy         攻防組
dummyContents 攻防子項，列表
dummyContent  攻防子項
*/