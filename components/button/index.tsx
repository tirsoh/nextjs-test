import './style.css'
import slugify from 'slugify'

import { ButtonProps } from './types'

export default function Button({
  title,
  url,
  external,
  theme,
  ga_prefix,
  classes,
  ...additionalProps
}: ButtonProps) {
  const gaSlug = slugify(title, { lower: true })

  return (
    <a
      className={`g-btn${theme ? ' ' + theme : ''}${
        classes ? ' ' + classes : ''
      }`}
      data-ga-button={`${ga_prefix ? ga_prefix + ' | ' : ''}${gaSlug}`}
      href={url}
      rel={external ? 'noopener' : undefined}
      target={external ? '_blank' : undefined}
      {...additionalProps}
    >
      {title}
    </a>
  )
}
