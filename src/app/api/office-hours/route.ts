import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const officeHours = await prisma.officeHour.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: 'asc' },
      include: {
        host: {
          select: {
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: { bookings: true },
        },
      },
    })
    return NextResponse.json(officeHours)
  } catch (error) {
    console.error('Error fetching office hours:', error)
    return NextResponse.json({ error: 'Failed to fetch office hours' }, { status: 500 })
  }
}
