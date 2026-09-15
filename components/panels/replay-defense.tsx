'use client'

import { useState } from 'react'
import { useAxiom } from '../axiom-provider'
import { NeonButton } from '../neon-button'
import { ResultBanner } from './attack-sim'
import { Repeat, AlertTriangle } from 'lucide-react'
import { nsToMicro } from '@/lib/axiom-engine'

export function ReplayDefense() {
  const { replay, lastToken, lastResult } = useAxiom()
  const [attempted, setAttempted] = useState(false)

  return (
    <div className="animate-axiom-rise space-y-6">
      <div>
        <h3 className="text-[0.95rem] font-extrabold text-[#00f0ff] text-glow-cyan">
          // LINEAR LOGIC: PREVENTION OF TOKEN REPLAY IN SPACETIME
        </h3>
        <p className="mt-1.5 text-[0.8rem] text-white/50">
          Tokens are consumed in spacetime upon execution. Replay attempts
          result in immediate state collapse.
        </p>
      </div>

      {!lastToken ? (
        <div className="flex items-center gap-3 rounded-lg border border-[#ff9500]/30 bg-[#ff9500]/8 p-4 text-[0.78rem] text-[#ffb454]">
          <AlertTriangle className="h-4 w-4 shrink-0" strokeWidth={2.4} />
          Mint a token in the Affine Enclave tab first so there is an executed
          token to test.
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-[#00f0ff]/20 bg-[#020610] p-4">
            <div className="text-[0.72rem] text-white/50">
              Intercepted token:{' '}
              <code className="font-mono text-[#00f0ff]">
                #{lastToken.tokenId}
              </code>{' '}
              <span
                className={`ml-2 rounded px-2 py-0.5 text-[0.58rem] font-black tracking-wider ${
                  lastToken.consumed
                    ? 'bg-[#ff2d6f]/15 text-[#ff2d6f]'
                    : 'bg-[#00f0ff]/15 text-[#00f0ff]'
                }`}
              >
                {lastToken.consumed ? 'CONSUMED' : 'NOT YET SPENT'}
              </span>
            </div>
            <p className="mt-2 text-[0.68rem] leading-snug text-white/40">
              An attacker replays a previously valid, signed token to re-trigger
              a wire transfer. Linear logic forbids re-spending a consumed
              quantum.
            </p>
          </div>

          <NeonButton
            variant="danger"
            onClick={() => {
              replay()
              setAttempted(true)
            }}
          >
            <Repeat className="h-4 w-4" strokeWidth={2.5} />
            ATTEMPT_REPLAY_ATTACK
          </NeonButton>

          {attempted && lastResult && (
            <ResultBanner
              annihilated
              headline={`REPLAY ANNIHILATED IN ${nsToMicro(lastResult.resolutionTimeNs)} μs`}
              detail="Linear token already consumed in spacetime. Tokens cannot be duplicated or re-spent — bank reserves remain untouched."
            />
          )}
        </>
      )}
    </div>
  )
}
