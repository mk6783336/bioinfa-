import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const { title, tool } = req.body
      const bookmark = await prisma.bookmark.create({
        data: {
          title,
          tool,
          userId: session.user.id,
        },
      })
      res.status(200).json(bookmark)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create bookmark' })
    }
  } else if (req.method === 'GET') {
    try {
      const bookmarks = await prisma.bookmark.findMany({
        where: { userId: session.user.id },
      })
      res.status(200).json(bookmarks)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookmarks' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

