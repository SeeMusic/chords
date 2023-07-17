<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export interface PageHeaderProps {
  title: string;
  back?: RouteLocationRaw | number;
}

// eslint-disable-next-line vue/no-setup-props-destructure
// const {
//   title,
//   back,
// } = defineProps<PageHeaderProps>();

defineProps({
  title: {
    type: String,
    default: ''
  },
  back: {
    type: [Object, Number] as PropType<RouteLocationRaw | number>,
    default: 0
  }
});

</script>

<template>
  <div class="sop-page__hd">
    <div
      v-if="back"
      class="sop-page-path"
    >
      <template v-if="typeof back === 'number'">
        <a
          href="#"
          @click.prevent="useRouter().go(back as unknown as number)"
        >
          <i class="sop-icon sop-icon--arrow-down" />返回
        </a>
      </template>

      <template v-else>
        <RouterLink
          :to="back"
        >
          <i class="sop-icon sop-icon--arrow-down" />返回
        </RouterLink>
      </template>

      <span class="slice">/</span>
      <span>{{ title }}</span>
    </div>

    <div
      v-else
      class="sop-page-title"
    >
      {{ title }}
    </div>

    <div
      v-if="$slots.opt"
      class="sop-page-opt"
    >
      <slot name="opt" />
    </div>
  </div>
</template>
