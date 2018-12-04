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

interface SharedFormatArgs {
  src: string
  opts: {
    w?: number
    h?: number
    fm: string
  }
  aspect_ratio?: number[]
}
export interface FormatOptions extends SharedFormatArgs {
  width?: number
}
export interface FormatStepsOptions extends SharedFormatArgs {
  steps: number[]
}

export interface GetImageFormatArgs {
  src: string
}

export declare function formatSteps(
  src: string,
  opts: {
    w?: number
    h?: number
    fm: string
  },
  steps: number[],
  aspect_ratio?: number[]
)
