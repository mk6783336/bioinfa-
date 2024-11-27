'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const SequenceAligner: React.FC = () => {
  const [sequence1, setSequence1] = useState('')
  const [sequence2, setSequence2] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const align = (seq1: string, seq2: string): string => {
    // Simple alignment algorithm (for demonstration purposes)
    const result = seq1
      .split('')
      .map((char, i) => (char === seq2[i] ? char : '-'))
      .join('')
    return `${result}\n${seq2}`
  }

  const handleAlign = () => {
    setResult(align(sequence1, sequence2))
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="sequence1" className="block text-sm font-medium text-gray-700">
          Sequence 1
        </label>
        <Textarea
          id="sequence1"
          value={sequence1}
          onChange={(e) => setSequence1(e.target.value)}
          placeholder="Enter first sequence"
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="sequence2" className="block text-sm font-medium text-gray-700">
          Sequence 2
        </label>
        <Textarea
          id="sequence2"
          value={sequence2}
          onChange={(e) => setSequence2(e.target.value)}
          placeholder="Enter second sequence"
          className="mt-1"
        />
      </div>
      <Button onClick={handleAlign}>Align Sequences</Button>
      {result && (
        <div>
          <h3 className="text-lg font-medium">Alignment Result:</h3>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-x-auto">{result}</pre>
        </div>
      )}
    </div>
  )
}

export default SequenceAligner

