import React from 'react'

class Page extends React.Component {
  static async getInitialProps({ asPath }) {
    const path = asPath.substring(1)
    const mod = await import(`../markdown/${path}.md`)
    return { file: mod.default }
  }

  render() {
    const md = this.props.file

    return (
      <div className="page">
        <p>layout template</p>
        <p>{md.page_title}</p>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: md.__content }}
        />
      </div>
    )
  }
}

export default Page
