'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import Link from 'next/link'
import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  UserGroupIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'

interface Project {
  id: string
  slug: string
  title: { fr: string; en: string }
  department: { fr: string; en: string }
  year: number
  context: { fr: string; en: string }
  methods: string[]
  metrics: {
    before: { label: { fr: string; en: string }; value: string }
    after: { label: { fr: string; en: string }; value: string }
    improvement: string
  }
  testimonial?: { fr: string; en: string }
  testimonialAuthor?: string
}

const projects: Project[] = [
  {
    id: '1',
    slug: 'refonte-souscription',
    title: { fr: 'Refonte du parcours de souscription', en: 'Subscription flow redesign' },
    department: { fr: 'Équipe Acquisition', en: 'Acquisition Team' },
    year: 2024,
    context: {
      fr: 'Le parcours de souscription présentait un taux d\'abandon de 67% à l\'étape 3.',
      en: 'The subscription flow had a 67% abandonment rate at step 3.',
    },
    methods: ['entretiens-utilisateurs', 'parcours-utilisateur', 'tests-utilisateurs'],
    metrics: {
      before: { label: { fr: 'Taux completion', en: 'Completion rate' }, value: '33%' },
      after: { label: { fr: 'Taux completion', en: 'Completion rate' }, value: '58%' },
      improvement: '+25 pts',
    },
    testimonial: {
      fr: 'L\'approche UX nous a permis d\'identifier des problèmes que nous n\'aurions jamais vus autrement.',
      en: 'The UX approach allowed us to identify issues we would never have seen otherwise.',
    },
    testimonialAuthor: 'Jean Martin, Product Owner',
  },
  {
    id: '2',
    slug: 'audit-espace-client',
    title: { fr: 'Audit UX - Espace client mobile', en: 'UX Audit - Mobile customer area' },
    department: { fr: 'Équipe Mobile', en: 'Mobile Team' },
    year: 2024,
    context: {
      fr: 'L\'application mobile avait reçu des notes basses sur les stores (3.2/5).',
      en: 'The mobile app had received low ratings on stores (3.2/5).',
    },
    methods: ['audit-ux', 'tests-utilisateurs', 'analytics-ux'],
    metrics: {
      before: { label: { fr: 'Note App Store', en: 'App Store rating' }, value: '3.2/5' },
      after: { label: { fr: 'Note App Store', en: 'App Store rating' }, value: '4.4/5' },
      improvement: '+1.2 pts',
    },
  },
  {
    id: '3',
    slug: 'design-system',
    title: { fr: 'Création du Design System', en: 'Design System creation' },
    department: { fr: 'Équipe Produit', en: 'Product Team' },
    year: 2023,
    context: {
      fr: 'Manque de cohérence entre les différentes applications et temps de développement élevé.',
      en: 'Lack of consistency between applications and high development time.',
    },
    methods: ['design-system', 'benchmark'],
    metrics: {
      before: { label: { fr: 'Temps dev UI', en: 'UI dev time' }, value: '40h/feature' },
      after: { label: { fr: 'Temps dev UI', en: 'UI dev time' }, value: '15h/feature' },
      improvement: '-62%',
    },
    testimonial: {
      fr: 'Le design system a révolutionné notre façon de travailler entre designers et développeurs.',
      en: 'The design system revolutionized how we work between designers and developers.',
    },
    testimonialAuthor: 'Sophie Durand, Lead Designer',
  },
]

export default function ProjectsPage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')

  const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title[locale].toLowerCase().includes(search.toLowerCase()) ||
      project.department[locale].toLowerCase().includes(search.toLowerCase())
    const matchesYear = yearFilter === 'all' || project.year === yearFilter
    return matchesSearch && matchesYear
  })

  return (
    <MainLayout
      title={t.projects.title}
      subtitle={t.projects.subtitle}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: t.projects.title },
      ]}
    >
      {/* Notice exemples fictifs */}
      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-6">
        <LightBulbIcon className="h-5 w-5 text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          {locale === 'fr' 
            ? 'Exemples illustratifs — Ces projets sont des cas fictifs présentés à titre d\'exemple pour illustrer le type de résultats atteignables avec une démarche UX.'
            : 'Illustrative examples — These projects are fictional cases presented as examples to illustrate the type of results achievable with a UX approach.'}
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder={t.projects.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          />
        </div>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          className="px-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
        >
          <option value="all">{t.projects.filters.all}</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/projets/${project.slug}`}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-display font-semibold text-surface-900 mb-1">
                    {project.title[locale]}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-surface-500">
                    <span className="flex items-center gap-1">
                      <UserGroupIcon className="h-4 w-4" />
                      {project.department[locale]}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-surface-600 mb-4">{project.context[locale]}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-surface-50 rounded-xl mb-4">
                <div>
                  <p className="text-xs text-surface-400 mb-1">{t.projects.before}</p>
                  <p className="text-xl font-bold text-surface-900">{project.metrics.before.value}</p>
                  <p className="text-xs text-surface-500">{project.metrics.before.label[locale]}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 mb-1">{t.projects.after}</p>
                  <p className="text-xl font-bold text-green-600">{project.metrics.after.value}</p>
                  <p className="text-xs text-surface-500 flex items-center gap-1">
                    <ArrowTrendingUpIcon className="h-3 w-3" />
                    {project.metrics.improvement}
                  </p>
                </div>
              </div>

              {/* Methods used */}
              <div className="flex flex-wrap gap-2">
                {project.methods.slice(0, 3).map((methodSlug) => (
                  <Badge key={methodSlug} variant="primary">{methodSlug}</Badge>
                ))}
                {project.methods.length > 3 && (
                  <Badge variant="default">+{project.methods.length - 3}</Badge>
                )}
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="mt-4 pt-4 border-t border-surface-100">
                  <p className="text-sm text-surface-500 italic">"{project.testimonial[locale]}"</p>
                  <p className="text-xs text-surface-400 mt-1">— {project.testimonialAuthor}</p>
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-surface-500">{t.common.noResults}</p>
        </Card>
      )}
    </MainLayout>
  )
}

