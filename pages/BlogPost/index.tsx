import { NextContext } from 'next'
import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import Person from '../../components/Person'
import { BlogPost as IBlogPost, BlogPostVariables } from '../../types/models'
import getBlogPostQuery from './getBlogPost.graphql'

class BlogPost extends Component<ChildProps<BlogPostVariables, IBlogPost>, {}> {
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
        {blogPost && blogPost.author && <Person person={blogPost.author} />}
      </div>
    )
  }
}

const BlogPostWithData = graphql<BlogPostVariables, IBlogPost>(
  getBlogPostQuery,
  {
    options: ({ slug }) => ({ variables: { slug } })
  }
)(BlogPost)

export default BlogPostWithData
