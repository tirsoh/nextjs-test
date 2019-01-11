export interface CodeBlockProps {
    prefix: Prefix,
    code: string
}

type Prefix =
  | 'numbered'
  | 'dollar'
  | 'terminal'
  
export interface CodeBlockState {
    tooltip: string
}