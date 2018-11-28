import React from 'react'

import '../components/global-styles/content.global.css'

class Page extends React.Component<{
  file: { page_title: string; content: string }
}> {
  static async getInitialProps({ asPath }) {
    const mod = await import(`../${asPath.substring(1)}.md`)
    return { file: mod.default }
  }

  render() {
    const md = this.props.file

    return (
      <div className="page">
        <p>layout template</p>
        <p>{md.page_title}</p>
        <div
          className="g-content"
          dangerouslySetInnerHTML={{ __html: md.content }}
        />
      </div>
    )
  }
}

export default Page
