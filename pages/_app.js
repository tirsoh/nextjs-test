import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import getClient from '../lib/apolloClient'
import delphi from '../lib/delphi'

import '../components/global-styles/base.global.css'
import '../components/global-styles/typography.global.css'
import '../components/global-styles/code-highlighting.global.css'

class JeffsApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ApolloProvider client={getClient()}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ApolloProvider>
    )
  }
}

export default delphi(JeffsApp)
