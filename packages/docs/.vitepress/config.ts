import { defineConfig } from 'vitepress';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "chords-ui",
  description: "看见音乐中后台组件库",
  lang: 'zh-CN',
  srcDir: './.vitepress/src',
  cacheDir: './.vitepress/src/cache',
  outDir: 'dist',
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/quick-start' }
    ],
    sidebar: renderSidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: 'deep',
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最近更新时间',
    editLink: {
      pattern: `https://github.com/DoubleXm/blog/blob/main/docs/:path`,
      text: '在 GitHub 上编辑此页面'
    },
  },
  vite: {
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
      })
    }
  }
})

function renderSidebar() {
  return [
    {
      items: [
        {
          text: '导读',
          items: [
            { text: '快速开始', link: '/quick-start' },
            { text: '颜色变量', link: '/quick-start' },
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
            { text: '状态 Status', link: '/components/SopStatus' },
          ]
        },
        {
          text: 'Form 表单',
          items: [
            { text: '容器 FilterForm', link: '/components/SopFilterForm' },
            { text: '布局 SopDataTable', link: '/components/SopDataTable' },
            { text: '布局 SopDataTableItem', link: '/components/SopDataTableItem' },
          ]
        },
        {
          text: 'Data 数据展示',
          items: [
            { text: '头像 Cover', link: '/components/SopCover' },
            { text: '信息 BasicInfo ', link: '/components/SopBasicInfo' },
            { text: '卡片 Card', link: '/components/SopCard' },
            { text: '页头 PageHeader', link: '/components/SopPageHeader' },
          ]
        },
        {
          text: 'Layout 布局',
          items: [
            { text: '导航 TheHeader', link: '/components/SopHeader' },
            { text: '边栏 TheSidebar', link: '/components/SopSidebar' },
            { text: '主页面 LayoutMain', link: '/components/SopLayoutMain' }
          ]
        }
      ]
    }
  ]
}
