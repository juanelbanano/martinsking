import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Image from 'next/image'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'King Basketball Club Martins',
  description: 'Club de Basketball Profesional - Formación y Alto Rendimiento',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/logo.png' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <header id="header" className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3">
                <Image 
                  src="/logo.png" 
                  alt="Martins Basket Logo" 
                  width={56} 
                  height={56} 
                  className="h-14 w-auto object-contain"
                  priority 
                />
                <span className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">Martins Basket</span>
              </a>
            </div>
          </nav>
        </header>
        <main className="pt-20">
          {children}
        </main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
