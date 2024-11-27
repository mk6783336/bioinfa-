'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Rellax from 'rellax'

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    new Rellax('.rellax')
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-8 rellax"
        data-rellax-speed="-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Explore the World of Bioinformatics
      </motion.h1>
      <motion.div
        className="w-64 h-64 mb-8 rellax"
        data-rellax-speed="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M50 10 L90 90 L10 90 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </motion.div>
      <motion.div
        className="space-x-4 rellax"
        data-rellax-speed="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link href="/tools" passHref>
          <motion.a
            className="inline-block bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
            whileHover={{ scale: 1.1, backgroundColor: "#457b9d", color: "white" }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Tools
          </motion.a>
        </Link>
        <Link href="/about" passHref>
          <motion.a
            className="inline-block bg-transparent text-white px-6 py-3 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-500 transition duration-300"
            whileHover={{ scale: 1.1, backgroundColor: "white", color: "#457b9d" }}
            whileTap={{ scale: 0.9 }}
          >
            Learn More
          </motion.a>
        </Link>
      </motion.div>
    </div>
  )
}

