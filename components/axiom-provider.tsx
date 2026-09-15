'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react'
import {
  INITIAL_BALANCE,
  ATTACK_AMOUNT,
  mintQuantum,
  isExpired,
  resolutionTimeNs,
  nsToMicro,
  nowTimestamp,
  type AgencyQuantum,
  type DefenseMode,
  type LogEntry,
  type LogLevel,
  type TransitionResult,
} from '@/lib/axiom-engine'

interface AxiomState {
  mode: DefenseMode
  agencyThreshold: number
  tokenTtl: number
  bankBalance: number
  consumedTokenIds: string[]
  lastToken: AgencyQuantum | null
  logs: LogEntry[]
  annihilationCount: number
  committedCount: number
  breachCount: number
  lastResult: TransitionResult | null
  totalResolvedNs: number
  resolvedCount: number
}

const initialState: AxiomState = {
  mode: 'axiom',
  agencyThreshold: 50,
  tokenTtl: 45,
  bankBalance: INITIAL_BALANCE,
  consumedTokenIds: [],
  lastToken: null,
  logs: [],
  annihilationCount: 0,
  committedCount: 0,
  breachCount: 0,
  lastResult: null,
  totalResolvedNs: 0,
  resolvedCount: 0,
}

type Action =
  | { type: 'SET_MODE'; mode: DefenseMode }
  | { type: 'SET_THRESHOLD'; value: number }
  | { type: 'SET_TTL'; value: number }
  | { type: 'ATTACK' }
  | { type: 'MINT' }
  | { type: 'COMMIT'; amount: number; vendor: string }
  | { type: 'REPLAY' }
  | { type: 'RESET' }

function log(
  logs: LogEntry[],
  category: string,
  detail: string,
  level: LogLevel,
): LogEntry[] {
  const entry: LogEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: nowTimestamp(),
    category,
    detail,
    level,
  }
  return [entry, ...logs].slice(0, 60)
}

function reducer(state: AxiomState, action: Action): AxiomState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.mode }
    case 'SET_THRESHOLD':
      return { ...state, agencyThreshold: action.value }
    case 'SET_TTL':
      return { ...state, tokenTtl: action.value }

    case 'ATTACK': {
      if (state.mode === 'vonneumann') {
        const result: TransitionResult = {
          status: 'COMMITTED',
          reason:
            'Legacy heuristic guardrail bypassed. Ambient data assumed the agent’s standing authority.',
          resolutionTimeNs: 0,
          ambientAgency: 0,
          requiredAgency: state.agencyThreshold,
        }
        return {
          ...state,
          bankBalance: state.bankBalance - ATTACK_AMOUNT,
          breachCount: state.breachCount + 1,
          lastResult: result,
          logs: log(
            state.logs,
            'BREACH',
            `Prompt injection bypassed WAF/guardrail. ${ATTACK_AMOUNT.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} exfiltrated.`,
            'CRITICAL',
          ),
        }
      }
      const ns = resolutionTimeNs()
      const result: TransitionResult = {
        status: 'ANNIHILATED',
        reason: `Conservation enforced: Agency_in (0.0) < Agency_req (${state.agencyThreshold.toFixed(1)}). Ambient data carries zero agency and cannot mint authority.`,
        resolutionTimeNs: ns,
        ambientAgency: 0,
        requiredAgency: state.agencyThreshold,
      }
      return {
        ...state,
        annihilationCount: state.annihilationCount + 1,
        lastResult: result,
        totalResolvedNs: state.totalResolvedNs + ns,
        resolvedCount: state.resolvedCount + 1,
        logs: log(
          state.logs,
          'ANNIHILATED',
          `Injection collapsed in ${nsToMicro(ns)}μs. Zero residual entropy.`,
          'BLOCKED',
        ),
      }
    }

    case 'MINT': {
      const token = mintQuantum('wire_transfer', 60, state.tokenTtl)
      return {
        ...state,
        lastToken: token,
        logs: log(
          state.logs,
          'MINT',
          `Affine Quantum #${token.tokenId} minted from HW root of trust (quota 60.0, TTL ${state.tokenTtl}s).`,
          'INFO',
        ),
      }
    }

    case 'COMMIT': {
      const token = state.lastToken
      if (!token) return state
      const ns = resolutionTimeNs()

      if (
        token.consumed ||
        state.consumedTokenIds.includes(token.tokenId) ||
        isExpired(token)
      ) {
        const result: TransitionResult = {
          status: 'ANNIHILATED',
          reason: token.consumed
            ? 'Linear token already consumed in spacetime.'
            : 'Token TTL expired inside the affine enclave.',
          resolutionTimeNs: ns,
          ambientAgency: token.agencyQuota,
          requiredAgency: state.agencyThreshold,
        }
        return {
          ...state,
          annihilationCount: state.annihilationCount + 1,
          lastResult: result,
          totalResolvedNs: state.totalResolvedNs + ns,
          resolvedCount: state.resolvedCount + 1,
          logs: log(
            state.logs,
            'ANNIHILATED',
            `Commit rejected for #${token.tokenId}: ${result.reason}`,
            'BLOCKED',
          ),
        }
      }

      const consumedToken = { ...token, consumed: true }
      const result: TransitionResult = {
        status: 'COMMITTED',
        reason: `Authority verified. ${action.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} settled to ${action.vendor}. Token burned.`,
        resolutionTimeNs: ns,
        ambientAgency: token.agencyQuota,
        requiredAgency: state.agencyThreshold,
      }
      return {
        ...state,
        bankBalance: state.bankBalance - action.amount,
        committedCount: state.committedCount + 1,
        lastToken: consumedToken,
        consumedTokenIds: [...state.consumedTokenIds, token.tokenId],
        lastResult: result,
        totalResolvedNs: state.totalResolvedNs + ns,
        resolvedCount: state.resolvedCount + 1,
        logs: log(
          state.logs,
          'COMMITTED',
          `Settled ${action.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} to ${action.vendor}. Quantum #${token.tokenId} burned.`,
          'COMMIT',
        ),
      }
    }

    case 'REPLAY': {
      const token = state.lastToken
      if (!token) return state
      const ns = resolutionTimeNs()
      const result: TransitionResult = {
        status: 'ANNIHILATED',
        reason:
          'Linear logic violation: token already consumed in spacetime. Replay is physically impossible.',
        resolutionTimeNs: ns,
        ambientAgency: token.agencyQuota,
        requiredAgency: state.agencyThreshold,
      }
      return {
        ...state,
        annihilationCount: state.annihilationCount + 1,
        lastResult: result,
        totalResolvedNs: state.totalResolvedNs + ns,
        resolvedCount: state.resolvedCount + 1,
        logs: log(
          state.logs,
          'REPLAY_BLOCKED',
          `Reused Quantum #${token.tokenId} annihilated in ${nsToMicro(ns)}μs.`,
          'BLOCKED',
        ),
      }
    }

    case 'RESET':
      return { ...initialState, mode: state.mode }

    default:
      return state
  }
}

interface AxiomContextValue extends AxiomState {
  setMode: (mode: DefenseMode) => void
  setThreshold: (value: number) => void
  setTtl: (value: number) => void
  attack: () => void
  mint: () => void
  commit: (amount: number, vendor: string) => void
  replay: () => void
  reset: () => void
  avgResolutionNs: number
}

const AxiomContext = createContext<AxiomContextValue | null>(null)

export function AxiomProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setMode = useCallback((mode: DefenseMode) => dispatch({ type: 'SET_MODE', mode }), [])
  const setThreshold = useCallback((value: number) => dispatch({ type: 'SET_THRESHOLD', value }), [])
  const setTtl = useCallback((value: number) => dispatch({ type: 'SET_TTL', value }), [])
  const attack = useCallback(() => dispatch({ type: 'ATTACK' }), [])
  const mint = useCallback(() => dispatch({ type: 'MINT' }), [])
  const commit = useCallback((amount: number, vendor: string) => dispatch({ type: 'COMMIT', amount, vendor }), [])
  const replay = useCallback(() => dispatch({ type: 'REPLAY' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const avgResolutionNs = state.resolvedCount > 0 ? state.totalResolvedNs / state.resolvedCount : 1820

  const value: AxiomContextValue = {
    ...state,
    setMode,
    setThreshold,
    setTtl,
    attack,
    mint,
    commit,
    replay,
    reset,
    avgResolutionNs,
  }

  return <AxiomContext.Provider value={value}>{children}</AxiomContext.Provider>
}

export function useAxiom() {
  const ctx = useContext(AxiomContext)
  if (!ctx) throw new Error('useAxiom must be used within AxiomProvider')
  return ctx
}
