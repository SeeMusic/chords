<template>
  <div>
    <ElButton type="primary" @click="$router.push('/example-table')">go to example table</ElButton>
    <ElButton type="primary" @click="$router.push('/example-table/child')">go to example table child</ElButton>
    <ElButton type="primary" @click="$router.push('/examples/child')">go to example child</ElButton>
    <SopCard>
      <ElButton @click="dialogVisible_1 = true">无 footer dialog</ElButton>
      <SopDialog
        v-model:visible="dialogVisible_1"
        :is-show-footer="false"
        title="Dialog"
      ></SopDialog>

      <ElButton @click="dialogVisible_2 = true">有 footer dialog</ElButton>
      <SopDialog
        v-model:visible="dialogVisible_2"
        is-show-default-footer
        title="Dialog"
      ></SopDialog>
    </SopCard>

    <SopCard>
      <ElButton @click="drawerVisible_1 = true">无 footer drawer</ElButton>
      <SopDrawer
        v-model:visible="drawerVisible_1"
        :is-show-footer="false"
        title="Drawer"
      ></SopDrawer>
      <ElButton @click="drawerVisible_2 = true">有 footer drawer</ElButton>
      <SopDrawer
        v-model:visible="drawerVisible_2"
        is-show-default-footer
        title="Drawer"
      ></SopDrawer>
    </SopCard>

    <SopPageHeader
      :title="['设置', '列表', '编辑']"
      :back="{}"
    ></SopPageHeader>

    <SopCard>
      <SopBasicTable
        v-loading="false"
        :columns="tableColumns"
        :config="tableConfig"
        :data="tableData"
        @size-change="onSizeChange"
        @current-change="currentChange"
      >
        <template #date>
          hello vue
        </template>
      </SopBasicTable>
    </SopCard>

    <SopCard>
      <SopDataTable :cols="4">
        <template v-for="item in 16" :key="item">
          <SopDataTableItem v-if="item % 2 === 0" :label="`名称-${item}`">内容{{item}}</SopDataTableItem>
        </template>
        <SopDataTableItem v-if="dialogVisible_1" label="名称">内容5</SopDataTableItem>
        <SopDataTableItem v-else label="名称">内容6</SopDataTableItem>
        <template v-if="dialogVisible_1">
          <SopDataTableItem label="名称">内容7</SopDataTableItem>
        </template>
        <template v-else>
          <SopDataTableItem label="名称">
            <SopStatus
              :type="dialogVisible_1 ? 'success' : 'info'"
              :text="dialogVisible_1 ? '是' : '否'"
            />
            8
          </SopDataTableItem>
        </template>
      </SopDataTable>
    </SopCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn, TableConfig } from '@seemusic/ui-components';
import { ref } from 'vue';

const dialogVisible_1 = ref(false);
const dialogVisible_2 = ref(false);
const drawerVisible_1 = ref(false);
const drawerVisible_2 = ref(false);

const tableConfig = ref<TableConfig>({
  isPagination: true,
  pagination: {
    pageSize: 10,
    currentPage: 1,
    total: 10000
  }
});

const currentChange = (pageNum: number) => {
  tableConfig.value.pagination!.currentPage = pageNum;
};

const onSizeChange = (size: number) => {
  tableConfig.value.pagination.pageSize = size;
};

const tableColumns: TableColumn[] = [
  {
    prop: 'date',
    customRender: 'date',
    label: '日期',
    formatter: () => 'hello world'
  },
  {
    prop: 'name',
    label: '名称',
    // placeholder: 'xxxxx'
    // formatter: () => '////'
  },
  {
    prop: 'address',
    label: '地址',
    fixed: 'right',
  },
];

const tableData = [
  {
    date: '2016-05-03',
    name: '',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'aaaaa',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'bbbbb',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'ccccc',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>

<style lang="scss">
.sop-card {
  margin-bottom: 10px;
}
</style>
