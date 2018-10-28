import styles from './style.css'

export default function StatusBar({ dark, active, timing }) {
  return (
    <div className={`progress-bar${dark ? ' dark' : ''}`}>
      <span
        className={`${active ? ' active' : ''}`}
        style={
          active
            ? { animationDuration: `${timing}s` }
            : { animationDuration: `${0}s` }
        }
      />
      <style jsx>{styles}</style>
    </div>
  )
}
