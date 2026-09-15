'use client'

import { Zap, Terminal } from 'lucide-react'

const LINKS = ['INVARIANTS', 'AFFINE ENCLAVE', 'REPLAY', 'TELEMETRY']

export function TopNav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00f0ff]/15 pb-5">
      <div className="flex items-center gap-2 rounded-md border border-[#00f0ff]/70 bg-[#00f0ff]/5 px-3.5 py-1.5 text-[#00f0ff] shadow-[0_0_18px_rgba(0,240,255,0.3)]">
        <Terminal className="h-4 w-4" strokeWidth={2.5} />
        <span className="text-sm font-extrabold tracking-widest">AXIOM // ZERO</span>
      </div>

      <nav className="hidden items-center gap-7 text-[0.7rem] font-bold tracking-[0.14em] text-white/45 lg:flex">
        <span className="text-[#00f0ff]">// PARADIGM: DIGITAL PHYSICS</span>
        {LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.split(' ')[0].toLowerCase()}`}
            className="transition-colors hover:text-white"
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 rounded-md border border-[#00f0ff]/30 bg-[#00f0ff]/5 px-3 py-1.5 text-[0.7rem] font-bold text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
        <Zap className="h-3.5 w-3.5 animate-axiom-flicker" fill="currentColor" strokeWidth={0} />
        LATENCY &lt; 2.0 μs
      </div>
    </header>
  )
}
