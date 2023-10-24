<template>
  <ElSelect v-model="lang" @change="languageChange">
    <ElOption label="中文" value="zh-CN" />
    <ElOption label="英文" value="en-US" />
    <ElOption label="繁体" value="zh-TW" />
  </ElSelect>

  <SopConfigProvider :locale="locale" >
    <ElConfigProvider :locale="elementPlusLocale">
      <ElTable :data="[]" />
      <SopPagination :current-page="10" :page-size="1" :total="100" />
    </ElConfigProvider>
  </SopConfigProvider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { zhCn, zhTw, enUs } from '@seemusic/ui-components/locales';
import zhCN from 'element-plus/es/locale/lang/zh-cn';
import enUS from 'element-plus/es/locale/lang/en';
import zhTW from 'element-plus/es/locale/lang/zh-tw';
import { SopConfigProvider } from '@seemusic/ui-components/components';

const getDefaultLanguage = () => {
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
  }
  window.localStorage.setItem('lang', locale || 'zh-CN');
  return locale || 'zh-CN';
};

const lang = ref(getDefaultLanguage());
const locale = computed(() =>
  lang.value === 'zh-CN'
    ? zhCn
    : lang.value === 'zh-TW' || lang.value === 'zh-HK'
      ? zhTw
      : lang.value === 'en-US'
        ? enUs
        : undefined
  );

const elementPlusLocale = computed(() =>getDefaultLanguage() === 'zh-CN'
  ? zhCN
  : getDefaultLanguage() === 'en-US'
    ? enUS
    : getDefaultLanguage() === 'zh-TW' || getDefaultLanguage() === 'zh-HK'
      ? zhTW
      : zhCN
);

watch(
  () => lang.value,
  () => {
    console.log(lang.value);
  },
  { immediate: true }
);

function languageChange() {
  window.localStorage.setItem('lang', lang.value || 'zh-CN');
  window.location.reload();
}
</script>
