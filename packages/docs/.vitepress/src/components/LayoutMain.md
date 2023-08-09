:::tip
`SopTheHeader`、`SopTheSidebar` 的二次封装。
:::

## 基础用法

:::demo 

```vue
<template>
  <SopLayoutMain
    v-model:collapse="collapse"
    :headerOpts="{
      logo: 'https://pics.kanjian.com/favicon/kanjian-logo-blue@2x.png',
      subTitle: '副标题'
    }"
    :sidebarOpts="{
      menuList,
      collapseIcon
    }"
    @logo-click="ElMessage.success('logo clicked')"
  >
    <template #headerRightOpt>
      右侧内容区域
    </template>

    <template #main>
      <div class="container">主体内容区域</div>
    </template>
  </SopLayoutMain>
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { ElMessage } from 'element-plus';
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
.app-layout-main {
  min-height: auto !important;
  .app-aside {
    .el-scrollbar__wrap {
      height: auto !important;
    }
  }
}
</style>
```

:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `headerOpts`       | `SopTheHeader 的属性对象`    | `HeaderOpts` |  | 是 |
| `sidebarOpts`       | `SopTheSidebar 的属性对象`   | `SidebarOpts`  |  | 是 |
| `v-model:collapse`    | 绑定值    |  `boolean` | `false` | 否 |
| `collapseIcon`       | `VNode` 推荐使用 `@iconify/vue`  | `VNode`  |  | 否 |

### Events

| 名称           |      说明     |  类型 |
| ------------- | :-----------: | :-----------: | 
| `logo-click`       | `logo` 的 `click` 事件     | `function` |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `headerRightOpt`       | 头部右边区域  |  | 
| `main`       | 主内容区域  |  | 