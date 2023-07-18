:::tip
基于 `ElForm` 的二次封装，支持展开收起及所属属性。

一般配合 `SopDataTable` 与 `SopTableTableItem` 用于表格的筛选条件。
:::

## 基础用法

:::demo 

```vue
<template>
  <SopFilterForm 
    size="small"
    @keyup.enter="getList"
  >
    <ElFormItem label="username">
      <ElInput />
    </ElFormItem>
    <ElFormItem label="password">
      <ElInput />
    </ElFormItem>
  </SopFilterForm>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';

const getList = () => {
  ElMessage.success('数据获取成功');
};
</script>
```
:::

## opt Slots

:::demo 

```vue
<template>
  <SopFilterForm>
    <ElFormItem label="username">
      <ElInput />
    </ElFormItem>
    <ElFormItem label="password">
      <ElInput />
    </ElFormItem>

    <template #opt>
      <ElButton type="primary" size="small">筛选</ElButton>
    </template>
  </SopFilterForm>
</template>
```
:::

## 提交表单

:::demo 

```vue
<template>
  <SopFilterForm 
    size="small"
    :model="form"
  >
    <ElFormItem label="username">
      <ElInput v-model="form.username" />
    </ElFormItem>
    <ElFormItem label="password">
      <ElInput v-model="form.password" />
    </ElFormItem>

    <template #opt>
      <ElButton type="primary" size="small" @click="submit">提交</ElButton>
    </template>
  </SopFilterForm>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const form = ref({
  username: '',
  password: ''
});

const submit = () => {
  ElMessage.success(`u: ${form.value.username} - p: ${form.value.password}`);
}
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `$attrs`       | `ElForm` 所有属性    |   | 无 | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `opt`       | 操作区域  |  | 