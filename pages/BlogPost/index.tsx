import { NextContext } from 'next'
import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import Author from '../../components/Author'
import getBlogPostQuery from './getBlogPost.graphql'

interface InputProps {
  slug: string
}

interface Response {
  blogPost: any
}

class BlogPost extends Component<ChildProps<InputProps, Response>, {}> {
  public static async getInitialProps(context: NextContext) {
    const slug = context.asPath.replace(/^\/blog\//, '')
    return { slug }
  }

  public render() {
    const { loading, error, blogPost } = this.props.data

    return (
      <div>
        <p>{error ? `Error: ${error}` : ''}</p>
        <p>{loading ? 'Loading...' : ''}</p>
        <p>{JSON.stringify(blogPost)}</p>
        {blogPost && blogPost.author && <Author id={blogPost.author.id} />}
      </div>
    )
  }
}

const BlogPostWithData = graphql<InputProps, Response>(getBlogPostQuery, {
  options: ({ slug }) => ({ variables: { slug } })
})(BlogPost)

export default BlogPostWithData
