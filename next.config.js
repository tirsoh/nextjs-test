const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const fs = require('fs')
const marked = require('./lib/markdown')

const config = {
  // setup for static export
  exportPathMap: function() {
    const root = path.join(__dirname, 'docs')
    const output = { '/': { page: '/' } }
    fs.readdirSync(root).map(file => {
      output[`/docs/${file.replace(/\.md$/, '')}`] = {
        page: '/post',
        asPath: path.join(__dirname, 'docs', file)
      }
    })
    return output
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  // setup for markdown file loading
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        'babel-loader',
        {
          loader: 'marked-frontmatter-loader',
          options: {
            markedOptions: { renderer: marked, tables: true, xhtml: true }
          }
        }
      ]
    })
    return config
  }
}

module.exports = withTypescript(withCSS(withBundleAnalyzer(config)))
