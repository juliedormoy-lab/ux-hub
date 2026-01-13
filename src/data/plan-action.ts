import { Locale } from '@/lib/i18n'

export interface PlanTask {
  id: string
  title: { [key in Locale]: string }
  duration: { [key in Locale]: string }
  description: { [key in Locale]: string }
  checklist: { [key in Locale]: string }[]
  outputs: { [key in Locale]: string }[]
  tips: { [key in Locale]: string }
  methodologies: {
    name: { [key in Locale]: string }
    slug: string
    description: { [key in Locale]: string }
  }[]
}

// Données de la phase Planification
export const planificationTasks: PlanTask[] = [
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
export const explorationTasks: PlanTask[] = [
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
    ],
  },
]

