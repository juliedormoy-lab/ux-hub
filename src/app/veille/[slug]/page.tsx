'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge, Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { articles, articleCategories } from '@/data/articles'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  ShareIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

const checklistCategoryLabels = {
  fr: {
    // Article 1 - IA Accessibilité
    audit: '🔍 Audit et évaluation',
    media: '🖼️ Images et médias',
    navigation: '🧭 Navigation et interaction',
    testing: '🧪 Tests utilisateurs',
    governance: '📋 Gouvernance et formation',
    compliance: '✅ Conformité',
    // Article 2 - Intégrer UX avec IA
    strategy: '🎯 Évaluation et stratégie',
    research: '🔬 Recherche utilisateur',
    design: '🎨 Design',
    content: '✍️ Contenu',
    ethics: '⚖️ Éthique et qualité',
    measurement: '📊 Mesure et amélioration',
    // Article 3 - Adapter logiciel existant
    audit_adapt: '🔍 Audit initial',
    analysis: '🔎 Analyse des possibilités',
    prioritization: '📋 Priorisation',
    config: '⚙️ Configuration',
    validation: '✅ Tests et validation',
    deployment: '🚀 Déploiement et formation',
    // Article 4 - Figma
    setup_figma: '🚀 Prise en main',
    organization_figma: '📁 Organisation',
    components_figma: '🧩 Composants',
    prototype_figma: '▶️ Prototypage',
    plugins_figma: '🔌 Plugins',
    collab_figma: '👥 Collaboration',
    // Article 5 - Benchmark
    objectives_bench: '🎯 Étape 1 : Objectifs et périmètre',
    selection_bench: '🔍 Étape 2 : Sélection des produits',
    grid_bench: '📊 Étape 3 : Grille d\'évaluation',
    collect_bench: '📸 Étape 4 : Collecte des données',
    synthesis_bench: '📈 Étape 5 : Synthèse et visualisation',
    reco_bench: '✅ Étape 6 : Recommandations',
    // Article 6 - Heuristiques Nielsen
    h1_visibility: '1️⃣ Visibilité de l\'état du système',
    h2_language: '2️⃣ Correspondance système/monde réel',
    h3_control: '3️⃣ Contrôle et liberté utilisateur',
    h4_consistency: '4️⃣ Cohérence et standards',
    h5_prevention: '5️⃣ Prévention des erreurs',
    h6_recognition: '6️⃣ Reconnaissance plutôt que rappel',
    h7_flexibility: '7️⃣ Flexibilité et efficacité',
    h8_minimal: '8️⃣ Design esthétique et minimaliste',
    h9_errors: '9️⃣ Aide à la récupération des erreurs',
    h10_help: '🔟 Aide et documentation',
  },
  en: {
    // Article 1 - AI Accessibility
    audit: '🔍 Audit and evaluation',
    media: '🖼️ Images and media',
    navigation: '🧭 Navigation and interaction',
    testing: '🧪 User testing',
    governance: '📋 Governance and training',
    compliance: '✅ Compliance',
    // Article 2 - Integrating UX with AI
    strategy: '🎯 Evaluation and strategy',
    research: '🔬 User research',
    design: '🎨 Design',
    content: '✍️ Content',
    ethics: '⚖️ Ethics and quality',
    measurement: '📊 Measurement and improvement',
    // Article 3 - Adapt existing software
    audit_adapt: '🔍 Initial audit',
    analysis: '🔎 Possibilities analysis',
    prioritization: '📋 Prioritization',
    config: '⚙️ Configuration',
    validation: '✅ Testing and validation',
    deployment: '🚀 Deployment and training',
    // Article 4 - Figma
    setup_figma: '🚀 Getting started',
    organization_figma: '📁 Organization',
    components_figma: '🧩 Components',
    prototype_figma: '▶️ Prototyping',
    plugins_figma: '🔌 Plugins',
    collab_figma: '👥 Collaboration',
    // Article 5 - Benchmark
    objectives_bench: '🎯 Step 1: Objectives and scope',
    selection_bench: '🔍 Step 2: Product selection',
    grid_bench: '📊 Step 3: Evaluation grid',
    collect_bench: '📸 Step 4: Data collection',
    synthesis_bench: '📈 Step 5: Synthesis and visualization',
    reco_bench: '✅ Step 6: Recommendations',
    // Article 6 - Nielsen Heuristics
    h1_visibility: '1️⃣ Visibility of system status',
    h2_language: '2️⃣ Match system/real world',
    h3_control: '3️⃣ User control and freedom',
    h4_consistency: '4️⃣ Consistency and standards',
    h5_prevention: '5️⃣ Error prevention',
    h6_recognition: '6️⃣ Recognition rather than recall',
    h7_flexibility: '7️⃣ Flexibility and efficiency',
    h8_minimal: '8️⃣ Aesthetic and minimalist design',
    h9_errors: '9️⃣ Help users recover from errors',
    h10_help: '🔟 Help and documentation',
  },
}

export default function ArticlePage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const params = useParams()
  const slug = params.slug as string
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const article = articles.find(a => a.slug === slug)

  // Load checked items from localStorage
  useEffect(() => {
    if (article) {
      const stored = localStorage.getItem(`checklist-${article.slug}`)
      if (stored) {
        setCheckedItems(JSON.parse(stored))
      }
    }
  }, [article])

  // Save checked items to localStorage
  const toggleItem = (itemId: string) => {
    const newChecked = checkedItems.includes(itemId)
      ? checkedItems.filter(id => id !== itemId)
      : [...checkedItems, itemId]
    setCheckedItems(newChecked)
    if (article) {
      localStorage.setItem(`checklist-${article.slug}`, JSON.stringify(newChecked))
    }
  }

  const resetChecklist = () => {
    setCheckedItems([])
    if (article) {
      localStorage.removeItem(`checklist-${article.slug}`)
    }
  }
  const categories = articleCategories[locale]

  if (!article) {
    return (
      <MainLayout
        title={locale === 'fr' ? 'Article non trouvé' : 'Article not found'}
        breadcrumb={[
          { label: t.nav.home, href: '/' },
          { label: locale === 'fr' ? 'Veille UX' : 'UX Watch', href: '/veille' },
        ]}
      >
        <Card className="text-center py-12">
          <p className="text-surface-500 mb-4">
            {locale === 'fr' ? 'Cet article n\'existe pas.' : 'This article does not exist.'}
          </p>
          <Link href="/veille">
            <Button variant="secondary">
              {locale === 'fr' ? 'Retour à la veille' : 'Back to articles'}
            </Button>
          </Link>
        </Card>
      </MainLayout>
    )
  }

  const category = categories.find(c => c.id === article.category)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Simple markdown to HTML conversion
  const renderContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, i) => {
        // Headers
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={i} className="text-xl font-display font-bold text-surface-900 mt-8 mb-4">
              {paragraph.replace('## ', '')}
            </h2>
          )
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={i} className="text-lg font-display font-semibold text-surface-900 mt-6 mb-3">
              {paragraph.replace('### ', '')}
            </h3>
          )
        }
        // Horizontal rule
        if (paragraph.startsWith('---')) {
          return <hr key={i} className="my-8 border-surface-200" />
        }
        // Blockquote with link support
        if (paragraph.startsWith('> ')) {
          const content = paragraph.replace('> ', '')
          // Parse links [text](url)
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
          const parts = content.split(linkRegex)
          return (
            <blockquote key={i} className="my-6 p-4 bg-gradient-to-r from-ux-50 to-blue-50 border-l-4 border-ux-500 rounded-r-lg">
              <p className="text-surface-700">
                {parts.map((part, idx) => {
                  // Every third element starting from index 1 is link text, index 2 is URL
                  if (idx % 3 === 1) {
                    const url = parts[idx + 1]
                    return (
                      <a 
                        key={idx} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-ux-600 hover:text-ux-700 underline font-medium"
                      >
                        {part}
                      </a>
                    )
                  }
                  if (idx % 3 === 2) return null // Skip URL part
                  // Handle bold in remaining text
                  if (part.includes('**')) {
                    const boldParts = part.split('**')
                    return boldParts.map((bp, bpIdx) => 
                      bpIdx % 2 === 1 ? <strong key={`${idx}-${bpIdx}`}>{bp}</strong> : bp
                    )
                  }
                  return part
                })}
              </p>
            </blockquote>
          )
        }
        // Italic (starting with *)
        if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
          return (
            <p key={i} className="text-sm text-surface-500 italic my-4">
              {paragraph.slice(1, -1)}
            </p>
          )
        }
        // List items
        if (paragraph.includes('\n- ')) {
          const lines = paragraph.split('\n')
          return (
            <ul key={i} className="list-disc list-inside space-y-2 my-4 text-surface-700">
              {lines.map((line, j) => {
                if (line.startsWith('- ')) {
                  // Handle bold text in list items
                  const text = line.replace('- ', '')
                  if (text.includes('**')) {
                    const parts = text.split('**')
                    return (
                      <li key={j}>
                        {parts.map((part, k) => 
                          k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                        )}
                      </li>
                    )
                  }
                  return <li key={j}>{text}</li>
                }
                return null
              })}
            </ul>
          )
        }
        // Numbered list
        if (paragraph.match(/^\d+\./)) {
          const lines = paragraph.split('\n')
          return (
            <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-surface-700">
              {lines.map((line, j) => {
                const match = line.match(/^\d+\.\s*\*\*(.*?)\*\*(.*)/)
                if (match) {
                  return (
                    <li key={j}>
                      <strong>{match[1]}</strong>{match[2]}
                    </li>
                  )
                }
                const simpleMatch = line.match(/^\d+\.\s*(.*)/)
                if (simpleMatch) {
                  return <li key={j}>{simpleMatch[1]}</li>
                }
                return null
              })}
            </ol>
          )
        }
        // Regular paragraph with potential bold text
        if (paragraph.includes('**')) {
          const parts = paragraph.split('**')
          return (
            <p key={i} className="text-surface-700 leading-relaxed my-4">
              {parts.map((part, k) => 
                k % 2 === 1 ? <strong key={k}>{part}</strong> : part
              )}
            </p>
          )
        }
        // Regular paragraph
        return (
          <p key={i} className="text-surface-700 leading-relaxed my-4">
            {paragraph}
          </p>
        )
      })
  }

  // Get related articles (same category, different article)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2)

  return (
    <MainLayout
      title={article.title[locale]}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'Veille UX' : 'UX Watch', href: '/veille' },
        { label: article.title[locale] },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link href="/veille" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-ux-600 mb-6">
          <ArrowLeftIcon className="h-4 w-4" />
          {locale === 'fr' ? 'Retour à la veille' : 'Back to articles'}
        </Link>

        {/* Article header */}
        <Card className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="primary">{category?.label}</Badge>
            <div className="flex items-center gap-4 text-sm text-surface-400">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {article.readTime} min {locale === 'fr' ? 'de lecture' : 'read'}
              </span>
            </div>
          </div>

          <h1 className="text-2xl lg:text-3xl font-display font-bold text-surface-900 mb-4">
            {article.title[locale]}
          </h1>

          <p className="text-lg text-surface-600 mb-6">
            {article.excerpt[locale]}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-sm bg-surface-100 text-surface-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </Card>

        {/* Template Download */}
        {article.templateDownload && (
          <Card className="mb-8 bg-gradient-to-r from-ux-50 to-blue-50 border-ux-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-ux-100 rounded-xl">
                  <ArrowDownTrayIcon className="h-6 w-6 text-ux-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-surface-900">
                    {locale === 'fr' ? 'Template PDF disponible' : 'PDF Template available'}
                  </h3>
                  <p className="text-sm text-surface-500">
                    {article.templateDownload.name[locale]}
                  </p>
                </div>
              </div>
              <a href={article.templateDownload.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <Button leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}>
                  {locale === 'fr' ? 'Ouvrir et télécharger en PDF' : 'Open and download as PDF'}
                </Button>
              </a>
            </div>
          </Card>
        )}

        {/* Article content */}
        <Card className="mb-8">
          <article className="prose prose-surface max-w-none">
            {renderContent(article.content[locale])}
          </article>
        </Card>

        {/* Checklist */}
        {article.checklist && article.checklist.length > 0 && (
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-surface-900">
                    {locale === 'fr' ? 'Checklist' : 'Checklist'}
                  </h2>
                  <p className="text-sm text-surface-500">
                    {checkedItems.length}/{article.checklist.length} {locale === 'fr' ? 'complétés' : 'completed'}
                  </p>
                </div>
              </div>
              {checkedItems.length > 0 && (
                <button
                  onClick={resetChecklist}
                  className="text-sm text-surface-400 hover:text-surface-600"
                >
                  {locale === 'fr' ? 'Réinitialiser' : 'Reset'}
                </button>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-surface-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                style={{ width: `${(checkedItems.length / article.checklist.length) * 100}%` }}
              />
            </div>

            {/* Grouped checklist items */}
            {(() => {
              const categories = [...new Set(article.checklist.map(item => item.category || 'other'))]
              const labels = checklistCategoryLabels[locale] as Record<string, string>
              
              return categories.map((cat) => {
                const items = article.checklist!.filter(item => (item.category || 'other') === cat)
                const completedInCategory = items.filter(item => checkedItems.includes(item.id)).length
                
                return (
                  <div key={cat} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-semibold text-surface-700 mb-3 flex items-center gap-2">
                      {labels[cat] || cat}
                      <span className="text-xs font-normal text-surface-400">
                        ({completedInCategory}/{items.length})
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const isChecked = checkedItems.includes(item.id)
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                              'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all',
                              isChecked
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-surface-50 border border-transparent hover:bg-surface-100'
                            )}
                          >
                            {isChecked ? (
                              <CheckCircleIconSolid className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircleIcon className="h-5 w-5 text-surface-300 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={cn(
                              'text-sm',
                              isChecked ? 'text-green-800 line-through' : 'text-surface-700'
                            )}>
                              {item.text[locale]}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            })()}
          </Card>
        )}

        {/* Share */}
        <Card className="mb-8 bg-surface-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-surface-600">
              {locale === 'fr' ? 'Cet article vous a été utile ?' : 'Was this article helpful?'}
            </p>
            <Button 
              variant="secondary" 
              size="sm"
              leftIcon={<ShareIcon className="h-4 w-4" />}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert(locale === 'fr' ? 'Lien copié !' : 'Link copied!')
              }}
            >
              {locale === 'fr' ? 'Partager' : 'Share'}
            </Button>
          </div>
        </Card>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-lg font-display font-bold text-surface-900 mb-4">
              {locale === 'fr' ? 'Articles similaires' : 'Related articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/veille/${related.slug}`}>
                  <Card hover>
                    <h3 className="font-semibold text-surface-900 mb-2">
                      {related.title[locale]}
                    </h3>
                    <p className="text-sm text-surface-500 line-clamp-2">
                      {related.excerpt[locale]}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  )
}

