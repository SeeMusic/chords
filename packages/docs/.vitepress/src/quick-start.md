`@seemusic/ui-components` 基于 `Vue3` 开发，看见音乐中后台组件库。

# 安装

```
pnpm add @seemusic/ui-components
```

## 全量导入组件

```ts
// main.ts

import '@seemusic/ui-components/styles';
import { createApp } from 'vue';
import { createSeeMusic } from '@seemusic/ui-components';
import * as components from '@seemusic/ui-components/components';

const app = createApp(App);
const musicUI = createSeeMusic({ components });
app.use(musicUI);
```

## 按需导入组件

```ts
// xxx.vue
import { SopBasicInfo } from '@seemusic/ui-components/components';
```

## 自动导入组件（推荐）

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

如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@seemusic/ui-components/lib/volar"]
  }
}
```