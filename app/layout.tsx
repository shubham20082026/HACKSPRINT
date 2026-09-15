import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { BootGate } from '@/components/boot-gate'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'AXIOM-ZERO // Digital Physics for AI Defense',
  description:
    'Sub-microsecond agentic AI defense built on the Law of Conservation of Agency. Prompt injection, tool-abuse and token replay collapse in under 2μs.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#04070d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        <BootGate>{children}</BootGate>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
