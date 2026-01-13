'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { uxMethods, phaseColors } from '@/data/methods'
import { benefits } from '@/data/guide'
import Link from 'next/link'
import {
  LightBulbIcon,
  FolderIcon,
  BookOpenIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  PlayCircleIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  BoltIcon,
  LifebuoyIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)

  // Get 3 featured methods (one from each phase)
  const featuredMethods = [
    uxMethods.find(m => m.phase === 'discovery'),
    uxMethods.find(m => m.phase === 'design'),
    uxMethods.find(m => m.phase === 'evaluation'),
  ].filter(Boolean)

  return (
    <MainLayout>
      {/* Hero Section with Video */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ux-600 via-ux-700 to-ux-900 text-white p-8 lg:p-12 mb-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <SparklesIcon className="h-4 w-4" />
              <span>UX Hub - {locale === 'fr' ? 'Votre portail UX' : 'Your UX portal'}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="text-base text-white/80 mb-6">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/methodes">
                <Button className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                  {locale === 'fr' ? 'Je découvre l\'UX' : 'I discover UX'}
                </Button>
              </Link>
              <Link href="/guide">
                <Button className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                  {locale === 'fr' ? 'Je veux intégrer l\'UX à mon projet' : 'I want to integrate UX into my project'}
                </Button>
              </Link>
              <Link href="/convaincre">
                <Button className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                  {locale === 'fr' ? 'Je dois convaincre' : 'I need to convince'}
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Video */}
          <div className="relative">
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-black/20 shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/eBbUNs8odVA"
                title="Introduction UX"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-2">
              <PlayCircleIcon className="h-4 w-4" />
              {locale === 'fr' ? 'Découvrir l\'UX' : 'Discover UX'}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-20">
        <h2 className="text-lg font-display font-bold text-surface-900 mb-4">
          {locale === 'fr' ? 'Les bénéfices de l\'UX' : 'UX Benefits'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {benefits.map((benefit, i) => {
            const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
              CurrencyDollarIcon,
              UserPlusIcon,
              BoltIcon,
              LifebuoyIcon,
              FaceSmileIcon,
            }
            const Icon = iconMap[benefit.icon]
            return (
              <Card key={i} className="text-center p-4">
                {Icon && <Icon className="h-8 w-8 text-ux-600 mx-auto mb-2" />}
                <h3 className="font-medium text-surface-900 text-sm mb-1">
                  {benefit[locale].title}
                </h3>
                <p className="text-xs text-surface-500 line-clamp-2">
                  {benefit[locale].description}
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Guide Block */}
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <AcademicCapIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-surface-900">
                  {locale === 'fr' ? 'Guide d\'intégration UX' : 'UX Integration Guide'}
                </h2>
                <p className="text-surface-500">
                  {locale === 'fr' ? '6 étapes clés pour intégrer l\'UX dans vos projets IT' : '6 key steps to integrate UX into your IT projects'}
                </p>
              </div>
            </div>
            <Link href="/guide">
              <Button variant="secondary" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                {locale === 'fr' ? 'Découvrir le guide' : 'Discover the guide'}
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Contact Block */}
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-ux-50 to-blue-50 border-ux-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-ux-100 rounded-xl">
                <UserGroupIcon className="h-6 w-6 text-ux-600" />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-surface-900">
                  {t.home.contactBlock.title}
                </h2>
                <p className="text-surface-500">{t.home.contactBlock.subtitle}</p>
              </div>
            </div>
            <Link href="/contact">
              <Button leftIcon={<EnvelopeIcon className="h-4 w-4" />}>
                {t.home.contactBlock.cta}
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Methods Block */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-surface-900 flex items-center gap-2">
              <LightBulbIcon className="h-6 w-6 text-ux-600" />
              {t.home.methodsBlock.title}
            </h2>
            <p className="text-surface-500">{t.home.methodsBlock.subtitle}</p>
          </div>
          <Link href="/methodes">
            <Button variant="ghost" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
              {t.home.methodsBlock.cta}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredMethods.map((method) => {
            if (!method) return null
            const phase = phaseColors[method.phase]
            return (
              <Link key={method.id} href={`/methodes/${method.slug}`}>
                <Card hover className="h-full">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${phase.bg} ${phase.text} mb-3`}>
                    {phase.label[locale]}
                  </span>
                  <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
                    {method.name[locale]}
                  </h3>
                  <p className="text-sm text-surface-500 line-clamp-2">
                    {method.description[locale]}
                  </p>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Two columns: Projects & Library */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Block */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-surface-900 flex items-center gap-2">
              <FolderIcon className="h-5 w-5 text-amber-500" />
              {t.home.projectsBlock.title}
            </h2>
            <Link href="/projets" className="text-sm text-ux-600 hover:text-ux-700 flex items-center gap-1">
              {t.home.projectsBlock.cta}
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <ChartBarIcon className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-900">
                  {locale === 'fr' ? 'Refonte parcours souscription' : 'Subscription flow redesign'}
                </h3>
                <p className="text-sm text-surface-500">
                  {locale === 'fr' ? 'Équipe Acquisition' : 'Acquisition Team'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 rounded-xl">
              <div>
                <p className="text-xs text-surface-400 mb-1">{locale === 'fr' ? 'Avant' : 'Before'}</p>
                <p className="text-lg font-bold text-surface-900">33%</p>
                <p className="text-xs text-surface-500">{locale === 'fr' ? 'Taux completion' : 'Completion rate'}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 mb-1">{locale === 'fr' ? 'Après' : 'After'}</p>
                <p className="text-lg font-bold text-green-600">58%</p>
                <p className="text-xs text-surface-500">+25 pts</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Library Block */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-surface-900 flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-emerald-500" />
              {t.home.libraryBlock.title}
            </h2>
            <Link href="/bibliotheque" className="text-sm text-ux-600 hover:text-ux-700 flex items-center gap-1">
              {t.home.libraryBlock.cta}
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="space-y-3">
              {[
                { title: locale === 'fr' ? 'Template Persona' : 'Persona Template', type: 'PPTX', downloads: 124 },
                { title: locale === 'fr' ? 'Guide Tests Utilisateurs' : 'User Testing Guide', type: 'PDF', downloads: 89 },
                { title: locale === 'fr' ? 'Checklist Accessibilité' : 'Accessibility Checklist', type: 'PDF', downloads: 156 },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-xs font-medium text-emerald-700">
                      {doc.type}
                    </div>
                    <span className="text-sm font-medium text-surface-900">{doc.title}</span>
                  </div>
                  <span className="text-xs text-surface-400">{doc.downloads} ↓</span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </MainLayout>
  )
}
