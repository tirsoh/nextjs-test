export default function StatusBar({
  dark,
  active,
  timing
}: {
  dark?: boolean
  active: boolean
  timing: number
}) {
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
    </div>
  )
}
