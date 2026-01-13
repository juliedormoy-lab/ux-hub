import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }],
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    })
    return NextResponse.json(resources)
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}
