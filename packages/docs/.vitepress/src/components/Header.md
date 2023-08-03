## 基础用法

:::demo 

```vue
<template>
  <SopTheHeader 
    logo="https://pics.kanjian.com/favicon/kanjian-logo-blue@2x.png" 
    @logo-click="logoClick"
  />
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';

const logoClick = () => {
  ElMessage.success('clicked logo');
};
</script>
```
:::

## 副标题

:::demo 

```vue
<template>
  <SopTheHeader 
    logo="https://pics.kanjian.com/favicon/kanjian-logo-blue@2x.png" 
    subTitle="副标题"
  />
</template>
```
:::

## opt Slots

:::demo 

```vue
<template>
  <SopTheHeader 
    logo="https://pics.kanjian.com/favicon/kanjian-logo-blue@2x.png" 
    subTitle="副标题"
  >
    <template #rightOpt>
      右侧内容区域
    </template>
  </SopTheHeader>
</template>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `logo`        | 链接地址  |  `string`  | 无 | 否 |
| `subTitle`        | 副标题 链接或普通文本 |  `string`  | 无 | 否 |

### Events

| 名称           |      说明     |  类型 |
| ------------- | :-----------: | :-----------: | 
| `logo-click`       | `logo` 的 `click` 事件     | `function` |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `rightOpt`       | 头部右侧操作区域  |  | 