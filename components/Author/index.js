import { graphql } from 'react-apollo'
import getAuthor from './getAuthor.graphql'

function Author({ data: { loading, error, person } }) {
  return (
    <div>
      <p>{error ? `Error: ${error}` : ''}</p>
      <p>{loading ? 'Loading...' : ''}</p>
      <p>{JSON.stringify(person)}</p>
    </div>
  )
}

// Maps data to props
Author.getInitialProps = async context => {
  const slug = context.asPath.replace(/^\/blog\//, '')
  return { slug }
}

const AuthorWithData = graphql(getAuthor, {
  options: ({ slug }) => ({ variables: { slug } })
})(Author)

export default AuthorWithData
