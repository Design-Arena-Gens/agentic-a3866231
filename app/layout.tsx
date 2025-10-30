import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZZ Exports Voice Agent',
  description: 'AI-powered call handling for Zaph & Zoe Agro Export Company',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
