<script lang="ts" setup>
import { computed, useSlots } from 'vue';

defineProps({
  label: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean,
    default: true
  }
});

// 根据 slot 有没传值判断操作区是否显示
const isOperationShow = computed(() => {
  const { opt } = useSlots();

  return !!opt;
});
</script>

<template>
  <div
    class="sop-data-table-item"
    :class="{
      'sop-data-table-item--no-border': !border
    }"
  >
    <div
      v-if="label !== ''"
      class="sop-data-table-item__label"
    >
      {{ label }}
      <div
        v-if="isOperationShow"
        class="sop-data-table-item__opt"
      >
        <slot name="opt" />
      </div>
    </div>
    <div
      class="sop-data-table-item__content"
    >
      <slot />
    </div>
  </div>
</template>

