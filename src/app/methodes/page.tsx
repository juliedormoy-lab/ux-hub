'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { useAppStore, useAnalyticsStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { uxMethods, phaseColors, effortLabels, Phase } from '@/data/methods'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline'

export default function MethodsPage() {
  const { locale } = useAppStore()
  const { addEntry } = useAnalyticsStore()
  const t = getTranslation(locale)
  const [search, setSearch] = useState('')
  const [phaseFilter, setPhaseFilter] = useState<Phase | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  // Log search after user stops typing
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    if (search.trim().length >= 2) {
      searchTimeout.current = setTimeout(() => {
        addEntry({
          type: 'search',
          query: search.trim(),
          page: '/methodes',
        })
      }, 1000) // Log après 1s d'inactivité
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [search, addEntry])

  const filteredMethods = uxMethods.filter((method) => {
    const matchesSearch = method.name[locale].toLowerCase().includes(search.toLowerCase()) ||
      method.description[locale].toLowerCase().includes(search.toLowerCase())
    const matchesPhase = phaseFilter === 'all' || method.phase === phaseFilter
    return matchesSearch && matchesPhase
  })

  const phases: (Phase | 'all')[] = ['all', 'discovery', 'design', 'evaluation']

  return (
    <MainLayout
      title={t.methods.title}
      subtitle={t.methods.subtitle}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: t.methods.title },
      ]}
    >
      {/* Video Section */}
      <div className="flex justify-center mb-8">
        <Card className="overflow-hidden w-full max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <PlayCircleIcon className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-surface-900 text-sm">
                {locale === 'fr' ? 'Découvrez l\'UX en vidéo' : 'Discover UX in video'}
              </h2>
            </div>
          </div>
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-surface-100">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/eBbUNs8odVA"
              title="Introduction UX"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Card>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder={t.methods.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-ux-100 text-ux-700' : 'text-surface-400 hover:bg-surface-100'}`}
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-ux-100 text-ux-700' : 'text-surface-400 hover:bg-surface-100'}`}
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Phase filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {phases.map((phase) => {
          const isActive = phaseFilter === phase
          const phaseConfig = phase === 'all' ? null : phaseColors[phase]
          return (
            <button
              key={phase}
              onClick={() => setPhaseFilter(phase)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? phase === 'all' 
                    ? 'bg-ux-600 text-white' 
                    : `${phaseConfig?.bg} ${phaseConfig?.text}`
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {phase === 'all' 
                ? `${t.methods.filters.all} (${uxMethods.length})`
                : `${phaseConfig?.label[locale]} (${uxMethods.filter(m => m.phase === phase).length})`
              }
            </button>
          )
        })}
      </div>

      {/* Methods grid/list */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMethods.map((method) => {
            const phase = phaseColors[method.phase]
            return (
              <Link key={method.id} href={`/methodes/${method.slug}`}>
                <Card hover className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${phase.bg} ${phase.text}`}>
                      {phase.label[locale]}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
                    {method.name[locale]}
                  </h3>
                  <p className="text-sm text-surface-500 mb-4 line-clamp-2">
                    {method.description[locale]}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-surface-400 pt-4 border-t border-surface-100">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {t.methods.effort}: {effortLabels[method.effort][locale]}
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowTrendingUpIcon className="h-3.5 w-3.5" />
                      {t.methods.impact}: {effortLabels[method.impact][locale]}
                    </span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMethods.map((method) => {
            const phase = phaseColors[method.phase]
            return (
              <Link key={method.id} href={`/methodes/${method.slug}`}>
                <Card hover className="flex items-center gap-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${phase.bg} ${phase.text} whitespace-nowrap`}>
                    {phase.label[locale]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-surface-900">{method.name[locale]}</h3>
                    <p className="text-sm text-surface-500 truncate">{method.description[locale]}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-surface-400">
                    <Badge variant="default">{effortLabels[method.effort][locale]}</Badge>
                    <Badge variant="default">{effortLabels[method.impact][locale]}</Badge>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {filteredMethods.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-surface-500">{t.common.noResults}</p>
        </Card>
      )}
    </MainLayout>
  )
}

