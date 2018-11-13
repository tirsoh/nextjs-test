import './style.css'
import slugify from 'slugify'

export default function Button({
  title,
  url,
  external,
  theme,
  ga_prefix,
  classes,
  ...additionalProps
}: {
  title: string,
  url: string,
  external: boolean,
  theme: any,
  ga_prefix: string,
  classes: string,
  additionalProps: any[]
}) {
  if (theme && typeof theme === 'object') theme = theme.slug
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
