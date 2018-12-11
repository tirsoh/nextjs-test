import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import getAuthor from './getAuthor.graphql'

interface InputProps {
  id: string
}

interface Response {
  person: any
}

class Author extends Component<ChildProps<InputProps, Response>, {}> {
  public render() {
    const { loading, error, person } = this.props.data

    return (
      <div>
        <p>{error ? `Error: ${error}` : ''}</p>
        <p>{loading ? 'Loading...' : ''}</p>
        <p>{JSON.stringify(person)}</p>
      </div>
    )
  }
}

const AuthorWithData = graphql<InputProps, Response>(getAuthor, {
  options: ({ id }) => ({ variables: { id } })
})(Author)

export default AuthorWithData
