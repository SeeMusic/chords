## 基础用法

:::demo 

```vue
<template>
  <SopPagination
    v-model:currentPage="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    @current-change="currentChange"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 100
});

function currentChange(pageNum: number) {
  pagination.currentPage = pageNum;
}
</script>
```
:::

## default Slots

:::demo 

```vue
<template>
  <SopPagination
    v-model:currentPage="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    @current-change="currentChange"
  >
    这是默认 插槽
  </SopPagination>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 100
});

function currentChange(pageNum: number) {
  pagination.currentPage = pageNum;
}
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `$attrs`        | 支持 `ElPagination` 所有属性及方法  |    | 无 | 否 |
| `page-size`        | 每页显示条目个数  |  `number`  | 无 | 否 |
| `total`        | 总条目数	  |  `number`  | 无 | 否 |
| `current-page`        | 当前页数	  |  `number`  | 无 | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `-`       | 自定义默认内容，如果有默认插槽，对应默认内容将会不存在  |  | 