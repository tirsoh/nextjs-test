const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const getClient = require('./lib/apolloClient')
const withGraphql = require('next-plugin-graphql')
const gql = require('graphql-tag')

module.exports = withGraphql(
  withCSS(
    withBundleAnalyzer({
      // setup for static export
      async exportPathMap() {
        const items = await loadFromDato()
        console.log(JSON.stringify(items, null, 2))
        return items.reduce(
          (acc, post) => {
            acc[`/blog/${post.slug}`] = {
              page: '/BlogPost',
              query: post.id
            }
            return acc
          },
          { '/': { page: '/' } }
        )
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
)

function loadFromDato() {
  return getClient()
    .query({
      query: gql`
        query CoolBlogPosts {
          allBlogPosts(first: 3) {
            id
            slug
          }
        }
      `
    })
    .then(resp => resp.data.allBlogPosts)
    .catch(err => {
      console.warn(`Jeff ruined this script.`, err)
    })
}
