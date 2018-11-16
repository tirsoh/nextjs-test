import './style.css'
import { Component } from 'react'

type toggleProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

type toggleState = {
  enabled: boolean
}

export default class Toggle extends Component<toggleProps, toggleState> {
  constructor(props) {
    super(props)
    this.state = {
      enabled: this.props.enabled || false
    }
  }

  render() {
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

  componentDidUpdate(prevProps) {
    // if a parent changes the enabled prop value, reflect it to the state
    if (this.props.enabled !== prevProps.enabled) {
      this.setState({ enabled: this.props.enabled })
    }
  }
}
