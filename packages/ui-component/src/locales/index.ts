import zhCn from './lang/zh-cn';
import zhTw from './lang/zh-tw';
import enUs from './lang/en-us';

export {
  zhCn,
  zhTw,
  enUs
};

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  sop: TranslatePair
}
