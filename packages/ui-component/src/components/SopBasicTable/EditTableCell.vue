<template>
  <div class="edit-cell">
    <template v-if="!isEdit">
      <span>{{ defaultContent }}</span>

      <!-- 编辑行时才能在 cell 中触发变更 -->
      <template v-if="editMode === 'EDIT_COLUMN'">
        <Icon
          class="edit-cell__hover-icon"
          icon='solar:pen-2-outline'
          @click="editScheduler(true)"
        />
      </template>
    </template>

    <template v-else>
      <!-- datePicker timePicker 需要单独处理 -->
      <template v-if="column.editComponent === 'ElDatePicker'">
        <ElDatePicker v-model="bindVal" v-bind="ComponentProps" />
      </template>
      <template v-else-if="column.editComponent === 'ElTimePicker'">
        <ElTimePicker v-model="bindVal" v-bind="ComponentProps" />
      </template>

      <template v-else>
        <Component
          :is="ComponentName"
          v-model="bindVal"
          v-bind="ComponentProps"
        >
          <template v-if="column.editComponent === 'ElSelect'">
            <ElOption
              v-for="item in column.editComponentProps?.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </template>
        </Component>
      </template>

      <template v-if="editMode !== 'EDIT_ROW'">
        <Icon
          class="edit-cell__icon"
          icon='clarity:success-line'
          @click="existCellEdit(true)"
        />
        <Icon
          class="edit-cell__icon"
          icon='ic:baseline-clear'
          @click="existCellEdit(false)"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  ElInput, ElInputNumber,
  ElSelect, ElSelectV2, ElTimeSelect, ElCascader,
  ElSwitch,
  ElTimePicker, ElDatePicker, ElMessage,
  ElOption
} from 'element-plus';
import { Icon } from '@iconify/vue';
import { useLocale } from '../../composables/useLocale';
import type { TableColumn } from './SopBasicTable';
import type { Recordable } from '../../shims';

const props = defineProps<{
  column: TableColumn
  scope: Recordable
  isOpenEdit: boolean
  isCancelEditRow: boolean
}>();
const emits = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'edit-column-change', val: any): void
  (e: 'cancel-edit-row-state-change'): void
}>();

const { t } = useLocale();

const componentMap = {
  'ElInput': ElInput,
  'ElInputNumber': ElInputNumber,
  'ElSelect': ElSelect,
  'ElSelectV2': ElSelectV2,
  'ElTimeSelect': ElTimeSelect,
  'ElCascader': ElCascader,
  'ElSwitch': ElSwitch,
  'ElTimePicker': ElTimePicker,
  'ElDatePicker': ElDatePicker
};

const isEdit = ref(false);

const ComponentName = computed(() => props.column.editComponent ? componentMap[props.column.editComponent] : ElInput);
const ComponentProps = computed(() => props.column.editComponentProps ? props.column.editComponentProps : {});
const ComponentRule = computed(() => props.column.editRule);
// 获取编辑模式
const editMode = computed(() => props.column.editRow ? 'EDIT_ROW' : props.column.editColumn ? 'EDIT_COLUMN' : '');

const defaultContent = ref(props.scope.row[props.column.prop as string] || '');
const bindVal = ref(defaultContent.value);


watch(
  () => props.isOpenEdit,
  (isOpenEdit) => {
    editScheduler(isOpenEdit);

    // 重置
    if (!isOpenEdit) {
      if (!props.isCancelEditRow) {
        existCellEdit(true, false);
      } else {
        emits('cancel-edit-row-state-change');
      }
      bindVal.value = defaultContent.value;
    }
  }
);


/**
 * 退出表格编辑模式
 */
function existCellEdit(flag: boolean, isNeedScheduler = true) {
  if (flag) {
    if ((ComponentRule.value || ComponentRule.value === undefined) && !bindVal.value) {
      ElMessage.error(t('sop.basicTable.emptyRuleValidatorText'));
      return;
    }

    defaultContent.value = bindVal.value;
    emits('edit-column-change', defaultContent.value);
  } else {
    // 重置
    bindVal.value = defaultContent.value;
  }

  if (isNeedScheduler) {
    editScheduler(false);
  }
}

/**
 * edit 调度器
 */
async function editScheduler(editable: boolean) {
  if (props.column.editColumnScheduler && !isEdit.value) {
    isEdit.value = await props.column.editColumnScheduler();
  } else {
    isEdit.value = editable;
  }
}
</script>
