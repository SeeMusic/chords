## 基础用法

:::demo 

```vue
<template>
  <div>
    带有 text 的状态
    <SopStatus 
      v-for="item in statusList"
      :key="item.type"
      :type="item.type" 
      :text="item.text" 
    />
  </div>

  <div>
    没有 text 的状态
    <SopStatus 
      v-for="item in statusList"
      :key="item.type"
      :type="item.type" 
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const statusList = ref([
      { type: 'danger', text: '错误' },
      { type: 'warning', text: '警告' },
      { type: 'success', text: '成功' },
      { type: 'info', text: '常规' },
      { type: 'primary', text: '主要' },
      { type: 'all', text: '全部' },
    ]);

    return {
      statusList
    }
  }
});
</script>

<style>
.sop-status {
  padding-left: 10px;
}
</style>
```
:::

## 自定义颜色

:::demo 

```vue
<template>
    <SopStatus 
      v-for="item in statusList"
      :key="item.color"
      :color="item.color" 
      :text="item.text" 
    />
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const statusList = ref([
      { color: 'red', text: '红' },
      { color: 'orange', text: '橙' },
      { color: 'yellow', text: '黄' },
      { color: 'green', text: '绿' },
      { color: 'cyan', text: '青' },
      { color: 'blue', text: '蓝' },
      { color: 'purple', text: '紫' },
    ]);

    return {
      statusList
    }
  }
});
</script>

<style>
.sop-status {
  padding-left: 10px;
}
</style>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `type`        | 默认支持类型  |  `enum` <MoreTip content="danger、primary、success、warning、info、all" />  | 无 | 否 |
| `color`       | 自定义颜色    |  `string` | 无 | 否 |
| `text`        | 文本         |  `string` | 无 | 否 |