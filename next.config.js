const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const fs = require('fs')
const readdirp = require('fs-readdir-recursive')

const config = {
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
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
      use: [
        'babel-loader',
        '@mdx-js/loader',
        path.join(__dirname, 'lib/mdx-layout-loader')
      ]
