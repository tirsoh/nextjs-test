export type ImageProps = {
  src: string
  steps?: number[]
  sizes?: string
  svg?: boolean
  classes?: string
  aspect_ratio?: number[]
  params?: {}
  alt?: string
}

export interface ImageOptions {
  w?: number
  h?: number
  fm: string
}
