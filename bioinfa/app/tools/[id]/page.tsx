'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface Tool {
  id: string
  name: string
  description: string
}

export default function ToolDetails() {
  const { id } = useParams()
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTool() {
      try {
        const response = await fetch(`/api/tools/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch tool data')
        }
        const data = await response.json()
        setTool(data)
      } catch (err) {
        setError('An error occurred while fetching the tool data')
      } finally {
        setLoading(false)
      }
    }

    fetchTool()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!tool) return <div>Tool not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
      <p className="text-gray-600 mb-8">{tool.description}</p>
      
      {/* Tool-specific UI components would go here */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Tool Interface</h2>
        <p>The specific interface for this tool would be implemented here.</p>
      </div>
    </div>
  )
}

