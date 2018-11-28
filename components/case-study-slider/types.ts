export interface ImageType {
  url: string
  alt: string
  format: string
}

export interface ImageInterface {
  [key: string]: ImageType
}

export interface CaseStudyType {
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
