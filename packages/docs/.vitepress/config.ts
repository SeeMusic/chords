import { defineConfig } from 'vitepress';
// @ts-ignore
import markdownPlugin from "vitepress-demo-editor/markdownPlugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "chords-ui",
  description: "看见音乐中后台组件库",
  lang: 'zh-CN',
  srcDir: 'src',
  cacheDir: 'src/cache',
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
    config: (md) => {
      md.use(markdownPlugin);
    },
  }
})

function renderSidebar() {
  return [
    {
      items: [
        { text: '快速开始', link: '/quick-start' },
        {
          text: 'Components',
          items: [
            { text: 'SopStatus', link: '/components/SopStatus' }
          ]
        }
      ]
    }
  ]
}
