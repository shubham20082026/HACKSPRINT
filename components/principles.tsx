'use client'

import { Atom, Infinity as InfinityIcon, GitBranch } from 'lucide-react'

const CARDS = [
  {
    icon: Atom,
    tag: 'AXIOM 01',
    title: 'Agency Is Conserved',
    body: 'Like energy in a closed system, authority cannot be created from ambient data. Untrusted input enters at Agency = 0.0 and stays there.',
  },
  {
    icon: InfinityIcon,
    tag: 'AXIOM 02',
    title: 'Enclaves Are Affine',
    body: 'Authority exists only as a signed Linear Quantum minted from a hardware root of trust. It is spent exactly once, then it ceases to exist.',
  },
  {
    icon: GitBranch,
    tag: 'AXIOM 03',
    title: 'Illegal States Collapse',
    body: 'Any transition that would violate conservation is annihilated by destructive interference in under 2 microseconds — no heuristics, no false positives.',
  },
]

export function Principles() {
  return (
    <section id="affine" className="space-y-8 py-4">
      <div className="text-center">
        <p className="text-[0.7rem] font-bold tracking-[0.18em] text-[#00f0ff]">
          // THE INVARIANT LAW
        </p>
        <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-bold uppercase italic leading-tight text-white sm:text-4xl">
          Security as a law of physics, not a{' '}
          <span className="text-[#00f0ff] text-glow-cyan">list of rules</span>
        </h2>
      </div>

      <div className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-lg border border-[#00f0ff]/25 bg-[#020610]/70 px-6 py-4 text-center font-mono text-[#38bdf8]">
        <span className="text-lg font-bold tracking-wider text-white">
          A<sub className="text-[#00f0ff]">out</sub>
        </span>
        <span className="text-white/40">=</span>
        <span className="text-lg font-bold tracking-wider text-white">
          A<sub className="text-[#00f0ff]">in</sub>
        </span>
        <span className="text-white/40">+</span>
        <span className="text-lg font-bold tracking-wider text-[#00f0ff]">
          A<sub>minted</sub>
        </span>
        <span className="text-white/40">−</span>
        <span className="text-lg font-bold tracking-wider text-[#ff2d6f]">
          A<sub>burned</sub>
        </span>
        <span className="ml-2 text-[0.66rem] uppercase tracking-wide text-white/35">
          ≡ conserved
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.tag}
            className="glass group relative overflow-hidden rounded-xl border border-[#00f0ff]/20 p-6 transition-all hover:-translate-y-1 hover:border-[#00f0ff]/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.18)]"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#00f0ff]/10 blur-2xl transition-all group-hover:bg-[#00f0ff]/20" />
            <c.icon className="h-6 w-6 text-[#00f0ff]" strokeWidth={2} />
            <div className="mt-4 text-[0.62rem] font-black tracking-[0.16em] text-[#00f0ff]/70">
              {c.tag}
            </div>
            <h3 className="font-display mt-1 text-lg font-bold uppercase italic text-white">
              {c.title}
            </h3>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-white/50">
              {c.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
