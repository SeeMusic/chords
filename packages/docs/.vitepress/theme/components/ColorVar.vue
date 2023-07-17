<template>
  <div class="color-var">
    <div
      v-for="item in colorMap"
      :key="item.text"
      class="color-var__item"
    >
      <h2>{{ item.text }}</h2>
      <p v-if="item.desc">{{ item.desc }}</p>

      <div style="display: flex; flex-wrap: wrap;">
        <div
          class="color-block"
          :class="whiteColorList.includes(i.name) ? 'dark' : ''"
          v-for="i in item.color"
          :key="i.name"
          :style="{
            backgroundColor: i.rgb,
            color: types.includes(item.text) ? '#f5f7fa' : '#606266'
          }"
          @click="clipboard(i.name)"
        >
          <span>{{ i.name }}</span>
          <br>
          <span>{{ i.rgb }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';

interface ColorMap {
  text: string
  desc?: string
  color: {
    name: string
    rgb: string
  }[]
}

export default defineComponent({
  name: 'ColorVar',
  setup() {
    const colorMap: ColorMap[] = [
      {
        text: '主色',
        desc: '默认的主色调',
        color: [
          {
            name: '--seemusic-primary',
            rgb: '#0040FF'
          }
        ]
      },
      {
        text: '状态',
        desc: '参考 element-plus 的状态枚举',
        color: [
          {
            name: '--seemusic-success',
            rgb: '#28CA41'
          },
          {
            name: '--seemusic-warning',
            rgb: '#FFBD2E'
          },
          {
            name: '--seemusic-danger',
            rgb: '#FF4B4B'
          },
          {
            name: '--seemusic-info',
            rgb: '#999'
          }
        ]
      },
      {
        text: '文本',
        color: [
          {
            name: '--seemusic-text-normal',
            rgb: '#333'
          },
          {
            name: '--seemusic-text-description',
            rgb: '#999'
          },
          {
            name: '--seemusic-text-disabled',
            rgb: '#CCC'
          },
          {
            name: '--seemusic-text-hover',
            rgb: '#2965FF'
          },
          {
            name: '--seemusic-text-active',
            rgb: '#0040FF'
          }
        ]
      },
      {
        text: 'Border',
        color: [
          {
            name: '--seemusic-border-disabled',
            rgb: '#DDD'
          },
          {
            name: '--seemusic-card-warning-border',
            rgb: '#999'
          },
          {
            name: '--seemusic-card-danger-border',
            rgb: '#CCC'
          },
          {
            name: '--seemusic-card-info-border',
            rgb: '#B2B2B2'
          },
          {
            name: '--seemusic-card-info-bg',
            rgb: '#EEE'
          },
          {
            name: '--seemusic-success-border',
            rgb: '#76E37F'
          },
          {
            name: '--seemusic-success-bg',
            rgb: '#F0FFF0'
          },
          {
            name: '--seemusic-primary-border',
            rgb: '#A3C6FF'
          },
          {
            name: '--seemusic-primary-bg',
            rgb: '#E6F0FF'
          }
        ]
      },
      {
        text: 'highlight',
        color: [
          {
            name: '--seemusic-highlight-bg',
            rgb: '#0040FF'
          },
          {
            name: '--seemusic-highlight-context',
            rgb: '#FFF'
          }
        ]
      },
      {
        text: 'overlay',
        color: [
          {
            name: '--seemusic-overlay',
            rgb: 'rgba(0, 0, 0, .4)'
          }
        ]
      },
      {
        text: 'backgroundColor',
        color: [
          {
            name: '--seemusic-bg-disabled',
            rgb: '#EEE'
          }
        ]
      },
    ];
    const whiteColorList = ['--seemusic-highlight-context'];
    const types = ['主色', '文本', 'highlight'];

    const source = ref('');
    const { copy } = useClipboard({ source });

    const clipboard = (name: string) => {
      source.value = name;
      copy(source.value);
      ElMessage.success(`${source.value} copied success`);
    };
    return {
      colorMap,
      types,
      whiteColorList,
      clipboard
    };
  },
});
</script>

<style lang="scss">
.color-var {
  .color-block {
    position: relative;
    width: 180px;
    height: 100px;
    margin-top: 10px;
    margin-left: 16px;
    padding: 10px;
    border-radius: 6px;
    line-height: 24px;
    box-sizing: border-box;
    border: 1px solid rgb(238, 238, 238);
    cursor: pointer;
    transition: box-shadow .3s ease;
    &:hover {
      box-shadow: 2px 2px 10px rgba($color: #000000, $alpha: .1);
    }
    &.dark {
      color: #606266 !important;
    }
  }
}
</style>
