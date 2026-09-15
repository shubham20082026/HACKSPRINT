'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'danger'
}

export function NeonButton({
  children,
  className,
  variant = 'solid',
  ...props
}: NeonButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded font-mono text-[0.78rem] font-black uppercase tracking-[0.12em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40',
        'px-6 py-2.5',
        variant === 'solid' &&
          'bg-[#00f0ff] text-black shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_35px_rgba(255,255,255,0.7)]',
        variant === 'ghost' &&
          'border border-[#00f0ff]/40 bg-[#00f0ff]/5 text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]',
        variant === 'danger' &&
          'bg-[#ff2d6f] text-white shadow-[0_0_25px_rgba(255,45,111,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,45,111,0.7)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
