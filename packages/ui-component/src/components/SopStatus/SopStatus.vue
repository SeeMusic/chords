<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator(value: string) {
      return [
        'primary', 'warning', 'info', 'danger', 'all', 'success'
      ].indexOf(value) !== -1;
    }
  },
  color: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
});

const iconColorStyle = computed(() => {
  if (props.color !== '') {
    return {
      backgroundColor: props.color
    };
  }

  return {};
});
</script>

<template>
  <span class="sop-status">
    <i
      :class="`sop-status__icon--${type}`"
      :style="iconColorStyle"
    />
    <em
      v-if="text"
      class="sop-status__text"
    >
      {{ text }}
    </em>
  </span>
</template>

