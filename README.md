`@seemusic/ui-components` 基于 `Vue3` 开发，看见音乐中后台组件库。

## 安装

``` bash
pnpm add @seemusic/ui-components
```

## 快速开始

本项目样式依赖于 `@seemusic/element-plus-theme-sop` `@seemusic/styles` 使用之前请先进行安装。

```bash
pnpm install @seemusic/element-plus-theme-sop @seemusic/styles
```

推荐项目内使用方式如下。

-  `src/assets` 新建 `css/theme.scss`。
-  `vite.config.ts` 中增加相应配置。

```scss 
@import "@seemusic/styles/src/colors/seemusic.scss";
@import "@seemusic/element-plus-theme-sop";
```

```ts [vite.config.ts]
import { defineConfig } from 'vite';

export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        // 需要把 element 自定义样式提前加入; 在 main.ts 中引入会出现优先级顺序不对的问题
        additionalData: '@use "@/assets/css/theme.scss" as *;'
      }
    }
  },
  // ...
});
```

### 全量导入组件

```ts
// main.ts

import '@seemusic/ui-components/styles';
import { createApp } from 'vue';
import { createSeeMusic } from '@seemusic/ui-components';
import * as components from '@seemusic/ui-components/components';

const app = createApp(App);
const SeeMusicUI = createSeeMusic({ components });
app.use(SeeMusicUI);
```

### 按需导入组件

```ts
// xxx.vue
import { SopBasicInfo } from '@seemusic/ui-components/components';
```

### 自动导入组件（推荐）

使用 `unplugin-vue-components` 插件来开启自动按需导入组件的支持。

配置 `vite.config.ts` 并在 `Components` 插件中使用 `UIComponentsResolver` 组件解析器。

插件会自动解析模板中使用到的组件并导入。

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { UIComponentsResolver } from '@seemusic/ui-components/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 自动导入
        UIComponentsResolver({ prefix: 'sop' })
      ],
      dts: 'src/dts/components.d.ts',
      extensions: ['vue'],
      include: [
        /\.vue$/,
        /\.vue\?vue/
      ]
    })
  ],
});
```

## `Volar` 支持

如果您使用 `VSCode`，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@seemusic/ui-components/lib/volar"]
  }
}
```

## 高级

如果你想使用 `SopStatus` 、 `SopFilterForm` 、 `SopDataTable`、`SopDataTableItem`、`SopCover`、`SopBasicInfo`、`SopCard`、`SopPageHeader` 之外的组件，需要做以下修改。

`main.ts` 中引入 `element-plus` 的样式文件

```ts
import './assets/css/basic.scss';
import 'element-plus/dist/index.css';
```

修改 `vite.config.ts` 中的 `element-plus` 自动导入配置

```ts
export default defineConfig({
  // ...
  plugins: [
    Components: {
      // ElementPlusResolver({
      //   importStyle: 'sass'
      // }),
      // 不再使用插件自动导入组件样式的功能
      ElementPlusResolver(),
      // ....
    }
    // ....
  ]
  // ....
})
```