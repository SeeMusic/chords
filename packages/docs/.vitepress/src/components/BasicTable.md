## 基础用法

:::demo 

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :config="tableConfig"
    :data="tableData"
  />
</template>

<script lang="ts" setup>
import type { TableConfig, TableColumn } from '@seemusic/ui-components'

const tableColumns: TableColumn = [
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '名称' },
  { prop: 'address', label: '地址' },
]

const tableConfig: TableConfig = {}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class， 这样就可以自定义每一行的样式了。

**注意：默认情况下 `BasicTable` 的 `stripe` 是启用的，应该避免产生冲突。**

:::demo 

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :data="tableData"
    :row-class-name="tableRowClassName"
  />
</template>

<script lang="ts" setup>
import type { TableColumn } from '@seemusic/ui-components'

const tableColumns: TableColumn = [
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '名称' },
  { prop: 'address', label: '地址' },
]

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 0) {
    return 'warning-row'
  } else if (rowIndex === 2) {
    return 'success-row'
  }
  return ''
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
```
:::

## 固定表头

纵向内容过多时，可选择固定表头。

只要在 `BasicTable` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。

:::demo 

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :data="tableData"
    height="150"
  />
</template>

<script lang="ts" setup>
import type { TableColumn } from '@seemusic/ui-components'

const tableColumns: TableColumn = [
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '名称' },
  { prop: 'address', label: '地址' },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::

## 展开行

:::demo

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :data="tableData"
  >
    <template #expand="props">
      <div m="4">
        <p m="t-0 b-2">State: {{ props.row.state }}</p>
        <p m="t-0 b-2">City: {{ props.row.city }}</p>
        <p m="t-0 b-2">Address: {{ props.row.address }}</p>
        <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
        <h3>Family</h3>
      </div>
    </template>
  </SopBasicTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableConfig, TableColumn } from '@seemusic/ui-components'

const tableColumns: TableColumn = [
  { prop: 'date', label: 'Date', type: 'expand' },
  { prop: 'name', label: 'Name' },
  { prop: 'address', label: 'Address' },
  { prop: 'state', label: 'State' },
  { prop: 'city', label: 'City' },
  { prop: 'zip', label: 'Zip' },
]
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
  },
]
</script>
```

:::

## 多选

需要用到实例的地方需要增加 `tableRef.xxx` 比如 `multipleTableRef.value.tableRef!.toggleRowSelection(row, undefined)`

:::demo

```vue
<template>
  <SopBasicTable
    ref="multipleTableRef"
    :columns="tableColumns" 
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <template #date="scope">{{ scope.row.date }}</template>
  </SopBasicTable>

  <div style="margin-top: 20px">
    <ElButton @click="toggleSelection([tableData[1], tableData[2]])">
      Toggle selection status of second and third rows
    </ElButton>
    <ElButton @click="toggleSelection()">Clear selection</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import type { TableColumn } from '@seemusic/ui-components'

interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref()

const multipleSelection = ref([])
const toggleSelection = (rows?: User[]) => {

  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.tableRef!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value.tableRef!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableColumns: TableColumn = [
  { label: 'Date', customRender: 'date', type: 'selection' },
  { prop: 'name', label: 'Name' },
  { prop: 'address', label: 'Address' }
]
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

```
:::

## 自定义索引

:::demo 

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :config="tableConfig"
    :data="tableData"
  />
</template>

<script lang="ts" setup>
import type { TableConfig, TableColumn } from '@seemusic/ui-components'
const indexMethod = (index: number) => {
  return index * 2
}
const tableColumns: TableColumn = [
  { prop: 'date', label: '日期', type: 'index', index: indexMethod },
  { prop: 'name', label: '名称' },
  { prop: 'address', label: '地址' },
]

const tableConfig: TableConfig = {}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::


## 自定义表头

自定义表头两种方式

### 使用 renderHeader 执行某一列自定义

该方案会触发控制台警告，压力给到 `element-plus` 这边。详情参考 [问题](https://www.jianshu.com/p/aaec27a6b678)

:::demo
```vue
<template>
  <SopBasicTable 
    :data="filterTableData" 
    :columns="tableColumns"
    style="width: 100%"
  >
    <template #address="scope">
      <ElButton size="small" @click="handleEdit(scope.$index, scope.row)">
        Edit
      </ElButton>
      <ElButton
        size="small"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)"
      >
        Delete
      </ElButton>
    </template>
  </SopBasicTable>
</template>

<script lang="ts" setup>
import { computed, ref, h } from 'vue';
import { ElInput, ElButton } from 'element-plus';

interface User {
  date: string
  name: string
  address: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableColumns = [
  { prop: 'date', label: 'Date' },
  { prop: 'name', label: 'Name' },
  { 
    prop: 'address', 
    label: 'Address',
    customRender: 'address',
    renderHeader: () => {
      return h(ElInput, { modelValue: search.value, size: 'small' })
    }
  }
]

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::

### 使用 header 插槽统一修改 table header

:::demo
```vue
<template>
  <SopBasicTable 
    :data="filterTableData" 
    :columns="tableColumns"
  >
    <template #header="scope">
      这是自己定义的 header {{ scope.column.label }}
    </template>
  </SopBasicTable>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface User {
  date: string
  name: string
  address: string
}
const filterTableData = computed(() =>
  tableData.filter(
    (data) => data.name.toLowerCase()
  )
)
const tableColumns = [
  { prop: 'date', label: 'Date' },
  { prop: 'name', label: 'Name' },
  { prop: 'address', label: 'Address' }
]

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::

## slot 与 render

某一列支持通过 slot 或者 render 方式进行渲染。

通过 `customRender` 进行控制，如果值为 `render` 则需要配合 `render` 函数实现，否则就是对应值的 `slot`

:::demo

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :config="tableConfig"
    :data="tableData"
  >
    <template #date="scope">{{ scope.row.date }}</template>
  </SopBasicTable>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import type { TableConfig, TableColumn } from '@seemusic/ui-components'

const tableColumns: TableColumn = [
  { prop: 'date', customRender: 'date' },
  { 
    prop: 'name',
    customRender: 'render', 
    render(scope) {
      return h('div', scope.row.name)
    }
  },
  { prop: 'address', label: '地址' },
]

const tableConfig: TableConfig = {}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::

## 分页表格

:::demo 

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :config="tableConfig"
    :data="tableData"
    @current-change="currentChange"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import type { TableConfig, TableColumn } from '@seemusic/ui-components'

const tableConfig: TableConfig = {
  isPagination: true,
  pagination: reactive({
    currentPage: 2,
    pageSize: 20,
    total: 100
  })
}

const currentChange = (pageNum: number) => {
  tableConfig.pagination.currentPage = pageNum;
}

const tableColumns: TableColumn = [
  { 
    prop: 'date', 
    label: '日期', 
  },
  { 
    prop: 'name', 
    label: '名称', 
  },
  { 
    prop: 'address', 
    label: '地址', 
  },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::

## 编辑列

:::demo 

```vue
<template>
  <SopBasicTable
    :columns="tableColumns" 
    :data="tableData"
    @edit-change="onEditChange"
  />
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import type { TableConfig, TableColumn } from '@seemusic/ui-components'

const onEditChange = (scope) => {
  ElMessage.success(`row: ${JSON.stringify(scope.row)}, $index: ${scope.$index}`)
}

const tableColumns: TableColumn = [
  { 
    prop: 'date', 
    label: '日期', 
    editable: true, 
    editColumn: true, 
    editComponent: 'ElDatePicker' 
  },
  { 
    prop: 'name', 
    label: '名称', 
    editable: true, 
    editColumn: true, 
    editComponent: 'ElInput',
  },
  { 
    prop: 'address', 
    label: '地址', 
    editable: true, 
    editColumn: true, 
    editComponent: 'ElInput',
    editScheduler: () => {
      return new Promise((resolve) => {
        ElMessageBox.alert('手动控制编辑时机', 'Title', {
          confirmButtonText: 'OK',
          callback: (action: Action) => {
            resolve(true);
          },
        })
      })
    }
  },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
```
:::


## 编辑行 TODO

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `$attrs`        | 支持 `ElTable` 所有属性及方法  |    |  | 否 |
| `columns`        | `column` 的配置  |  `TableColumn[]`  |  | 否 |
| `data`        | 数据源	  |  `Recordable[]`  |  | 否 |
| `config`        | `table` 配置	  |  `TableConfig`  |  | 否 |

### Column 除官方参数外拓展以下参数

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `customRender`| `custom` 值等于 `render` 时传入 `render` 生效，否则它的值就被视为 `slot`  | `string`   |  | 否 |
| `render`        | `custom` 值等于 `render` 时的函数  | `Function` | 否 |
| `type`        |  索引，勾选，展开表格时使用	  | `string` <MoreTip content="'index','selection','expand'" />  |  | 否 |
| `editable`        | 是否开启表格编辑	  |  `boolean`  |  | 否 |
| `editRow`        | 是否开启编辑行	  |  `boolean`  |  | 否 |
| `editColumn`        | 是否开启编辑列	  |  `boolean`  |  | 否 |
| `editRule`        | 对应编辑组件的表单校验 |  `boolean`  | `true` | 否 |
| `editComponent`        | 编辑组件 |  `ComponentsType`  | `ElInput` | 否 |
| `editComponentProps`        | 对应编辑组件的 `props` |  `Recordable`  | `{}` | 否 |
| `editScheduler`        | 对编辑组件的触发控制 |  `Function`  | `function (): Promise<boolean>` | 否 |

**支持编辑组件**

```ts
import {
  ElInput, ElInputNumber,
  ElSelect, ElSelectV2, ElTimeSelect, ElCascader,
  ElSwitch,
  ElTimePicker, ElDatePicker, ElMessage,
  ElOption
} from 'element-plus';

export type ComponentsType = 'ElInput' |
  'ElInputNumber' |
  'ElSelect' |
  'ElSwitch' |
  'ElTimeSelect' |
  'ElTimePicker' |
  'ElSelectV2' |
  'ElDatePicker' |
  'ElCascader'
```

### Config table 的额外配置

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `isPagination`   | 是否开启分页  | `boolean`   | `true` | 否 |
| `pagination`        | 分页的配置  |  `Recordable` <MoreTip content="{ currentPage: number; pageSize: number; total: number }" />  |  | 否 |


### Events

| 名称           |      说明     |  类型 |
| ------------- | :-----------: | :-----------: | 
| `edit-change` | `table cell` 编辑完成后触发    | `function (scope): void` |
| `current-change` | 当前页面更改时触发   | `function (pageNum: number): void` |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `header`       | 统一表头的修改  |  | 
| `expand`       | 展开行  |  | 