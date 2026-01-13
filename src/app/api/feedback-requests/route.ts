import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const requests = await prisma.feedbackRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        requester: {
          select: {
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: { feedbacks: true },
        },
      },
    })
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching feedback requests:', error)
    return NextResponse.json({ error: 'Failed to fetch feedback requests' }, { status: 500 })
  }
}
