'use client'

import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { motion } from 'framer-motion'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Input } from '@/components/ui/input'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <div className="min-h-screen bg-background text-foreground">
              <header className="bg-primary text-primary-foreground p-4">
                <div className="container mx-auto flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Bioinfa</h1>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      initial={{ width: 40 }}
                      whileFocus={{ width: 200 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        type="search"
                        placeholder="Search..."
className="w-full"
                      />
                    </motion.div>
                    <DarkModeToggle />
                  </div>
                </div>
              </header>
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

