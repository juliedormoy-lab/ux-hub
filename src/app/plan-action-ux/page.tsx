'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge, Button } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { useState } from 'react'
import Link from 'next/link'
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  PresentationChartLineIcon,
  FolderIcon,
  LightBulbIcon,
  MapIcon,
  PaintBrushIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  CheckIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

// Données de la phase Planification
const planificationTasks = [
  {
    id: 'kick-off',
    title: { fr: 'Kick-off projet', en: 'Project Kick-off' },
    duration: { fr: '2-4h', en: '2-4h' },
    description: {
      fr: 'Réunion de lancement avec l\'équipe projet pour comprendre le contexte, les objectifs et les contraintes.',
      en: 'Launch meeting with project team to understand context, objectives and constraints.',
    },
    checklist: [
      { fr: 'Comprendre les objectifs business', en: 'Understand business objectives' },
      { fr: 'Identifier les parties prenantes', en: 'Identify stakeholders' },
      { fr: 'Identifier les utilisateurs cibles (profils, rôles, volumétrie)', en: 'Identify target users (profiles, roles, volume)' },
      { fr: 'Définir le périmètre UX', en: 'Define UX scope' },
      { fr: 'Clarifier les contraintes (temps, budget, technique)', en: 'Clarify constraints (time, budget, technical)' },
      { fr: 'Obtenir l\'accès aux ressources existantes', en: 'Get access to existing resources' },
      { fr: 'Obtenir les contacts des utilisateurs potentiels', en: 'Get contacts of potential users' },
    ],
    outputs: [
      { fr: 'Brief UX projet', en: 'UX Project Brief' },
      { fr: 'Liste des contacts clés', en: 'Key contacts list' },
      { fr: 'Liste des utilisateurs cibles', en: 'Target users list' },
    ],
    tips: {
      fr: 'Prenez des notes détaillées et envoyez un compte-rendu à tous les participants.',
      en: 'Take detailed notes and send a summary to all participants.',
    },
    methodologies: [
      { name: { fr: 'Stakeholder Mapping', en: 'Stakeholder Mapping' }, slug: 'stakeholder-mapping', description: { fr: 'Cartographier les parties prenantes et leurs influences', en: 'Map stakeholders and their influences' } },
      { name: { fr: 'Proto-Personas', en: 'Proto-Personas' }, slug: 'proto-personas', description: { fr: 'Hypothèses initiales sur les utilisateurs', en: 'Initial hypotheses about users' } },
    ],
  },
  {
    id: 'audit-existant',
    title: { fr: 'Audit de l\'existant', en: 'Existing Audit' },
    duration: { fr: '1-2 jours', en: '1-2 days' },
    description: {
      fr: 'Analyser les documents, maquettes, analytics et retours utilisateurs existants.',
      en: 'Analyze existing documents, mockups, analytics and user feedback.',
    },
    checklist: [
      { fr: 'Collecter les specs fonctionnelles', en: 'Collect functional specs' },
      { fr: 'Analyser les maquettes/wireframes existants', en: 'Analyze existing mockups/wireframes' },
      { fr: 'Étudier les analytics (si disponibles)', en: 'Study analytics (if available)' },
      { fr: 'Lire les tickets support / retours utilisateurs', en: 'Read support tickets / user feedback' },
      { fr: 'Identifier les pain points connus', en: 'Identify known pain points' },
    ],
    outputs: [
      { fr: 'Synthèse de l\'audit', en: 'Audit Summary' },
      { fr: 'Liste des irritants identifiés', en: 'List of identified irritants' },
    ],
    tips: {
      fr: 'Créez une matrice des forces/faiblesses pour synthétiser vos observations.',
      en: 'Create a strengths/weaknesses matrix to synthesize your observations.',
    },
    methodologies: [
      { name: { fr: 'Audit heuristique', en: 'Heuristic Audit' }, slug: 'audit-heuristique', description: { fr: 'Évaluation basée sur les 10 heuristiques de Nielsen', en: 'Evaluation based on Nielsen\'s 10 heuristics' } },
      { name: { fr: 'Audit d\'accessibilité', en: 'Accessibility Audit' }, slug: 'audit-accessibilite', description: { fr: 'Vérification WCAG et conformité', en: 'WCAG verification and compliance' } },
      { name: { fr: 'Analyse des analytics', en: 'Analytics Analysis' }, slug: 'analytics', description: { fr: 'Étude des données quantitatives existantes', en: 'Study of existing quantitative data' } },
    ],
  },
  {
    id: 'benchmark',
    title: { fr: 'Benchmark concurrentiel', en: 'Competitive Benchmark' },
    duration: { fr: '2-3 jours', en: '2-3 days' },
    description: {
      fr: 'Analyser les solutions concurrentes et les bonnes pratiques du marché pour identifier les standards et opportunités de différenciation.',
      en: 'Analyze competing solutions and market best practices to identify standards and differentiation opportunities.',
    },
    checklist: [
      { fr: 'Identifier les concurrents directs et indirects', en: 'Identify direct and indirect competitors' },
      { fr: 'Définir les critères d\'évaluation (fonctionnalités, UX, parcours)', en: 'Define evaluation criteria (features, UX, journeys)' },
      { fr: 'Créer une grille de benchmark', en: 'Create a benchmark grid' },
      { fr: 'Analyser chaque concurrent (3-5 min)', en: 'Analyze each competitor (3-5 min)' },
      { fr: 'Capturer des screenshots annotés', en: 'Capture annotated screenshots' },
      { fr: 'Identifier les bonnes pratiques à reprendre', en: 'Identify best practices to adopt' },
      { fr: 'Repérer les opportunités de différenciation', en: 'Spot differentiation opportunities' },
      { fr: 'Synthétiser les forces/faiblesses par concurrent', en: 'Synthesize strengths/weaknesses per competitor' },
    ],
    outputs: [
      { fr: 'Grille de benchmark comparative', en: 'Comparative Benchmark Grid' },
      { fr: 'Rapport d\'analyse concurrentielle', en: 'Competitive Analysis Report' },
      { fr: 'Liste des best practices', en: 'Best Practices List' },
      { fr: 'Recommandations de différenciation', en: 'Differentiation Recommendations' },
    ],
    tips: {
      fr: 'Utilisez le template de grille benchmark disponible dans Veille UX. Limitez-vous à 5-8 concurrents maximum.',
      en: 'Use the benchmark grid template available in UX Watch. Limit yourself to 5-8 competitors maximum.',
    },
    methodologies: [
      { name: { fr: 'Benchmark UX', en: 'UX Benchmark' }, slug: 'benchmark', description: { fr: 'Analyse comparative des interfaces concurrentes', en: 'Comparative analysis of competing interfaces' } },
      { name: { fr: 'Analyse SWOT', en: 'SWOT Analysis' }, slug: 'swot', description: { fr: 'Forces, Faiblesses, Opportunités, Menaces', en: 'Strengths, Weaknesses, Opportunities, Threats' } },
    ],
  },
  {
    id: 'planning-research',
    title: { fr: 'Planification de la recherche', en: 'Research Planning' },
    duration: { fr: '1-2 jours', en: '1-2 days' },
    description: {
      fr: 'Définir la stratégie de recherche utilisateur : méthodes, cibles, planning.',
      en: 'Define user research strategy: methods, targets, planning.',
    },
    checklist: [
      { fr: 'Choisir les méthodes de recherche adaptées', en: 'Choose appropriate research methods' },
      { fr: 'Définir les profils utilisateurs à recruter', en: 'Define user profiles to recruit' },
      { fr: 'Estimer le nombre de participants', en: 'Estimate number of participants' },
      { fr: 'Planifier les créneaux d\'entretiens', en: 'Plan interview slots' },
      { fr: 'Préparer le guide d\'entretien', en: 'Prepare interview guide' },
      { fr: 'Définir les critères de recrutement', en: 'Define recruitment criteria' },
    ],
    outputs: [
      { fr: 'Plan de recherche', en: 'Research Plan' },
      { fr: 'Guide d\'entretien', en: 'Interview Guide' },
      { fr: 'Screener de recrutement', en: 'Recruitment Screener' },
    ],
    tips: {
      fr: '5-8 utilisateurs suffisent pour identifier 85% des problèmes d\'utilisabilité.',
      en: '5-8 users are enough to identify 85% of usability issues.',
    },
    methodologies: [
      { name: { fr: 'Research Plan', en: 'Research Plan' }, slug: 'research-plan', description: { fr: 'Document cadrant la recherche utilisateur', en: 'Document framing user research' } },
      { name: { fr: 'Screener', en: 'Screener' }, slug: 'screener', description: { fr: 'Questionnaire de qualification des participants', en: 'Participant qualification questionnaire' } },
    ],
  },
  {
    id: 'recrutement',
    title: { fr: 'Recrutement des participants', en: 'Participant Recruitment' },
    duration: { fr: '1-2 semaines', en: '1-2 weeks' },
    description: {
      fr: 'Recruter les utilisateurs pour les entretiens/tests selon les critères définis.',
      en: 'Recruit users for interviews/tests according to defined criteria.',
    },
    checklist: [
      { fr: 'Contacter le métier pour accès aux utilisateurs', en: 'Contact business for user access' },
      { fr: 'Envoyer le screener de qualification', en: 'Send qualification screener' },
      { fr: 'Valider les profils sélectionnés', en: 'Validate selected profiles' },
      { fr: 'Planifier les RDV et envoyer les invitations', en: 'Schedule appointments and send invitations' },
      { fr: 'Préparer la logistique (salle, visio, enregistrement)', en: 'Prepare logistics (room, video, recording)' },
      { fr: 'Prévoir des participants de secours', en: 'Plan backup participants' },
    ],
    outputs: [
      { fr: 'Liste des participants confirmés', en: 'List of confirmed participants' },
      { fr: 'Planning des sessions', en: 'Session schedule' },
    ],
    tips: {
      fr: 'Prévoyez toujours 2-3 participants supplémentaires en cas de no-show.',
      en: 'Always plan 2-3 extra participants in case of no-shows.',
    },
    methodologies: [
      { name: { fr: 'Screener de recrutement', en: 'Recruitment Screener' }, slug: 'screener', description: { fr: 'Filtrer les bons profils utilisateurs', en: 'Filter the right user profiles' } },
      { name: { fr: 'Panel utilisateurs', en: 'User Panel' }, slug: 'panel', description: { fr: 'Base de données de participants potentiels', en: 'Database of potential participants' } },
    ],
  },
]

// Données de la phase Exploration
const explorationTasks = [
  {
    id: 'entretiens',
    title: { fr: 'Entretiens utilisateurs', en: 'User Interviews' },
    duration: { fr: '1-2h/user', en: '1-2h/user' },
    description: {
      fr: 'Conduire les entretiens pour comprendre les besoins, comportements et frustrations.',
      en: 'Conduct interviews to understand needs, behaviors and frustrations.',
    },
    checklist: [
      { fr: 'Accueillir et mettre à l\'aise le participant', en: 'Welcome and make participant comfortable' },
      { fr: 'Expliquer le contexte et obtenir le consentement', en: 'Explain context and get consent' },
      { fr: 'Poser des questions ouvertes', en: 'Ask open-ended questions' },
      { fr: 'Creuser les "pourquoi"', en: 'Dig into the "whys"' },
      { fr: 'Prendre des notes / enregistrer', en: 'Take notes / record' },
      { fr: 'Observer les réactions non-verbales', en: 'Observe non-verbal reactions' },
      { fr: 'Remercier et expliquer la suite', en: 'Thank and explain next steps' },
    ],
    outputs: [
      { fr: 'Notes d\'entretien', en: 'Interview Notes' },
      { fr: 'Enregistrements (si autorisés)', en: 'Recordings (if authorized)' },
      { fr: 'Verbatims clés', en: 'Key verbatims' },
    ],
    tips: {
      fr: 'Écoutez 80% du temps, parlez 20%. Évitez les questions orientées.',
      en: 'Listen 80% of the time, talk 20%. Avoid leading questions.',
    },
    methodologies: [
      { name: { fr: 'Entretien semi-directif', en: 'Semi-structured Interview' }, slug: 'entretien-utilisateur', description: { fr: 'Questions ouvertes avec guide flexible', en: 'Open questions with flexible guide' } },
      { name: { fr: 'Entretien contextuel', en: 'Contextual Inquiry' }, slug: 'contextual-inquiry', description: { fr: 'Entretien dans l\'environnement de travail', en: 'Interview in work environment' } },
      { name: { fr: 'Focus Group', en: 'Focus Group' }, slug: 'focus-group', description: { fr: 'Entretien collectif avec 6-8 participants', en: 'Group interview with 6-8 participants' } },
    ],
  },
  {
    id: 'observation',
    title: { fr: 'Observation terrain', en: 'Field Observation' },
    duration: { fr: '1 jour/session', en: '1 day/session' },
    description: {
      fr: 'Observer les utilisateurs dans leur contexte réel d\'utilisation.',
      en: 'Observe users in their real usage context.',
    },
    checklist: [
      { fr: 'Définir ce qu\'on observe (tâches, environnement)', en: 'Define what to observe (tasks, environment)' },
      { fr: 'Préparer une grille d\'observation', en: 'Prepare observation grid' },
      { fr: 'Observer sans intervenir', en: 'Observe without intervening' },
      { fr: 'Noter les comportements, pas les interprétations', en: 'Note behaviors, not interpretations' },
      { fr: 'Photographier l\'environnement (si autorisé)', en: 'Photograph environment (if authorized)' },
      { fr: 'Débriefer avec l\'utilisateur après', en: 'Debrief with user afterwards' },
    ],
    outputs: [
      { fr: 'Compte-rendu d\'observation', en: 'Observation Report' },
      { fr: 'Photos/vidéos de contexte', en: 'Context photos/videos' },
    ],
    tips: {
      fr: 'Soyez une "mouche sur le mur" - observez sans influencer.',
      en: 'Be a "fly on the wall" - observe without influencing.',
    },
    methodologies: [
      { name: { fr: 'Shadowing', en: 'Shadowing' }, slug: 'shadowing', description: { fr: 'Suivre l\'utilisateur dans ses activités', en: 'Follow user in their activities' } },
      { name: { fr: 'Fly on the wall', en: 'Fly on the Wall' }, slug: 'fly-on-the-wall', description: { fr: 'Observation passive sans interaction', en: 'Passive observation without interaction' } },
      { name: { fr: 'Contextual Inquiry', en: 'Contextual Inquiry' }, slug: 'contextual-inquiry', description: { fr: 'Observation + questions en situation', en: 'Observation + questions in context' } },
    ],
  },
  {
    id: 'synthese',
    title: { fr: 'Synthèse et analyse', en: 'Synthesis and Analysis' },
    duration: { fr: '3-5 jours', en: '3-5 days' },
    description: {
      fr: 'Analyser les données collectées et en extraire les insights clés.',
      en: 'Analyze collected data and extract key insights.',
    },
    checklist: [
      { fr: 'Retranscrire les notes clés', en: 'Transcribe key notes' },
      { fr: 'Identifier les patterns récurrents', en: 'Identify recurring patterns' },
      { fr: 'Catégoriser les besoins et frustrations', en: 'Categorize needs and frustrations' },
      { fr: 'Prioriser les insights par impact', en: 'Prioritize insights by impact' },
      { fr: 'Créer des citations/verbatims marquants', en: 'Create impactful quotes/verbatims' },
      { fr: 'Valider les insights avec l\'équipe', en: 'Validate insights with team' },
    ],
    outputs: [
      { fr: 'Synthèse de recherche', en: 'Research Synthesis' },
      { fr: 'Liste des insights priorisés', en: 'List of prioritized insights' },
    ],
    tips: {
      fr: 'Utilisez des post-its ou un outil comme Miro pour le clustering.',
      en: 'Use post-its or a tool like Miro for clustering.',
    },
    methodologies: [
      { name: { fr: 'Affinity Diagram', en: 'Affinity Diagram' }, slug: 'affinity-diagram', description: { fr: 'Regroupement thématique des observations', en: 'Thematic grouping of observations' } },
      { name: { fr: 'Thematic Analysis', en: 'Thematic Analysis' }, slug: 'thematic-analysis', description: { fr: 'Identification des thèmes récurrents', en: 'Identification of recurring themes' } },
      { name: { fr: 'Jobs-to-be-Done', en: 'Jobs-to-be-Done' }, slug: 'jtbd', description: { fr: 'Comprendre les motivations profondes', en: 'Understand deep motivations' } },
    ],
  },
  {
    id: 'personas',
    title: { fr: 'Création des personas', en: 'Persona Creation' },
    duration: { fr: '2-3 jours', en: '2-3 days' },
    description: {
      fr: 'Créer des personas représentatifs basés sur la recherche.',
      en: 'Create representative personas based on research.',
    },
    checklist: [
      { fr: 'Identifier les archétypes d\'utilisateurs', en: 'Identify user archetypes' },
      { fr: 'Définir les caractéristiques clés (objectifs, frustrations)', en: 'Define key characteristics (goals, frustrations)' },
      { fr: 'Ajouter des éléments de contexte (environnement, outils)', en: 'Add context elements (environment, tools)' },
      { fr: 'Créer une fiche visuelle par persona', en: 'Create a visual card per persona' },
      { fr: 'Valider avec les parties prenantes', en: 'Validate with stakeholders' },
    ],
    outputs: [
      { fr: 'Fiches Personas (2-4 max)', en: 'Persona Cards (2-4 max)' },
    ],
    tips: {
      fr: 'Un bon persona doit tenir sur une page A4 et être mémorable.',
      en: 'A good persona should fit on one A4 page and be memorable.',
    },
    methodologies: [
      { name: { fr: 'Personas', en: 'Personas' }, slug: 'personas', description: { fr: 'Archétypes d\'utilisateurs représentatifs', en: 'Representative user archetypes' } },
      { name: { fr: 'Empathy Map', en: 'Empathy Map' }, slug: 'empathy-map', description: { fr: 'Cartographier pensées, émotions, actions', en: 'Map thoughts, emotions, actions' } },
      { name: { fr: 'User Segmentation', en: 'User Segmentation' }, slug: 'segmentation', description: { fr: 'Grouper les utilisateurs par caractéristiques', en: 'Group users by characteristics' } },
    ],
  },
  {
    id: 'journey-map',
    title: { fr: 'User Journey Map', en: 'User Journey Map' },
    duration: { fr: '2-4 jours', en: '2-4 days' },
    description: {
      fr: 'Cartographier le parcours utilisateur actuel avec les points de friction.',
      en: 'Map the current user journey with friction points.',
    },
    checklist: [
      { fr: 'Définir le scope du parcours (début/fin)', en: 'Define journey scope (start/end)' },
      { fr: 'Identifier les étapes principales', en: 'Identify main steps' },
      { fr: 'Ajouter les actions utilisateur à chaque étape', en: 'Add user actions at each step' },
      { fr: 'Documenter les pensées et émotions', en: 'Document thoughts and emotions' },
      { fr: 'Identifier les pain points', en: 'Identify pain points' },
      { fr: 'Repérer les opportunités d\'amélioration', en: 'Spot improvement opportunities' },
    ],
    outputs: [
      { fr: 'User Journey Map visuel', en: 'Visual User Journey Map' },
      { fr: 'Liste des opportunités', en: 'List of opportunities' },
    ],
    tips: {
      fr: 'Utilisez une échelle émotionnelle (😊 → 😐 → 😢) pour visualiser les moments clés.',
      en: 'Use an emotional scale (😊 → 😐 → 😢) to visualize key moments.',
    },
    methodologies: [
      { name: { fr: 'User Journey Map', en: 'User Journey Map' }, slug: 'user-journey-map', description: { fr: 'Visualisation du parcours utilisateur', en: 'User journey visualization' } },
      { name: { fr: 'Service Blueprint', en: 'Service Blueprint' }, slug: 'service-blueprint', description: { fr: 'Parcours + processus backstage', en: 'Journey + backstage processes' } },
      { name: { fr: 'Experience Map', en: 'Experience Map' }, slug: 'experience-map', description: { fr: 'Vision globale multi-canal', en: 'Global multi-channel view' } },
      { name: { fr: 'Storyboard', en: 'Storyboard' }, slug: 'storyboard', description: { fr: 'Illustration narrative du parcours', en: 'Narrative illustration of journey' } },
    ],
  },
]

// Livrables finaux pour l'équipe projet
const deliverables = [
  {
    id: 'benchmark',
    title: { fr: 'Benchmark concurrentiel', en: 'Competitive Benchmark' },
    description: {
      fr: 'Analyse comparative des solutions concurrentes et des standards du marché.',
      en: 'Comparative analysis of competing solutions and market standards.',
    },
    icon: ChartBarIcon,
    sections: [
      { fr: 'Grille comparative des concurrents', en: 'Competitor comparison grid' },
      { fr: 'Captures d\'écran annotées', en: 'Annotated screenshots' },
      { fr: 'Best practices identifiées', en: 'Identified best practices' },
      { fr: 'Opportunités de différenciation', en: 'Differentiation opportunities' },
      { fr: 'Recommandations', en: 'Recommendations' },
    ],
  },
  {
    id: 'rapport-recherche',
    title: { fr: 'Rapport de recherche', en: 'Research Report' },
    description: {
      fr: 'Document complet synthétisant les findings de la recherche utilisateur.',
      en: 'Complete document synthesizing user research findings.',
    },
    icon: DocumentTextIcon,
    sections: [
      { fr: 'Contexte et objectifs', en: 'Context and objectives' },
      { fr: 'Méthodologie utilisée', en: 'Methodology used' },
      { fr: 'Profil des participants', en: 'Participant profile' },
      { fr: 'Insights clés', en: 'Key insights' },
      { fr: 'Recommandations', en: 'Recommendations' },
    ],
  },
  {
    id: 'personas',
    title: { fr: 'Personas', en: 'Personas' },
    description: {
      fr: 'Fiches représentant les archétypes d\'utilisateurs cibles.',
      en: 'Cards representing target user archetypes.',
    },
    icon: UserGroupIcon,
    sections: [
      { fr: 'Photo et nom fictif', en: 'Photo and fictional name' },
      { fr: 'Caractéristiques démographiques', en: 'Demographics' },
      { fr: 'Objectifs et motivations', en: 'Goals and motivations' },
      { fr: 'Frustrations et pain points', en: 'Frustrations and pain points' },
      { fr: 'Citation représentative', en: 'Representative quote' },
    ],
  },
  {
    id: 'journey-map',
    title: { fr: 'User Journey Map', en: 'User Journey Map' },
    description: {
      fr: 'Cartographie visuelle du parcours utilisateur actuel.',
      en: 'Visual mapping of the current user journey.',
    },
    icon: MapIcon,
    sections: [
      { fr: 'Étapes du parcours', en: 'Journey steps' },
      { fr: 'Actions utilisateur', en: 'User actions' },
      { fr: 'Points de contact (touchpoints)', en: 'Touchpoints' },
      { fr: 'Émotions et pensées', en: 'Emotions and thoughts' },
      { fr: 'Pain points et opportunités', en: 'Pain points and opportunities' },
    ],
  },
  {
    id: 'recommandations',
    title: { fr: 'Plan de recommandations', en: 'Recommendations Plan' },
    description: {
      fr: 'Liste priorisée des actions à mener pour améliorer l\'expérience.',
      en: 'Prioritized list of actions to improve the experience.',
    },
    icon: LightBulbIcon,
    sections: [
      { fr: 'Quick wins (effort faible, impact fort)', en: 'Quick wins (low effort, high impact)' },
      { fr: 'Améliorations majeures', en: 'Major improvements' },
      { fr: 'Évolutions long terme', en: 'Long-term evolutions' },
      { fr: 'Estimation d\'effort par item', en: 'Effort estimation per item' },
    ],
  },
]

export default function PlanActionUXPage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [activePhase, setActivePhase] = useState<'planification' | 'exploration'>('planification')

  const toggleItem = (taskId: string, itemIndex: number) => {
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

  const currentTasks = activePhase === 'planification' ? planificationTasks : explorationTasks

  return (
    <MainLayout
      title={locale === 'fr' ? 'Plan d\'action UX' : 'UX Action Plan'}
      subtitle={locale === 'fr' ? 'Trame de travail pour l\'UX Researcher/Designer' : 'Work framework for UX Researcher/Designer'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'Plan d\'action UX' : 'UX Action Plan' },
      ]}
    >
      {/* Introduction */}
      <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-display font-bold text-surface-900 mb-2">
              {locale === 'fr' ? 'Votre guide de travail' : 'Your work guide'}
            </h2>
            <p className="text-surface-600 text-sm">
              {locale === 'fr'
                ? 'Ce plan d\'action vous accompagne dans les phases de planification et exploration UX. Suivez les étapes, cochez les tâches effectuées et préparez vos livrables pour l\'équipe projet.'
                : 'This action plan guides you through UX planning and exploration phases. Follow the steps, check off completed tasks and prepare your deliverables for the project team.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Phase Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActivePhase('planification')}
          className={cn(
            'flex-1 p-4 rounded-xl border-2 transition-all',
            activePhase === 'planification'
              ? 'border-blue-500 bg-blue-50'
              : 'border-surface-200 hover:border-surface-300'
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              activePhase === 'planification' ? 'bg-blue-500 text-white' : 'bg-surface-100 text-surface-500'
            )}>
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className={cn(
                'font-bold',
                activePhase === 'planification' ? 'text-blue-700' : 'text-surface-700'
              )}>
                {locale === 'fr' ? 'Phase 1 : Planification' : 'Phase 1: Planning'}
              </h3>
              <p className="text-xs text-surface-500">
                {locale === 'fr' ? '5 étapes • ~3-4 semaines' : '5 steps • ~3-4 weeks'}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePhase('exploration')}
          className={cn(
            'flex-1 p-4 rounded-xl border-2 transition-all',
            activePhase === 'exploration'
              ? 'border-purple-500 bg-purple-50'
              : 'border-surface-200 hover:border-surface-300'
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              activePhase === 'exploration' ? 'bg-purple-500 text-white' : 'bg-surface-100 text-surface-500'
            )}>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className={cn(
                'font-bold',
                activePhase === 'exploration' ? 'text-purple-700' : 'text-surface-700'
              )}>
                {locale === 'fr' ? 'Phase 2 : Exploration' : 'Phase 2: Exploration'}
              </h3>
              <p className="text-xs text-surface-500">
                {locale === 'fr' ? '5 étapes • ~4-6 semaines' : '5 steps • ~4-6 weeks'}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Tasks List */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            activePhase === 'planification' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
          )}>
            {activePhase === 'planification' ? <CalendarIcon className="h-5 w-5" /> : <MagnifyingGlassIcon className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-surface-900">
              {activePhase === 'planification' 
                ? (locale === 'fr' ? 'Phase Planification' : 'Planning Phase')
                : (locale === 'fr' ? 'Phase Exploration' : 'Exploration Phase')}
            </h2>
            <p className="text-sm text-surface-500">
              {activePhase === 'planification'
                ? (locale === 'fr' ? 'Préparer le terrain avant la recherche' : 'Prepare the ground before research')
                : (locale === 'fr' ? 'Comprendre les utilisateurs et leurs besoins' : 'Understand users and their needs')}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {currentTasks.map((task, taskIndex) => {
            const progress = getTaskProgress(task.id, task.checklist.length)
            const isComplete = progress.percent === 100
            const phaseColor = activePhase === 'planification' ? 'blue' : 'purple'
            
            return (
              <Card key={task.id} className={cn(
                'border-l-4',
                isComplete 
                  ? 'border-l-green-500 bg-green-50/30' 
                  : activePhase === 'planification' ? 'border-l-blue-300' : 'border-l-purple-300'
              )}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                      isComplete 
                        ? 'bg-green-500 text-white' 
                        : `bg-${phaseColor}-100 text-${phaseColor}-600`
                    )}>
                      {isComplete ? <CheckIcon className="h-4 w-4" /> : taskIndex + 1}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-surface-900">
                        {task.title[locale]}
                      </h3>
                      <p className="text-sm text-surface-500 mt-1">
                        {task.description[locale]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {task.duration[locale]}
                    </Badge>
                    <Badge className={cn(
                      isComplete ? 'bg-green-100 text-green-700' : 'bg-surface-100 text-surface-600'
                    )}>
                      {progress.checked}/{progress.total}
                    </Badge>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-surface-100 rounded-full mb-4 overflow-hidden">
                  <div 
                    className={cn(
                      'h-full transition-all duration-300',
                      isComplete ? 'bg-green-500' : `bg-${phaseColor}-500`
                    )}
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>

                {/* Checklist */}
                <div className="space-y-2 mb-4">
                  {task.checklist.map((item, itemIndex) => {
                    const isChecked = checkedItems[`${task.id}-${itemIndex}`]
                    return (
                      <label
                        key={itemIndex}
                        className={cn(
                          'flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors',
                          isChecked ? 'bg-green-50' : 'hover:bg-surface-50'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked || false}
                          onChange={() => toggleItem(task.id, itemIndex)}
                          className={cn(
                            'h-4 w-4 rounded border-surface-300',
                            `text-${phaseColor}-600 focus:ring-${phaseColor}-500`
                          )}
                        />
                        <span className={cn(
                          'text-sm',
                          isChecked ? 'text-surface-400 line-through' : 'text-surface-700'
                        )}>
                          {item[locale]}
                        </span>
                      </label>
                    )
                  })}
                </div>

                {/* Methodologies */}
                {task.methodologies && task.methodologies.length > 0 && (
                  <div className="pt-4 border-t border-surface-100">
                    <h4 className="text-xs font-medium text-surface-500 uppercase mb-3">
                      {locale === 'fr' ? '🎯 Méthodologies recommandées' : '🎯 Recommended methodologies'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {task.methodologies.map((method, i) => (
                        <Link
                          key={i}
                          href={`/methodes/${method.slug}`}
                          className="group flex items-start gap-2 p-2 rounded-lg bg-ux-50/50 hover:bg-ux-100 border border-ux-100 transition-colors"
                        >
                          <LightBulbIcon className="h-4 w-4 text-ux-500 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-ux-700 group-hover:text-ux-800 truncate">
                              {method.name[locale]}
                            </p>
                            <p className="text-[10px] text-surface-500 line-clamp-1">
                              {method.description[locale]}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outputs & Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-surface-100">
                  <div>
                    <h4 className="text-xs font-medium text-surface-500 uppercase mb-2">
                      {locale === 'fr' ? 'Livrables' : 'Outputs'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {task.outputs.map((output, i) => (
                        <Badge key={i} variant="success" className="text-xs">
                          📄 {output[locale]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-surface-500 uppercase mb-2">
                      {locale === 'fr' ? 'Conseil' : 'Tip'}
                    </h4>
                    <p className="text-xs text-surface-600 italic">
                      💡 {task.tips[locale]}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <FolderIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-surface-900">
              {locale === 'fr' ? 'Livrables pour l\'équipe projet' : 'Deliverables for project team'}
            </h2>
            <p className="text-sm text-surface-500">
              {locale === 'fr' ? 'Documents à produire à l\'issue de la phase d\'exploration' : 'Documents to produce at the end of exploration phase'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((deliverable) => (
            <Card key={deliverable.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <deliverable.icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-surface-900">
                    {deliverable.title[locale]}
                  </h3>
                  <p className="text-sm text-surface-500">
                    {deliverable.description[locale]}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-surface-500 uppercase">
                  {locale === 'fr' ? 'Contenu' : 'Content'}
                </h4>
                <ul className="space-y-1">
                  {deliverable.sections.map((section, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {section[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-display font-bold mb-1">
              {locale === 'fr' ? 'Besoin d\'aide sur votre projet ?' : 'Need help on your project?'}
            </h2>
            <p className="text-white/80">
              {locale === 'fr' 
                ? 'Consultez nos méthodes UX ou contactez-nous pour un accompagnement'
                : 'Check out our UX methods or contact us for support'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/methodes">
              <Button className="bg-white text-indigo-700 hover:bg-white/90">
                {locale === 'fr' ? 'Voir les méthodes' : 'See methods'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </MainLayout>
  )
}

