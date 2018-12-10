import { graphql } from 'react-apollo'
import getBlogPostQuery from './getBlogPost.graphql'
import Author from '../../components/Author'

function BlogPost({ data: { loading, error, blogPost } }) {
  return (
    <div>
      <p>{error ? `Error: ${error}` : ''}</p>
      <p>{loading ? 'Loading...' : ''}</p>
      <p>{JSON.stringify(blogPost)}</p>
      {blogPost && blogPost.author && <Author id={blogPost.author.id} />}
    </div>
  )
}

// Maps data to props
BlogPost.getInitialProps = async context => {
  const slug = context.asPath.replace(/^\/blog\//, '')
  return { slug }
}

const BlogPostWithData = graphql(getBlogPostQuery, {
  options: ({ slug }) => ({ variables: { slug } })
})(BlogPost)

export default BlogPostWithData
