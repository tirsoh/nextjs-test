import React from 'react'

import marked from 'marked'
import Button from '../button'
import Image from '../image'
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
  // @ts-ignore
  public timer: window.setInterval
  // @ts-ignore
  public resizeTimeout: window.setTimeout
  public frames: any[]

  constructor(props: CaseStudyProps) {
    super(props)
    const timing = this.props.timing || 10
    this.state = {
      active: 0,
      timing,
      numFrames: this.props.data.case_studies.length,
      measure: true,
      containerWidth: 0
    }

    this.frames = []

    this.handleClick = this.handleClick.bind(this)
    this.throttledResize = this.throttledResize.bind(this)
    this.measureFrameSize = this.measureFrameSize.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.resizeTimeout = null
  }

  public componentDidMount() {
    if (this.state.numFrames > 1) {
      this.timer = setInterval(() => this.tick(), this.state.timing * 1000)
      this.measureFrameSize()
    }
    window.addEventListener('resize', this.throttledResize, false)
  }

  public componentWillUnmount() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.throttledResize)
  }

  public componentDidUpdate(
    prevProps: CaseStudyProps,
    prevState: CaseStudyState
  ) {
    if (this.props.data !== prevProps.data) {
      if (this.props.data.case_studies.length !== prevState.numFrames) {
        this.setState(
          {
            numFrames: this.props.data.case_studies.length,
            measure: true
          },
          () => {
            if (this.props.data.case_studies.length === 1) {
              clearInterval(this.timer)
              window.removeEventListener('resize', this.throttledResize)
            }
          }
        )
      }
      if (prevState.active > this.props.data.case_studies.length - 1) {
        this.setState({ active: 0 })
      }
    }

    if (this.props.timing && this.props.timing !== prevState.timing) {
      this.setState(
        {
          timing: this.props.timing,
          active: 0
        },
        this.resetTimer
      )
    }

    // If we're measuring on this update get the width
    if (!prevState.measure && this.state.measure && this.state.numFrames > 1) {
      this.measureFrameSize()
    }
  }

  public resetTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(() => this.tick(), this.state.timing * 1000)
  }

  public throttledResize() {
    this.resizeTimeout && clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = null
      this.setState({ measure: true })
    }, 250)
  }

  public tick() {
    const nextSlide =
      this.state.active === this.state.numFrames - 1 ? 0 : this.state.active + 1
    this.setState({ active: nextSlide })
  }

  public handleClick(i: number) {
    if (i === this.state.active) {
      return
    }
    this.setState({ active: i }, this.resetTimer)
  }

  public measureFrameSize() {
    // All frames are the same size, so we measure the first one
    if (this.frames[0]) {
      const { width } = this.frames[0].getBoundingClientRect()
      this.setState({
        containerWidth: width * this.state.numFrames,
        measure: false
      })
    }
  }

  public render() {
    const { case_studies } = this.props.data

    const { measure, active, timing, numFrames, containerWidth } = this.state
    const { dark } = this.props

    const single = numFrames === 1

    // Create inline styling for slide container
    // If we're measuring, or have a single slide then no inline styles should be applied
    const containerStyle: React.CSSProperties | undefined =
      measure || single
        ? undefined
        : {
            width: `${containerWidth}px`,
            transform: `translateX(-${(containerWidth / numFrames) * active}px`
          }

    // Create inline styling to apply to each frame
    // If we're measuring or have a single slide then no inline styles should be applied
    const frameStyle: React.CSSProperties | undefined =
      measure || single
        ? undefined
        : { float: 'left', width: `${100 / numFrames}%` }

    return (
      <div className="g-case-study-slider">
        {!single && (
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
          <div className="slider-container" style={containerStyle}>
            {case_studies.map(caseStudy => (
              <div
                className={`slider-frame${single ? ' single' : ''}`}
                style={frameStyle}
                ref={el => this.frames.push(el)}
                key={caseStudy.headline}
              >
                <div className="case-study">
                  <div className="feature-image">
                    <Image
                      src={caseStudy.case_study_resource.image.url}
                      alt={caseStudy.case_study_resource.image.alt}
                      aspect_ratio={single ? [16, 10, 500] : [16, 9, 500]}
                    />
                  </div>
                  <div className="feature-content">
                    {single && (
                      <div className="single-logo">
                        <Logo dark={dark} image={caseStudy.company} />
                      </div>
                    )}
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: marked.inlineLexer(caseStudy.headline, [])
                      }}
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: marked.inlineLexer(caseStudy.description, [])
                      }}
                    />
                    <Button
                      theme={dark ? 'light-outline' : 'dark-outline'}
                      title="Read Case Study"
                      url={`/resources/${caseStudy.case_study_resource.slug}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
