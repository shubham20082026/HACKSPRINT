'use client'

import { useState } from 'react'
import { useAxiom } from '../axiom-provider'
import { NeonButton } from '../neon-button'
import { ResultBanner } from './attack-sim'
import { KeyRound, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { formatUsd } from '@/lib/axiom-engine'

export function AffineEnclave() {
  const { mint, commit, lastToken, lastResult } = useAxiom()
  const [amount, setAmount] = useState(12500)
  const [vendor, setVendor] = useState('HACKSPRINT_OFFICIAL_CLOUD')

  const showCommitResult =
    lastResult &&
    (lastResult.status === 'COMMITTED' ||
      (lastResult.status === 'ANNIHILATED' && lastToken?.consumed))

  return (
    <div className="animate-axiom-rise space-y-6">
      <div>
        <h3 className="text-[0.95rem] font-extrabold text-[#00f0ff] text-glow-cyan">
          // PROVENANCE: AFFINE AGENCY QUANTUM MINTING
        </h3>
        <p className="mt-1.5 text-[0.8rem] text-white/50">
          Authorized state changes require single-use, non-cloneable Affine
          Quanta minted from a Hardware Root of Trust.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[0.68rem] font-bold tracking-wide text-white/55">
              Approved Settlement ($)
            </span>
            <input
              type="number"
              min={500}
              max={30000}
              step={500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-lg border border-[#00f0ff]/20 bg-[#020610] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-[#00f0ff]/60"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.68rem] font-bold tracking-wide text-white/55">
              Approved Ledger Endpoint
            </span>
            <input
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full rounded-lg border border-[#00f0ff]/20 bg-[#020610] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-[#00f0ff]/60"
            />
          </label>
          <NeonButton variant="ghost" onClick={mint} className="w-full">
            <KeyRound className="h-3.5 w-3.5" strokeWidth={2.5} />
            MINT_AFFINE_QUANTUM
          </NeonButton>
        </div>

        <div className="space-y-4">
          {lastToken ? (
            <div
              className={`rounded-lg border p-4 transition-all ${
                lastToken.consumed
                  ? 'border-white/15 bg-white/[0.02] opacity-70'
                  : 'border-[#00f0ff]/50 bg-[#00f0ff]/5 shadow-[0_0_18px_rgba(0,240,255,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-extrabold tracking-wide text-[#00f0ff]">
                  // CERTIFICATE #{lastToken.tokenId}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[0.58rem] font-black tracking-wider ${
                    lastToken.consumed
                      ? 'bg-white/10 text-white/50'
                      : 'bg-[#00f0ff]/15 text-[#00f0ff]'
                  }`}
                >
                  {lastToken.consumed ? 'CONSUMED' : 'ARMED'}
                </span>
              </div>
              <dl className="mt-3 space-y-1.5 text-[0.7rem]">
                <Row k="ACTION" v={lastToken.authorizedAction} />
                <Row k="AGENCY_QUOTA" v={lastToken.agencyQuota.toFixed(1)} />
                <Row k="TTL" v={`${lastToken.ttlSeconds}s`} />
                <div className="flex gap-2 pt-1 text-white/35">
                  <span className="shrink-0">HMAC</span>
                  <span className="truncate font-mono text-[#38bdf8]/70">
                    {lastToken.signature.slice(0, 28)}…
                  </span>
                </div>
              </dl>
              <NeonButton
                onClick={() => commit(amount, vendor)}
                disabled={lastToken.consumed}
                className="mt-4 w-full"
              >
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                COMMIT_STATE_CHANGE
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </NeonButton>
            </div>
          ) : (
            <div className="flex h-full min-h-[180px] items-center justify-center rounded-lg border border-dashed border-[#00f0ff]/20 bg-[#020610]/50 p-4 text-center text-[0.74rem] text-white/40">
              No active quantum. Mint an Affine Quantum to authorize a settlement
              of {formatUsd(amount)}.
            </div>
          )}
        </div>
      </div>

      {showCommitResult && lastResult && (
        <ResultBanner
          annihilated={lastResult.status === 'ANNIHILATED'}
          headline={
            lastResult.status === 'COMMITTED'
              ? 'STATE COMMITTED — AUTHORITY CONSERVED'
              : 'COMMIT ANNIHILATED'
          }
          detail={lastResult.reason}
        />
      )}
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-white/40">{k}</span>
      <span className="font-mono text-white/75">{v}</span>
    </div>
  )
}
