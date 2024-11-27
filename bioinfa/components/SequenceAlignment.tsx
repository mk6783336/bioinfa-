'use client'

import { useState } from 'react'

export default function SequenceAlignment() {
  const [sequence1, setSequence1] = useState('')
  const [sequence2, setSequence2] = useState('')
  const [alignment, setAlignment] = useState('')

  const performAlignment = () => {
    // This is a simple implementation of the Needleman-Wunsch algorithm
    // In a real-world scenario, you might want to use a more sophisticated algorithm or an external API
    const gap = -2
    const match = 1
    const mismatch = -1

    const m = sequence1.length
    const n = sequence2.length

    // Initialize the score matrix
    const score = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

    // Initialize the first row and column
    for (let i = 0; i <= m; i++) score[i][0] = i * gap
    for (let j = 0; j <= n; j++) score[0][j] = j * gap

    // Fill the score matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const match_score = score[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? match : mismatch)
        const delete_score = score[i - 1][j] + gap
        const insert_score = score[i][j - 1] + gap
        score[i][j] = Math.max(match_score, delete_score, insert_score)
      }
    }

    // Traceback
    let align1 = ''
    let align2 = ''
    let i = m
    let j = n

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && score[i][j] === score[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? match : mismatch)) {
        align1 = sequence1[i - 1] + align1
        align2 = sequence2[j - 1] + align2
        i--
        j--
      } else if (i > 0 && score[i][j] === score[i - 1][j] + gap) {
        align1 = sequence1[i - 1] + align1
        align2 = '-' + align2
        i--
      } else {
        align1 = '-' + align1
        align2 = sequence2[j - 1] + align2
        j--
      }
    }

    setAlignment(`${align1}\n${align2}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Sequence Alignment</h2>
      <div>
        <label htmlFor="sequence1" className="block text-sm font-medium text-gray-700">Sequence 1</label>
        <textarea
          id="sequence1"
          value={sequence1}
          onChange={(e) => setSequence1(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="sequence2" className="block text-sm font-medium text-gray-700">Sequence 2</label>
        <textarea
          id="sequence2"
          value={sequence2}
          onChange={(e) => setSequence2(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        />
      </div>
      <button
        onClick={performAlignment}
        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Align Sequences
      </button>
      {alignment && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Alignment Result</h3>
          <pre className="bg-gray-100 p-4 rounded-md">{alignment}</pre>
        </div>
      )}
    </div>
  )
}

