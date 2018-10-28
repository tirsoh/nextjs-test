import React from 'react'
import SliderFrame from './Frame'
import Logo from './Logo'
import StatusBar from './StatusBar'

import styles from './style.css'

export default class CaseStudySlider extends React.Component {
  constructor(props) {
    super(props)
    const timing = this.props.timing ? parseInt(this.props.timing) : 10
    this.data = this.props._data
    this.state = {
      active: 0,
      timing: timing,
      numFrames: this.data.case_studies.length,
      measure: true,
      containerWidth: 0
    }

    this.handleClick = this.handleClick.bind(this)
    this.throttledResize = this.throttledResize.bind(this)
    this.onSize = this.onSize.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.resizeTimeout = null
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props._data !== prevProps._data) {
      this.data = this.props._data
      if (this.data.case_studies.length != prevState.numFrames) {
        this.setState(
          {
            numFrames: this.data.case_studies.length,
            measure: true
          },
          () => {
            if (this.data.case_studies.length === 1) {
              clearInterval(this.timer)
            }
          }
        )
      }
      if (prevState.active > this.data.case_studies.length - 1) {
        this.setState({ active: 0 })
      }
    }

    if (this.props.timing && parseInt(this.props.timing) != prevState.timing) {
      this.setState(
        {
          timing: parseInt(this.props.timing),
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

  handleClick(i) {
    if (i === this.state.active) return
    this.setState({ active: i }, this.resetTimer)
  }

  onSize(size) {
    if (this.state.measure) {
      this.setState({
        frameSize: size.width,
        containerWidth: size.width * this.state.numFrames,
        measure: false
      })
    }
  }

  render() {
    const { case_studies } = this.data

    // If state.measure is true, we don't want inline styles because the element size is being calculated
    const containerWidth = !this.state.measure
      ? {
          width: `${this.state.containerWidth}px`,
          transform: `translateX(
            -${(this.state.containerWidth / this.state.numFrames) *
              this.state.active}px)`
        }
      : null

    const frameWidth = !this.state.measure
      ? { float: 'left', width: `${100 / this.state.numFrames}%` }
      : null

    return (
      <div
        className="g-case-study-slider"
        data-state={this.props._state}
        ref={el => (this.slider = el)}
      >
        {this.state.numFrames > 1 && (
          <div
            className={`logo-bar-container${
              this.state.numFrames === 2 ? ' double' : ''
            }`}
          >
            {case_studies.map(({ company }, i) => (
              <div
                className="logo-bar"
                onClick={() => this.handleClick(i)}
                key={company.monochrome_logo.url}
              >
                <div className="logo-container">
                  {/* <Logo dark={this.props.dark} image={company} /> */}
                  <img
                    src={company.monochrome_logo.url}
                    alt={company.monochrome_logo.alt}
                  />
                </div>
                <StatusBar
                  dark={this.props.dark}
                  active={this.state.active === i}
                  timing={this.state.timing}
                />
              </div>
            ))}
          </div>
        )}
        <div className="case-study-container">
          <div className="slider-container" style={containerWidth}>
            {case_studies.map(caseStudy => (
              <SliderFrame
                dark={this.props.dark}
                caseStudy={caseStudy}
                single={this.state.numFrames === 1}
                key={caseStudy.headline}
                onSize={this.onSize}
                style={frameWidth}
              />
            ))}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
