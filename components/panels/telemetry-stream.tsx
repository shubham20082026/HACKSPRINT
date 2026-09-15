'use client'

import { useAxiom } from '../axiom-provider'
import type { LogLevel } from '@/lib/axiom-engine'

const LEVEL_COLOR: Record<LogLevel, string> = {
  INFO: '#00f0ff',
  BLOCKED: '#38bdf8',
  COMMIT: '#22e39b',
  CRITICAL: '#ff2d6f',
}

export function TelemetryStream() {
  const { logs, annihilationCount, committedCount, breachCount } = useAxiom()

  return (
    <div className="animate-axiom-rise space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[0.85rem] font-extrabold text-[#00f0ff] text-glow-cyan">
          // TELEMETRY_STREAM: LIVE KERNEL BUS
        </h3>
        <div className="flex gap-2 text-[0.6rem] font-bold tracking-wide">
          <Chip label="ANNIHILATED" value={annihilationCount} color="#38bdf8" />
          <Chip label="COMMITTED" value={committedCount} color="#22e39b" />
          <Chip label="BREACHED" value={breachCount} color="#ff2d6f" />
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto rounded-lg border border-[#00f0ff]/20 border-l-[3px] border-l-[#00f0ff] bg-[#020610] p-4 font-mono text-[0.74rem]">
        {logs.length === 0 ? (
          <div className="text-white/40">
            [00:00:00.000] System initialized. Awaiting state transitions.
            <span className="ml-1 inline-block h-3.5 w-2 animate-axiom-pulse bg-[#00f0ff] align-middle" />
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((e) => (
              <div key={e.id} className="leading-relaxed">
                <span className="text-white/25">[{e.timestamp}]</span>{' '}
                <span
                  className="font-extrabold"
                  style={{ color: LEVEL_COLOR[e.level] }}
                >
                  [{e.category}]
                </span>{' '}
                <span className="text-white/65">{e.detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Chip({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <span
      className="rounded border px-2 py-1"
      style={{
        borderColor: `${color}55`,
        color,
        background: `${color}12`,
      }}
    >
      {label}: {value}
    </span>
  )
}
