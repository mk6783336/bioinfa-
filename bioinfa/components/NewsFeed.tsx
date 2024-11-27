'use client'

import { useState, useEffect } from 'react'

interface Article {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  pubDate: string;
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/pubmed')
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Latest Bioinformatics News</h2>
      {articles.map((article) => (
        <div key={article.id} className="border p-4 rounded-md">
          <h3 className="text-lg font-semibold">{article.title}</h3>
          <p className="text-sm text-gray-600">
            {article.authors.join(', ')} - {article.journal} ({article.pubDate})
          </p>
        </div>
      ))}
    </div>
  )
}

