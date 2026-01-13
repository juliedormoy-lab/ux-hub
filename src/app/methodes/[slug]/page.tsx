'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { uxMethods, phaseColors, effortLabels } from '@/data/methods'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeftIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  LightBulbIcon,
  BookOpenIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'

export default function MethodDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale } = useAppStore()
  const t = getTranslation(locale)

  const method = uxMethods.find((m) => m.slug === slug)

  if (!method) {
    return (
      <MainLayout title={locale === 'fr' ? 'Méthode non trouvée' : 'Method not found'}>
        <Card className="text-center py-16">
          <p className="text-surface-500 mb-4">
            {locale === 'fr' ? 'Cette méthode n\'existe pas.' : 'This method does not exist.'}
          </p>
          <Link href="/methodes">
            <Button variant="secondary">{t.common.back}</Button>
          </Link>
        </Card>
      </MainLayout>
    )
  }

  const phase = phaseColors[method.phase]

  return (
    <MainLayout
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: t.methods.title, href: '/methodes' },
        { label: method.name[locale] },
      ]}
    >
      <Link
        href="/methodes"
        className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {t.common.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${phase.bg}`}>
                <LightBulbIcon className={`h-6 w-6 ${phase.text}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${phase.bg} ${phase.text}`}>
                    {phase.label[locale]}
                  </span>
                </div>
                <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
                  {method.name[locale]}
                </h1>
                <p className="text-surface-600">{method.description[locale]}</p>
              </div>
            </div>
          </Card>

          {/* When to use */}
          <Card>
            <h2 className="text-lg font-display font-semibold text-surface-900 mb-4 flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-ux-600" />
              {t.methods.whenToUse}
            </h2>
            <p className="text-surface-600">{method.whenToUse[locale]}</p>
          </Card>

          {/* Deliverables */}
          <Card>
            <h2 className="text-lg font-display font-semibold text-surface-900 mb-4 flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              {t.methods.deliverables}
            </h2>
            <div className="flex flex-wrap gap-2">
              {method.deliverables[locale].map((deliverable, i) => (
                <Badge key={i} variant="success">{deliverable}</Badge>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card>
            <h2 className="text-lg font-display font-semibold text-surface-900 mb-4 flex items-center gap-2">
              <LightBulbIcon className="h-5 w-5 text-amber-500" />
              {t.methods.tips}
            </h2>
            <ul className="space-y-3">
              {method.tips[locale].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-surface-600">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Effort & Impact */}
          <Card>
            <h3 className="text-sm font-medium text-surface-500 mb-4">
              {locale === 'fr' ? 'Caractéristiques' : 'Characteristics'}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-surface-600 flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {t.methods.effort}
                  </span>
                  <Badge variant={method.effort === 'low' ? 'success' : method.effort === 'medium' ? 'warning' : 'error'}>
                    {effortLabels[method.effort][locale]}
                  </Badge>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${method.effort === 'low' ? 'w-1/3 bg-green-500' : method.effort === 'medium' ? 'w-2/3 bg-amber-500' : 'w-full bg-red-500'}`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-surface-600 flex items-center gap-1">
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                    {t.methods.impact}
                  </span>
                  <Badge variant={method.impact === 'high' ? 'success' : method.impact === 'medium' ? 'warning' : 'default'}>
                    {effortLabels[method.impact][locale]}
                  </Badge>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${method.impact === 'high' ? 'w-full bg-green-500' : method.impact === 'medium' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-surface-300'}`}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Template Download */}
          {method.templateUrl && (
            <Card className="bg-gradient-to-br from-ux-50 to-blue-50 border-ux-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-ux-100 rounded-lg">
                  <ArrowDownTrayIcon className="h-5 w-5 text-ux-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900">
                    {locale === 'fr' ? 'Template disponible' : 'Template available'}
                  </h3>
                  <p className="text-xs text-surface-500">HTML - {locale === 'fr' ? 'Imprimable' : 'Printable'}</p>
                </div>
              </div>
              <a
                href={method.templateUrl}
                download
                className="block w-full"
              >
                <Button className="w-full" leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}>
                  {method.templateName?.[locale] || (locale === 'fr' ? 'Télécharger le template' : 'Download template')}
                </Button>
              </a>
              <p className="text-xs text-surface-400 mt-3 text-center">
                {locale === 'fr' 
                  ? 'Ouvrez dans votre navigateur et imprimez en PDF' 
                  : 'Open in browser and print to PDF'}
              </p>
            </Card>
          )}

          {/* Related resources */}
          <Card>
            <h3 className="text-sm font-medium text-surface-500 mb-4 flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4" />
              {t.methods.relatedResources}
            </h3>
            <div className="space-y-2">
              <Link href="/bibliotheque" className="block p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors">
                <p className="text-sm font-medium text-surface-900">
                  {locale === 'fr' ? 'Voir la bibliothèque' : 'View library'}
                </p>
                <p className="text-xs text-surface-400">{locale === 'fr' ? 'Plus de ressources' : 'More resources'}</p>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

