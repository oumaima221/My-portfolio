import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oumayma Bourmech',
  description: 'My Portfolio',
  generator: 'Oumayma.Bourmech',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
