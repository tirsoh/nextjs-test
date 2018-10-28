import Image from '../image'
import styles from './style.css'

export default function Logo({ dark, image }) {
  let logoType = 'monochrome_logo'
  if (dark) {
    logoType = 'white_logo'
  }
  return (
    <div>
      <Image
        src={image[logoType].url}
        alt={image[logoType].alt}
        svg={image[logoType].format === 'svg'}
        classes="logo-image"
      />
      <style jsx>{styles}</style>
    </div>
  )
}
