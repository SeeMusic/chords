import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { UIComponentsResolver } from '@seemusic/ui-components/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: 'src/dts/auto-imports.d.ts',
      imports: ['vue', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        UIComponentsResolver({ prefix: 'sop' })
      ],
      dts: 'src/dts/components.d.ts',
      extensions: [
        'vue'
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 需要把 element 自定义样式提前加入; 在 main.ts 中引入会出现优先级顺序不对的问题
        additionalData: '@use "./src/assets/theme.scss" as *;',
      },
    },
  },
});
