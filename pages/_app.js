import React from 'react'
import App, { Container } from 'next/app'

import globalBase from '../components/global-styles/base.global.css'
import typeBase from '../components/global-styles/typography.global.css'
import codeHighlightBase from '../components/global-styles/code-highlighting.global.css'

export default class MyApp extends App {
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
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
