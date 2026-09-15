'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0

    function onMove(e: MouseEvent) {
      tx = e.clientX
      ty = e.clientY
    }
    function loop() {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      if (el) el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full opacity-70 mix-blend-screen"
      style={{
        background:
          'radial-gradient(circle, rgba(0,240,255,0.16) 0%, rgba(0,140,255,0.06) 45%, transparent 70%)',
      }}
    />
  )
}
