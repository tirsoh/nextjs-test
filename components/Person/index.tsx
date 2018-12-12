import { Component } from 'react'
import personFields from './personFields.graphql'

interface PersonProps {
  person: any
}

class Person extends Component<PersonProps> {
  public static fragments = {
    personFields
  }

  public render() {
    const { person } = this.props

    return (
      <div>
        <p>{JSON.stringify(person)}</p>
      </div>
    )
  }
}

export default Person
