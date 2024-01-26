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

    <!-- <SopCard>
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
    </SopCard> -->
  </div>

  <SopBasicInfo
    title="Title"
  >
    <template #titleSuffix>
      <ElTag type="danger">警告</ElTag>
    </template>

    <template #cover>
      <SopCover type="contract" />
    </template>

    <span>
      <ElTag
        type="danger"
        size="small"
      >
        警告状态
      </ElTag>
    </span>

    <span>
      创建时间：2024-10-10
    </span>
    <span>
      更新时间：2024-10-10
    </span>

    <template #opt>
      xxx
    </template>
  </SopBasicInfo>


  <SopCard>
    <SopDataTable :cols="4">
        <SopDataTableItem
          label="合同 ID"
        >
          <a
            class="highlight"
            _target="blank"
          >
            111
          </a>
        </SopDataTableItem>

        <SopDataTableItem
          label="合同编号"
        >
          bianhao
        </SopDataTableItem>

        <SopDataTableItem
          label="来源"
        >
          laiyuan
        </SopDataTableItem>

        <SopDataTableItem
          label="相关 CP"
        >
          <a
            class="highlight"
            _target="blank"
          >
            name
          </a>
        </SopDataTableItem>

        <SopDataTableItem
          label="是否补充合同？"
          v-if="true"
        >
          <!-- <SopStatus
            v-bind="{
                type: 'success',
                text: `是，原始合同 ID：${contractInfo.originalAgreementId}`
            "
          /> -->
        </SopDataTableItem>

        <SopDataTableItem
          label="自动匹配"
        >
          <SopStatus
            :type="'info'"
            :text="'否'"
          />
        </SopDataTableItem>

        <SopDataTableItem
          label="新增专辑授权书自动关联"
          v-if="SopDataTableItemVisible"
        >
          <SopStatus
            :type="'success'"
            :text="'是'"
          />
        </SopDataTableItem>
      </SopDataTable>
  </SopCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumn, TableConfig } from '@seemusic/ui-components/shims';

const dialogVisible_1 = ref(false);
const dialogVisible_2 = ref(false);
const drawerVisible_1 = ref(false);
const drawerVisible_2 = ref(false);
const SopDataTableItemVisible = ref(false);

setTimeout(() => {
  SopDataTableItemVisible.value = true;
}, 3000);

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
