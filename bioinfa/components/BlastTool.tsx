'use client'

import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

let socket: any

const BlastTool: React.FC = () => {
  const [sequence, setSequence] = useState('')
  const [database, setDatabase] = useState('nr')
  const [program, setProgram] = useState('blastn')
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

    socket.on('blastResult', (data: string) => {
      setResult(data)
    })
  }

  const runBlast = async () => {
    try {
      const res = await fetch('/api/blast', {
        method: 'POST',
        body: JSON.stringify({ sequence, database, program }),
      })
      const data = await res.json()
      setResult(data.data)
      socket.emit('blastQuery', data.data)
    } catch (error) {
      console.error('Error running BLAST:', error)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        placeholder="Enter DNA/Protein Sequence"
        className="h-40"
      />
      <div className="flex space-x-4">
        <Select onValueChange={(value) => setDatabase(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Database" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nr">Nucleotide Collection (nr)</SelectItem>
            <SelectItem value="refseq_rna">Reference RNA sequences</SelectItem>
            <SelectItem value="refseq_protein">Reference proteins</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setProgram(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blastn">blastn</SelectItem>
            <SelectItem value="blastp">blastp</SelectItem>
            <SelectItem value="blastx">blastx</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={runBlast} className="w-full">Run BLAST Query</Button>
      </motion.div>
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">BLAST Results:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">{result}</pre>
        </div>
      )}
    </div>
  )
}

export default BlastTool

