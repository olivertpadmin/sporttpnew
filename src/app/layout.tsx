import type { Metadata } from 'next'
import './globals.css'
import MobileGate from '@/components/MobileGate'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'PLG Ecosystem',
  description: 'One platform. Every moment.',
  icons: {
    icon: '/media/plg-fav.png',
    shortcut: '/media/plg-fav.png',
    apple: '/media/plg-fav.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <Analytics />
        <MobileGate>{children}</MobileGate>
      </body>
    </html>
  )
}
