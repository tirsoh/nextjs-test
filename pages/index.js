import globalBase from '../components/global-styles/base.global.css'
import typeBase from '../components/global-styles/typography.global.css'
import codeHighlightBase from '../components/global-styles/code-highlighting.global.css'

import Button from '../components/button'
import SectionHeader from '../components/section-header'
import Image from '../components/image'
import CaseStudySlider from '../components/case-study-slider'
import CaseStudySliderData from '../components/case-study-slider/data'

const Index = () => (
  <div>
    {/* testing global styles import */}
    <style jsx>{globalBase}</style>
    <style jsx>{typeBase}</style>
    <style jsx>{codeHighlightBase}</style>

    {/* page-specific inline styles example */}
    <style jsx>{`
      ul {
        list-style: none;
      }
    `}</style>

    <h3>Next.js Component Library 🙌🏼</h3>

    <ul>
      <li>
        <h6>Button</h6>
        <Button title="Testing" url="#" theme="dark-outline" />
      </li>
      <li>
        <h6>Section header</h6>
        <SectionHeader
          headline="This is a headline"
          description="now for a really long description of some text that you might never read"
          use_h1={true}
        />
      </li>
      <li>
        <h6>Image</h6>
        <p>Picture element</p>
        <Image
          src="https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg"
          alt="Test image"
          aspect_ratio="16,9"
        />
        <p>SVG</p>
        <Image
          src="https://www.datocms-assets.com/2885/1524097005-adobe-black-1.svg"
          alt="Test SVG image"
          svg={true}
        />
      </li>
    </ul>
  </div>
)

export default Index
