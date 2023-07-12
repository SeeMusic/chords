<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    logo: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  emits: ['logo-click'],
  setup(props) {
    const isImg = computed(() => /\.(png|jpg|gif|jpeg|webp)$/.test(props.subTitle));

    return {
      isImg
    };
  }
});
</script>

<template>
  <div class="sop-the-header">
    <div class="the-header-left__content">
      <div class="the-logo" @click="$emit('logo-click')">
        <img
          :src="logo"
          height="20"
        >
      </div>

      <div v-if="subTitle" class="the-sub-title">
        <img
          v-if="isImg"
          :src="subTitle"
        >
        <h3 v-else>
          {{ subTitle }}
        </h3>
      </div>
    </div>

    <div class="the-header-right__content">
      <slot name="rightOpt"></slot>
    </div>
  </div>
</template>
