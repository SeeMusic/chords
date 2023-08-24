<template>
  <ElButton type="primary" @click="$router.push('/examples')">go to examples</ElButton>
  <ElButton type="primary" @click="$router.push('/example-table/child')">go to example table child</ElButton>
    <ElButton type="primary" @click="$router.push('/examples/child')">go to example child</ElButton>
  <SopBasicTable
    ref="tableRef"
    :columns="tableColumns"
    :config="tableConfig"
    :data="tableData"
  >

    <template #actions="scope">
      <ElButton
        v-if="!(scope.$index === tableRef.getEditRowIndex())"
        size="small"
        type="primary"
        @click="onEditRow(scope)"
      >
        编辑
      </ElButton>
      <ElButton
        v-else
        size="small"
        type="primary"
        @click="onEditRowDone(scope)"
      >
        完成
      </ElButton>
      <ElButton size="small" @click="onCancelEditRow">取消</ElButton>
    </template>
  </SopBasicTable>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import type { Recordable } from '@/shims';
import { SopBasicTable } from '../components/SopBasicTable';
import type { TableColumn, TableConfig } from '@seemusic/ui-components';

const tableRef = ref();
const tableConfig: TableConfig = {
  isPagination: true,
  pagination: {}
};
const tableColumns: TableColumn[] = [
  { label: 'Date', prop: 'date' },
  {
    prop: 'name',
    label: 'Name',
    editable: true,
    editRow: true,
    editComponent: 'ElInput',
    editComponentProps: {
      size: 'small'
    }
  },
  { prop: 'address', label: 'Address',editable: true,
    editRow: true,
    editComponent: 'ElInput',
    editComponentProps: {
      size: 'small'
    } },
  { customRender: 'actions', label: '操作' }
];
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
];


function onEditRow(scope: Recordable) {
  tableRef.value.setEditRowIndex(scope.$index);
}

async function onEditRowDone(scope: Recordable) {
  tableRef.value.setEditRowIndex(null);
  // 内容要在异步中获取
  nextTick(() => {
    ElMessage.success(`row: ${JSON.stringify(scope.row)}, $index: ${scope.$index}`);
  });
}

function onCancelEditRow() {
  tableRef.value.setEditRowIndex(null);
  tableRef.value.cancelEdit();
}
</script>


<!-- <template>
  <SopBasicTable
    :columns="tableColumns"
    :data="tableData"
    @edit-column-change="onEditChange"
  />
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import type { Recordable } from '@/shims';
import { SopBasicTable } from '../components/SopBasicTable';
import type { TableColumn } from '@seemusic/ui-components';

const onEditChange = (scope: Recordable) => {
  ElMessage.success(`row: ${JSON.stringify(scope.row)}, $index: ${scope.$index}`);
};

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
          callback: () => {
            resolve(true);
          },
        });
      });
    }
  },
];

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
];
</script> -->
