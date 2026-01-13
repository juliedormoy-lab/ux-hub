'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { articles, articleCategories } from '@/data/articles'
import Link from 'next/link'
import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'

export default function VeillePage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const categories = articleCategories[locale]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title[locale].toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt[locale].toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <MainLayout
      title={locale === 'fr' ? 'Veille UX' : 'UX Watch'}
      subtitle={locale === 'fr' ? 'Articles et tendances sur l\'expérience utilisateur' : 'Articles and trends on user experience'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'Veille UX' : 'UX Watch' },
      ]}
    >
      {/* Intro */}
      <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <NewspaperIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-display font-bold text-surface-900 mb-1">
              {locale === 'fr' ? 'Restez informé des dernières tendances UX' : 'Stay informed of the latest UX trends'}
            </h2>
            <p className="text-sm text-surface-600">
              {locale === 'fr'
                ? 'Découvrez nos articles sur l\'innovation, l\'accessibilité, les méthodologies et les outils UX.'
                : 'Discover our articles on innovation, accessibility, methodologies and UX tools.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder={locale === 'fr' ? 'Rechercher un article...' : 'Search an article...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            categoryFilter === 'all'
              ? 'bg-ux-600 text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
        >
          {locale === 'fr' ? 'Tous' : 'All'} ({articles.length})
        </button>
        {categories.map((cat) => {
          const count = articles.filter(a => a.category === cat.id).length
          if (count === 0) return null
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-ux-600 text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const category = categories.find(c => c.id === article.category)
          return (
            <Link key={article.id} href={`/veille/${article.slug}`}>
              <Card hover className="h-full flex flex-col">
                {/* Category badge */}
                <div className="mb-3">
                  <Badge variant="primary">{category?.label}</Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-semibold text-surface-900 mb-2 line-clamp-2">
                  {article.title[locale]}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-surface-500 mb-4 line-clamp-3 flex-grow">
                  {article.excerpt[locale]}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-surface-400 pt-4 border-t border-surface-100">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" />
                    {article.readTime} min
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-surface-100 text-surface-500 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="text-center py-12">
          <NewspaperIcon className="h-12 w-12 text-surface-300 mx-auto mb-4" />
          <p className="text-surface-500">
            {locale === 'fr' ? 'Aucun article trouvé' : 'No articles found'}
          </p>
        </Card>
      )}
    </MainLayout>
  )
}

