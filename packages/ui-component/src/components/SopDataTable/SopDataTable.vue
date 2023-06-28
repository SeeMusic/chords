<script lang="ts" setup>
import { onMounted, ref, computed, watchEffect, nextTick } from 'vue';

// const props = withDefaults(
//   defineProps<{
//     title?: string,
//     cols?: number
//     gap?: number
//   }>(),
//   {
//     title: '',
//     cols: 2,
//     gap: 16
//   }
// );

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  cols: {
    type: Number,
    default: 2
  },
  gap: {
    type: Number,
    default: 16
  }
});

// flex 尾行左对齐 dirty 写法
// 1. 获取实际 slot 中 item 内容项个数
const content = ref<HTMLElement | null>(null);
const itemCount = ref(0);

onMounted(() => {
  if (content.value !== null) {
    itemCount.value = content.value.querySelectorAll('.sop-data-table-item').length;
  }
});

// 2. 计算出尾行 是否需要填充占位 div、需要的话需要填充多少个
const needFillPlaceholder = computed(() => itemCount.value % props.cols !== 0);
const placeholderCount = computed(() => needFillPlaceholder.value
  ? props.cols - (itemCount.value % props.cols)
  : 0
);

// 3. 计算出每一项的宽度并在 style 中引用
const itemWidth = computed(() => `calc((100% - ${props.gap * (props.cols - 1)}px) / ${props.cols})`);

watchEffect(() => {
  nextTick(() => {
    if (content.value) {
      const items = content.value.querySelectorAll('.sop-data-table-item');
      if (items.length) {
        for (let i = 0; i <= items.length; i++) {
          if ((items[i] as HTMLDivElement)) {
            (items[i] as HTMLDivElement).style.width = itemWidth.value;
          }
        }
      }
    }
  });
});
</script>

<template>
  <div
    class="sop-data-table"
  >
    <div
      v-if="title !== ''"
      class="sop-data-table__title"
    >
      {{ title }}
    </div>

    <div
      ref="content"
      class="sop-data-table__content"
    >
      <slot />
      <template v-if="needFillPlaceholder">
        <div
          v-for="n in placeholderCount"
          :key="n"
          class="sop-data-table-item sop-data-table-item--no-border"
        />
      </template>
    </div>
  </div>
</template>
