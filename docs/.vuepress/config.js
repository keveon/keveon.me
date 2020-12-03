const { fs, path } = require('@vuepress/shared-utils')

module.exports = (ctx) => ({
  base: '/',
  title: '眼眶ぃ懵懂',
  description: '这是一只不务正业而且还很懒的程序猿！',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  head: [
    ['link', { rel: 'icon', href: `/favicon.png` }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],
  themeConfig: {
    repo: 'keveon',
    docsRepo: 'keveon/keveon.me',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: require('./nav.js'),
    sidebar: getSidebar(),
    // algolia: {
    //     apiKey: '',
    //     indexName: 'keveon',
    //     inputSelector: '',
    //     debug: false
    // },
  },
  evergreen: true,
  extraWatchFiles: ['.vuepress/nav.js'],
  markdown: {
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-abbr'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-include'))
      md.use(require('markdown-it-ins'))
      md.use(require('markdown-it-kbd'))
      md.use(require('markdown-it-mark'))
      md.use(require('markdown-it-replacements'))
      md.use(require('markdown-it-smartarrows'))
      md.use(require('markdown-it-sub'))
      md.use(require('markdown-it-sup'))
      md.use(require('markdown-it-task-lists'))
    },
  },
  plugins: [
    ['vuepress-plugin-serve', true],
    ['@vuepress/back-to-top', true],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/nprogress', true],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-119559254-1',
      },
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: '🎉 发现新内容可用 ✏',
            buttonText: '刷新',
          },
          '/en/': {
            message: '🎉 New Content Is Available. ✏',
            buttonText: 'Refresh',
          },
        },
      },
    ],
    [
      'mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
    [
      'git-log',
      {
        additionalProps: {
          authorEmail: '%ae',
        },
      },
    ],
    [
      'container',
      {
        type: 'center',
        defaultTitle: '',
      },
    ],
    [
      'container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'container',
      {
        type: 'theorem',
        before: (info) => `<div class='theorem'><p class='title'>${info}</p>`,
        after: '</div>',
      },
    ],
    [
      'container',
      {
        type: 'tree',
        before: '<pre class="tree-container"><code>',
        after: '</code></pre>',
      },
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: (info) => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      },
    ],
  ],
})

function getSidebar() {
  const basedir = path.resolve(__dirname, '../')
  const sidebar = []

  const other = {
    title: '其他',
    collapsable: false,
    children: [],
  }

  function recursiveComputeSidebar(sidebar, file, title = '', depth = 1) {
    if (depth >= 3) return
    if (fs.statSync(basedir + '/' + file).isDirectory()) {
      const subSidebar = {
        title: title.replace('-', ' ') || file.replace('-', ' '),
        collapsable: false,
        children: [],
      }
      fs.readdirSync(basedir + '/' + file + '/').map((filename) => {
        if (fs.statSync(basedir + '/' + file + '/' + filename).isDirectory()) {
          recursiveComputeSidebar(subSidebar.children, file + '/' + filename, filename, depth + 1)
        } else if (file !== 'README.md') {
          subSidebar.children.push(file + '/' + filename.slice(0, -3))
        }
      })
      sidebar.push(subSidebar)
    } else if (file !== 'README.md') {
      sidebar.push(file + '/' + filename.slice(0, -3))
    }
  }

  fs.readdirSync(basedir)
    .filter((filename) => {
      return (
        filename !== 'README.md' &&
        filename !== 'node_modules' &&
        !filename.startsWith('.') &&
        (filename.endsWith('.md') || fs.statSync(basedir + '/' + filename).isDirectory())
      )
    })
    .map((file) => {
      if (fs.statSync(basedir + '/' + file).isDirectory()) {
        recursiveComputeSidebar(sidebar, file)
      } else if (file !== 'README.md') {
        other.children.push(file)
      }
    })
  sidebar.push(other)
  return sidebar
}
