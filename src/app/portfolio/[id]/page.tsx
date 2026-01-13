'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge, StatusBadge, Avatar } from '@/components/ui'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  ArrowLeftIcon,
  PencilIcon,
  CalendarIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { formatDate, parseJSON } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  team: string
  startDate: string
  endDate: string | null
  status: string
  tags: string
  context: string | null
  analysis: string | null
  recommendations: string | null
  metrics: string
  viewCount: number
  createdBy: {
    name: string
    avatar: string | null
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  if (loading) {
    return (
      <MainLayout title="Chargement...">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-100 rounded w-1/3" />
          <div className="h-64 bg-surface-100 rounded" />
        </div>
      </MainLayout>
    )
  }

  if (!project) {
    return (
      <MainLayout title="Projet non trouvé">
        <Card className="text-center py-16">
          <p className="text-surface-500 mb-4">Ce projet n&apos;existe pas.</p>
          <Link href="/portfolio">
            <Button variant="secondary">Retour au portfolio</Button>
          </Link>
        </Card>
      </MainLayout>
    )
  }

  const tags = parseJSON<string[]>(project.tags, [])
  const metrics = parseJSON<{ before?: Record<string, string>; after?: Record<string, string> }>(project.metrics, {})

  return (
    <MainLayout
      title={project.title}
      subtitle={project.team}
      actions={
        <Link href={`/portfolio/${id}/edit`}>
          <Button leftIcon={<PencilIcon className="h-4 w-4" />}>Modifier</Button>
        </Link>
      }
    >
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 mb-6">
        <ArrowLeftIcon className="h-4 w-4" />
        Retour au portfolio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={project.status} />
              {tags.map((tag) => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
            <p className="text-surface-700">{project.description}</p>
          </Card>

          {project.context && (
            <Card>
              <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">📋 Contexte</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: project.context }} />
            </Card>
          )}

          {project.analysis && (
            <Card>
              <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">🔍 Analyse</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: project.analysis }} />
            </Card>
          )}

          {project.recommendations && (
            <Card>
              <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">💡 Recommandations</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: project.recommendations }} />
            </Card>
          )}

          {(metrics.before || metrics.after) && (
            <Card>
              <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">📊 Métriques</h2>
              <div className="grid grid-cols-2 gap-6">
                {metrics.before && (
                  <div className="p-4 bg-surface-50 rounded-xl">
                    <h3 className="text-sm font-medium text-surface-500 mb-3">Avant</h3>
                    {Object.entries(metrics.before).map(([key, value]) => (
                      <div key={key} className="flex justify-between mb-2">
                        <span className="text-sm text-surface-600">{key}</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {metrics.after && (
                  <div className="p-4 bg-success-50 rounded-xl">
                    <h3 className="text-sm font-medium text-success-600 mb-3">Après</h3>
                    {Object.entries(metrics.after).map(([key, value]) => (
                      <div key={key} className="flex justify-between mb-2">
                        <span className="text-sm text-surface-600">{key}</span>
                        <span className="text-sm font-medium text-success-700">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-medium text-surface-500 mb-4">Informations</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500">Créé par</span>
                <div className="flex items-center gap-2">
                  <Avatar src={project.createdBy.avatar} name={project.createdBy.name} size="xs" />
                  <span className="text-sm font-medium">{project.createdBy.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500 flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Début
                </span>
                <span className="text-sm font-medium">{formatDate(project.startDate)}</span>
              </div>
              {project.endDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-500 flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" /> Fin
                  </span>
                  <span className="text-sm font-medium">{formatDate(project.endDate)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500 flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" /> Vues
                </span>
                <span className="text-sm font-medium">{project.viewCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
