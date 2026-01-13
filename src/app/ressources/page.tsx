'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  Squares2X2Icon,
  BookmarkIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { parseJSON } from '@/lib/utils'

interface Resource {
  id: string
  title: string
  slug: string
  excerpt: string | null
  type: string
  tags: string
  pinned: boolean
  viewCount: number
  category: {
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  _count: { resources: number }
}

const typeIcons: Record<string, typeof BookOpenIcon> = {
  GUIDE: BookOpenIcon,
  TEMPLATE: DocumentTextIcon,
  CHECKLIST: ClipboardDocumentCheckIcon,
  PATTERN: Squares2X2Icon,
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    Promise.all([fetchResources(), fetchCategories()])
  }, [])

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources')
      const data = await res.json()
      setResources(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category.slug === selectedCategory
    return matchesSearch && matchesCategory
  })

  const pinnedResources = filteredResources.filter((r) => r.pinned)
  const otherResources = filteredResources.filter((r) => !r.pinned)

  return (
    <MainLayout
      title="Ressources"
      subtitle="Guidelines, templates et bonnes pratiques UX"
      actions={
        <Button leftIcon={<PlusIcon className="h-4 w-4" />}>Nouvelle ressource</Button>
      }
    >
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder="Rechercher une ressource..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-ux-600 text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
        >
          Toutes ({resources.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-ux-600 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            {cat.name} ({cat._count.resources})
          </button>
        ))}
      </div>

      {/* Pinned resources */}
      {pinnedResources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-display font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <BookmarkIcon className="h-5 w-5 text-amber-500" />
            Ressources épinglées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedResources.map((resource) => {
              const Icon = typeIcons[resource.type] || BookOpenIcon
              const tags = parseJSON<string[]>(resource.tags, [])
              return (
                <Link key={resource.id} href={`/ressources/${resource.slug}`}>
                  <Card hover className="h-full border-2 border-amber-200 bg-amber-50/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-amber-100">
                        <Icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <Badge variant="warning">
                        <BookmarkIcon className="h-3 w-3" />
                      </Badge>
                    </div>
                    <Badge variant="default" className="mb-2">{resource.category.name}</Badge>
                    <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">{resource.title}</h3>
                    {resource.excerpt && (
                      <p className="text-sm text-surface-500 mb-3 line-clamp-2">{resource.excerpt}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-surface-400">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-surface-400">
                      <EyeIcon className="h-3 w-3" />
                      {resource.viewCount} vues
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* All resources */}
      <div>
        <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">
          Toutes les ressources
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-10 w-10 bg-surface-100 rounded-lg mb-4" />
                <div className="h-5 bg-surface-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-surface-100 rounded w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherResources.map((resource) => {
              const Icon = typeIcons[resource.type] || BookOpenIcon
              const tags = parseJSON<string[]>(resource.tags, [])
              return (
                <Link key={resource.id} href={`/ressources/${resource.slug}`}>
                  <Card hover className="h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-surface-100">
                        <Icon className="h-5 w-5 text-surface-600" />
                      </div>
                      <Badge variant="default">{resource.type}</Badge>
                    </div>
                    <Badge variant="primary" className="mb-2">{resource.category.name}</Badge>
                    <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">{resource.title}</h3>
                    {resource.excerpt && (
                      <p className="text-sm text-surface-500 mb-3 line-clamp-2">{resource.excerpt}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-surface-400">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-surface-400">
                      <EyeIcon className="h-3 w-3" />
                      {resource.viewCount} vues
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
