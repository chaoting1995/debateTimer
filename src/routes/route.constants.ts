export const PAGE_LINK = {
  timer: 'timer',
  timerID: 'timer/:id',
  timers: 'timers',
  walle: 'walle',
  walleID: 'walle/:id',
  walles: 'walles',
  walleAdd: 'walle/add',
  walleEditID: 'walle/edit/:id',
  dummy: 'dummy',
  dummyID: 'dummy/:id',
  dummys: 'dummys',
  dummyAdd: 'dummy/add',
  dummyEditID: 'dummy/edit/:id',
  listening: 'listening',
  listenings: 'listenings',
  listeningID: 'listening/:id',
  topicCreator: 'topicCreator',
};

export const pageLinks = Object.fromEntries(
  Object.entries(PAGE_LINK).map(([key, value]) => [key, '/' + value])
) as typeof PAGE_LINK;

export const PAGE_TITLE = {
  timer: '辯論計時小幫手',
  timerWithVersion: '辯論計時小幫手 2.0',
  timers: '自訂計時器',
  timerAdd: '新增計時器',
  timerEdit: '編輯計時器',
  topicCreator: '瓦力二號',
  dummy: '辯論木人樁',
  dummys: '自訂木人樁',
  dummyAdd: '新增木人樁',
  dummyEdit: '編輯木人樁',
  walle: '瓦力二號',
  walles: '自訂瓦力二號',
  walleAdd: '新增瓦力二號',
  walleEdit: '編輯瓦力二號',
  listening: '戰場判斷小幫手',
  listenings: '戰場判斷 歷史紀錄',
};

export const PAGE_DESCRIPTION = {
  timer: '辯論計時小幫手 2.0 - 辯論計時小幫手的致敬之作。無論是個人練習還是正式比賽，「辯論計時小幫手」都能輕鬆幫你進行計時 預設模板包含「新式奧瑞岡444制」、「新式奧瑞岡333制」、「自由辯論」。 功能: -自訂適合您需要的計時器 -儲存自訂計時器 -自動響鈴 -自由辯論雙計時器',
  dummy: '辯論木人樁，用於讓選手大量反覆練習攻防。在攻防搜集到一定程度後，增加選手練習頻率，並且練習完的可以關掉。',
  walle: '瓦力二號，又名「瓦力2號」、「瓦力2號2011」、「辯題產生器」、「Wall-E Ⅱ 2011」，是哲耀學長發明的紙牌遊戲，用於辯論的鍛鍊。玩家可以在隨機配對的辯題中，大量練習不同的辯題，鍛練基本功。',
  topicCreator: '瓦力二號，又名「瓦力2號」、「瓦力2號2011」、「辯題產生器」、「Wall-E Ⅱ 2011」，是哲耀學長發明的紙牌遊戲，用於辯論的鍛鍊。玩家可以在隨機配對的辯題中，大量練習不同的辯題，鍛練基本功。',
  listening: '用於在練習賽後，驗收選手對「個別戰場的戰場判斷」。',
};
