import { defineConfig } from 'vitepress';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version } from '../../ui-component/package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'chords-ui',
  description: '看见音乐中后台组件库',
  lang: 'zh-CN',
  srcDir: './.vitepress/src',
  cacheDir: './.vitepress/src/cache',
  outDir: './dist',
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/quick-start' },
      {
        text: version, link: 'https://www.npmjs.com/package/@kanjianmusic/fn',
      },
      {
        text: 'Link',
        items: [
          {
            text: 'Fn 公共函数库', link: 'https://fn.seemusic.xyz/'
          },
          {
            text: 'F2E 文档站点', link: 'https://f2e.seemusic.xyz/'
          }
        ]
      },
    ],
    sidebar: renderSidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SeeMusic/chords' }
    ],
    outline: 'deep',
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最近更新时间',
    editLink: {
      pattern: 'https://github.com/SeeMusic/chords/blob/main/packages/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
  },
  vite: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plugins: [demoblockVitePlugin()],
    server: {
      port: 8000
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },

    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom'
      });
    }
  }
});

function renderSidebar() {
  return [
    {
      items: [
        {
          text: '导读',
          items: [
            { text: '快速开始', link: '/quick-start' },
            { text: '颜色变量', link: '/color-var' },
          ]
        }
      ]
    },
    {
      text: 'Components',
      items: [
        {
          text: 'State 状态',
          items: [
            { text: '状态 Status', link: '/components/Status' },
          ]
        },
        {
          text: 'Form 表单',
          items: [
            { text: '容器 FilterForm', link: '/components/FilterForm' },
            { text: '布局 DataTable', link: '/components/DataTable' },
            { text: '布局 DataTableItem', link: '/components/DataTableItem' },
          ]
        },
        {
          text: 'Data 数据展示',
          items: [
            { text: '头像 Cover', link: '/components/Cover' },
            { text: '信息 BasicInfo ', link: '/components/BasicInfo' },
            { text: '卡片 Card', link: '/components/Card' },
            { text: '页头 PageHeader', link: '/components/PageHeader' },
          ]
        },
        {
          text: 'Layout 布局',
          items: [
            { text: '导航 TheHeader', link: '/components/Header' },
            { text: '边栏 TheSidebar', link: '/components/Sidebar' },
            { text: '主页面 LayoutMain', link: '/components/LayoutMain' }
          ]
        },
        {
          text: 'Feedback 反馈组件',
          items: [
            {
              text: '弹窗 Dialog', link: '/components/Dialog'
            },
            {
              text: '抽屉 Drawer', link: '/components/Drawer'
            }
          ]
        }
      ]
    }
  ];
}
