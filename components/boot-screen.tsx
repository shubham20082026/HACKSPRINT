'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  { label: 'AXIOM_ZERO BIOS v0.1.0 · LoCA KERNEL', head: true },
  { label: 'LOADING KERNEL............. OK' },
  { label: 'MOUNTING /dev/agency....... OK' },
  { label: 'CALIBRATING ENTROPY 0.00%.. OK' },
  { label: 'MINTING AFFINE ENCLAVE..... OK' },
  { label: 'ARMING REPLAY ANNIHILATOR.. OK' },
  { label: 'CONSERVATION_INVARIANT..... LOCKED' },
]

const LINE_INTERVAL = 260

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    setExiting(true)
    window.setTimeout(onComplete, 520)
  }, [onComplete])

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setVisibleLines((n) => {
        if (n >= BOOT_LINES.length) {
          window.clearInterval(lineTimer)
          return n
        }
        return n + 1
      })
    }, LINE_INTERVAL)
    return () => window.clearInterval(lineTimer)
  }, [])

  useEffect(() => {
    const total = BOOT_LINES.length * LINE_INTERVAL + 500
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / total) * 100))
      setProgress(pct)
      if (pct >= 100) {
        window.setTimeout(finish, 420)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [finish])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Skip boot sequence"
      onClick={finish}
      className={`fixed inset-0 z-[200] flex cursor-pointer flex-col justify-center bg-[#000000] px-6 transition-opacity duration-500 sm:px-0 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="scanlines pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% -5%, rgba(0,240,255,0.12) 0%, transparent 45%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-xl font-mono text-[0.82rem] leading-relaxed sm:text-sm">
        <div className="min-h-[220px]">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={line.label}
              className="animate-axiom-rise flex items-start gap-2"
              style={{ animationDuration: '0.28s' }}
            >
              <span className="text-[#00f0ff]/50">$</span>
              <span
                className={
                  line.head
                    ? 'text-[#00f0ff] text-glow-cyan'
                    : 'text-white/80'
                }
              >
                {renderLine(line.label, line.head)}
              </span>
            </div>
          ))}
          {visibleLines >= BOOT_LINES.length && (
            <span className="ml-3 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#00f0ff]" />
          )}
        </div>

        <div className="mt-6">
          <div className="mb-1.5 flex items-center justify-between text-[0.62rem] tracking-[0.25em] text-white/45">
            <span>BOOT_SEQUENCE</span>
            <span className="text-[#00f0ff]">{progress}%</span>
          </div>
          <div className="h-[3px] w-full overflow-hidden bg-[#00f0ff]/12">
            <div
              className="h-full bg-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.8)] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 animate-pulse text-[0.6rem] tracking-[0.3em] text-white/35">
            CLICK ANYWHERE TO SKIP
          </div>
        </div>
      </div>
    </div>
  )
}

function renderLine(label: string, head?: boolean) {
  if (head) return label
  const match = label.match(/^(.*?)(OK|LOCKED|OPEN)$/)
  if (!match) return label
  return (
    <>
      {match[1]}
      <span className="text-[#00f0ff]">{match[2]}</span>
    </>
  )
}
