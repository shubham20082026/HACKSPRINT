'use client'

import { StatusCard } from './status-card'

const TILES = [
  { num: '01', label: 'μS_LATENCY' },
  { num: '00', label: 'RESIDUAL_ENTROPY' },
  { num: '100', label: '%_IMMUNITY' },
  { num: '26', label: 'EPOCH_YR' },
]

export function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-16">
      <div className="relative">
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -left-2 -top-16 select-none text-[26vw] font-bold leading-[0.8] text-white/[0.03] lg:text-[14vw]"
        >
          2026
        </span>

        <p className="mb-3 text-[0.72rem] font-bold tracking-[0.18em] text-[#00f0ff] text-glow-cyan">
          &gt;_ SUB-MICROSECOND DIGITAL DEFENSE SYSTEM
        </p>

        <h1 className="font-display text-[3.5rem] font-black uppercase italic leading-[0.82] tracking-[-0.08em] text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.28)] sm:text-7xl lg:text-8xl">
          <span className="block">AXIOM</span>
          <span
            aria-label="ZERO"
            className="glitch-word block text-[#00f0ff] text-glow-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.35)]"
            data-text="ZERO"
          >
            ZERO
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55">
          Six cyber-attack classes. One invariant law. Prompt injection, tool
          abuse, and token replay collapse in{' '}
          <span className="text-[#00f0ff]">&lt; 2μs</span> — mathematically
          conserved, not heuristically guessed.{' '}
          <span className="text-white/35">No slide decks. No fluff._</span>
        </p>

        <p className="mt-8 inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.16em] text-[#00f0ff]">
          <span className="h-1.5 w-1.5 animate-axiom-pulse rounded-full bg-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
          TELEMETRY_CLOCK // HARDWARE ENCLAVE TIME
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {TILES.map((t) => (
            <div
              key={t.label}
              className="min-w-[68px] rounded-md border border-[#00f0ff]/25 bg-[#040814] px-3.5 py-2.5 text-center shadow-[0_0_15px_rgba(0,240,255,0.08)]"
            >
              <div className="font-display text-2xl font-bold leading-none text-white">
                {t.num}
              </div>
              <div className="mt-1.5 text-[0.55rem] tracking-[0.12em] text-[#00f0ff]">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <StatusCard />
    </section>
  )
}
