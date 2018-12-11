export interface ButtonProps {
  title: string
  url: string
  external?: boolean
  theme?: Theme
  ga_prefix?: string
  classes?: string
  additionalProps?: any[]
}

type Theme =
  | 'light-fill'
  | 'dark-fill'
  | 'light-outline'
  | 'dark-outline'
  | 'light-arrow-link'
