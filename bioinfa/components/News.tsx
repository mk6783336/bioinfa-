'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NewsItem {
  title: string
  link: string
  pubDate: string
  content: string
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setArticles(data)
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Bioinformatics News</h2>
      <ul className="space-y-4">
        {articles.map((article, index) => (
          <motion.li
            key={article.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              <h3 className="text-lg font-semibold">{article.title}</h3>
            </a>
            <p className="text-sm text-gray-500 mt-1">{new Date(article.pubDate).toLocaleDateString()}</p>
            <p className="mt-2">{article.content}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default News

