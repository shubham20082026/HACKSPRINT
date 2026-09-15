'use client'

import { useState } from 'react'
import { ControlPanel } from './control-panel'
import { AttackSim } from './panels/attack-sim'
import { AffineEnclave } from './panels/affine-enclave'
import { ReplayDefense } from './panels/replay-defense'
import { TelemetryStream } from './panels/telemetry-stream'
import { Crosshair, KeyRound, Repeat, Activity } from 'lucide-react'

const TABS = [
  { id: 'attack', label: '01. ATTACK_SIMULATION', icon: Crosshair },
  { id: 'enclave', label: '02. AFFINE_ENCLAVE', icon: KeyRound },
  { id: 'replay', label: '03. REPLAY_DEFENSE', icon: Repeat },
  { id: 'telemetry', label: '04. TELEMETRY_STREAM', icon: Activity },
] as const

type TabId = (typeof TABS)[number]['id']

export function Workbench() {
  const [tab, setTab] = useState<TabId>('attack')

  return (
    <section id="invariants" className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <ControlPanel />

      <div className="glass overflow-hidden rounded-xl border border-[#00f0ff]/25 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
        <div className="flex flex-wrap gap-1 border-b border-[#00f0ff]/20 bg-black/40 px-2 pt-2">
          {TABS.map((t) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-t-md px-3.5 py-2.5 text-[0.72rem] font-bold tracking-wide transition-all ${
                  active
                    ? 'border-b-2 border-[#00f0ff] text-[#00f0ff] text-glow-cyan'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <t.icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span className="hidden sm:inline">// {t.label}</span>
                <span className="sm:hidden">{t.label.split('.')[0]}</span>
              </button>
            )
          })}
        </div>

        <div className="p-5 sm:p-7">
          {tab === 'attack' && <AttackSim />}
          {tab === 'enclave' && <AffineEnclave />}
          {tab === 'replay' && <ReplayDefense />}
          {tab === 'telemetry' && <TelemetryStream />}
        </div>
      </div>
    </section>
  )
}
