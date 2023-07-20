## 基础用法

:::demo 

```vue
<template>
  <SopTheSidebar :menu-list="menuList" />
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Icon } from '@iconify/vue';
import type { SidebarListItem } from '@seemusic/ui-components/shims';

const menuList: SidebarListItem[] = [
  {
    title: 'DSP管理',
    icon: h(Icon, { icon: 'ph:git-branch-fill' }),
    subMenu: [
      {
        title: '客户列表',
        path: '/dsp/customer'
      },
      {
        title: 'DSP/SP',
        path: '/dsp/channel'
      },
    ]
  },
  {
    title: '禁用测试',
    icon: h(Icon, { icon: 'ph:scroll-fill' }),
    subMenu: [
      {
        title: '合同列表',
        path: '/contract/'
      }
    ]
  },
  {
    title: '曲库管理',
    icon: h(Icon, { icon: 'icon-park-outline:music' }),
    subMenu: [
      {
        title: '禁用测试',
        path: '/musicverse/track',
      },
      {
        title: '外链测试',
        path: 'https://musichub.kanjian.com'
      }
    ]
  },
]
</script>

<style lang="scss">
.app-aside {
  .el-scrollbar__wrap {
    height: auto !important;
  }
}
</style>
```
:::

## 可禁用菜单

:::demo 

```vue
<template>
  <SopTheSidebar :menu-list="menuList" />
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Icon } from '@iconify/vue';
import type { SidebarListItem } from '@seemusic/ui-components/shims';

const menuList: SidebarListItem[] = [
  {
    title: 'DSP管理',
    icon: h(Icon, { icon: 'ph:git-branch-fill' }),
    subMenu: [
      {
        title: '客户列表',
        path: '/dsp/customer'
      },
      {
        title: 'DSP/SP',
        path: '/dsp/channel'
      },
    ]
  },
  {
    title: '禁用测试',
    icon: h(Icon, { icon: 'ph:scroll-fill' }),
    disabled: true,
    subMenu: [
      {
        title: '合同列表',
        path: '/contract/'
      }
    ]
  },
  {
    title: '曲库管理',
    icon: h(Icon, { icon: 'icon-park-outline:music' }),
    subMenu: [
      {
        title: '禁用测试',
        path: '/musicverse/track',
        disabled: true
      },
      {
        title: '外链测试',
        path: 'https://musichub.kanjian.com'
      }
    ]
  },
]
</script>
```
:::

## 可展开收起菜单

:::demo 

```vue
<template>
  <SopTheSidebar 
    v-model:collapse="collapse"
    :menu-list="menuList" 
    :collapse-icon="collapseIcon"
  />
</template>

<script setup lang="ts">
import { h, computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import type { SidebarListItem } from '@seemusic/ui-components/shims';

const collapse = ref(false);
const collapseIcon = computed(() =>
  collapse.value ? h(Icon, { icon: 'fluent:text-expand-20-filled' }) : h(Icon, { icon: 'fluent:text-collapse-20-filled' }));

const menuList: SidebarListItem[] = [
  {
    title: 'DSP管理',
    icon: h(Icon, { icon: 'ph:git-branch-fill' }),
    subMenu: [
      {
        title: '客户列表',
        path: '/dsp/customer'
      },
      {
        title: 'DSP/SP',
        path: '/dsp/channel'
      },
    ]
  },
  {
    title: '禁用测试',
    icon: h(Icon, { icon: 'ph:scroll-fill' }),
    disabled: true,
    subMenu: [
      {
        title: '合同列表',
        path: '/contract/'
      }
    ]
  },
  {
    title: '曲库管理',
    icon: h(Icon, { icon: 'icon-park-outline:music' }),
    subMenu: [
      {
        title: '禁用测试',
        path: '/musicverse/track',
        disabled: true
      },
      {
        title: '外链测试',
        path: 'https://musichub.kanjian.com'
      }
    ]
  },
]
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `attrs`       | 接收 `ElMenu` 所有的属性    |   |  |  |
| `width`       | 带有 `px` 单位的宽度    |  `string` | `256px` | 否 |
| `v-model:collapse`    | 绑定值    |  `boolean` | `false` | 否 |
| `collapseIcon`       | `VNode` 推荐使用 `@iconify/vue`  | `VNode`  |  | 否 |
| `menuList`     | 数据源    | `SidebarListItem[]` | [] | 否 |
