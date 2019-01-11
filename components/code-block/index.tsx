import React from 'react'

import tippy from 'tippy.js/dist/tippy.js'

import './style.css'

import { CodeBlockProps, CodeBlockState } from './types'

export default class CodeBlock extends React.Component<
  CodeBlockProps,
  CodeBlockState
> {

  constructor(props: CodeBlockProps) {
    super(props)
    this.state = {
      tooltip: 'Copy to Clipboard'
    }

    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  public componentDidMount() {
    tippy('.g-tooltip', {
      animation: 'fade',
      arrow: true,
      distance: 10,
      placement: 'top',
      hideOnClick: false,
      size: 'small'
    })
  }

  public copyToClipboard() {
    // we could use the newer clipboard API... but it's
    // still fairly new, so legacy support FTW!
    const el = document.createElement('textarea')
    el.value = this.props.code
    document.body.appendChild(el)
    el.select()
    try {
      document.execCommand('copy')
      this.setState({ tooltip: 'Copied!' })
    } catch (ex) {
      this.setState({ tooltip: 'Failed to Copy' })
    }

    document.body.removeChild(el)
    setTimeout(() => this.setState({ tooltip: 'Copy to Clipboard' }), 3000)
  }

  public render() {

    return (
      <code
        className={`g-code-block${
          this.props.prefix ? ' ' + this.props.prefix : ''
        }`}
      >
        <ol className={this.props.prefix}>
          {this.props.code.split('\n').map((l, i) => (
            <li key={`line-${i}`}>{l}</li>
          ))}
        </ol>
        <span
          className="g-tooltip"
          data-tippy-content={this.state.tooltip}
          onClick={this.copyToClipboard}
        />
      </code>
    );
  }
}
