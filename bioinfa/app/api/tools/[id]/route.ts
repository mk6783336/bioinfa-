import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const tool = await prisma.tool.findUnique({
      where: { id: params.id },
    })

    if (!tool) {
      return NextResponse.json({ message: 'Tool not found' }, { status: 404 })
    }

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json({ message: 'An error occurred while fetching the tool' }, { status: 500 })
  }
}

