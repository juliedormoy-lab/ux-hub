export interface GuideStep {
  id: number
  slug: string
  title: { fr: string; en: string }
  subtitle: { fr: string; en: string }
  duration: { fr: string; en: string }
  objective: { fr: string; en: string }
  actions: { fr: string; en: string; responsible?: string; effort?: string }[]
  tips?: { fr: string[]; en: string[] }
  deliverables: { fr: string; en: string }[]
  icon: string
  color: string
}

export const guideSteps: GuideStep[] = [
  {
    id: 1,
    slug: 'cadrage',
    title: {
      fr: 'Impliquer l\'UX dès le cadrage',
      en: 'Involve UX from Project Kickoff',
    },
    subtitle: {
      fr: 'Étape 1',
      en: 'Step 1',
    },
    duration: {
      fr: '2-3 jours',
      en: '2-3 days',
    },
    objective: {
      fr: 'S\'assurer que l\'expérience utilisateur est prise en compte dès les premières réflexions du projet.',
      en: 'Ensure user experience is considered from the very first project discussions.',
    },
    actions: [
      { fr: 'Participer aux ateliers de cadrage', en: 'Participate in scoping workshops', responsible: 'UX + Chef de projet' },
      { fr: 'Identifier les utilisateurs cibles', en: 'Identify target users', responsible: 'UX + Métier' },
      { fr: 'Définir les critères de succès UX', en: 'Define UX success criteria', responsible: 'UX + Product Owner' },
      { fr: 'Estimer l\'effort UX dans le planning', en: 'Estimate UX effort in planning', responsible: 'UX + Chef de projet' },
    ],
    tips: {
      fr: [
        'NPS (Net Promoter Score) – Recommandation utilisateur',
        'SUS (System Usability Scale) – Score d\'utilisabilité',
        'Taux de complétion – % de tâches terminées avec succès',
        'Temps de tâche – Durée moyenne pour accomplir une action',
        'Taux d\'erreur – Fréquence des erreurs utilisateur',
      ],
      en: [
        'NPS (Net Promoter Score) – User recommendation',
        'SUS (System Usability Scale) – Usability score',
        'Completion rate – % of tasks completed successfully',
        'Task time – Average duration to complete an action',
        'Error rate – Frequency of user errors',
      ],
    },
    deliverables: [
      { fr: 'Fiche UX projet', en: 'UX Project Brief' },
    ],
    icon: 'RocketLaunchIcon',
    color: 'blue',
  },
  {
    id: 2,
    slug: 'decouverte',
    title: {
      fr: 'Découvrir les besoins utilisateurs',
      en: 'Discover User Needs',
    },
    subtitle: {
      fr: 'Étape 2',
      en: 'Step 2',
    },
    duration: {
      fr: '5-7 jours',
      en: '5-7 days',
    },
    objective: {
      fr: 'Comprendre les vrais besoins, comportements et frustrations des utilisateurs avant de concevoir.',
      en: 'Understand real user needs, behaviors, and frustrations before designing.',
    },
    actions: [
      { fr: 'Mener 5-8 entretiens utilisateurs', en: 'Conduct 5-8 user interviews', effort: '2-3 jours' },
      { fr: 'Réaliser un benchmark concurrentiel', en: 'Conduct competitive benchmark', effort: '1-2 jours' },
      { fr: 'Analyser les données existantes (tickets, analytics)', en: 'Analyze existing data (tickets, analytics)', effort: '1 jour' },
      { fr: 'Observer les utilisateurs en situation réelle', en: 'Observe users in real context', effort: '1-2 jours' },
      { fr: 'Créer des personas', en: 'Create personas', effort: '1 jour' },
    ],
    tips: {
      fr: [
        'Préparer un guide d\'entretien – 10-15 questions ouvertes maximum',
        'Écouter plus que parler – Ratio 80% écoute / 20% questions',
        'Éviter les questions orientées – "Que pensez-vous de..." plutôt que "N\'est-ce pas que..."',
        'Creuser les "pourquoi" – 5 pourquoi pour atteindre la cause racine',
        'Enregistrer (avec accord) – Pour analyse ultérieure',
        'Benchmark – Analyser 3-5 concurrents directs et indirects',
      ],
      en: [
        'Prepare an interview guide – 10-15 open questions maximum',
        'Listen more than talk – 80% listening / 20% questions ratio',
        'Avoid leading questions – "What do you think of..." rather than "Don\'t you think..."',
        'Dig into the "whys" – 5 whys to reach the root cause',
        'Record (with consent) – For later analysis',
        'Benchmark – Analyze 3-5 direct and indirect competitors',
      ],
    },
    deliverables: [
      { fr: 'Personas', en: 'Personas' },
      { fr: 'Rapport de benchmark', en: 'Benchmark Report' },
      { fr: 'Carte des irritants', en: 'Pain Points Map' },
    ],
    icon: 'MagnifyingGlassIcon',
    color: 'purple',
  },
  {
    id: 3,
    slug: 'cartographie',
    title: {
      fr: 'Cartographier l\'expérience',
      en: 'Map the Experience',
    },
    subtitle: {
      fr: 'Étape 3',
      en: 'Step 3',
    },
    duration: {
      fr: '2-3 jours',
      en: '2-3 days',
    },
    objective: {
      fr: 'Visualiser le parcours utilisateur actuel pour identifier les points de friction et opportunités d\'amélioration.',
      en: 'Visualize the current user journey to identify friction points and improvement opportunities.',
    },
    actions: [
      { fr: 'Dessiner le parcours utilisateur (as-is)', en: 'Map the user journey (as-is)', effort: '1 jour' },
      { fr: 'Identifier les moments clés (touchpoints)', en: 'Identify key moments (touchpoints)', effort: '0.5 jour' },
      { fr: 'Évaluer les émotions à chaque étape', en: 'Assess emotions at each step', effort: '0.5 jour' },
      { fr: 'Prioriser les quick wins', en: 'Prioritize quick wins', effort: '0.5 jour' },
    ],
    tips: {
      fr: [
        'Étapes – Phases principales du parcours',
        'Actions – Ce que fait l\'utilisateur',
        'Pensées – Ce que pense l\'utilisateur',
        'Émotions – Ressenti (positif/neutre/négatif)',
        'Pain points – Points de friction identifiés',
        'Opportunités – Améliorations possibles',
      ],
      en: [
        'Steps – Main journey phases',
        'Actions – What the user does',
        'Thoughts – What the user thinks',
        'Emotions – Feelings (positive/neutral/negative)',
        'Pain points – Identified friction points',
        'Opportunities – Possible improvements',
      ],
    },
    deliverables: [
      { fr: 'User Journey Map', en: 'User Journey Map' },
    ],
    icon: 'MapIcon',
    color: 'green',
  },
  {
    id: 4,
    slug: 'conception',
    title: {
      fr: 'Concevoir des solutions',
      en: 'Design Solutions',
    },
    subtitle: {
      fr: 'Étape 4',
      en: 'Step 4',
    },
    duration: {
      fr: '5-10 jours',
      en: '5-10 days',
    },
    objective: {
      fr: 'Créer des solutions concrètes répondant aux besoins identifiés, en impliquant les parties prenantes.',
      en: 'Create concrete solutions addressing identified needs, involving stakeholders.',
    },
    actions: [
      { fr: 'Organiser des ateliers de co-conception', en: 'Organize co-design workshops', effort: '1-2 jours' },
      { fr: 'Créer des wireframes basse fidélité', en: 'Create low-fidelity wireframes', effort: '2-3 jours' },
      { fr: 'Définir l\'architecture d\'information', en: 'Define information architecture', effort: '1 jour' },
      { fr: 'Prototyper les écrans clés', en: 'Prototype key screens', effort: '2-5 jours' },
    ],
    tips: {
      fr: [
        'Sketch papier – Croquis rapides à la main (exploration initiale)',
        'Wireframe – Maquette en niveaux de gris, focus structure',
        'Mockup – Design visuel complet avec couleurs et typographie',
        'Prototype – Version interactive cliquable pour tests',
      ],
      en: [
        'Paper sketch – Quick hand drawings (initial exploration)',
        'Wireframe – Grayscale mockup, structure focus',
        'Mockup – Complete visual design with colors and typography',
        'Prototype – Clickable interactive version for testing',
      ],
    },
    deliverables: [
      { fr: 'Wireframes', en: 'Wireframes' },
      { fr: 'Prototype cliquable', en: 'Clickable Prototype' },
    ],
    icon: 'PaintBrushIcon',
    color: 'orange',
  },
  {
    id: 5,
    slug: 'validation',
    title: {
      fr: 'Valider avec les utilisateurs',
      en: 'Validate with Users',
    },
    subtitle: {
      fr: 'Étape 5',
      en: 'Step 5',
    },
    duration: {
      fr: '5-8 jours',
      en: '5-8 days',
    },
    objective: {
      fr: 'Tester les solutions avec de vrais utilisateurs pour identifier et corriger les problèmes avant le développement.',
      en: 'Test solutions with real users to identify and fix issues before development.',
    },
    actions: [
      { fr: 'Recruter 5 utilisateurs représentatifs', en: 'Recruit 5 representative users', effort: '2-3 jours' },
      { fr: 'Préparer les scénarios de test', en: 'Prepare test scenarios', effort: '0.5 jour' },
      { fr: 'Conduire les sessions de test (45-60 min/user)', en: 'Conduct test sessions (45-60 min/user)', effort: '1-2 jours' },
      { fr: 'Analyser et prioriser les problèmes', en: 'Analyze and prioritize issues', effort: '1 jour' },
      { fr: 'Itérer sur le design', en: 'Iterate on the design', effort: '2-3 jours' },
    ],
    tips: {
      fr: [
        'Règle des 5 utilisateurs – 5 testeurs détectent ~85% des problèmes d\'utilisabilité',
        'Accueil (5 min) – Présentation, mise à l\'aise, contexte',
        'Questions de profil (5 min) – Comprendre le contexte de l\'utilisateur',
        'Scénarios de test (30-40 min) – Tâches à accomplir en pensant à voix haute',
        'Questionnaire post-test (5 min) – SUS ou questions de satisfaction',
        'Debriefing (5 min) – Impressions générales, remerciements',
      ],
      en: [
        '5-User Rule – 5 testers detect ~85% of usability issues',
        'Welcome (5 min) – Introduction, make comfortable, context',
        'Profile questions (5 min) – Understand user context',
        'Test scenarios (30-40 min) – Tasks to complete while thinking aloud',
        'Post-test questionnaire (5 min) – SUS or satisfaction questions',
        'Debriefing (5 min) – General impressions, thanks',
      ],
    },
    deliverables: [
      { fr: 'Rapport de tests utilisateurs', en: 'User Testing Report' },
    ],
    icon: 'UserGroupIcon',
    color: 'pink',
  },
  {
    id: 6,
    slug: 'developpement',
    title: {
      fr: 'Accompagner le développement',
      en: 'Support Development',
    },
    subtitle: {
      fr: 'Étape 6',
      en: 'Step 6',
    },
    duration: {
      fr: 'Continu',
      en: 'Ongoing',
    },
    objective: {
      fr: 'Garantir que la vision UX est correctement implémentée et mesurer les résultats après lancement.',
      en: 'Ensure the UX vision is correctly implemented and measure results after launch.',
    },
    actions: [
      { fr: 'Fournir des spécifications UI détaillées', en: 'Provide detailed UI specifications', effort: 'Avant chaque sprint' },
      { fr: 'Participer aux sprint reviews', en: 'Participate in sprint reviews', effort: 'Chaque sprint' },
      { fr: 'Répondre aux questions des développeurs', en: 'Answer developer questions', effort: 'Continu' },
      { fr: 'Valider la conformité UX des livrables', en: 'Validate UX compliance of deliverables', effort: 'Chaque release' },
      { fr: 'Mettre en place le suivi des KPIs UX', en: 'Set up UX KPI tracking', effort: 'Avant lancement' },
      { fr: 'Analyser les métriques post-lancement', en: 'Analyze post-launch metrics', effort: 'Mensuel' },
    ],
    tips: {
      fr: [
        'Maquettes annotées – Dimensions, espacements, comportements',
        'États des composants – Default, hover, focus, disabled, error',
        'Textes et microcopy – Labels, messages d\'erreur, placeholders',
        'Responsive – Adaptations tablette et mobile',
        'Accessibilité – Contrastes, alternatives textuelles, navigation clavier',
      ],
      en: [
        'Annotated mockups – Dimensions, spacing, behaviors',
        'Component states – Default, hover, focus, disabled, error',
        'Text and microcopy – Labels, error messages, placeholders',
        'Responsive – Tablet and mobile adaptations',
        'Accessibility – Contrasts, text alternatives, keyboard navigation',
      ],
    },
    deliverables: [
      { fr: 'Spécifications UI', en: 'UI Specifications' },
      { fr: 'Design System', en: 'Design System' },
      { fr: 'Dashboard KPIs', en: 'KPIs Dashboard' },
    ],
    icon: 'CodeBracketIcon',
    color: 'cyan',
  },
]

export const prerequisites = [
  {
    id: 1,
    title: { fr: 'Périmètre défini', en: 'Defined scope' },
    description: {
      fr: 'Le périmètre fonctionnel du projet doit être clairement identifié (features, écrans concernés).',
      en: 'The functional scope of the project must be clearly identified (features, screens involved).',
    },
    icon: 'DocumentTextIcon',
    required: true,
  },
  {
    id: 2,
    title: { fr: 'Utilisateurs cibles identifiés', en: 'Target users identified' },
    description: {
      fr: 'Qui sont les utilisateurs finaux ? Quels sont leurs profils, rôles et contextes d\'utilisation ?',
      en: 'Who are the end users? What are their profiles, roles and usage contexts?',
    },
    icon: 'UserGroupIcon',
    required: true,
  },
  {
    id: 3,
    title: { fr: 'Accès aux utilisateurs', en: 'Access to users' },
    description: {
      fr: 'Possibilité de contacter et interviewer des utilisateurs réels (5-8 personnes minimum).',
      en: 'Ability to contact and interview real users (5-8 people minimum).',
    },
    icon: 'PhoneIcon',
    required: true,
  },
  {
    id: 4,
    title: { fr: 'Sponsor projet identifié', en: 'Project sponsor identified' },
    description: {
      fr: 'Un décideur capable de valider les orientations UX et débloquer les ressources nécessaires.',
      en: 'A decision-maker able to validate UX directions and unlock necessary resources.',
    },
    icon: 'UserCircleIcon',
    required: true,
  },
  {
    id: 5,
    title: { fr: 'Planning avec temps UX', en: 'Planning with UX time' },
    description: {
      fr: 'Le planning projet doit prévoir du temps pour les phases UX (4-6 semaines recommandées).',
      en: 'The project planning must include time for UX phases (4-6 weeks recommended).',
    },
    icon: 'CalendarIcon',
    required: true,
  },
  {
    id: 6,
    title: { fr: 'Documentation existante', en: 'Existing documentation' },
    description: {
      fr: 'Specs fonctionnelles, maquettes existantes, analytics, retours utilisateurs, tickets support.',
      en: 'Functional specs, existing mockups, analytics, user feedback, support tickets.',
    },
    icon: 'FolderIcon',
    required: false,
  },
  {
    id: 7,
    title: { fr: 'Accès à l\'existant', en: 'Access to existing system' },
    description: {
      fr: 'Si refonte : accès à l\'application existante pour audit et observation.',
      en: 'If redesign: access to existing application for audit and observation.',
    },
    icon: 'ComputerDesktopIcon',
    required: false,
  },
  {
    id: 8,
    title: { fr: 'Contraintes techniques connues', en: 'Known technical constraints' },
    description: {
      fr: 'Limitations techniques, design system existant, technologies imposées.',
      en: 'Technical limitations, existing design system, imposed technologies.',
    },
    icon: 'CogIcon',
    required: false,
  },
]

export const benefits = [
  {
    fr: { title: 'Réduction des coûts', description: 'Corriger un problème en conception coûte 10x moins qu\'en production' },
    en: { title: 'Cost reduction', description: 'Fixing an issue in design costs 10x less than in production' },
    icon: 'CurrencyDollarIcon',
  },
  {
    fr: { title: 'Adoption utilisateur', description: 'Les utilisateurs adoptent plus facilement un outil intuitif' },
    en: { title: 'User adoption', description: 'Users adopt intuitive tools more readily' },
    icon: 'UserPlusIcon',
  },
  {
    fr: { title: 'Productivité', description: 'Moins de temps perdu, moins d\'erreurs de saisie' },
    en: { title: 'Productivity', description: 'Less wasted time, fewer input errors' },
    icon: 'BoltIcon',
  },
  {
    fr: { title: 'Support réduit', description: 'Moins de tickets et demandes d\'assistance' },
    en: { title: 'Reduced support', description: 'Fewer tickets and support requests' },
    icon: 'LifebuoyIcon',
  },
  {
    fr: { title: 'Satisfaction', description: 'Amélioration du NPS et de l\'engagement' },
    en: { title: 'Satisfaction', description: 'Improved NPS and engagement' },
    icon: 'FaceSmileIcon',
  },
]

