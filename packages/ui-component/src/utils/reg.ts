/**
 * @description 匹配是否为 url
 * @param str string
 * @returns boolean
 */
export const isURL = (str: string) =>
  /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(str);