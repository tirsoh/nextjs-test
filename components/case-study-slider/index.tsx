import React from 'react'
import SliderFrame from './Frame'
import Logo from './Logo'
import StatusBar from './StatusBar'

import './style.css'

import { CaseStudyProps, CaseStudyState } from './types'

export default class CaseStudySlider extends React.Component<
  CaseStudyProps,
  CaseStudyState
> {
  // There's an issue with TypeScript pulling in Node typings and not DOM
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21310#issuecomment-367919251
  timer: window.setInterval
  resizeTimeout: window.setTimeout

  constructor(props: CaseStudyProps) {
    super(props)
    const timing = this.props.timing || 10
    this.state = {
      active: 0,
      timing: timing,
      numFrames: this.props.data.case_studies.length,
      measure: true,
      containerWidth: 0,
      frameSize: 0
    }

    this.timer = null
    this.resizeTimeout = null

    this.handleClick = this.handleClick.bind(this)
    this.throttledResize = this.throttledResize.bind(this)
    this.onSize = this.onSize.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  componentDidMount() {
    if (this.state.numFrames > 1) {
      this.timer = setInterval(() => this.tick(), this.state.timing * 1000)
    }
    window.addEventListener('resize', this.throttledResize, false)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.throttledResize)
  }

  componentDidUpdate(prevProps: CaseStudyProps, prevState: CaseStudyState) {
    if (this.props.data !== prevProps.data) {
      if (this.props.data.case_studies.length != prevState.numFrames) {
        this.setState(
          {
            numFrames: this.props.data.case_studies.length,
            measure: true
          },
          () => {
            if (this.props.data.case_studies.length === 1) {
              clearInterval(this.timer)
            }
          }
        )
      }
      if (prevState.active > this.props.data.case_studies.length - 1) {
        this.setState({ active: 0 })
      }
    }

    if (this.props.timing && this.props.timing != prevState.timing) {
      this.setState(
        {
          timing: this.props.timing,
          active: 0
        },
        this.resetTimer
      )
    }
  }

  resetTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(() => this.tick(), this.state.timing * 1000)
  }

  throttledResize() {
    if (!this.resizeTimeout) {
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null
        this.setState({ measure: true })
      }, 750)
    }
  }

  tick() {
    const nextSlide =
      this.state.active === this.state.numFrames - 1 ? 0 : this.state.active + 1
    this.setState({ active: nextSlide })
  }

  handleClick(i: number) {
    if (i === this.state.active) return
    this.setState({ active: i }, this.resetTimer)
  }

  onSize(size: { width: number }) {
    if (this.state.measure) {
      this.setState({
        frameSize: size.width,
        containerWidth: size.width * this.state.numFrames,
        measure: false
      })
    }
  }

  render() {
    const { case_studies } = this.props.data
    const { dark } = this.props
    const { containerWidth, numFrames, active, measure, timing } = this.state

    // If state.measure is true, we don't want inline styles because the element size is being calculated
    const wrapperWidth: React.CSSProperties | undefined = !measure
      ? {
          width: `${containerWidth}px`,
          transform: `translateX(
            -${(containerWidth / numFrames) * active}px)`
        }
      : undefined

    const frameWidth = !measure
      ? { float: 'left', width: `${100 / numFrames}%` }
      : null

    return (
      <div className="g-case-study-slider">
        {numFrames > 1 && (
          <div
            className={`logo-bar-container${numFrames === 2 ? ' double' : ''}`}
          >
            {case_studies.map(({ company }, i) => (
              <div
                className="logo-bar"
                onClick={() => this.handleClick(i)}
                key={company.monochrome_logo.url}
              >
                <div className="logo-container">
                  <Logo dark={dark} image={company} />
                </div>
                <StatusBar dark={dark} active={active === i} timing={timing} />
              </div>
            ))}
          </div>
        )}
        <div className="case-study-container">
          <div className="slider-container" style={wrapperWidth}>
            {case_studies.map(caseStudy => (
              <SliderFrame
                dark={dark}
                caseStudy={caseStudy}
                single={numFrames === 1}
                key={caseStudy.headline}
                onSize={this.onSize}
                style={frameWidth}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
