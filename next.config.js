const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const getClient = require('./lib/apolloClient')
const withGraphql = require('next-plugin-graphql')
const gql = require('graphql-tag')

const config = {
  async exportPathMap() {
    const items = await getAllBlogPosts(10)
    console.log(items.map(x => x.slug))
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

/**
 * A generator function that paginates over Dato's
 * blog posts, retruning {pageSize} posts for each yielded
 * request
 *
 * @param {int} pageSize number of blog posts per request
 */
async function* fetchBlogPosts(pageSize = 100) {
  let hasMore = true
  let skip = 0

  while (hasMore) {
    const resp = await getClient().query({
      query: gql`
        query GetAllBlogPosts($first: IntType, $skip: IntType) {
          allBlogPosts(first: $first, skip: $skip) {
            slug
          }
        }
      `,
      variables: { skip, first: pageSize }
    })

    const blogPosts = resp.data.allBlogPosts
    skip += blogPosts.length
    hasMore = !(blogPosts.length < pageSize)

    yield blogPosts
  }
}

/**
 * An async method that fetches all blog posts from Dato
 *
 * @param {int} hardStopAt stops fetching blog posts after this count; null = unlimited
 */
async function getAllBlogPosts(hardStopAt = null) {
  const blogPosts = []

  console.log(`Fetching all blog posts...`)
  for await (const posts of fetchBlogPosts()) {
    console.log(`Got ${posts.length} blog posts in page...`)
    posts.forEach(post => blogPosts.push(post))

    if (hardStopAt && posts.length >= hardStopAt) {
      console.log(`Reach hard stop. Won't fetch anymore blog posts...`)
      break
    }
  }
  console.log(`All done. Got ${blogPosts.length} blog posts in total!`)

  return blogPosts
}

module.exports = withTypescript(
  withGraphql(withCSS(withBundleAnalyzer(config)))
)
