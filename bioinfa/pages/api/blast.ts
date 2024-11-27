import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { sequence, database, program } = JSON.parse(req.body)

    try {
      const response = await fetch(
        `https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Put&QUERY=${sequence}&DATABASE=${database}&PROGRAM=${program}`
      )

      const data = await response.text()
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching BLAST results' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

