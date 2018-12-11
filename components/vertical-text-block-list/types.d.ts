import { Children } from 'react'

interface VerticalTextBlockListData {
  logo?: {
    url: string
    alt: string
  }
  header: string
  body: string
  link_url?: string
}

export interface VerticalTextBlockListProps {
  center_text: boolean
  data: VerticalTextBlockListData[]
}

export interface WithLinkProps {
  link: string | undefined
  children: React.ReactNode
}
