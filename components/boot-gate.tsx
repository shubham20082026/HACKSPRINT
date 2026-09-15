'use client'

import { useEffect, useState } from 'react'
import { BootScreen } from '@/components/boot-screen'

export function BootGate({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (booted) {
      document.body.style.overflow = ''
    } else if (ready) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [booted, ready])

  return (
    <>
      {ready && !booted && <BootScreen onComplete={() => setBooted(true)} />}
      <div
        className={`transition-opacity duration-700 ${
          booted ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!booted}
      >
        {children}
      </div>
    </>
  )
}
