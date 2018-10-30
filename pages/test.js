import playgroundCss from '../components/global-styles/playground.css'

import Button from '../components/button'
import SectionHeader from '../components/section-header'

const Test = () => (
  <div>
    <h3>Test second page</h3>

    <ul>
      <li>
        <h6>This Button should be styled</h6>
        <Button title="Testing" url="#" />
      </li>
      <li>
        <h6>Section header</h6>
        <SectionHeader
          headline="This is a headline"
          description="now for a really long description of some text that you might never read"
          use_h1={true}
        />
      </li>
    </ul>
  </div>
)

export default Test
