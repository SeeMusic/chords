## 基础用法

:::demo 

```vue
<template>
  <SopCard>
    内容
  </SopCard>
</template>
```
:::

## 有标题卡片

:::demo 

```vue
<template>
  <SopCard title="卡片标题" >

    <template #titleExtra>
      额外的标题部分
    </template>
    卡片内容
  </SopCard>
</template>
```
:::

## footer Slots

:::demo 

```vue
<template>
  <SopCard title="卡片标题" >
    <template #footer>
      <ElButton type="primary" size="small">submit</ElButton>
    </template>
  </SopCard>
</template>
```
:::

## opt Slots

:::demo 

```vue
<template>
  <SopCard title="卡片标题" >
    <template #opt>
      <ElButton type="primary" size="small">action</ElButton>
    </template>
  </SopCard>
</template>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `title`        | 默认支持类型  |  `string`  | 无 | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `-`       | 自定义默认内容  |  | 
| `footer`       | 底部操作区域  |  | 
| `opt`       | 头部右侧操作区域  |  | 