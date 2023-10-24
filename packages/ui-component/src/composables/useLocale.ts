import { inject, isRef, ref, computed, unref } from 'vue';
import zhCN from '../locales/lang/zh-cn';
import type { InjectionKey, ComputedRef } from 'vue';
import type { Language } from '../locales';

type Recordable = Record<string, string | number>

export const localeContextKey: InjectionKey<Language> = Symbol('sopLocaleContextKey');

const get = (object: Language, path: string, defaultValue = 'undefined') => {
  let newPath: string[] = [];
  newPath = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return newPath.reduce((a: any, b: string) => {
    return (a || {})[b];
  }, object) || defaultValue;
};

const getLocaleContent = (locale: ComputedRef<Language>) => {
  return (path: string, option?: Recordable) =>
    (get(unref(locale), path) as string)
      .replace(
        /\{(\w+)\}/g,
        (_, key) => `${option?.[key]}`
      );
};

export const useLocale = () => {
  const locale = inject(localeContextKey) || zhCN;
  const localeRef = isRef(locale) ? locale : ref(locale);
  const lang = computed(() => unref(locale).name);

  return {
    lang,
    localeRef,
    t: getLocaleContent(computed(() => locale))
  };
};
