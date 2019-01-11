import '../components/global-styles/playground.css'

import Button from '../components/button'
import CodeBlock from '../components/code-block'
import SectionHeader from '../components/section-header'
import Toggle from '../components/toggle'
import Image from '../components/image'
import CaseStudySlider from '../components/case-study-slider'
import CaseStudySliderData from '../components/case-study-slider/data'
import VerticalTextBlockList from '../components/vertical-text-block-list'
import VerticalTextBlockListData from '../components/vertical-text-block-list/data'
import Footer from '../containers/Footer'

const Index = () => (
  <div>
    <h3>Next.js Component Library 🙌🏼</h3>

    <ul>
      <li>
        <h6>Button</h6>
        <Button title="Testing" url="#" />
      </li>
      <li>
        <h6>Section header</h6>
        <SectionHeader
          headline="This is a headline"
          description="now for a **really** long description of some *text* that you might never read"
          use_h1={true}
        />
      </li>
      <li>
        <h6>Toggle</h6>
        <Toggle />
      </li>
      <li>
        <h6>Image</h6>
        <p>Picture element</p>
        <Image
          src="https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg"
          alt="Test image"
          aspect_ratio={[16, 9, 501]}
          params={{ blur: 80 }}
        />
        <Image
          src="https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg"
          alt="Test image"
          aspect_ratio={[20, 1, 200]}
        />
        <p>SVG</p>
        <Image
          src="https://www.datocms-assets.com/2885/1524097005-adobe-black-1.svg"
          alt="Test SVG image"
          svg={true}
        />
      </li>
      <li>
        <h6>Case study slider</h6>
        <CaseStudySlider data={CaseStudySliderData} />
      </li>
      <li>
        <h6>Vertical Text Block List</h6>
        <VerticalTextBlockList data={VerticalTextBlockListData} />
      </li>
      <li>
        <h6>Code Block</h6>
        <div className='top-buffer'>
          <CodeBlock prefix='terminal' code='Here is the code block render with terminal prefix' />
        </div>
        <div className='top-buffer'>
          <CodeBlock prefix='dollar' code='Here is the code block render with dollar prefix' />
        </div>
        <div className='top-buffer'>
          <CodeBlock prefix='numbered' code='Here is the code block render with numbered prefix' />
        </div>
        <div className='top-buffer'>
          <CodeBlock code='Here is the code block render with no prefix' />
        </div>
      </li>
    </ul>

    <Footer />
  </div>
)

export default Index
