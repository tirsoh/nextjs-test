// import styles from './styles'
import styles from './style.css'

export default ({ text }) => {
  return (
    <div className="g-btn">
      <style jsx>{styles}</style>
      {text}
    </div>
  )
}
