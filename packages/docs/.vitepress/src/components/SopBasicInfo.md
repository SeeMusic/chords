## 基础用法

:::demo

```vue
<template>
  <SopBasicInfo title="标题" />
</template>
```
:::

## default Slots

::: tip
推荐插槽内的行内元素使用 `span` 作为最外层，因为内部样式做了对应的处理。
:::

:::demo

```vue
<template>
  <SopBasicInfo title="xxx合同">
    <template #default>
      <span>
        <ElTag type="danger" size="small">
          存在手动终止记录
        </ElTag>
      </span>
      <span>
        <SopStatus type="danger" text="未过审" />
      </span>
      <span>
        创建时间：2022-10-16 00:00:00
      </span>
      <span>
        更新时间：2022-10-16 00:00:00
      </span>
    </template>
  </SopBasicInfo>
</template>
```
:::

## cover Slots

:::demo 

```vue
<template>
  <SopBasicInfo title="标题">
    <template #cover>
      <SopCover type="contract" />
    </template>
  </SopBasicInfo>
</template>
```
:::

## opt Slots

:::demo 

```vue
<template>
  <SopBasicInfo title="标题">
    <template #opt>
      <ElButton type="primary" size="small">操作</ElButton>
    </template>
  </SopBasicInfo>
</template>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `title`       | 标题  | `string` | 无 | 是 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `-`       | 自定义默认内容  |  | 
| `cover`       | 详情头图  | 一般配合 `SopCover` 使用 | 
| `opt`       | 右侧自定义操作内容区域  |  | 