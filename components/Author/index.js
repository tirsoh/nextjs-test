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

const AuthorWithData = graphql(getAuthor, {
  options: ({ id }) => ({ variables: { id } })
})(Author)

export default AuthorWithData
