<template>
  <!-- <SopLayoutMain
    v-model:collapse="collapse"
    :headerOpts="{
      logo: 'https://pics.kanjian.com/favicon/kanjian-logo-blue@2x.png',
      subTitle: '副标题'
    }"
    :sidebarOpts="{
      menuList: navList,
      collapseIcon
    }"
    @logo-click="ElMessage.success('logo clicked')"
  >
    <template #headerRightOpt>
      右侧内容区域
    </template>

    <template #main>
      <RouterView />
    </template>
  </SopLayoutMain> -->



  <div style="display: flex;">
    <SopTheSidebar v-model:collapse="collapse" :menu-list="navList" :collapse-icon="collapseIcon" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { SopTheSidebar } from '../components/SopTheSidebar';
import { ref, h, watch, computed } from 'vue';
import { Icon } from '@iconify/vue';
// import { ElMessage } from 'element-plus';

import { navList } from '@/config';

const collapse = ref(false);
// fluent:text-expand-20-filled
// fluent:text-collapse-20-filled
const collapseIcon = computed(() =>
  collapse.value ? h(Icon, { icon: 'fluent:text-expand-20-filled' }) : h(Icon, { icon: 'fluent:text-collapse-20-filled' }));

watch(
  () => collapse.value,
  () => {
    console.log(collapse.value);
  }
);
</script>
