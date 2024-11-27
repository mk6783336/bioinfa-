'use client'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

let socket: any

export default function CollaborativeAlignment() {
  const [sequence1, setSequence1] = useState('')
  const [sequence2, setSequence2] = useState('')
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', (msg: { sequence1: string; sequence2: string }) => {
      setSequence1(msg.sequence1)
      setSequence2(msg.sequence2)
    })
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'sequence1') setSequence1(value)
    if (name === 'sequence2') setSequence2(value)
    socket.emit('input-change', { sequence1, sequence2 })
  }

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Collaborative Sequence Alignment</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="sequence1" className="block text-sm font-medium text-gray-700">
            Sequence 1
          </label>
          <Textarea
            id="sequence1"
            name="sequence1"
            value={sequence1}
            onChange={onChangeHandler}
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
            name="sequence2"
            value={sequence2}
            onChange={onChangeHandler}
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
    </div>
  )
}

