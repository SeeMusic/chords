## 基础用法

:::demo 

```vue
<template>
  <SopCover 
    v-for="item in coverTypes" 
    :key="item" 
    :type="item" 
  />
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const coverTypes = ref(['album', 'track', 'cp', 'customer', 'contract', 'dsp', 'playlist-project', 'playlist']);
    
    return { coverTypes }
  }
});
</script>
<style>
.sop-cover {
  float: left;
}
.sop-cover:not(:first-child) {
  margin-left: 10px;
}
</style>
```
:::

## 自定义 Cover 及大小

:::demo 

```vue
<template>
  <SopCover 
    src="https://element-plus.org/images/element-plus-logo.svg" 
    :height="28" 
    :width="113" 
  />
</template>
```
:::

## 可编辑 Cover

:::demo 

```vue
<template>
  <SopCover 
    src="https://element-plus.org/images/element-plus-logo.svg"
    is-cover-edit
    @cover-edit="uploadImage"
  />
</template>
<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup() {
    const uploadImage = () => {
      ElMessage.success('请配合 ElUpload 组件实现上传方法');
    };

    return { uploadImage }
  }
});
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `type`        | 根据类型显示 `cover`  |  `enum` <MoreTip content="album、track、cp、customer、contract、dsp、playlist-project、playlist" />  | `album` | 否 |
| `src`       | 自定义 `cover`，优先级高于 `type`    |  `string` | 无 | 否 |
| `width`       | 宽    |  `number` | 72 | 否 |
| `height`       | 高    |  `number` | 72 | 否 |
| `placeholder`        | `src` 和 `type` 不存在时显示内容         |  `string` | 无 | 否 |
| `isCoverEdit`        | 是否可编辑         |  `boolean` | `false` | 否 |
| `coverEdit`        | 编辑 `cover` 的工具函数         |  `function` | 无 | 否 |

### Events

| 名称           |      说明     |  类型 |
| ------------- | :-----------: | :-----------: | 
| `coverEdit`       | 编辑 `cover` 的工具函数，当 `coverEdit` 为 `true`时该方法必传      | `function` |