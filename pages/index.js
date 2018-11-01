import globalBase from '../components/global-styles/base.global.css'
import typeBase from '../components/global-styles/typography.global.css'
import codeHighlightBase from '../components/global-styles/code-highlighting.global.css'
import Button from '../components/button'
import SectionHeader from '../components/section-header'
import Toggle from '../components/toggle'

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
