import marked from 'marked'
import './style.css'

import { VerticalTextBlockListProps, withLinkProps } from './types'

function VerticalTextBlockList({
  data,
  center_text
}: VerticalTextBlockListProps) {
  return (
    <div className="g-vertical-text-block-list">
      <ul className={`list${center_text ? ' centered-text' : ''}`}>
        {data.map(item => (
          <WithLink link={item.link_url} key={item.header || item.body}>
            <div className="header">
              {item.logo ? (
                <img src={item.logo.url} alt={item.logo.alt} />
              ) : (
                <h6>{item.header}</h6>
              )}
            </div>
            <div
              className="body-text"
              dangerouslySetInnerHTML={{
                __html: marked.inlineLexer(item.body, [])
              }}
            />
          </WithLink>
        ))}
      </ul>
    </div>
  )
}

const WithLink = ({ link, children }: withLinkProps) =>
  link ? (
    <li>
      <a className="wrapper" href={link}>
        {children}
      </a>
    </li>
  ) : (
    <li>
      <div className="wrapper">{children}</div>
    </li>
  )

export default VerticalTextBlockList
