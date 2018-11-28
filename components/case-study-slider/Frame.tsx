import sizeMe from 'react-sizeme'
import marked from 'marked'
import Button from '../button'
import Image from '../image'
import Logo from './Logo'

import { CaseStudyType } from './types'

function SliderFrame({
  caseStudy,
  dark,
  single,
  style
}: {
  caseStudy: CaseStudyType
  dark?: boolean
  single?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div className={`slider-frame${single ? ' single' : ''}`} style={style}>
      <div className="case-study">
        <div className="feature-image">
          <Image
            src={caseStudy.case_study_resource.image.url}
            alt={caseStudy.case_study_resource.image.alt}
            aspect_ratio={single ? [16, 10, 500] : [16, 9, 500]}
          />
        </div>
        <div className="feature-content">
          {single && (
            <div className="single-logo">
              <Logo dark={dark} image={caseStudy.company} />
            </div>
          )}
          <h3
            dangerouslySetInnerHTML={{
              __html: marked(caseStudy.headline)
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: marked(caseStudy.description)
            }}
          />
          <Button
            theme={dark ? 'light-outline' : 'dark-outline'}
            title="Read Case Study"
            url={`/resources/${caseStudy.case_study_resource.slug}`}
          />
        </div>
      </div>
    </div>
  )
}

export default sizeMe({ refreshMode: 'debounce' })(SliderFrame)
