:::tip
强制要求与 `SopDataTableItem` 组合使用
:::

## 基础用法

:::demo 

```vue
<template>
  <SopDataTable>
    <SopDataTableItem
      v-for="item in contents"
      :key="item"
    >
      {{ item }}
    </SopDataTableItem>
  </SopDataTable>
</template>

<script lang="ts" setup>
const contents = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6'];
</script>
```
:::

## 单列模式

:::demo 

```vue
<template>
  <SopDataTable :cols="1">
    <SopDataTableItem
      v-for="item in contents"
      :key="item"
    >
      {{ item }}
    </SopDataTableItem>
  </SopDataTable>
</template>

<script lang="ts" setup>
const contents = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6'];
</script>
```
:::

## 带有标题

:::demo 

```vue
<template>
  <SopDataTable title="xx 表单">
    <SopDataTableItem
      v-for="item in contents"
      :key="item"
    >
      {{ item }}
    </SopDataTableItem>
  </SopDataTable>
</template>

<script lang="ts" setup>
const contents = ['content1', 'content2'];
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `title`       | 标题    | `string`  | 无 | 否 |
| `cols`       | 栅格的列数    |  `number` | 2 | 否 |
| `gap`       | 栅格的间隔    |  `number` | 16 | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `-`       | 默认插槽  |  | 
