import globalBase from '../components/global-styles/base.global.css'
import typeBase from '../components/global-styles/typography.global.css'
import codeHighlightBase from '../components/global-styles/code-highlighting.global.css'
import Button from '../components/button'

const Index = () => (
  <div>
    <style jsx>{globalBase}</style>
    <style jsx>{typeBase}</style>
    <style jsx>{codeHighlightBase}</style>
    <h3>HashiCorp next.js text</h3>
    <Button title="Testing" url="#" theme="dark-outline" />
  </div>
)

export default Index
