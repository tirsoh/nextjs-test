import playgroundCss from '../../components/global-styles/playground.css'

import Button from '../../components/button'
import SectionHeader from '../../components/section-header'

const TestPage = () => (
  <div>
    <h3>Testing Page!</h3>

    <ul>
      <li>
        <h6>Button</h6>
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

export default TestPage
