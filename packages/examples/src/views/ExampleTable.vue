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
import { SopBasicTable } from '../components/SopBasicTable';
import type { TableConfig, TableColumn } from '@seemusic/ui-components';

const tableConfig: TableConfig = {
  isPagination: true,
  pagination: reactive({
    currentPage: 2,
    pageSize: 20,
    total: 100
  })
};

const currentChange = (pageNum: number) => {
  tableConfig.pagination.currentPage = pageNum;
};

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
</script>
