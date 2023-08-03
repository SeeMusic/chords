:::tip
强制要求与 `SopDataTable` 配合使用。
:::

## 基础用法

:::demo 

```vue
<template>
  <SopDataTable>
    <SopDataTableItem
      label="内容"
      v-for="item in 6"
      :key="item"
    >
     <ElInput size="small" />
    </SopDataTableItem>
  </SopDataTable>
</template>

<script lang="ts" setup>
</script>
```
:::

## 没有边框

:::demo 

```vue
<template>
  <SopDataTable>
    <SopDataTableItem
      label="内容"
      :border="false"
      v-for="item in 6"
      :key="item"
    >
     <ElInput size="small" />
    </SopDataTableItem>
  </SopDataTable>
</template>

<script lang="ts" setup>
</script>
```
:::

## opt Slots

:::demo 

```vue
<template>
  <SopDataTable>
    <SopDataTableItem
      label="内容"
      :border="false"
      v-for="item in 6"
      :key="item"
    >
     <ElInput size="small" />
     <template #opt>
      <a href="#" class="highlight">操作</a>
     </template>
    </SopDataTableItem>
  </SopDataTable>
</template>

<script lang="ts" setup>
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `border`       | 底边框    | `boolean`  | `true` | 否 |
| `label`       | 标签文本    |  `string` |  | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `opt`       | 右侧操作区域  |  | 