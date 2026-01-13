import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    
    const resource = await prisma.resource.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        createdBy: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    await prisma.resource.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(resource)
  } catch (error) {
    console.error('Error fetching resource:', error)
    return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 })
  }
}
