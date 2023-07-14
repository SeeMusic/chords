<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'album' | 'track' | 'cp' | 'customer' | 'contract' | 'dsp' | 'playlist-project' | 'playlist',
    src?: string
    width?: number
    height?: number,
    placeholder?: string,
    isCoverEdit?: boolean,
  }>(),
  {
    type: 'album',
    src: '',
    width: 72,
    height: 72,
    placeholder: '',
    isCoverEdit: false,
  }
);

defineEmits<{
  (e: 'cover-edit'): void
}>();

const CoverTypeList = [
  'album',
  'track',
  'cp',
  'customer',
  'contract',
  'dsp',
  'playlist-project',
  'playlist'
];

const backgroundStyle = computed(() => {
  return {
    backgroundPosition: `0 -${props.width * CoverTypeList.indexOf(props.type)}px`,
    backgroundSize: `${props.width}px auto`
  };
});

const coverRef = ref<HTMLDivElement | null>(null);

function mouseenterHandler(event: MouseEvent) {
  const target = (event.target as HTMLElement).children.item(0) as HTMLElement;
  target.style.opacity = '1';
}
function mouseleaveHandler(event: MouseEvent) {
  const target = (event.target as HTMLElement).children.item(0) as HTMLElement;
  target.style.opacity = '0';
}

onMounted(() => {
  if (coverRef.value && props.isCoverEdit) {
    coverRef.value.addEventListener('mouseenter', mouseenterHandler);
    coverRef.value.addEventListener('mouseleave', mouseleaveHandler);
  }
});

onBeforeUnmount(() => {
  if (coverRef.value && props.isCoverEdit) {
    coverRef.value.removeEventListener('mouseenter', mouseenterHandler);
    coverRef.value.removeEventListener('mouseleave', mouseleaveHandler);
  }
});

</script>

<template>
  <div
    ref="coverRef"
    class="sop-cover"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    @click="isCoverEdit && $emit('cover-edit')"
  >
    <div
      class="edit"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        lineHeight: `${height}px`
      }"
    >
      <template v-if="isCoverEdit">
        <i class="sop-icon sop-icon--input" />
      </template>
    </div>

    <template v-if="src !== ''">
      <img
        :src="src ? src : ''"
        :width="width ? width : 0"
        :height="height ? height : 0"
      >
    </template>
    <template v-else-if="placeholder !== ''">
      <span>
        {{ placeholder }}
      </span>
    </template>
    <template v-else>
      <span
        class="default-cover"
        :style="backgroundStyle"
      />
    </template>
  </div>
</template>

