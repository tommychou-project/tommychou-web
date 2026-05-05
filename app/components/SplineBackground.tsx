'use client'

import { useEffect, useState } from 'react'

export default function SplineBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) return null

  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <iframe
        src="https://my.spline.design/particles-Qf1U1dJ2pP0Xb13S1GsqcCbo/"
        frameBorder={0}
        width="100%"
        height="100%"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}