'use client'

import { MainLayout } from '@/components/layout'
import { Card } from '@/components/ui'
import { useAppStore, useAnalyticsStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { faqItems, faqCategories } from '@/data/faq'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

export default function FAQPage() {
  const { locale } = useAppStore()
  const { addEntry } = useAnalyticsStore()
  const t = getTranslation(locale)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openItems, setOpenItems] = useState<string[]>([])
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
          page: '/faq',
        })
      }, 1000)
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [search, addEntry])

  const categories = faqCategories[locale]

  const filteredItems = faqItems.filter((item) => {
    const matchesSearch = 
      item.question[locale].toLowerCase().includes(search.toLowerCase()) ||
      item.answer[locale].toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const groupedItems = categories.map(cat => ({
    ...cat,
    items: filteredItems.filter(item => item.category === cat.id)
  })).filter(cat => activeCategory === 'all' ? cat.items.length > 0 : cat.id === activeCategory)

  return (
    <MainLayout
      title={locale === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
      subtitle={locale === 'fr' ? 'Trouvez rapidement les réponses à vos questions sur l\'UX' : 'Quickly find answers to your UX questions'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'FAQ' : 'FAQ' },
      ]}
    >
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder={locale === 'fr' ? 'Rechercher une question...' : 'Search a question...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500 text-lg"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'all'
              ? 'bg-ux-600 text-white'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }`}
        >
          {locale === 'fr' ? 'Toutes' : 'All'} ({faqItems.length})
        </button>
        {categories.map((cat) => {
          const count = faqItems.filter(item => item.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-ux-600 text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* FAQ items */}
      <div className="space-y-8">
        {groupedItems.map((group) => (
          <section key={group.id}>
            {activeCategory === 'all' && (
              <h2 className="text-lg font-display font-bold text-surface-900 mb-4 flex items-center gap-2">
                <QuestionMarkCircleIcon className="h-5 w-5 text-ux-600" />
                {group.label}
              </h2>
            )}
            <div className="space-y-3">
              {group.items.map((item) => {
                const isOpen = openItems.includes(item.id)
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-start justify-between gap-4 text-left"
                    >
                      <h3 className="font-medium text-surface-900 pr-4">
                        {item.question[locale]}
                      </h3>
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-surface-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-surface-100">
                        <p className="text-surface-600 whitespace-pre-line leading-relaxed">
                          {item.answer[locale]}
                        </p>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <QuestionMarkCircleIcon className="h-12 w-12 text-surface-300 mx-auto mb-4" />
          <p className="text-surface-500 mb-4">
            {locale === 'fr' ? 'Aucune question trouvée' : 'No questions found'}
          </p>
          <p className="text-sm text-surface-400">
            {locale === 'fr' ? 'Essayez avec d\'autres mots-clés' : 'Try with other keywords'}
          </p>
        </Card>
      )}

      {/* Contact CTA */}
      <Card className="mt-10 bg-gradient-to-r from-ux-50 to-blue-50 border-ux-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-ux-100 rounded-xl">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-ux-600" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-surface-900">
                {locale === 'fr' ? 'Vous n\'avez pas trouvé votre réponse ?' : 'Didn\'t find your answer?'}
              </h2>
              <p className="text-surface-500">
                {locale === 'fr' ? 'Contactez l\'équipe UX, nous vous répondons sous 48h' : 'Contact the UX team, we\'ll respond within 48h'}
              </p>
            </div>
          </div>
          <Link href="/contact">
            <button className="px-6 py-2.5 bg-ux-600 text-white font-medium rounded-lg hover:bg-ux-700 transition-colors">
              {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
            </button>
          </Link>
        </div>
      </Card>
    </MainLayout>
  )
}

