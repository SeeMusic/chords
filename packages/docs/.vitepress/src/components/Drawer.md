## 基础用法

:::demo 

```vue
<template>
  <ElButton @click="visible = true">open drawer</ElButton>

  <SopDrawer
    v-model:visible="visible"
    title="Tips"
  >
    this is message
  </SopDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElButton } from 'element-plus';

const visible = ref(false);
</script>
```
:::

## 自定义头部

:::demo

```vue
<template>
  <ElButton @click="visible = true">
    Open Modal with customized header
  </ElButton>
  <SopDrawer v-model:visible="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <ElButton type="danger" @click="close">
          <ElIcon class="el-icon--left"><CircleCloseFilled /></ElIcon>
          Close
        </ElButton>
      </div>
    </template>
    This is modal content.
  </SopDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton } from 'element-plus';
import { CircleCloseFilled } from '@element-plus/icons-vue';

const visible = ref(false);
</script>

<style lang="scss">
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
```
:::

## 提交内容

:::demo

```vue
<template>
  <ElButton @click="visible = true">
    modal
  </ElButton>
  <SopDrawer 
    v-model:visible="visible" 
    title="Tips"
    is-default-footer
    @on-ok="submit"
    @on-close="close"
  >
    This is drawer content.
  </SopDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElMessage } from 'element-plus';
import type { OnOKEvent } from '@seemusic/ui-components/shims';

const visible = ref(false);

const submit = (event: OnOKEvent) => {
  event.setLoading(true);
  setTimeout(() => {
    event.setLoading(false);
    event.close();
    ElMessage.success('submit~');
  }, 2000);
};
const close = () => {
  ElMessage.success('close~');
};
</script>
```
:::

## 自定义 footer

:::demo

```vue
<template>
  <ElButton @click="visible = true">
    modal
  </ElButton>
  <SopDrawer 
    v-model:visible="visible" 
    title="Tips"
    @on-close="close"
  >
    This is modal content.
    <template #footer>
      custom content footer
    </template>
  </SopDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElMessage } from 'element-plus';
import type { OnOKEvent } from '@seemusic/ui-components/shims';

const visible = ref(false);

const close = () => {
  ElMessage.success('close~');
};
</script>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `attrs` | 支持所有 `ElDrawer` 属性  |    |  | 否 |
| `v-model:visible` | 绑定值  |  `boolean`  | `false` | 否 |
| `width`       | 宽度    |  `string` | `45%` | 否 |
| `isDefaultFooter` | 是否显示默认的`footer`内容 <MoreTip content="当值为 false 时以下属性全部失效" /> |  `boolean`  | `false` | 否 |
| `isShowConfirmBtn` | 是否显示确认按钮  |  `boolean` | `true` | 否 |
| `isShowCancelBtn` | 是否显示取消按钮  |  `boolean` | `true` | 否 |
| `confirmBtnText` | 确认按钮文本  |  `string` | 确认 | 否 |
| `cancelBtnText` | 取消按钮文本  |  `string` | 取消 | 否 |

### Slots

| 插槽名           |      说明     |
| ------------- | :-----------: | 
| `-`       |  `Drawer` 的内容 | 
| `header`       |  对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 | 

### Events

| 名称           |      说明     |  类型 |
| ------------- | :-----------: | :-----------: | 
| `onOk`       |  点击确认按钮时触发   | `(e: OnOKEvent) => void` |
| `onClose`       | `Drawer` 关闭时触发  | `function` |