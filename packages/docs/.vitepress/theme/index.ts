// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import { createSeeMusic } from '@seemusic/ui-components';
import * as components from '@seemusic/ui-components/components';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { useComponents } from './useComponents';
import * as customComponent from './components';
import './style.scss';
import './theme.scss';
import '@seemusic/styles/src/colors/seemusic.scss';
import 'element-plus/dist/index.css';
import '@seemusic/element-plus-theme-sop';
import '@seemusic/ui-components/styles';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';


export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    Theme.enhanceApp({ app, router, siteData });
    useComponents(app);

    const musicUI = createSeeMusic({ components });
    app.use(musicUI);

    // element-plus and icon
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    // 自定义组件注册
    for (const [key, component] of Object.entries(customComponent)) {
      app.component(key, component);
    }

    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Icon', Icon);
    app.component('RouterLink', RouterLink);
  }
};
