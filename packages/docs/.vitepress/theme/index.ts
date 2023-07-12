// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import { vuePlugin } from "vitepress-demo-editor";
import { createSeeMusic } from '@seemusic/ui-components';
import * as components from '@seemusic/ui-components/components';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import MoreTip from './components/MoreTip.vue';
import './style.css'
import './theme.css'
import "vitepress-demo-editor/dist/style.css";
import "@seemusic/styles/src/colors/seemusic.scss";
import "@seemusic/element-plus-theme-sop";
import '@seemusic/ui-components/styles';
import 'element-plus/dist/index.css'


export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(vuePlugin, {
      defaultDirection: "column", // 默认显示方向
      ms: 30, // 编辑器防抖时间
      handleError(errs) {}, // 错误信息
      onMonacoCreated(monaco) {}, // monaco 创建成功时触发
    });

    const musicUI = createSeeMusic({ components });
    app.use(musicUI);

    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    app.component('MoreTip', MoreTip);
  }
}
