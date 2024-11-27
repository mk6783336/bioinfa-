'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const GeneAnnotation: React.FC = () => {
  const [geneId, setGeneId] = useState('')
  const [annotation, setAnnotation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGeneAnnotation = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://rest.ensembl.org/lookup/id/${geneId}?content-type=application/json`)
      if (!response.ok) throw new Error('Failed to fetch gene annotation')
      const data = await response.json()
      setAnnotation(data)
    } catch (err) {
      setError('An error occurred while fetching gene annotation')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gene Annotation Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={geneId}
            onChange={(e) => setGeneId(e.target.value)}
            placeholder="Enter Gene ID"
          />
          <Button onClick={fetchGeneAnnotation} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Annotation'}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {annotation && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Annotation Results:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(annotation, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GeneAnnotation

