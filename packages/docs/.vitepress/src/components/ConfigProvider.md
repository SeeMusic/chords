::: warning 提示
该组件目前仅支持国际化相关配置内容。
:::

## 基础用法

:::demo 

```vue
<template>
  <ElSelect v-model="lang" @change="languageChange">
    <ElOption 
      v-for="item in languageOptions" 
      :key="item.label" 
      :label="item.label" 
      :value="item.value" 
    />
  </ElSelect>
  <SopConfigProvider :locale="locale" >
    <ElConfigProvider :locale="elementPlusLocale">
      <ElTable :data="[]" />
      <SopPagination :current-page="10" :page-size="1" :total="100" />
    </ElConfigProvider>
  </SopConfigProvider>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { SopConfigProvider } from '@seemusic/ui-components/components';
// ui-components 语言包
import { zhCn, zhTw, enUs, jaJp } from '@seemusic/ui-components/locales';
// element-plus 语言包
import zhCN from 'element-plus/es/locale/lang/zh-cn';
import enUS from 'element-plus/es/locale/lang/en';
import zhTW from 'element-plus/es/locale/lang/zh-tw';
import ja from 'element-plus/es/locale/lang/ja'

enum LANGUAGE {
  CN = 'zh-CN',
  EN = 'en-US',
  TW = 'zh-TW',
  JA = 'ja-JP'
}

const languageOptions = [
  { label: '中文', value: LANGUAGE.CN },
  { label: '英文', value: LANGUAGE.EN },
  { label: '繁体', value: LANGUAGE.TW },
  { label: '日文', value: LANGUAGE.JA },
]

const lang = ref(getDefaultLanguage());

const locale = computed(() => {
  if (lang.value === LANGUAGE.CN) {
    return zhCn
  } else if (lang.value === 'zh-TW' || lang.value === 'zh-HK') {
    return zhTw
  } else if (lang.value === 'en-US') {
    return enUs
  } else if (lang.value === 'ja-JP') {
    return jaJp
  }
  return zhCn
});

const elementPlusLocale = computed(() => {
  if (lang.value === LANGUAGE.CN) {
    return zhCN
  } else if (lang.value === 'zh-TW' || lang.value === 'zh-HK') {
    return zhTW
  } else if (lang.value === 'en-US') {
    return enUS
  } else if (lang.value === 'ja-JP') {
    return ja
  }
  return zhCN
})

// 获取默认语言，存储到 localStorage 中
function getDefaultLanguage() {
  const localeStorageLang = window.localStorage.getItem('lang');
  if (localeStorageLang) {
    return localeStorageLang || 'zh-CN';
  }

  const lang = window.navigator.language;
  let locale = 'zh-CN';

  if (lang.includes('en')) {
    locale = 'en-US';
  } else if (lang === 'zh-TW' || lang === 'zh-HK') {
    locale = 'zh-TW';
  } else if (lang.includes('ja')) {
    locale = 'ja-JP'
  }

  window.localStorage.setItem('lang', locale || 'zh-CN');
  return locale || 'zh-CN';
};

// 切换语言时修改 localStorage 中的语言
function languageChange() {
  window.localStorage.setItem('lang', lang.value || 'zh-CN');
  window.location.reload();
}
</script>
```
:::


## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `locale`        | 翻译文本对象  |  `object`  | `zhCn` | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `-`       |  插槽内容 |  | 