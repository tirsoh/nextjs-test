import './style.css'
import { Component } from 'react'

type Props = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

type State = {
  enabled: boolean
}

export default class Toggle extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      enabled: this.props.enabled || false
    }
  }

  public render() {
    return (
      <div
        className={['switch', this.state.enabled ? 'on' : ''].join(' ')}
        onClick={(() =>
          this.setState({ enabled: !this.state.enabled }, () => {
            if (this.props.onChange) this.props.onChange(this.state.enabled)
          })).bind(this)}
      >
        <div className="switch-toggle" />
      </div>
    )
  }

  public componentDidUpdate(prevProps: Props) {
    // if a parent changes the enabled prop value, reflect it to the state
    if (this.props.enabled !== prevProps.enabled) {
      this.setState({ enabled: this.props.enabled })
    }
  }
}
