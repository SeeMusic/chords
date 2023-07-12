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

<script setup lang="ts">
defineProps<{ content: string }>();
</script>
