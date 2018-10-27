import globalBase from '../components/global-styles/base.global.css'
import Button from '../components/button'

const Index = () => (
  <div>
    <style jsx>{globalBase}</style>
    <h3>HashiCorp next.js text</h3>
    <Button title="Testing" url="#" theme="dark-outline" />
  </div>
)

export default Index
