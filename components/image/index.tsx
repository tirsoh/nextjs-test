import queryString from 'query-string'
import assign from 'object-assign'

import { ImageProps } from './types'

export default function Image({
  src,
  steps = [250, 500, 750, 1000, 1500, 2000, 2500],
  sizes = '100vw',
  svg = false,
  classes,
  aspect_ratio,
  params = {},
  alt
}: ImageProps) {
  // set default params, merge user preferences with priority
  const opts = assign(
    {
      fm: src.match(/\.(\w+)$/)[1],
      fit: aspect_ratio ? 'crop' : 'max',
      q: 80
    },
    params
  )

  if (svg) {
    // if it's an SVG, we don't need the picture element, so return
    return <img className={classes} src={src} alt={alt} />
  } else {
    // otherwise, we return a picture element with multiple sizes and a webp
    // optimized version for performance
    const srcDefault = formatSteps(steps, opts, aspect_ratio, src)
    const srcWebp = formatSteps(
      steps,
      assign({}, opts, { fm: 'webp' }),
      aspect_ratio,
      src
    )

    return (
      <picture>
        <source type="image/webp" srcSet={srcWebp} sizes={sizes} />
        <img
          className={classes}
          src={format(src, opts, aspect_ratio && aspect_ratio[2], aspect_ratio)}
          srcSet={srcDefault}
          sizes={sizes}
          alt={alt}
        />
      </picture>
    )
  }
}

function formatSteps(src, opts, aspect_ratio, steps) {
  return steps.map(s => `${format(src, opts, s, aspect_ratio)} ${s}w`)
}

function format(src, opts, width, aspect_ratio) {
  const opt = assign({}, opts)
  if (width) opt.w = width
  if (width && aspect_ratio) opt.h = (aspect_ratio[1] / aspect_ratio[0]) * width
  return `${src}?${queryString.stringify(opt)}`
}
