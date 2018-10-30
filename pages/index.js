import variables from '../components/global-styles/variables.global.css'
import globalBase from '../components/global-styles/base.global.css'
import typeBase from '../components/global-styles/typography.global.css'
import codeHighlightBase from '../components/global-styles/code-highlighting.global.css'
import playgroundCss from '../components/global-styles/playground.css'

import Button from '../components/button'
import SectionHeader from '../components/section-header'
import Toggle from '../components/toggle'

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
        <SectionHeader headline="This is a headline" description="now for a really long description of some text that you might never read" use_h1={true} />
        </li>
      <li>
        <h6>Toggle</h6>
        <Toggle />
      </li>
    </ul>
  </div>
)

export default Index
