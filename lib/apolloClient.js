const fetch = require('node-fetch')
const ApolloClient = require('apollo-boost').default

let client = null

function getClient() {
  if (!client) {
    client = new ApolloClient({
      fetch,
      uri: 'https://graphql.datocms.com',
      request: async operation => {
        operation.setContext({
          headers: {
            Authorization: '78d2968c99a076419fbb'
          }
        })
      }
    })
  }

  return client
}

module.exports = getClient
