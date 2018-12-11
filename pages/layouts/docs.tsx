import { MDXProvider } from '@mdx-js/tag'

export default (meta: any) => {
  const DocsComponent: React.SFC = ({ children }) => {
    return (
      <MDXProvider>
        <div className="page">
          <p>layout template</p>
          <h1>{meta.page_title}</h1>
          {children}
        </div>
      </MDXProvider>
    )
  }

  return DocsComponent
}
