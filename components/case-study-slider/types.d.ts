export interface ImageType {
  url: string
  alt: string
  format: string
}

export interface ImageInterface {
  [key: string]: ImageType
}

interface CaseStudyType {
  company: {
    monochrome_logo: ImageType
    white_logo: ImageType
  }
  headline: string
  description: string
  case_study_resource: {
    slug: string
    image: ImageType
  }
}

export interface SliderFrameProps {
  caseStudy: CaseStudyType
  dark?: boolean
  single?: boolean
  style?: React.CSSProperties
}

export interface CaseStudyProps {
  data: {
    case_studies: CaseStudyType[]
  }
  timing?: number
  dark?: boolean
}

export interface CaseStudyState {
  active: number
  timing: number
  numFrames: number
  measure: boolean
  containerWidth: number
}
