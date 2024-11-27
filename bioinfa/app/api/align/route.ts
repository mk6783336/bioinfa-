import { NextResponse } from 'next/server'

function needlemanWunsch(seq1: string, seq2: string): string {
  const gap = -2
  const match = 1
  const mismatch = -1

  const m = seq1.length
  const n = seq2.length

  // Initialize the score matrix
  const score: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

  // Initialize the first row and column
  for (let i = 0; i <= m; i++) score[i][0] = i * gap
  for (let j = 0; j <= n; j++) score[0][j] = j * gap

  // Fill the score matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match_score = score[i - 1][j - 1] + (seq1[i - 1] === seq2[j - 1] ? match : mismatch)
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
    if (i > 0 && j > 0 && score[i][j] === score[i - 1][j - 1] + (seq1[i - 1] === seq2[j - 1] ? match : mismatch)) {
      align1 = seq1[i - 1] + align1
      align2 = seq2[j - 1] + align2
      i--
      j--
    } else if (i > 0 && score[i][j] === score[i - 1][j] + gap) {
      align1 = seq1[i - 1] + align1
      align2 = '-' + align2
      i--
    } else {
      align1 = '-' + align1
      align2 = seq2[j - 1] + align2
      j--
    }
  }

  return `${align1}\n${align2}`
}

export async function POST(req: Request) {
  try {
    const { sequence1, sequence2 } = await req.json()
    const alignment = needlemanWunsch(sequence1, sequence2)
    return NextResponse.json({ alignment })
  } catch (error) {
    console.error('Error aligning sequences:', error)
    return NextResponse.json({ error: 'Failed to align sequences' }, { status: 500 })
  }
}

