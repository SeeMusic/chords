<template>
  <div class="edit-cell">
    <template v-if="!isEdit">
      <span>{{ defaultContent }}</span>
      <Icon
        class="edit-cell__hover-icon"
        icon='solar:pen-2-outline'
        @click="editScheduler(true)"
      />
    </template>

    <template v-else>
      <template v-if="column.editComponent === 'ElInput'">
        <Component
          :is="ComponentName"
          v-model="bindVal"
          v-bind="ComponentProps"
          @blur="existCellEdit(true)"
        />
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
      </template>

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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ElInput, ElInputNumber,
  ElSelect, ElSelectV2, ElTimeSelect, ElCascader,
  ElSwitch,
  ElTimePicker, ElDatePicker, ElMessage,
  ElOption
} from 'element-plus';
import { Icon } from '@iconify/vue';
import type { TableColumn } from './SopBasicTable';
import type { Recordable } from '../../shims';

const props = defineProps<{
  column: TableColumn
  scope: Recordable
}>();
const emits = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'edit-change', val: any): void
}>();

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

const defaultContent = ref(props.scope.row[props.column.prop as string] || '');
const bindVal = ref(defaultContent.value);

/**
 * 退出表格编辑模式
 */
function existCellEdit(flag: boolean) {
  if (flag) {
    console.log('edit-value: ', bindVal.value);
    if ((ComponentRule.value || ComponentRule.value === undefined) && !bindVal.value) {
      ElMessage.error('不允许为空');
      return;
    }

    defaultContent.value = bindVal.value;
    emits('edit-change', defaultContent.value);
  } else {
    // 重置
    bindVal.value = defaultContent.value;
  }
  editScheduler(false);
}

/**
 * edit 调度器
 */
async function editScheduler(editable: boolean) {
  if (props.column.editScheduler && !isEdit.value) {
    isEdit.value = await props.column.editScheduler();
  } else {
    isEdit.value = editable;
  }
}
</script>
