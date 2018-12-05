const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const DatoCMS = require('datocms-client')

const previewMode = false
const client = new DatoCMS.SiteClient('78d2968c99a076419fbb')
const loader = new DatoCMS.Loader(client, this.previewMode)

module.exports = withCSS(
  withBundleAnalyzer({
    // setup for static export
    async exportPathMap() {
      const items = await loadFromDato()
      const pages = { '/': { page: '/' } }
      items.collectionsByType.blogPosts.map(post => {
        pages[`/docs/${post.slug}`] = { page: '/post', query: post.id }
      })
      return pages
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

function loadFromDato() {
  console.log('fetching data from datocms')
  return Promise.all([
    client.get('/site', { include: 'item_types,item_types.fields' }),
    client.items.all(
      { version: previewMode ? 'latest' : 'published' },
      { deserializeResponse: false, allPages: true }
    ),
    client.uploads.all({}, { deserializeResponse: false, allPages: true })
  ]).then(([site, allItems, allUploads]) => {
    console.log('processing data')
    const entitiesRepo = new DatoCMS.EntitiesRepo(site, allItems, allUploads)
    return new DatoCMS.ItemsRepo(entitiesRepo)
  })
}
