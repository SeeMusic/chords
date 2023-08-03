<template>
  <ElTooltip
    effect="light"
    placement="top-start"
  >
    <ElIcon>
      <WarningFilled />
    </ElIcon>

    <template #content>
      <code>{{ content }}</code>
    </template>
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MoreTip',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
});
</script>
