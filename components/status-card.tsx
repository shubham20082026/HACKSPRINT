'use client'

import { Shield, Zap, Ban } from 'lucide-react'
import { useAxiom } from './axiom-provider'
import { formatUsd, nsToMicro } from '@/lib/axiom-engine'

const ITEMS = [
  {
    icon: Shield,
    title: 'CONSERVED STATE INTEGRITY (LoCA)',
    desc: 'Data enters with Agency = 0.0. Speculative illegal transitions collapse in < 2.0μs.',
  },
  {
    icon: Zap,
    title: 'AFFINE SPACETIME ENCLAVE',
    desc: 'Single-use Linear Quanta burned upon consumption. Zero token replay possible.',
  },
]

export function StatusCard() {
  const { bankBalance, annihilationCount, avgResolutionNs, mode } = useAxiom()
  const breached = mode === 'vonneumann'

  return (
    <div className="glass relative overflow-hidden rounded-xl border border-[#00f0ff]/40 p-6 shadow-[0_0_40px_rgba(0,240,255,0.16),inset_0_0_25px_rgba(0,240,255,0.05),0_12px_35px_rgba(0,0,0,0.8)]">
      <div className="absolute left-0 top-0 h-[3px] w-full overflow-hidden">
        <div className="h-full w-1/2 animate-axiom-sweep bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="text-[0.8rem] font-extrabold tracking-[0.14em] text-[#00f0ff] text-glow-cyan">
          // SYSTEM_DEFENSE_STATUS
        </span>
        <span
          className={`flex items-center gap-1.5 rounded border px-2.5 py-1 text-[0.62rem] font-black tracking-widest ${
            breached
              ? 'border-[#ff2d6f] bg-[#ff2d6f]/15 text-[#ff2d6f] shadow-[0_0_12px_rgba(255,45,111,0.35)]'
              : 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.35)]'
          }`}
        >
          <span className="h-1.5 w-1.5 animate-axiom-pulse rounded-full bg-current" />
          {breached ? 'LEGACY_EXPOSED' : 'DEFENSE_ONLINE'}
        </span>
      </div>

      <div className="font-display text-5xl font-bold leading-none text-[#00f0ff] text-glow-cyan tabular-nums">
        {formatUsd(bankBalance)}
      </div>
      <div className="mb-5 mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-white/40">
        Total Protected Assets // Zero Capital Bleed
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { label: 'Speed', value: `${nsToMicro(avgResolutionNs)} μs` },
          { label: 'Integrity', value: breached ? 'AT RISK' : '100%' },
          { label: 'Annihilated', value: `${annihilationCount}` },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-md border border-[#00f0ff]/20 bg-[#020610]/75 p-2.5 text-center"
          >
            <div className="text-[0.55rem] uppercase tracking-wide text-white/40">
              {c.label}
            </div>
            <div className="mt-1 text-[0.72rem] font-extrabold text-[#38bdf8]">
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {ITEMS.map((item) => (
        <div
          key={item.title}
          className="group mb-2.5 flex items-start gap-3 rounded-lg border border-[#00f0ff]/15 bg-[#020610]/70 px-3.5 py-3 transition-all hover:translate-x-0.5 hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]"
        >
          <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#00f0ff]" strokeWidth={2.2} />
          <div>
            <div className="text-[0.72rem] font-extrabold uppercase tracking-wide text-white">
              {item.title}
            </div>
            <div className="mt-1 text-[0.68rem] leading-snug text-white/45">
              {item.desc}
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-start gap-3 rounded-lg border border-[#00f0ff]/15 bg-[#020610]/70 px-3.5 py-3">
        <Ban className="mt-0.5 h-4 w-4 shrink-0 text-[#00f0ff]" strokeWidth={2.2} />
        <div>
          <div className="text-[0.72rem] font-extrabold uppercase tracking-wide text-white">
            Annihilated Exploits: {annihilationCount}
          </div>
          <div className="mt-1 text-[0.68rem] leading-snug text-white/45">
            Destructive wave cancellation removes alert fatigue and zero-day
            damage.
          </div>
        </div>
      </div>
    </div>
  )
}
