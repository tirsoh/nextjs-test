const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { BatchHttpLink } = require('apollo-link-batch-http')

// // Polyfill fetch() on the server (used by apollo-client)
// if (!process.browser) {
//   global.fetch = fetch
// }

let client = null

function getClient(initialState = {}) {
  if (!client) {
    client = new ApolloClient({
      cache: new InMemoryCache().restore(initialState),
      link: new BatchHttpLink({
        fetch,
        uri: 'https://graphql.datocms.com',
        headers: {
          Authorization: '78d2968c99a076419fbb'
        }
      }),
      ssrMode: !process.browser,
      connectToDevTools: true
    })
  }

  return client
}

module.exports = getClient
