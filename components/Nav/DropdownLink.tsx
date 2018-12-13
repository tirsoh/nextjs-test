import marked from 'marked'
import assign from 'object-assign'
import Button from '../button'
import { Theme } from '../button/types'
import Image from '../image'

interface DropdownMenuProps {
  name: string
  enter: (e: React.MouseEvent<HTMLElement>) => void
  exit: () => void
  lockup: {
    body: string
    cta: {
      title: string
      url: string
    }
    image: {
      alt: string
      format: string
      url: string
    }
    title: string
  }
  children: React.ReactNode
}

export default function DropdownMenu({
  name,
  enter,
  exit,
  lockup,
  children
}: DropdownMenuProps) {
  return (
    <li>
      <a onClick={enter}>
        {name} <i className="down" />
      </a>
      <div className={`submenu ${name.toLowerCase().replace(/\s/, '-')}`}>
        <ul>
          <li className="close" onClick={exit}>
            &lsaquo; Main Menu
          </li>
          <li className="name">{name}</li>
          {children}
        </ul>
        <div className="promo">
          <Image
            classes="bg"
            src={lockup.image.url}
            svg={lockup.image.format === 'svg'}
            alt={lockup.image.alt}
            sizes="600w"
          />
          <h2 dangerouslySetInnerHTML={{ __html: marked(lockup.title) }} />
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: marked(lockup.body) }}
          />
          <Button {...assign(lockup.cta, { theme: 'light-fill' as Theme })} />
        </div>
      </div>
    </li>
  )
}
