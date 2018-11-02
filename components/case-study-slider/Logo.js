import Image from '../image'

export default function Logo({ dark, image }) {
  let logoType = 'monochrome_logo'
  if (dark) {
    logoType = 'white_logo'
  }
  return (
    <div className="logo">
      <Image
        src={image[logoType].url}
        alt={image[logoType].alt}
        svg={image[logoType].format === 'svg'}
      />
    </div>
  )
}
