const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(
  withBundleAnalyzer({
    // setup for static export
    exportPathMap: function() {
      return { '/': { page: '/' } }
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
    }
  })
)
