import { Component } from 'react'
import { PersonFields } from '../../types/models'
import personFields from './personFields.graphql'

class Person extends Component<{ person: PersonFields }> {
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
