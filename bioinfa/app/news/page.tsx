'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NewsItem {
  title: string
  link: string
  pubDate: string
  content: string
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data.articles)
      } catch (err) {
        setError('An error occurred while fetching news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bioinformatics News</h1>
      <div className="space-y-6">
        {news.map((item, index) => (
          <motion.div
            key={item.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.content}</p>
            <div className="flex justify-between items-center">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a>
              <span className="text-sm text-gray-500">{new Date(item.pubDate).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

