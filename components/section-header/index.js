import css from './style.css'
import marked from 'marked'

export default function SectionHeader({ headline, description, use_h1 }) {
  return (
    <div className="g-section-header">
      {headline &&
        (use_h1 ? (
          <h1
            dangerouslySetInnerHTML={{
              __html: marked.inlineLexer(headline, [])
            }}
            className="g-type-display-1"
          />
        ) : (
          <h2
            dangerouslySetInnerHTML={{
              __html: marked.inlineLexer(headline, [])
            }}
            className="g-type-section-1"
          />
        ))}

      {description && (
        <h3
          dangerouslySetInnerHTML={{
            __html: marked.inlineLexer(description, [])
          }}
          className="g-type-intro"
        />
      )}
    </div>
  )
}
