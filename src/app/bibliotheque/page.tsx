'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'

type Category = 'all' | 'templates' | 'guides' | 'checklists' | 'presentations' | 'caseStudies'

interface Document {
  id: string
  title: { fr: string; en: string }
  description: { fr: string; en: string }
  category: Category
  format: 'PDF' | 'PPTX' | 'DOCX' | 'XLSX'
  language: 'fr' | 'en' | 'both'
  downloads: number
  relatedMethods: string[]
}

const documents: Document[] = [
  {
    id: '1',
    title: { fr: 'Canvas Persona', en: 'Persona Canvas' },
    description: { fr: 'Template pour créer des personas utilisateurs', en: 'Template to create user personas' },
    category: 'templates',
    format: 'PPTX',
    language: 'both',
    downloads: 156,
    relatedMethods: ['personas'],
  },
  {
    id: '2',
    title: { fr: 'Grille d\'entretien utilisateur', en: 'User Interview Guide' },
    description: { fr: 'Modèle de questions pour entretiens', en: 'Question template for interviews' },
    category: 'templates',
    format: 'DOCX',
    language: 'both',
    downloads: 124,
    relatedMethods: ['entretiens-utilisateurs'],
  },
  {
    id: '3',
    title: { fr: 'Guide Tests Utilisateurs', en: 'User Testing Guide' },
    description: { fr: 'Guide complet pour mener des tests utilisateurs', en: 'Complete guide to conduct user testing' },
    category: 'guides',
    format: 'PDF',
    language: 'both',
    downloads: 89,
    relatedMethods: ['tests-utilisateurs'],
  },
  {
    id: '4',
    title: { fr: 'Checklist Accessibilité WCAG', en: 'WCAG Accessibility Checklist' },
    description: { fr: 'Points de contrôle WCAG 2.1 AA', en: 'WCAG 2.1 AA checkpoints' },
    category: 'checklists',
    format: 'PDF',
    language: 'both',
    downloads: 198,
    relatedMethods: ['audit-ux'],
  },
  {
    id: '5',
    title: { fr: 'Présentation Sensibilisation UX', en: 'UX Awareness Presentation' },
    description: { fr: 'Slides pour présenter l\'UX aux équipes', en: 'Slides to present UX to teams' },
    category: 'presentations',
    format: 'PPTX',
    language: 'both',
    downloads: 67,
    relatedMethods: [],
  },
  {
    id: '6',
    title: { fr: 'Template Parcours Utilisateur', en: 'User Journey Template' },
    description: { fr: 'Canvas pour mapper les parcours utilisateurs', en: 'Canvas to map user journeys' },
    category: 'templates',
    format: 'PPTX',
    language: 'both',
    downloads: 112,
    relatedMethods: ['parcours-utilisateur'],
  },
  {
    id: '7',
    title: { fr: 'Checklist Lancement Projet UX', en: 'UX Project Launch Checklist' },
    description: { fr: 'Liste des étapes pour démarrer un projet UX', en: 'Steps list to start a UX project' },
    category: 'checklists',
    format: 'PDF',
    language: 'both',
    downloads: 78,
    relatedMethods: [],
  },
  {
    id: '8',
    title: { fr: 'Grille Benchmark', en: 'Benchmark Grid' },
    description: { fr: 'Template d\'analyse concurrentielle', en: 'Competitive analysis template' },
    category: 'templates',
    format: 'XLSX',
    language: 'both',
    downloads: 93,
    relatedMethods: ['benchmark'],
  },
]

const categoryIcons: Record<Category, typeof DocumentTextIcon> = {
  all: DocumentIcon,
  templates: DocumentTextIcon,
  guides: BookOpenIcon,
  checklists: ClipboardDocumentCheckIcon,
  presentations: PresentationChartLineIcon,
  caseStudies: DocumentIcon,
}

export default function LibraryPage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Category>('all')
  const [formatFilter, setFormatFilter] = useState<string>('all')

  const categories: Category[] = ['all', 'templates', 'guides', 'checklists', 'presentations', 'caseStudies']
  const formats = ['all', 'PDF', 'PPTX', 'DOCX', 'XLSX']

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title[locale].toLowerCase().includes(search.toLowerCase()) ||
      doc.description[locale].toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter
    const matchesFormat = formatFilter === 'all' || doc.format === formatFilter
    return matchesSearch && matchesCategory && matchesFormat
  })

  const handleDownload = (doc: Document) => {
    // In a real app, this would trigger the download
    alert(`${locale === 'fr' ? 'Téléchargement' : 'Downloading'}: ${doc.title[locale]}`)
  }

  return (
    <MainLayout
      title={t.library.title}
      subtitle={t.library.subtitle}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: t.library.title },
      ]}
    >
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder={t.library.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          />
        </div>
        <select
          value={formatFilter}
          onChange={(e) => setFormatFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
        >
          {formats.map(format => (
            <option key={format} value={format}>
              {format === 'all' ? (locale === 'fr' ? 'Tous formats' : 'All formats') : format}
            </option>
          ))}
        </select>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = categoryIcons[category]
          const count = category === 'all' ? documents.length : documents.filter(d => d.category === category).length
          return (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                categoryFilter === category
                  ? 'bg-ux-600 text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.library.categories[category]} ({count})
            </button>
          )
        })}
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => {
          const Icon = categoryIcons[doc.category]
          return (
            <Card key={doc.id} className="flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-surface-100 rounded-lg">
                  <Icon className="h-5 w-5 text-surface-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="default">{doc.format}</Badge>
                    {doc.language === 'both' && (
                      <Badge variant="outline">FR/EN</Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-surface-900 truncate">{doc.title[locale]}</h3>
                </div>
              </div>
              <p className="text-sm text-surface-500 mb-4 flex-1">{doc.description[locale]}</p>
              <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                <span className="text-xs text-surface-400">
                  {doc.downloads} {t.library.downloads}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}
                  onClick={() => handleDownload(doc)}
                >
                  {t.library.download}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-surface-500">{t.common.noResults}</p>
        </Card>
      )}
    </MainLayout>
  )
}

