'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  ArrowLeftIcon,
  PencilIcon,
  ShareIcon,
  BookmarkIcon,
  EyeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { formatDate, parseJSON } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Resource {
  id: string
  title: string
  slug: string
  content: string
  type: string
  tags: string
  pinned: boolean
  viewCount: number
  version: number
  createdAt: string
  updatedAt: string
  category: {
    name: string
    slug: string
  }
  createdBy: {
    name: string
    avatar: string | null
  }
}

export default function ResourceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchResource()
    }
  }, [slug])

  const fetchResource = async () => {
    try {
      const res = await fetch(`/api/resources/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setResource(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Lien copié !')
  }

  if (loading) {
    return (
      <MainLayout title="Chargement...">
        <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
          <div className="h-8 bg-surface-100 rounded w-1/3" />
          <div className="h-96 bg-surface-100 rounded" />
        </div>
      </MainLayout>
    )
  }

  if (!resource) {
    return (
      <MainLayout title="Ressource non trouvée">
        <Card className="text-center py-16 max-w-2xl mx-auto">
          <p className="text-surface-500 mb-4">Cette ressource n&apos;existe pas.</p>
          <Link href="/ressources">
            <Button variant="secondary">Retour aux ressources</Button>
          </Link>
        </Card>
      </MainLayout>
    )
  }

  const tags = parseJSON<string[]>(resource.tags, [])

  return (
    <MainLayout>
      <Link href="/ressources" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 mb-6">
        <ArrowLeftIcon className="h-4 w-4" />
        Retour aux ressources
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{resource.category.name}</Badge>
              <Badge variant="default">{resource.type}</Badge>
              <Badge variant="default">v{resource.version}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare} leftIcon={<ShareIcon className="h-4 w-4" />}>
                Partager
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<BookmarkIcon className="h-4 w-4" />}>
                Sauvegarder
              </Button>
              <Link href={`/ressources/${slug}/edit`}>
                <Button variant="secondary" size="sm" leftIcon={<PencilIcon className="h-4 w-4" />}>
                  Modifier
                </Button>
              </Link>
            </div>
          </div>

          <h1 className="text-3xl font-display font-bold text-surface-900 mb-4">{resource.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-surface-500">
            <div className="flex items-center gap-2">
              <Avatar src={resource.createdBy.avatar} name={resource.createdBy.name} size="sm" />
              <span>{resource.createdBy.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              Mis à jour le {formatDate(resource.updatedAt)}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              {resource.viewCount} vues
            </span>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="default">#{tag}</Badge>
              ))}
            </div>
          )}
        </div>

        <Card className="mb-8">
          <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: resource.content }} />
        </Card>

        <div>
          <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">Ressources similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card key={i} variant="gradient" className="opacity-50">
                <div className="h-4 bg-surface-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-surface-200 rounded w-1/2" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
