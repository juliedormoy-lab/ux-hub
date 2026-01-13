'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge, Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyEuroIcon,
  RocketLaunchIcon,
  HomeIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

// Questions du diagnostic
const diagnosticQuestions = [
  {
    id: 1,
    category: { fr: 'Votre projet', en: 'Your project' },
    question: { fr: 'Où en est votre projet actuellement ?', en: 'Where is your project currently?' },
    options: [
      { label: { fr: 'Cadrage / Avant-projet', en: 'Scoping / Pre-project' }, points: 4, recommendation: 'research' },
      { label: { fr: 'Conception / Spécifications', en: 'Design / Specifications' }, points: 3, recommendation: 'design' },
      { label: { fr: 'Développement en cours', en: 'Development in progress' }, points: 2, recommendation: 'validation' },
      { label: { fr: 'Recette / Pré-production', en: 'Testing / Pre-production' }, points: 1, recommendation: 'audit' },
      { label: { fr: 'En production', en: 'In production' }, points: 1, recommendation: 'optimization' },
    ],
  },
  {
    id: 2,
    category: { fr: 'Votre projet', en: 'Your project' },
    question: { fr: 'Quelle est la taille/complexité de votre projet ?', en: 'What is the size/complexity of your project?' },
    options: [
      { label: { fr: 'Petit (MVP, fonctionnalité isolée)', en: 'Small (MVP, isolated feature)' }, points: 1 },
      { label: { fr: 'Moyen (module, refonte partielle)', en: 'Medium (module, partial redesign)' }, points: 2 },
      { label: { fr: 'Grand (nouveau produit, refonte complète)', en: 'Large (new product, complete redesign)' }, points: 3 },
      { label: { fr: 'Très grand (écosystème, multi-produits)', en: 'Very large (ecosystem, multi-product)' }, points: 4 },
    ],
  },
  {
    id: 3,
    category: { fr: 'Connaissance utilisateurs', en: 'User knowledge' },
    question: { fr: 'Connaissez-vous bien vos utilisateurs cibles ?', en: 'Do you know your target users well?' },
    options: [
      { label: { fr: 'Oui, nous avons des personas et des études récentes', en: 'Yes, we have personas and recent studies' }, points: 0 },
      { label: { fr: 'Nous avons une idée générale mais pas de données', en: 'We have a general idea but no data' }, points: 2 },
      { label: { fr: 'Non, nous n\'avons jamais fait de recherche', en: 'No, we have never done research' }, points: 4 },
    ],
  },
  {
    id: 4,
    category: { fr: 'Connaissance utilisateurs', en: 'User knowledge' },
    question: { fr: 'Avez-vous accès à vos utilisateurs finaux ?', en: 'Do you have access to your end users?' },
    options: [
      { label: { fr: 'Oui, facilement et régulièrement', en: 'Yes, easily and regularly' }, points: 0 },
      { label: { fr: 'Oui, mais c\'est compliqué (RGPD, disponibilité)', en: 'Yes, but it\'s complicated (GDPR, availability)' }, points: 1 },
      { label: { fr: 'Difficilement, via des intermédiaires', en: 'With difficulty, through intermediaries' }, points: 2 },
      { label: { fr: 'Non, pas du tout', en: 'No, not at all' }, points: 3 },
    ],
  },
  {
    id: 5,
    category: { fr: 'Maturité UX', en: 'UX Maturity' },
    question: { fr: 'Votre équipe a-t-elle déjà travaillé avec l\'UX ?', en: 'Has your team already worked with UX?' },
    options: [
      { label: { fr: 'Oui, régulièrement avec des UX Designers', en: 'Yes, regularly with UX Designers' }, points: 0 },
      { label: { fr: 'Oui, occasionnellement', en: 'Yes, occasionally' }, points: 1 },
      { label: { fr: 'Non, mais nous avons des notions', en: 'No, but we have some knowledge' }, points: 2 },
      { label: { fr: 'Non, jamais', en: 'No, never' }, points: 3 },
    ],
  },
  {
    id: 6,
    category: { fr: 'Maturité UX', en: 'UX Maturity' },
    question: { fr: 'Avez-vous un Design System ou des guidelines UI ?', en: 'Do you have a Design System or UI guidelines?' },
    options: [
      { label: { fr: 'Oui, complet et documenté', en: 'Yes, complete and documented' }, points: 0 },
      { label: { fr: 'Partiellement (quelques composants)', en: 'Partially (some components)' }, points: 1 },
      { label: { fr: 'Non, mais on utilise un framework (Bootstrap, etc.)', en: 'No, but we use a framework (Bootstrap, etc.)' }, points: 2 },
      { label: { fr: 'Non, rien', en: 'No, nothing' }, points: 3 },
    ],
  },
  {
    id: 7,
    category: { fr: 'Ressources', en: 'Resources' },
    question: { fr: 'Quel budget pouvez-vous allouer à l\'UX ?', en: 'What budget can you allocate to UX?' },
    options: [
      { label: { fr: 'Confortable (plusieurs semaines de prestation)', en: 'Comfortable (several weeks of service)' }, points: 0 },
      { label: { fr: 'Modéré (quelques jours)', en: 'Moderate (a few days)' }, points: 1 },
      { label: { fr: 'Limité (très peu de temps)', en: 'Limited (very little time)' }, points: 2 },
      { label: { fr: 'Pas de budget dédié', en: 'No dedicated budget' }, points: 3 },
    ],
  },
  {
    id: 8,
    category: { fr: 'Ressources', en: 'Resources' },
    question: { fr: 'Quel est le délai pour intégrer l\'UX ?', en: 'What is the timeline to integrate UX?' },
    options: [
      { label: { fr: 'Confortable (2+ mois)', en: 'Comfortable (2+ months)' }, points: 0 },
      { label: { fr: 'Standard (1-2 mois)', en: 'Standard (1-2 months)' }, points: 1 },
      { label: { fr: 'Serré (2-4 semaines)', en: 'Tight (2-4 weeks)' }, points: 2 },
      { label: { fr: 'Très serré (< 2 semaines)', en: 'Very tight (< 2 weeks)' }, points: 3 },
    ],
  },
  {
    id: 9,
    category: { fr: 'Enjeux', en: 'Stakes' },
    question: { fr: 'Quels sont les principaux problèmes rencontrés ?', en: 'What are the main problems encountered?' },
    multiple: true,
    options: [
      { label: { fr: 'Taux d\'adoption faible', en: 'Low adoption rate' }, points: 1 },
      { label: { fr: 'Beaucoup de demandes au support', en: 'Many support requests' }, points: 1 },
      { label: { fr: 'Utilisateurs frustrés / insatisfaits', en: 'Frustrated / dissatisfied users' }, points: 1 },
      { label: { fr: 'Interface obsolète / incohérente', en: 'Outdated / inconsistent interface' }, points: 1 },
      { label: { fr: 'Pas de problème identifié, c\'est préventif', en: 'No identified problem, it\'s preventive' }, points: 0 },
    ],
  },
  {
    id: 10,
    category: { fr: 'Objectifs', en: 'Goals' },
    question: { fr: 'Qu\'attendez-vous principalement de l\'UX ?', en: 'What do you mainly expect from UX?' },
    multiple: true,
    options: [
      { label: { fr: 'Comprendre les besoins utilisateurs', en: 'Understand user needs' }, points: 1, recommendation: 'research' },
      { label: { fr: 'Améliorer un produit existant', en: 'Improve an existing product' }, points: 1, recommendation: 'audit' },
      { label: { fr: 'Concevoir un nouveau produit', en: 'Design a new product' }, points: 1, recommendation: 'design' },
      { label: { fr: 'Valider des choix de conception', en: 'Validate design choices' }, points: 1, recommendation: 'validation' },
      { label: { fr: 'Convaincre les parties prenantes', en: 'Convince stakeholders' }, points: 1, recommendation: 'pitch' },
    ],
  },
]

// Niveaux de recommandation
const recommendationLevels = {
  light: {
    title: { fr: 'Intervention légère', en: 'Light intervention' },
    subtitle: { fr: 'Quick wins & optimisations', en: 'Quick wins & optimizations' },
    duration: { fr: '1-2 semaines', en: '1-2 weeks' },
    budget: '€€',
    color: 'green',
    icon: LightBulbIcon,
    description: {
      fr: 'Votre projet a une bonne maturité UX. Quelques ajustements ciblés suffiront.',
      en: 'Your project has good UX maturity. A few targeted adjustments will suffice.',
    },
    actions: {
      fr: ['Audit heuristique rapide', 'Tests utilisateurs ciblés (3-5 users)', 'Recommandations priorisées', 'Quick wins identifiés'],
      en: ['Quick heuristic audit', 'Targeted user tests (3-5 users)', 'Prioritized recommendations', 'Identified quick wins'],
    },
  },
  standard: {
    title: { fr: 'Intervention standard', en: 'Standard intervention' },
    subtitle: { fr: 'Recherche & conception', en: 'Research & design' },
    duration: { fr: '4-6 semaines', en: '4-6 weeks' },
    budget: '€€€',
    color: 'amber',
    icon: ChartBarIcon,
    description: {
      fr: 'Votre projet nécessite une démarche UX structurée pour répondre aux enjeux.',
      en: 'Your project requires a structured UX approach to address the challenges.',
    },
    actions: {
      fr: ['Recherche utilisateur (5-8 entretiens)', 'Création de personas', 'User Journey Map', 'Prototypage & tests', 'Recommandations détaillées'],
      en: ['User research (5-8 interviews)', 'Persona creation', 'User Journey Map', 'Prototyping & testing', 'Detailed recommendations'],
    },
  },
  deep: {
    title: { fr: 'Intervention approfondie', en: 'In-depth intervention' },
    subtitle: { fr: 'Transformation UX complète', en: 'Complete UX transformation' },
    duration: { fr: '8+ semaines', en: '8+ weeks' },
    budget: '€€€€',
    color: 'red',
    icon: RocketLaunchIcon,
    description: {
      fr: 'Votre projet nécessite un accompagnement UX complet pour maximiser les chances de succès.',
      en: 'Your project requires complete UX support to maximize chances of success.',
    },
    actions: {
      fr: ['Recherche exploratoire approfondie', 'Ateliers de co-création', 'Design System', 'Prototypes haute-fidélité', 'Tests utilisateurs itératifs', 'Accompagnement long terme'],
      en: ['In-depth exploratory research', 'Co-creation workshops', 'Design System', 'High-fidelity prototypes', 'Iterative user testing', 'Long-term support'],
    },
  },
}

export default function DiagnosticPage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const resultRef = useRef<HTMLDivElement>(null)
  
  const [currentStep, setCurrentStep] = useState(0) // 0 = intro, 1-10 = questions, 11 = results
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({})
  const [projectName, setProjectName] = useState('')
  const [copied, setCopied] = useState(false)

  const totalQuestions = diagnosticQuestions.length
  const isIntro = currentStep === 0
  const isResults = currentStep === totalQuestions + 1
  const currentQuestion = diagnosticQuestions[currentStep - 1]

  const handleAnswer = (questionId: number, optionIndex: number, isMultiple?: boolean) => {
    if (isMultiple) {
      const currentAnswers = (answers[questionId] as number[]) || []
      if (currentAnswers.includes(optionIndex)) {
        setAnswers({ ...answers, [questionId]: currentAnswers.filter(i => i !== optionIndex) })
      } else {
        setAnswers({ ...answers, [questionId]: [...currentAnswers, optionIndex] })
      }
    } else {
      setAnswers({ ...answers, [questionId]: optionIndex })
    }
  }

  const canProceed = () => {
    if (isIntro) return projectName.trim().length > 0
    if (isResults) return true
    const answer = answers[currentQuestion?.id]
    if (currentQuestion?.multiple) {
      return Array.isArray(answer) && answer.length > 0
    }
    return answer !== undefined
  }

  const calculateScore = () => {
    let totalScore = 0
    diagnosticQuestions.forEach((q) => {
      const answer = answers[q.id]
      if (q.multiple && Array.isArray(answer)) {
        answer.forEach((idx) => {
          totalScore += q.options[idx]?.points || 0
        })
      } else if (typeof answer === 'number') {
        totalScore += q.options[answer]?.points || 0
      }
    })
    return totalScore
  }

  const getRecommendation = () => {
    const score = calculateScore()
    if (score <= 10) return recommendationLevels.light
    if (score <= 20) return recommendationLevels.standard
    return recommendationLevels.deep
  }

  const handleDownloadPDF = () => {
    const recommendation = getRecommendation()
    const score = calculateScore()
    
    // Créer le contenu HTML pour le PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Diagnostic UX - ${projectName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #333; }
          h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #1e40af; margin-top: 30px; }
          h3 { color: #3b82f6; }
          .header { text-align: center; margin-bottom: 40px; }
          .score-box { background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 30px; border-radius: 16px; text-align: center; margin: 30px 0; border: 2px solid #3b82f6; }
          .score { font-size: 48px; font-weight: bold; color: #1e40af; }
          .level { font-size: 24px; color: #2563eb; margin-top: 10px; }
          .recommendation { background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .actions { background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; }
          .actions ul { margin: 10px 0; padding-left: 20px; }
          .actions li { margin: 8px 0; }
          .meta { display: flex; justify-content: space-around; margin: 20px 0; }
          .meta-item { text-align: center; padding: 15px; background: #f1f5f9; border-radius: 8px; }
          .meta-label { font-size: 12px; color: #64748b; text-transform: uppercase; }
          .meta-value { font-size: 18px; font-weight: bold; color: #1e293b; margin-top: 5px; }
          .answers { margin-top: 40px; }
          .answer-item { padding: 15px; border-bottom: 1px solid #e2e8f0; }
          .question { font-weight: 600; color: #1e293b; }
          .response { color: #64748b; margin-top: 5px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 Diagnostic UX</h1>
          <p style="font-size: 20px; color: #64748b;">Résultat de l'analyse pour</p>
          <p style="font-size: 28px; font-weight: bold; color: #1e293b;">${projectName}</p>
        </div>
        
        <div class="score-box">
          <div class="score">${score} points</div>
          <div class="level">${recommendation.title[locale]}</div>
          <p style="margin-top: 15px; color: #64748b;">${recommendation.subtitle[locale]}</p>
        </div>
        
        <div class="meta">
          <div class="meta-item">
            <div class="meta-label">${locale === 'fr' ? 'Durée estimée' : 'Estimated duration'}</div>
            <div class="meta-value">${recommendation.duration[locale]}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">${locale === 'fr' ? 'Budget indicatif' : 'Indicative budget'}</div>
            <div class="meta-value">${recommendation.budget}</div>
          </div>
        </div>
        
        <div class="recommendation">
          <h3>📋 ${locale === 'fr' ? 'Notre recommandation' : 'Our recommendation'}</h3>
          <p>${recommendation.description[locale]}</p>
        </div>
        
        <div class="actions">
          <h3>✅ ${locale === 'fr' ? 'Actions recommandées' : 'Recommended actions'}</h3>
          <ul>
            ${recommendation.actions[locale].map(action => `<li>${action}</li>`).join('')}
          </ul>
        </div>
        
        <div class="answers">
          <h2>📝 ${locale === 'fr' ? 'Détail des réponses' : 'Answer details'}</h2>
          ${diagnosticQuestions.map((q) => {
            const answer = answers[q.id]
            let responseText = ''
            if (q.multiple && Array.isArray(answer)) {
              responseText = answer.map(idx => q.options[idx]?.label[locale]).join(', ')
            } else if (typeof answer === 'number') {
              responseText = q.options[answer]?.label[locale] || ''
            }
            return `
              <div class="answer-item">
                <div class="question">${q.question[locale]}</div>
                <div class="response">→ ${responseText}</div>
              </div>
            `
          }).join('')}
        </div>
        
        <div class="footer">
          <p>Généré le ${new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US')} par UX Hub</p>
          <p>Pour un accompagnement personnalisé, contactez-nous : julie.dormoy@teamwillgroup.com</p>
        </div>
      </body>
      </html>
    `
    
    // Ouvrir dans une nouvelle fenêtre pour impression/PDF
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  const recommendation = isResults ? getRecommendation() : null
  const score = isResults ? calculateScore() : 0

  return (
    <MainLayout
      title={locale === 'fr' ? 'Diagnostic UX' : 'UX Diagnostic'}
      subtitle={locale === 'fr' ? 'Évaluez vos besoins UX en 5 minutes' : 'Assess your UX needs in 5 minutes'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'Guide UX' : 'UX Guide', href: '/guide' },
        { label: locale === 'fr' ? 'Diagnostic' : 'Diagnostic' },
      ]}
    >
      {/* Progress bar */}
      {!isIntro && !isResults && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-surface-500">
              {locale === 'fr' ? 'Question' : 'Question'} {currentStep}/{totalQuestions}
            </span>
            <span className="text-sm font-medium text-ux-600">
              {Math.round((currentStep / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-surface-200 rounded-full h-2">
            <div
              className="bg-ux-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Intro */}
      {isIntro && (
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ux-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
            <ChartBarIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-surface-900 mb-3">
            {locale === 'fr' ? 'Diagnostic UX de votre projet' : 'UX Diagnostic for your project'}
          </h2>
          <p className="text-surface-600 mb-8">
            {locale === 'fr'
              ? 'Répondez à 10 questions pour obtenir une recommandation personnalisée sur l\'accompagnement UX adapté à votre projet.'
              : 'Answer 10 questions to get a personalized recommendation on the UX support suited to your project.'}
          </p>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-surface-700 mb-2 text-left">
              {locale === 'fr' ? 'Nom de votre projet' : 'Your project name'}
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={locale === 'fr' ? 'Ex: Refonte portail client' : 'Ex: Customer portal redesign'}
              className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-ux-500 focus:border-ux-500 text-surface-900"
            />
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-surface-500 mb-8">
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {locale === 'fr' ? '5 minutes' : '5 minutes'}
            </span>
            <span>•</span>
            <span>{locale === 'fr' ? '10 questions' : '10 questions'}</span>
            <span>•</span>
            <span>{locale === 'fr' ? 'Résultat immédiat' : 'Instant result'}</span>
          </div>

          <Button
            onClick={() => setCurrentStep(1)}
            disabled={!canProceed()}
            rightIcon={<ArrowRightIcon className="h-5 w-5" />}
            className="px-8"
          >
            {locale === 'fr' ? 'Commencer le diagnostic' : 'Start diagnostic'}
          </Button>
        </Card>
      )}

      {/* Questions */}
      {!isIntro && !isResults && currentQuestion && (
        <Card className="max-w-2xl mx-auto p-8">
          <Badge className="bg-ux-100 text-ux-700 mb-4">
            {currentQuestion.category[locale]}
          </Badge>
          <h2 className="text-xl font-display font-bold text-surface-900 mb-6">
            {currentQuestion.question[locale]}
          </h2>

          {currentQuestion.multiple && (
            <p className="text-sm text-surface-500 mb-4">
              {locale === 'fr' ? '(Plusieurs réponses possibles)' : '(Multiple answers possible)'}
            </p>
          )}

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentQuestion.multiple
                ? ((answers[currentQuestion.id] as number[]) || []).includes(index)
                : answers[currentQuestion.id] === index

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion.id, index, currentQuestion.multiple)}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    isSelected
                      ? 'border-ux-600 bg-ux-50'
                      : 'border-surface-200 hover:border-surface-300 bg-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      isSelected ? 'border-ux-600 bg-ux-600' : 'border-surface-300'
                    )}>
                      {isSelected && <CheckCircleIcon className="h-4 w-4 text-white" />}
                    </div>
                    <span className={cn(
                      'text-sm',
                      isSelected ? 'text-ux-700 font-medium' : 'text-surface-700'
                    )}>
                      {option.label[locale]}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
              leftIcon={<ArrowLeftIcon className="h-5 w-5" />}
            >
              {locale === 'fr' ? 'Précédent' : 'Previous'}
            </Button>
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              rightIcon={<ArrowRightIcon className="h-5 w-5" />}
            >
              {currentStep === totalQuestions
                ? (locale === 'fr' ? 'Voir les résultats' : 'See results')
                : (locale === 'fr' ? 'Suivant' : 'Next')}
            </Button>
          </div>
        </Card>
      )}

      {/* Results */}
      {isResults && recommendation && (
        <div ref={resultRef} className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => setCurrentStep(totalQuestions)}
            className="flex items-center gap-2 text-surface-500 hover:text-surface-700 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              {locale === 'fr' ? 'Retour aux questions' : 'Back to questions'}
            </span>
          </button>

          {/* Score Card */}
          <Card className={cn(
            'p-8 text-center mb-8',
            recommendation.color === 'green' && 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
            recommendation.color === 'amber' && 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
            recommendation.color === 'red' && 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200',
          )}>
            <div className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
              recommendation.color === 'green' && 'bg-green-600',
              recommendation.color === 'amber' && 'bg-amber-600',
              recommendation.color === 'red' && 'bg-red-600',
            )}>
              <recommendation.icon className="h-8 w-8 text-white" />
            </div>
            
            <p className="text-sm text-surface-500 mb-2">{projectName}</p>
            <h2 className="text-3xl font-display font-bold text-surface-900 mb-2">
              {recommendation.title[locale]}
            </h2>
            <p className={cn(
              'text-lg font-medium mb-4',
              recommendation.color === 'green' && 'text-green-700',
              recommendation.color === 'amber' && 'text-amber-700',
              recommendation.color === 'red' && 'text-red-700',
            )}>
              {recommendation.subtitle[locale]}
            </p>
            <p className="text-surface-600 max-w-xl mx-auto">
              {recommendation.description[locale]}
            </p>

            <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-surface-200">
              <div className="text-center">
                <p className="text-sm text-surface-500">{locale === 'fr' ? 'Score' : 'Score'}</p>
                <p className="text-2xl font-bold text-surface-900">{score} pts</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-surface-500">{locale === 'fr' ? 'Durée estimée' : 'Estimated duration'}</p>
                <p className="text-2xl font-bold text-surface-900">{recommendation.duration[locale]}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-surface-500">{locale === 'fr' ? 'Budget' : 'Budget'}</p>
                <p className="text-2xl font-bold text-surface-900">{recommendation.budget}</p>
              </div>
            </div>
          </Card>

          {/* Actions recommandées */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-surface-900 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-ux-600" />
                {locale === 'fr' ? 'Actions recommandées' : 'Recommended actions'}
              </h3>
              <button
                onClick={() => {
                  const text = recommendation.actions[locale].map((action, i) => `${i + 1}. ${action}`).join('\n')
                  navigator.clipboard.writeText(text)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
                  copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                )}
              >
                {copied ? (
                  <>
                    <ClipboardDocumentCheckIcon className="h-4 w-4" />
                    {locale === 'fr' ? 'Copié !' : 'Copied!'}
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="h-4 w-4" />
                    {locale === 'fr' ? 'Copier' : 'Copy'}
                  </>
                )}
              </button>
            </div>
            <div className="space-y-3">
              {recommendation.actions[locale].map((action, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-ux-100 text-ux-600 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <span className="text-surface-700">{action}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownloadPDF}
              leftIcon={<DocumentArrowDownIcon className="h-5 w-5" />}
              className="flex-1"
            >
              {locale === 'fr' ? 'Télécharger le diagnostic (PDF)' : 'Download diagnostic (PDF)'}
            </Button>
            <Link href="/contact" className="flex-1">
              <Button variant="secondary" className="w-full">
                {locale === 'fr' ? 'Demander un accompagnement' : 'Request support'}
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 pt-6 border-t border-surface-200">
            <Link href="/guide">
              <Button variant="secondary" leftIcon={<HomeIcon className="h-5 w-5" />}>
                {locale === 'fr' ? 'Retour au guide' : 'Back to guide'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

