<script lang="ts" setup>
import { computed, useSlots } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  }
});

const isOperationShow = computed(() => {
  const { opt } = useSlots();

  return !!opt;
});
</script>

<template>
  <div
    class="sop-basic-info"
    :style="{
      padding: $slots.cover ? '0 0 0 88px' : '0'
    }"
  >
    <div v-if="$slots.cover" class="sop-basic-info__cover">
      <slot name="cover" />
    </div>
    <p class="sop-basic-info__title">
      {{ title }}
    </p>

    <div class="sop-meta-info">
      <slot />
    </div>

    <div
      v-if="isOperationShow"
      class="sop-basic-info__opt"
    >
      <slot name="opt" />
    </div>
  </div>
</template>

