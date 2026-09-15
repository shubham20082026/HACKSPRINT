import { AxiomProvider } from '@/components/axiom-provider'
import { CursorGlow } from '@/components/cursor-glow'
import { TopNav } from '@/components/top-nav'
import { Hero } from '@/components/hero'
import { Principles } from '@/components/principles'
import { Workbench } from '@/components/workbench'

export default function Page() {
  return (
    <AxiomProvider>
      <CursorGlow />
      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8">
        <TopNav />
        <Hero />
        <Principles />
        <div id="telemetry" className="mt-12">
          <Workbench />
        </div>
        <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-[#00f0ff]/15 pt-6 text-[0.66rem] tracking-wide text-white/35 sm:flex-row">
          <span>
            AXIOM-ZERO // Law of Conservation of Agency (LoCA) — HackSprint 2026
          </span>
          <span className="text-[#00f0ff]/60">
            &gt;_ zero residual entropy // 100% mathematically conserved
          </span>
        </footer>
      </main>
    </AxiomProvider>
  )
}
