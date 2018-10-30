const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

module.exports = withBundleAnalyzer({
  // setup for static export
  exportPathMap: function() {
    return { '/': { page: '/' } }
  },
  // css loader setup
  webpack: config => {
    config.module.rules.push(
      {
        test: /(?<!(global))\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: { name: 'dist/[path][name].[ext].js' }
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './babel.config.js')
            }
          },
          { loader: 'styled-jsx-css-loader' }
        ]
      },
      {
        test: /(?:global)\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: { name: 'dist/[path][name].[ext].js' }
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './babel.config.js')
            }
          },
          {
            loader: 'styled-jsx-css-loader',
            options: { global: true }
          }
        ]
      }
    )

    return config
  },
  // bundle analyzer integration
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
  }
})
