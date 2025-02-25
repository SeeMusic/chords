import zhCn from './lang/zh-cn';
import zhTw from './lang/zh-tw';
import enUs from './lang/en-us';
import jaJp from './lang/ja-jp';
import viVn from './lang/vi-vn';

export {
  zhCn,
  zhTw,
  enUs,
  jaJp,
  viVn
};

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  sop: TranslatePair
}
