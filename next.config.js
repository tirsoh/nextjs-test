const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const fs = require('fs')
const readdirp = require('fs-readdir-recursive')

const config = {
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  // setup for static export
  // exportPathMap: function() {
  //   const root = path.join(__dirname, 'docs')
  //   const output = { '/': { page: '/' } }
  //   readdirp(root).map((file) => {
  //     if (!file.match(/\.mdx?$/)) return
  //     if (file.match(/index\.mdx?$/)) {
  //       const page = `/docs/${file.replace(/\/index\.mdx?$/, '')}`
  //       output[page] = { page }
  //     } else {
  //       const page = `/docs/${file.replace(/\.mdx?$/, '')}`
  //       output[page] = { page }
  //     }
  //   })
  //   console.log(output)
  //   return output
  // },
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
      test: /\.mdx?$/,
      use: [
        'babel-loader',
        '@mdx-js/loader',
        path.join(__dirname, 'lib/mdx-layout-loader')
      ]
    })
    config.resolve.symlinks = false
    return config
  }
}

module.exports = withTypescript(withCSS(withBundleAnalyzer(config)))
