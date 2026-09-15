'use client'

import { useAxiom } from './axiom-provider'
import { NeonButton } from './neon-button'
import { RotateCcw, Sliders } from 'lucide-react'
import type { DefenseMode } from '@/lib/axiom-engine'

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[0.68rem] font-bold tracking-wide">
        <span className="text-white/55">{label}</span>
        <span className="text-[#00f0ff]">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f0ff] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        style={{
          background: `linear-gradient(to right, #00f0ff 0%, #38bdf8 ${pct}%, rgba(0,240,255,0.12) ${pct}%, rgba(0,240,255,0.12) 100%)`,
        }}
      />
    </div>
  )
}

const MODES: { id: DefenseMode; label: string; sub: string }[] = [
  { id: 'axiom', label: 'AXIOM-ZERO', sub: 'Digital Physics' },
  { id: 'vonneumann', label: 'VON NEUMANN', sub: 'Legacy Heuristics' },
]

export function ControlPanel() {
  const {
    mode,
    setMode,
    agencyThreshold,
    setThreshold,
    tokenTtl,
    setTtl,
    reset,
  } = useAxiom()

  return (
    <aside className="glass rounded-xl border border-[#00f0ff]/25 p-5 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
      <div className="mb-5 flex items-center gap-2 rounded border border-[#00f0ff]/50 bg-[#00f0ff]/8 px-3 py-2 text-[0.78rem] font-extrabold tracking-widest text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
        <Sliders className="h-3.5 w-3.5" strokeWidth={2.5} />
        &gt;_ CONTROL_PANEL
      </div>

      <div className="mb-5">
        <div className="mb-2 text-[0.68rem] font-bold tracking-wide text-white/55">
          // SELECT PARADIGM
        </div>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => {
            const active = mode === m.id
            const danger = m.id === 'vonneumann'
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`rounded-lg border px-3 py-3 text-left transition-all ${
                  active
                    ? danger
                      ? 'border-[#ff2d6f] bg-[#ff2d6f]/10 shadow-[0_0_18px_rgba(255,45,111,0.3)]'
                      : 'border-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_18px_rgba(0,240,255,0.3)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                }`}
              >
                <div
                  className={`text-[0.74rem] font-extrabold tracking-wide ${
                    active ? (danger ? 'text-[#ff2d6f]' : 'text-[#00f0ff]') : 'text-white/70'
                  }`}
                >
                  {m.label}
                </div>
                <div className="mt-0.5 text-[0.6rem] uppercase tracking-wide text-white/35">
                  {m.sub}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="my-5 h-px bg-[#00f0ff]/15" />

      <div className="mb-4 text-[0.68rem] font-extrabold tracking-wide text-[#00f0ff]">
        // ENCLAVE PARAMETERS
      </div>
      <div className="space-y-5">
        <Slider
          label="Agency Threshold (A)"
          value={agencyThreshold}
          min={0}
          max={100}
          step={5}
          suffix=""
          onChange={setThreshold}
        />
        <Slider
          label="Token TTL"
          value={tokenTtl}
          min={10}
          max={120}
          step={5}
          suffix="s"
          onChange={setTtl}
        />
      </div>

      <div className="my-5 h-px bg-[#00f0ff]/15" />

      <NeonButton variant="ghost" className="w-full" onClick={reset}>
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} />
        RESET_STATE
      </NeonButton>
    </aside>
  )
}
