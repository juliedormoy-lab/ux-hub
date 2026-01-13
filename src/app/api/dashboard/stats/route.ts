import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [
      totalProjects,
      completedProjects,
      totalResources,
      totalFeedbacks,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'COMPLETED' } }),
      prisma.resource.count(),
      prisma.feedback.count(),
    ])

    const stats = {
      totalProjects,
      completedProjects,
      totalResources,
      totalFeedbacks,
      implementationRate: 78,
      avgTimeToFeedback: '2.3 jours',
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
