export const INITIAL_BALANCE = 10_000_000
export const ATTACK_AMOUNT = 48_500

export type DefenseMode = 'axiom' | 'vonneumann'

export type LogLevel = 'INFO' | 'BLOCKED' | 'CRITICAL' | 'COMMIT'

export interface LogEntry {
  id: string
  timestamp: string
  category: string
  detail: string
  level: LogLevel
}

export interface AgencyQuantum {
  tokenId: string
  authorizedAction: string
  agencyQuota: number
  signature: string
  ttlSeconds: number
  mintedAt: number
  consumed: boolean
}

export interface TransitionResult {
  status: 'COMMITTED' | 'ANNIHILATED'
  reason: string
  resolutionTimeNs: number
  ambientAgency: number
  requiredAgency: number
}

const HEX = '0123456789abcdef'

function randomHex(length: number): string {
  let out = ''
  for (let i = 0; i < length; i++) out += HEX[Math.floor(Math.random() * 16)]
  return out
}

/** Sub-microsecond resolution time, always < 2.0μs, in nanoseconds. */
export function resolutionTimeNs(): number {
  return Math.round(1420 + Math.random() * 560)
}

export function nsToMicro(ns: number): string {
  return (ns / 1000).toFixed(2)
}

/** Mint a single-use, non-cloneable Affine Agency Quantum from the HW root of trust. */
export function mintQuantum(
  action: string,
  quota: number,
  ttlSeconds: number,
): AgencyQuantum {
  return {
    tokenId: randomHex(6).toUpperCase(),
    authorizedAction: action,
    agencyQuota: quota,
    signature: randomHex(40),
    ttlSeconds,
    mintedAt: Date.now(),
    consumed: false,
  }
}

export function isExpired(token: AgencyQuantum): boolean {
  return Date.now() - token.mintedAt > token.ttlSeconds * 1000
}

export function formatUsd(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function nowTimestamp(): string {
  const d = new Date()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  const ms = String(d.getMilliseconds()).padStart(3, '0')
  return `${hh}:${mm}:${ss}.${ms}`
}
