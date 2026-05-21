'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type SafeImageProps = ImageProps & {
  fallbackSrc?: string
}

export function SafeImage({
  src,
  fallbackSrc = '/fashion-fallback.svg',
  onError,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc)
        }
        onError?.(event)
      }}
    />
  )
}
