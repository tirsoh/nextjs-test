import { Children } from 'react'

type VerticalTextBlockListData = {
  logo?: {
    url: string
    alt: string
  }
  header: string
  body: string
  link_url?: string
}

export type VerticalTextBlockListProps = {
  center_text: boolean
  data: VerticalTextBlockListData[]
}

export interface withLinkProps {
  link: string | undefined
  children: React.ReactNode
}
