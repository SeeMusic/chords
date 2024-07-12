## 基础用法

:::demo 

```vue
<template>
  <SopInput 
    style="width: 200px;"
    placeholder="我是一段 placeholder...我是一段 placeholder...我是一段 placeholder...我是一段 placeholder...我是一段 placeholder..."
    scroll-placeholder
  />
</template>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `$attrs`        | 支持 `ElInput` 所有属性及方法  |    | 无 | 否 |
| `scroll-placeholder`        | 当 placeholder 长度超过 input 内容时滚动  |  `boolean`  | 无 | 否 |
