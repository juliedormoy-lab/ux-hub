'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge, StatusBadge } from '@/components/ui'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
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
  status: string
  tags: string
  featured: boolean
  viewCount: number
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.team.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === 'IN_PROGRESS').length,
    completed: projects.filter((p) => p.status === 'COMPLETED').length,
    paused: projects.filter((p) => p.status === 'PAUSED').length,
  }

  return (
    <MainLayout
      title="Portfolio"
      subtitle="Showcase de vos projets et analyses UX"
      actions={
        <Button leftIcon={<PlusIcon className="h-4 w-4" />}>
          Nouveau projet
        </Button>
      }
    >
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="COMPLETED">Terminés</option>
            <option value="PAUSED">En pause</option>
          </select>
          <Button variant="secondary" leftIcon={<FunnelIcon className="h-4 w-4" />}>
            Plus de filtres
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-xl border border-surface-200">
          <p className="text-sm text-surface-500">Total projets</p>
          <p className="text-2xl font-bold text-surface-900">{stats.total}</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-surface-200">
          <p className="text-sm text-surface-500">En cours</p>
          <p className="text-2xl font-bold text-ux-600">{stats.inProgress}</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-surface-200">
          <p className="text-sm text-surface-500">Terminés</p>
          <p className="text-2xl font-bold text-success-600">{stats.completed}</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-surface-200">
          <p className="text-sm text-surface-500">En pause</p>
          <p className="text-2xl font-bold text-warning-500">{stats.paused}</p>
        </div>
      </div>

      {/* Projects grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-6 bg-surface-100 rounded w-1/4 mb-4" />
              <div className="h-5 bg-surface-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-surface-100 rounded w-full mb-4" />
              <div className="h-4 bg-surface-100 rounded w-1/2" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => {
            const tags = parseJSON<string[]>(project.tags, [])
            return (
              <Link key={project.id} href={`/portfolio/${project.id}`}>
                <Card hover className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <StatusBadge status={project.status} />
                    {project.featured && (
                      <Badge variant="warning">⭐ Featured</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface-500 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-surface-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(project.startDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <EyeIcon className="h-4 w-4" />
                        {project.viewCount}
                      </span>
                    </div>
                    <span className="text-ux-600 font-medium">{project.team}</span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </MainLayout>
  )
}
