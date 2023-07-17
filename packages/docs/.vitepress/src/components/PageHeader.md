## 基础用法

:::demo 

```vue
<template>
  <SopPageHeader title="页头" />
</template>
```
:::

## 可回退页头

:::demo 

```vue
<template>
  <SopPageHeader
    title="页头" 
    :back="-1"
  />
</template>
```
:::

## opt Slots

:::demo 

```vue
<template>
  <SopPageHeader 
    title="页头" 
    :back="-1"
  >
    <template #opt>
      <a href="#" class="highlight">操作</a>
    </template>
  </SopPageHeader>
</template>
```
:::

## API

### Attributes

| 名称           |      说明     |  类型 |  默认值  |  必填  |
| ------------- | :-----------: | :-----------: | :-----------: | :-----------: |
| `title`       | 页头    |  `string` | 无 | 是 |
| `back`       | 页面回退的地址   |  `RouteLocationRaw、 number` | 0 | 否 |

### Slots

| 插槽名           |      说明     |  子标签 |
| ------------- | :-----------: | :-----------: | 
| `opt`       | 操作区域  | 一般内部使用 `a` 使用与自定义类名 `highlight` | 