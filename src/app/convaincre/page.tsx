'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge, Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { roiStats, caseStudies, objections, objectionCategories, successStories } from '@/data/convaincre'
import { useState } from 'react'
import Link from 'next/link'
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CogIcon,
} from '@heroicons/react/24/outline'

const categoryIcons: Record<string, typeof CurrencyDollarIcon> = {
  CurrencyDollarIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  CogIcon,
}

export default function ConvaincrePage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const [activeSection, setActiveSection] = useState<string>('roi')
  const [openObjections, setOpenObjections] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const sections = [
    { id: 'roi', label: locale === 'fr' ? 'ROI de l\'UX' : 'UX ROI', icon: ChartBarIcon },
    { id: 'pitch', label: locale === 'fr' ? 'Pitch Deck' : 'Pitch Deck', icon: PresentationChartLineIcon },
    { id: 'objections', label: locale === 'fr' ? 'FAQ Objections' : 'Objections FAQ', icon: QuestionMarkCircleIcon },
    { id: 'success', label: locale === 'fr' ? 'Success Stories' : 'Success Stories', icon: TrophyIcon },
  ]

  const toggleObjection = (id: string) => {
    setOpenObjections(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <MainLayout
      title={locale === 'fr' ? 'Ressources pour Convaincre' : 'Resources to Convince'}
      subtitle={locale === 'fr' ? 'Outils et arguments pour promouvoir l\'UX auprès de vos parties prenantes' : 'Tools and arguments to promote UX to your stakeholders'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'Convaincre' : 'Convince' },
      ]}
    >
      {/* Intro */}
      <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 rounded-xl">
            <LightBulbIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h2 className="font-display font-bold text-surface-900 mb-1">
              {locale === 'fr' ? 'Équipez-vous pour convaincre' : 'Equip yourself to convince'}
            </h2>
            <p className="text-surface-600 text-sm">
              {locale === 'fr'
                ? 'Ces ressources vous aident à lever les résistances et démontrer la valeur de l\'UX avec des arguments concrets, des chiffres et des exemples.'
                : 'These resources help you overcome resistance and demonstrate UX value with concrete arguments, figures, and examples.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Section tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'bg-ux-600 text-white shadow-lg'
                  : 'bg-white border border-surface-200 text-surface-600 hover:border-ux-300 hover:text-ux-600'
              }`}
            >
              <Icon className="h-5 w-5" />
              {section.label}
            </button>
          )
        })}
      </div>

      {/* ROI Section */}
      {activeSection === 'roi' && (
        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-surface-900">
                {locale === 'fr' ? 'Chiffres clés' : 'Key Figures'}
              </h2>
              <Button variant="secondary" size="sm" leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}>
                {locale === 'fr' ? 'Télécharger l\'infographie' : 'Download infographic'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roiStats.map((stat) => (
                <Card key={stat.id} className="relative group">
                  <button
                    onClick={() => copyToClipboard(`${stat.value} ${stat.label[locale]} (${stat.source})`, stat.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-200"
                    title={locale === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedId === stat.id ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4 text-surface-500" />
                    )}
                  </button>
                  <p className="text-3xl font-bold text-ux-600 mb-2">{stat.value}</p>
                  <p className="text-sm text-surface-700 mb-3">{stat.label[locale]}</p>
                  <p className="text-xs text-surface-400">{stat.source}</p>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-surface-900 mb-4">
              {locale === 'fr' ? 'Études de cas' : 'Case Studies'}
            </h2>
            <div className="space-y-4">
              {caseStudies.map((study) => (
                <Card key={study.id}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-surface-900">{study.company}</h3>
                      <p className="text-xs text-surface-400">{study.source} • {study.year}</p>
                    </div>
                    <Badge variant="success">{study.metrics[0].after}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-medium text-surface-400 mb-1">{locale === 'fr' ? 'Contexte' : 'Context'}</p>
                      <p className="text-surface-600">{study.context[locale]}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-surface-400 mb-1">{locale === 'fr' ? 'Intervention UX' : 'UX Intervention'}</p>
                      <p className="text-surface-600">{study.intervention[locale]}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-surface-400 mb-1">{locale === 'fr' ? 'Résultats' : 'Results'}</p>
                      <p className="text-surface-600">{study.results[locale]}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Pitch Deck Section */}
      {activeSection === 'pitch' && (
        <div className="space-y-6">
          <h3 className="text-md font-display font-bold text-surface-900">
            Pitch Deck UX PPT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: { fr: 'Executive', en: 'Executive' }, 
                audience: { fr: 'C-Level, Direction', en: 'C-Level, Management' },
                duration: '5 min',
                slides: 5,
                focus: { fr: 'ROI et impact stratégique', en: 'ROI and strategic impact' },
                downloadUrl: '/downloads/Pitch UX Executive - L_UX comme Levier Strategique.pptx',
                filename: 'Pitch-UX-Executive.pptx',
              },
              { 
                title: { fr: 'Standard', en: 'Standard' }, 
                audience: { fr: 'Managers, Product Owners', en: 'Managers, Product Owners' },
                duration: '10-15 min',
                slides: 9,
                focus: { fr: 'Méthodologie et bénéfices', en: 'Methodology and benefits' },
                downloadUrl: '/downloads/Pitch UX Standard - Methodologie et Benefices.pptx',
                filename: 'Pitch-UX-Standard.pptx',
              },
              { 
                title: { fr: 'Détaillé', en: 'Detailed' }, 
                audience: { fr: 'Équipes projet', en: 'Project teams' },
                duration: '20-30 min',
                slides: 19,
                focus: { fr: 'Processus complet et intégration', en: 'Complete process and integration' },
                downloadUrl: '/downloads/Pitch UX Detaille - Processus Complet et Integration.pptx',
                filename: 'Pitch-UX-Detaille.pptx',
              },
            ].map((variant, i) => (
              <Card key={i} hover>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-surface-900">{variant.title[locale]}</h4>
                  <Badge variant="outline">{variant.slides} slides</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-surface-500">
                    <span className="font-medium text-surface-700">{locale === 'fr' ? 'Audience' : 'Audience'}:</span> {variant.audience[locale]}
                  </p>
                  <p className="text-surface-500">
                    <span className="font-medium text-surface-700">{locale === 'fr' ? 'Durée' : 'Duration'}:</span> {variant.duration}
                  </p>
                  <p className="text-surface-500">
                    <span className="font-medium text-surface-700">Focus:</span> {variant.focus[locale]}
                  </p>
                </div>
                <a href={variant.downloadUrl} download={variant.filename} className="block mt-4">
                  <Button variant="secondary" size="sm" className="w-full" leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}>
                    {locale === 'fr' ? 'Télécharger PPTX' : 'Download PPTX'}
                  </Button>
                </a>
              </Card>
            ))}
          </div>

          <h3 className="text-md font-display font-bold text-surface-900 mt-8">
            {locale === 'fr' ? 'Structure du deck' : 'Deck structure'}
          </h3>
          <Card>
            <ol className="space-y-3">
              {[
                { fr: 'Slide titre : Accroche impactante', en: 'Title slide: Impactful hook' },
                { fr: 'Qu\'est-ce que l\'UX ? Définition accessible', en: 'What is UX? Accessible definition' },
                { fr: 'Pourquoi l\'UX compte : Enjeux business', en: 'Why UX matters: Business stakes' },
                { fr: 'Chiffres clés : 3-5 statistiques ROI', en: 'Key figures: 3-5 ROI statistics' },
                { fr: 'Notre approche : Méthodologie simplifiée', en: 'Our approach: Simplified methodology' },
                { fr: 'Success story : Exemple concret', en: 'Success story: Concrete example' },
                { fr: 'Quick wins : Actions rapides pour démarrer', en: 'Quick wins: Quick actions to start' },
                { fr: 'Call to action : Prochaine étape', en: 'Call to action: Next step' },
                { fr: 'Annexes : Ressources et contacts', en: 'Appendix: Resources and contacts' },
              ].map((slide, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-ux-100 text-ux-700 flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="text-surface-700">{slide[locale]}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}

      {/* Objections FAQ Section */}
      {activeSection === 'objections' && (
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {objectionCategories[locale].map((cat) => {
              const Icon = categoryIcons[cat.icon]
              const count = objections.filter(o => o.category === cat.id).length
              return (
                <button
                  key={cat.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-surface-100 text-surface-600 hover:bg-surface-200 whitespace-nowrap"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat.label} ({count})
                </button>
              )
            })}
          </div>

          <div className="space-y-3">
            {objections.map((obj) => {
              const isOpen = openObjections.includes(obj.id)
              return (
                <Card key={obj.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleObjection(obj.id)}
                    className="w-full flex items-start justify-between gap-4 text-left"
                  >
                    <div>
                      <p className="font-medium text-surface-900 mb-1">"{obj.objection[locale]}"</p>
                      <p className="text-sm text-surface-500">{obj.shortAnswer[locale]}</p>
                    </div>
                    <ChevronDownIcon 
                      className={`h-5 w-5 text-surface-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-surface-100 space-y-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 italic">{obj.empathy[locale]}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-surface-400 mb-2">
                          {locale === 'fr' ? 'Réponse développée' : 'Detailed answer'}
                        </p>
                        <p className="text-surface-700">{obj.longAnswer[locale]}</p>
                      </div>
                      {obj.data && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                          <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
                          <p className="text-sm text-green-800">{obj.data[locale]}</p>
                          <button
                            onClick={() => copyToClipboard(obj.data![locale], `data-${obj.id}`)}
                            className="ml-auto p-1 hover:bg-green-100 rounded"
                          >
                            {copiedId === `data-${obj.id}` ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <ClipboardDocumentIcon className="h-4 w-4 text-green-600" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Success Stories Section */}
      {activeSection === 'success' && (
        <div className="space-y-6">
          {/* Notice exemples illustratifs */}
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <LightBulbIcon className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              {locale === 'fr' 
                ? 'Exemples illustratifs — Ces success stories sont des cas fictifs présentés à titre d\'exemple pour illustrer le type de résultats atteignables.'
                : 'Illustrative examples — These success stories are fictional cases presented as examples to illustrate the type of achievable results.'}
            </p>
          </div>
          {successStories.map((story) => (
            <Card key={story.id}>
              <div className="mb-4">
                <h3 className="text-lg font-display font-bold text-surface-900">{story.title[locale]}</h3>
                <p className="text-sm text-surface-500">{story.department[locale]} • {story.date}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-surface-400 mb-2">{locale === 'fr' ? 'Contexte' : 'Context'}</h4>
                  <p className="text-sm text-surface-600">{story.context[locale]}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-surface-400 mb-2">{locale === 'fr' ? 'Défi' : 'Challenge'}</h4>
                  <p className="text-sm text-surface-600">{story.challenge[locale]}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-surface-400 mb-2">{locale === 'fr' ? 'Approche UX' : 'UX Approach'}</h4>
                  <p className="text-sm text-surface-600">{story.approach[locale]}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-surface-400 mb-2">{locale === 'fr' ? 'Résultats' : 'Results'}</h4>
                  <p className="text-sm text-surface-600">{story.results[locale]}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-surface-50 rounded-xl mb-4">
                {story.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xs text-surface-400 mb-1">{metric.label[locale]}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-surface-500">{metric.before}</span>
                      <span className="text-ux-600">→</span>
                      <span className="font-bold text-green-600">{metric.after}</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">{metric.improvement}</p>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="p-4 bg-ux-50 rounded-xl border-l-4 border-ux-400">
                <p className="text-surface-700 italic mb-2">"{story.testimonial[locale]}"</p>
                <p className="text-sm text-surface-500">— {story.testimonialAuthor}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CTA */}
      <Card className="mt-10 bg-gradient-to-r from-ux-600 to-blue-600 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-display font-bold mb-1">
              {locale === 'fr' ? 'Besoin d\'aide pour convaincre ?' : 'Need help convincing?'}
            </h2>
            <p className="text-white/80">
              {locale === 'fr' ? 'L\'équipe UX peut vous accompagner dans vos présentations' : 'The UX team can support you in your presentations'}
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-white text-ux-700 hover:bg-white/90">
              {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Button>
          </Link>
        </div>
      </Card>
    </MainLayout>
  )
}

