'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge, Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { guideSteps, benefits, prerequisites } from '@/data/guide'
import { planificationTasks, explorationTasks } from '@/data/plan-action'
import Link from 'next/link'
import { useState } from 'react'
import {
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  MapIcon,
  PaintBrushIcon,
  UserGroupIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  BoltIcon,
  LifebuoyIcon,
  FaceSmileIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DocumentArrowDownIcon,
  ClockIcon,
  DocumentTextIcon,
  PhoneIcon,
  UserCircleIcon,
  CalendarIcon,
  FolderIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  CogIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

const iconMap: Record<string, typeof RocketLaunchIcon> = {
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  MapIcon,
  PaintBrushIcon,
  UserGroupIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  BoltIcon,
  LifebuoyIcon,
  FaceSmileIcon,
  DocumentTextIcon,
  PhoneIcon,
  UserCircleIcon,
  CalendarIcon,
  FolderIcon,
  ComputerDesktopIcon,
  CogIcon,
}

const colorClasses: Record<string, { bg: string; text: string; border: string; light: string }> = {
  blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-50' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-200', light: 'bg-purple-50' },
  green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-200', light: 'bg-green-50' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-200', light: 'bg-orange-50' },
  pink: { bg: 'bg-pink-600', text: 'text-pink-600', border: 'border-pink-200', light: 'bg-pink-50' },
  cyan: { bg: 'bg-cyan-600', text: 'text-cyan-600', border: 'border-cyan-200', light: 'bg-cyan-50' },
}

export default function GuidePage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({})
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({})
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleStep = (stepId: number) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }))
  }

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  const toggleCheckItem = (taskId: string, itemIndex: number) => {
    const key = `${taskId}-${itemIndex}`
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getTaskProgress = (taskId: string, checklistLength: number) => {
    let checked = 0
    for (let i = 0; i < checklistLength; i++) {
      if (checkedItems[`${taskId}-${i}`]) checked++
    }
    return { checked, total: checklistLength, percent: Math.round((checked / checklistLength) * 100) }
  }

  return (
    <MainLayout
      title={locale === 'fr' ? 'Intégrer l\'UX à mon projet' : 'Integrate UX into my project'}
      subtitle={locale === 'fr' ? 'Guide interactif pour intégrer l\'UX selon votre contexte' : 'Interactive guide to integrate UX according to your context'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: t.nav.guide },
      ]}
    >
      {/* Introduction */}
      <Card className="mb-8 bg-gradient-to-br from-ux-50 to-blue-50 border-ux-200">
        <h2 className="text-lg font-display font-bold text-surface-900 mb-2">
          {locale === 'fr' ? 'Pourquoi intégrer l\'UX ?' : 'Why integrate UX?'}
        </h2>
        <p className="text-surface-600">
          {locale === 'fr'
            ? 'Ce guide pratique décrit les 6 étapes clés pour intégrer l\'UX dans vos projets informatiques. Il s\'adresse aux chefs de projet, Product Owners, développeurs et toute personne souhaitant améliorer l\'expérience utilisateur.'
            : 'This practical guide outlines the 6 key steps to integrate UX into your IT projects. It is intended for project managers, Product Owners, developers, and anyone looking to improve user experience.'}
        </p>
      </Card>

      {/* Prerequisites - Ultra compact */}
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
          <span className="text-xs font-semibold text-red-700">{locale === 'fr' ? 'Prérequis :' : 'Prerequisites:'}</span>
        </div>
        {prerequisites.filter(p => p.required).map((prereq, i) => (
          <span key={prereq.id} className="text-xs text-surface-700">
            {prereq.title[locale]}{i < prerequisites.filter(p => p.required).length - 1 ? ' •' : ''}
          </span>
        ))}
      </div>

      {/* Quick Action Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Figma Workspace Link */}
        <a 
          href="https://www.figma.com/file/UXHub-TeamWill-Workspace-2025" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl flex items-center justify-between gap-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <svg className="h-6 w-6" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-surface-900 group-hover:text-violet-700 transition-colors">
                {locale === 'fr' ? 'Espace de travail Figma' : 'Figma Workspace'}
              </h3>
              <p className="text-xs text-surface-500">
                {locale === 'fr' ? 'Templates et frames prêts à l\'emploi' : 'Ready-to-use templates and frames'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-violet-600 text-sm font-medium">
            <span className="hidden sm:inline">{locale === 'fr' ? 'Ouvrir Figma' : 'Open Figma'}</span>
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* UX Diagnostic CTA */}
        <Link 
          href="/diagnostic"
          className="p-4 bg-gradient-to-r from-ux-50 to-blue-50 border border-ux-200 rounded-xl flex items-center justify-between gap-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <ChartBarIcon className="h-6 w-6 text-ux-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-surface-900 group-hover:text-ux-700 transition-colors">
                {locale === 'fr' ? 'Besoin d\'UX mais vous ne savez pas quoi prioriser ?' : 'Need UX but don\'t know what to prioritize?'}
              </h3>
              <p className="text-xs text-surface-500">
                {locale === 'fr' ? 'Faites le diagnostic UX de votre produit en 5 minutes' : 'Do your product\'s UX diagnostic in 5 minutes'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-ux-600 text-sm font-medium">
            <span className="hidden sm:inline">{locale === 'fr' ? 'Diagnostic' : 'Diagnostic'}</span>
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Process Overview - Two Phases */}
      <section className="mb-10">
        <h2 className="text-lg font-display font-bold text-surface-900 mb-2">
          {locale === 'fr' ? 'Vue d\'ensemble du processus' : 'Process Overview'}
        </h2>
        <p className="text-sm text-surface-500 mb-4 flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          {locale === 'fr' 
            ? 'Les durées indiquées sont estimatives et varient selon l\'envergure du projet, les ressources disponibles et la maturité UX de l\'équipe.' 
            : 'Indicated durations are estimates and vary based on project scope, available resources, and team UX maturity.'}
        </p>
        
        {/* Two Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Phase 1: Recherche en amont */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <MagnifyingGlassIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <Badge className="bg-purple-600 text-white mb-1">
                  {locale === 'fr' ? 'Phase 1' : 'Phase 1'}
                </Badge>
                <h3 className="font-display font-bold text-surface-900">
                  {locale === 'fr' ? 'Recherche en amont' : 'Upfront Research'}
                </h3>
              </div>
            </div>
            <p className="text-sm text-surface-600 mb-4">
              {locale === 'fr' 
                ? 'Avant de concevoir, comprendre les besoins utilisateurs et cartographier l\'expérience actuelle.'
                : 'Before designing, understand user needs and map the current experience.'}
            </p>
            <div className="flex items-center gap-4 text-sm text-purple-600">
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {locale === 'fr' ? '2-3 semaines' : '2-3 weeks'}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4" />
                {locale === 'fr' ? '3 étapes' : '3 steps'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-200">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-300 text-purple-600">1. Cadrage</Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-600">2. Découverte</Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-600">3. Cartographie</Badge>
              </div>
            </div>
          </Card>

          {/* Phase 2: Intégration en Agile */}
          <Card className="bg-gradient-to-br from-orange-50 to-cyan-50 border-orange-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-cyan-600 flex items-center justify-center">
                <CodeBracketIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <Badge className="bg-orange-600 text-white mb-1">
                  {locale === 'fr' ? 'Phase 2' : 'Phase 2'}
                </Badge>
                <h3 className="font-display font-bold text-surface-900">
                  {locale === 'fr' ? 'Intégration en Agile' : 'Agile Integration'}
                </h3>
              </div>
            </div>
            <p className="text-sm text-surface-600 mb-4">
              {locale === 'fr' 
                ? 'Concevoir, tester et accompagner le développement de manière itérative sprint par sprint.'
                : 'Design, test and support development iteratively sprint by sprint.'}
            </p>
            <div className="flex items-center gap-4 text-sm text-orange-600">
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {locale === 'fr' ? '2-4 semaines + continu' : '2-4 weeks + ongoing'}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4" />
                {locale === 'fr' ? '3 étapes' : '3 steps'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-orange-200">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-orange-300 text-orange-600">4. Conception</Badge>
                <Badge variant="outline" className="border-orange-300 text-orange-600">5. Validation</Badge>
                <Badge variant="outline" className="border-orange-300 text-orange-600">6. Développement</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommandations gros projets */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <RocketLaunchIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-surface-900">
                {locale === 'fr' ? 'Pour les projets d\'envergure' : 'For large-scale projects'}
              </h3>
              <p className="text-xs text-surface-500">
                {locale === 'fr' ? 'Comment prioriser et itérer efficacement' : 'How to prioritize and iterate effectively'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Définir le périmètre recherche */}
            <div className="bg-white/60 rounded-lg p-4">
              <h4 className="font-semibold text-surface-800 text-sm mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                {locale === 'fr' ? 'Cadrer la recherche' : 'Scope the research'}
              </h4>
              <ul className="text-xs text-surface-600 space-y-1.5">
                <li>• {locale === 'fr' ? 'Identifier les parcours critiques (80/20)' : 'Identify critical journeys (80/20)'}</li>
                <li>• {locale === 'fr' ? 'Prioriser les personas à impact business' : 'Prioritize personas with business impact'}</li>
                <li>• {locale === 'fr' ? 'Limiter à 5-8 entretiens par segment' : 'Limit to 5-8 interviews per segment'}</li>
                <li>• {locale === 'fr' ? 'Timeboxer la phase discovery (2-4 sem.)' : 'Timebox discovery phase (2-4 weeks)'}</li>
              </ul>
            </div>

            {/* Définir MVP / Priorité 1 */}
            <div className="bg-white/60 rounded-lg p-4">
              <h4 className="font-semibold text-surface-800 text-sm mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                {locale === 'fr' ? 'Définir le MVP' : 'Define the MVP'}
              </h4>
              <ul className="text-xs text-surface-600 space-y-1.5">
                <li>• {locale === 'fr' ? 'Matrice Impact/Effort pour prioriser' : 'Impact/Effort matrix to prioritize'}</li>
                <li>• {locale === 'fr' ? 'MVP = parcours principal end-to-end' : 'MVP = main end-to-end journey'}</li>
                <li>• {locale === 'fr' ? 'P1 = fonctionnalités bloquantes métier' : 'P1 = business-blocking features'}</li>
                <li>• {locale === 'fr' ? 'Valider le scope MVP avec les stakeholders' : 'Validate MVP scope with stakeholders'}</li>
              </ul>
            </div>

            {/* Itérer */}
            <div className="bg-white/60 rounded-lg p-4">
              <h4 className="font-semibold text-surface-800 text-sm mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                {locale === 'fr' ? 'Itérer par vagues' : 'Iterate in waves'}
              </h4>
              <ul className="text-xs text-surface-600 space-y-1.5">
                <li>• {locale === 'fr' ? 'Vague 1 : MVP testé et validé' : 'Wave 1: MVP tested and validated'}</li>
                <li>• {locale === 'fr' ? 'Vague 2 : Parcours secondaires' : 'Wave 2: Secondary journeys'}</li>
                <li>• {locale === 'fr' ? 'Vague 3 : Optimisations et edge cases' : 'Wave 3: Optimizations and edge cases'}</li>
                <li>• {locale === 'fr' ? '1 test utilisateur par sprint minimum' : '1 user test per sprint minimum'}</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center gap-2 text-xs text-amber-700">
            <span className="font-medium">💡</span>
            {locale === 'fr' 
              ? 'Conseil : Planifiez des "checkpoints UX" à chaque fin de vague pour ajuster les priorités avec les retours utilisateurs.'
              : 'Tip: Plan "UX checkpoints" at the end of each wave to adjust priorities based on user feedback.'}
          </div>
        </Card>

        {/* Full Process Timeline */}
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {guideSteps.map((step) => {
              const Icon = iconMap[step.icon]
              const colors = colorClasses[step.color]
              const isPhase1 = step.id <= 3
              return (
                <Link 
                  key={step.id} 
                  href={`#step-${step.id}`} 
                  className="flex flex-col items-center group p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl ${colors.light} ${colors.text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm border border-${step.color}-200`}>
                    {Icon && <Icon className="h-7 w-7" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 mb-1">{step.subtitle[locale]}</span>
                  <span className="text-sm font-bold text-surface-900 text-center leading-tight mb-2">
                    {step.title[locale]}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${colors.light} ${colors.text} font-semibold border border-current/20`}>
                    <ClockIcon className="h-3 w-3" />
                    {step.duration[locale]}
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="mt-6 pt-4 border-t-2 border-slate-200 text-center">
            <span className="text-sm text-slate-700 font-semibold bg-white px-4 py-2 rounded-full border border-slate-200">
              {locale === 'fr' ? '↺ Mesure & Itération continue' : '↺ Continuous Measurement & Iteration'}
            </span>
          </div>
        </Card>
      </section>

      {/* ============================================ */}
      {/* PHASE 1: RECHERCHE EN AMONT */}
      {/* ============================================ */}
      <section className="mb-12" id="phase-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
            <MagnifyingGlassIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <Badge className="bg-purple-600 text-white mb-1">
              {locale === 'fr' ? 'Phase 1' : 'Phase 1'}
            </Badge>
            <h2 className="text-xl font-display font-bold text-surface-900">
              {locale === 'fr' ? 'Recherche en amont' : 'Upfront Research'}
            </h2>
            <p className="text-sm text-surface-500">
              {locale === 'fr' 
                ? 'Comprendre avant de concevoir – La clé d\'un projet UX réussi'
                : 'Understand before designing – The key to a successful UX project'}
            </p>
          </div>
        </div>

        <Card className="bg-purple-50 border-purple-200 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-800">
                <strong>{locale === 'fr' ? 'Pourquoi cette phase est cruciale :' : 'Why this phase is crucial:'}</strong>{' '}
                {locale === 'fr' 
                  ? 'Sans recherche préalable, vous risquez de concevoir une solution qui ne répond pas aux vrais besoins. Cette phase doit être terminée AVANT de commencer les sprints de développement.'
                  : 'Without prior research, you risk designing a solution that doesn\'t address real needs. This phase must be completed BEFORE starting development sprints.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Phase 1 Tasks - Plan d'action détaillé */}
        <div className="space-y-4">
          {planificationTasks.map((task, taskIndex) => {
            const isExpanded = expandedTasks[task.id] ?? false
            const progress = getTaskProgress(task.id, task.checklist.length)
            return (
              <Card key={task.id} className="border-l-4 border-purple-400 scroll-mt-24 overflow-hidden">
                {/* Header cliquable */}
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 font-bold">
                      {taskIndex + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {task.duration[locale]}
                        </Badge>
                        {progress.checked > 0 && (
                          <Badge className={progress.percent === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                            {progress.checked}/{progress.total}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-display font-bold text-surface-900">
                        {task.title[locale]}
                      </h3>
                      <p className="text-sm text-surface-500 mt-1">{task.description[locale]}</p>
                    </div>
                  </div>
                  <ChevronDownIcon className={`h-6 w-6 text-surface-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Contenu expansible */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-surface-100">
                    {/* Checklist interactive */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-surface-900 mb-3">
                        {locale === 'fr' ? 'Checklist' : 'Checklist'} ({progress.checked}/{progress.total})
                      </h4>
                      <div className="space-y-2">
                        {task.checklist.map((item, i) => (
                          <label 
                            key={i} 
                            className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg cursor-pointer hover:bg-surface-100 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems[`${task.id}-${i}`] || false}
                              onChange={() => toggleCheckItem(task.id, i)}
                              className="w-5 h-5 rounded border-surface-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className={`text-sm ${checkedItems[`${task.id}-${i}`] ? 'text-surface-400 line-through' : 'text-surface-700'}`}>
                              {item[locale]}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Livrables */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-surface-900 mb-3">
                        {locale === 'fr' ? 'Livrables attendus' : 'Expected deliverables'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {task.outputs.map((output, i) => (
                          <Badge key={i} variant="success">📄 {output[locale]}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Conseil */}
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">
                        <strong>💡 {locale === 'fr' ? 'Conseil :' : 'Tip:'}</strong> {task.tips[locale]}
                      </p>
                    </div>

                    {/* Méthodologies recommandées */}
                    {task.methodologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-surface-900 mb-3">
                          {locale === 'fr' ? 'Méthodologies recommandées' : 'Recommended methodologies'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {task.methodologies.map((method, i) => (
                            <Link key={i} href={`/methodes/${method.slug}`} className="p-3 bg-white border border-surface-200 rounded-lg hover:border-purple-300 transition-colors">
                              <p className="font-medium text-surface-900 text-sm">{method.name[locale]}</p>
                              <p className="text-xs text-surface-500">{method.description[locale]}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Transition to Phase 2 */}
        <Card className="mt-8 bg-gradient-to-r from-purple-100 to-orange-100 border-0">
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="flex items-center gap-2 text-purple-600">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="font-medium">{locale === 'fr' ? 'Recherche terminée' : 'Research complete'}</span>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-surface-400" />
            <div className="flex items-center gap-2 text-orange-600">
              <span className="font-medium">{locale === 'fr' ? 'Prêt pour l\'Agile' : 'Ready for Agile'}</span>
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </section>

      {/* ============================================ */}
      {/* PHASE 2: INTÉGRATION EN AGILE */}
      {/* ============================================ */}
      <section className="mb-12" id="phase-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <CodeBracketIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <Badge className="bg-orange-600 text-white mb-1">
              {locale === 'fr' ? 'Phase 2' : 'Phase 2'}
            </Badge>
            <h2 className="text-xl font-display font-bold text-surface-900">
              {locale === 'fr' ? 'Intégration en Agile' : 'Agile Integration'}
            </h2>
            <p className="text-sm text-surface-500">
              {locale === 'fr' 
                ? 'Concevoir, tester et accompagner le développement – Sprint par sprint'
                : 'Design, test and support development – Sprint by sprint'}
            </p>
          </div>
        </div>

        <Card className="bg-orange-50 border-orange-200 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BoltIcon className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-orange-800">
                <strong>{locale === 'fr' ? 'Mode Agile :' : 'Agile Mode:'}</strong>{' '}
                {locale === 'fr' 
                  ? 'L\'UX s\'intègre dans vos sprints. L\'UX Designer travaille en avance de 1-2 sprints sur les développeurs pour préparer les maquettes et spécifications. Les tests utilisateurs sont réalisés à chaque fin de sprint majeur.'
                  : 'UX integrates into your sprints. The UX Designer works 1-2 sprints ahead of developers to prepare mockups and specifications. User tests are conducted at the end of each major sprint.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Agile Timeline Visual */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-cyan-50 border-orange-200">
          <h4 className="font-display font-bold text-surface-900 mb-4">
            {locale === 'fr' ? 'Intégration UX dans les sprints' : 'UX Integration in Sprints'}
          </h4>
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-surface-200 rounded"></div>
            <div className="flex justify-between relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-xs text-surface-500 mt-2 text-center max-w-[80px]">
                  {locale === 'fr' ? 'Sprint N-2' : 'Sprint N-2'}
                </span>
                <span className="text-xs text-orange-600 font-medium">
                  {locale === 'fr' ? 'Conception' : 'Design'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-xs text-surface-500 mt-2 text-center max-w-[80px]">
                  {locale === 'fr' ? 'Sprint N-1' : 'Sprint N-1'}
                </span>
                <span className="text-xs text-pink-600 font-medium">
                  {locale === 'fr' ? 'Tests' : 'Tests'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-xs text-surface-500 mt-2 text-center max-w-[80px]">
                  {locale === 'fr' ? 'Sprint N' : 'Sprint N'}
                </span>
                <span className="text-xs text-cyan-600 font-medium">
                  {locale === 'fr' ? 'Dev' : 'Dev'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">✓</div>
                <span className="text-xs text-surface-500 mt-2 text-center max-w-[80px]">
                  {locale === 'fr' ? 'Review' : 'Review'}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  {locale === 'fr' ? 'Validation' : 'Validation'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Phase 2 Tasks - Exploration détaillée */}
        <div className="space-y-4">
          {explorationTasks.map((task, taskIndex) => {
            const isExpanded = expandedTasks[task.id] ?? false
            const progress = getTaskProgress(task.id, task.checklist.length)
            return (
              <Card key={task.id} className="border-l-4 border-orange-400 scroll-mt-24 overflow-hidden">
                {/* Header cliquable */}
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold">
                      {taskIndex + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {task.duration[locale]}
                        </Badge>
                        {progress.checked > 0 && (
                          <Badge className={progress.percent === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                            {progress.checked}/{progress.total}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-display font-bold text-surface-900">
                        {task.title[locale]}
                      </h3>
                      <p className="text-sm text-surface-500 mt-1">{task.description[locale]}</p>
                    </div>
                  </div>
                  <ChevronDownIcon className={`h-6 w-6 text-surface-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Contenu expansible */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-surface-100">
                    {/* Checklist interactive */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-surface-900 mb-3">
                        {locale === 'fr' ? 'Checklist' : 'Checklist'} ({progress.checked}/{progress.total})
                      </h4>
                      <div className="space-y-2">
                        {task.checklist.map((item, i) => (
                          <label 
                            key={i} 
                            className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg cursor-pointer hover:bg-surface-100 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems[`${task.id}-${i}`] || false}
                              onChange={() => toggleCheckItem(task.id, i)}
                              className="w-5 h-5 rounded border-surface-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className={`text-sm ${checkedItems[`${task.id}-${i}`] ? 'text-surface-400 line-through' : 'text-surface-700'}`}>
                              {item[locale]}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Livrables */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-surface-900 mb-3">
                        {locale === 'fr' ? 'Livrables attendus' : 'Expected deliverables'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {task.outputs.map((output, i) => (
                          <Badge key={i} variant="success">📄 {output[locale]}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Conseil */}
                    <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-800">
                        <strong>💡 {locale === 'fr' ? 'Conseil :' : 'Tip:'}</strong> {task.tips[locale]}
                      </p>
                    </div>

                    {/* Méthodologies recommandées */}
                    {task.methodologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-surface-900 mb-3">
                          {locale === 'fr' ? 'Méthodologies recommandées' : 'Recommended methodologies'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {task.methodologies.map((method, i) => (
                            <Link key={i} href={`/methodes/${method.slug}`} className="p-3 bg-white border border-surface-200 rounded-lg hover:border-orange-300 transition-colors">
                              <p className="font-medium text-surface-900 text-sm">{method.name[locale]}</p>
                              <p className="text-xs text-surface-500">{method.description[locale]}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </section>

      {/* Summary table */}
      <section className="mt-10">
        <h2 className="text-lg font-display font-bold text-surface-900 mb-4">
          {locale === 'fr' ? 'Récapitulatif des livrables' : 'Deliverables Summary'}
        </h2>
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left py-3 px-4 font-medium text-surface-500">
                  {locale === 'fr' ? 'Étape' : 'Step'}
                </th>
                <th className="text-left py-3 px-4 font-medium text-surface-500">
                  {locale === 'fr' ? 'Livrables' : 'Deliverables'}
                </th>
              </tr>
            </thead>
            <tbody>
              {guideSteps.map((step) => (
                <tr key={step.id} className="border-b border-surface-100 last:border-0">
                  <td className="py-3 px-4">
                    <span className="font-medium text-surface-900">
                      {step.id}. {step.title[locale].split(' ').slice(0, 2).join(' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {step.deliverables.map((d, i) => (
                        <Badge key={i} variant="default">{d[locale]}</Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* CTA */}
      <Card className="mt-10 bg-gradient-to-r from-ux-600 to-blue-600 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-display font-bold mb-1">
              {locale === 'fr' ? 'Prêt à intégrer l\'UX dans votre projet ?' : 'Ready to integrate UX into your project?'}
            </h2>
            <p className="text-white/80">
              {locale === 'fr' ? 'Notre équipe est là pour vous accompagner' : 'Our team is here to support you'}
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

