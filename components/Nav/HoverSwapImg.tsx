interface HoverSwapImgProps {
  data: {
    icon: {
      alt: string
      url: string
    }
    lightIcon: {
      alt: string
      url: string
    }
  }
}

export default function HoverSwapImg({ data }: HoverSwapImgProps) {
  return (
    <div className="hover-img-container">
      <img className="black" src={data.icon.url} alt={data.icon.alt} />
      <img
        className="white"
        src={data.lightIcon.url}
        alt={data.lightIcon.alt}
      />
    </div>
  )
}
