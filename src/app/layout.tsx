import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { metadata } from '@/lib/metadata'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {children}
          <Footer />
          </main>
        </div>
      </body>
    </html>
  )
}
