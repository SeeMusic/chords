<script lang="ts" setup>
defineProps<{title?: string}>();
</script>

<template>
  <div class="sop-card">
    <div
      v-if="title !== ''"
      class="sop-card__hd"
    >
      <span
        class="sop-card__hd-title"
      >
        {{ title }}

        <slot name="titleExtra" />
      </span>
      <span
        v-if="$slots.opt"
        class="sop-card__hd-opt"
      >
        <slot name="opt" />
      </span>
    </div>
    <div class="sop-card__bd">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="sop-card__ft"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

