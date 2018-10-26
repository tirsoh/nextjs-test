import styles from './style.css'
import slugify from 'slugify'

export default ({
  title,
  url,
  external,
  theme,
  ga_prefix,
  classes,
  ...additionalProps
}) => {
  if (theme && typeof theme === 'object') theme = theme.slug
  const gaSlug = slugify(title, { lower: true })
  const ext = external === 'true' || external === true

  return (
    <a
      className={`g-btn${theme ? ' ' + theme : ''}${
        classes ? ' ' + classes : ''
      }`}
      data-ga-button={`${ga_prefix ? ga_prefix + ' | ' : ''}${gaSlug}`}
      href={url}
      rel={ext ? 'noopener' : undefined}
      target={ext ? '_blank' : undefined}
      {...additionalProps}
    >
      <style jsx>{styles}</style>
      {title}
    </a>
  )
}
