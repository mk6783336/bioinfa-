'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Bioinfa
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-blue-200">Home</Link>
            <Link href="/amino-acids" className="hover:text-blue-200">Amino Acids</Link>
            <Link href="/tools" className="hover:text-blue-200">Tools</Link>
            <Link href="/news" className="hover:text-blue-200">News</Link>
            <Link href="/about" className="hover:text-blue-200">About</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                <button onClick={() => signOut()} className="hover:text-blue-200">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-200">Log In</Link>
                <Link href="/signup" className="hover:text-blue-200">Sign Up</Link>
              </>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Link href="/" className="block py-2">Home</Link>
            <Link href="/amino-acids" className="block py-2">Amino Acids</Link>
            <Link href="/tools" className="block py-2">Tools</Link>
            <Link href="/news" className="block py-2">News</Link>
            <Link href="/about" className="block py-2">About</Link>
            <Link href="/contact" className="block py-2">Contact</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="block py-2">Dashboard</Link>
                <button onClick={() => signOut()} className="block py-2">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2">Log In</Link>
                <Link href="/signup" className="block py-2">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Bioinfa. Developed by Mujahid (mk6783336@gmail.com)</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

