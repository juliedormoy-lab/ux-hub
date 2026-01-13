export type Phase = 'discovery' | 'design' | 'evaluation'
export type EffortLevel = 'low' | 'medium' | 'high'

export interface UXMethod {
  id: string
  slug: string
  name: { fr: string; en: string }
  description: { fr: string; en: string }
  phase: Phase
  effort: EffortLevel
  impact: EffortLevel
  whenToUse: { fr: string; en: string }
  deliverables: { fr: string[]; en: string[] }
  tips: { fr: string[]; en: string[] }
  icon: string
  templateUrl?: string
  templateName?: { fr: string; en: string }
}

export const uxMethods: UXMethod[] = [
  {
    id: '1',
    slug: 'entretiens-utilisateurs',
    name: { fr: 'Entretiens utilisateurs', en: 'User Interviews' },
    description: {
      fr: 'Technique qualitative pour comprendre les besoins, comportements et motivations des utilisateurs à travers des conversations structurées.',
      en: 'Qualitative technique to understand user needs, behaviors and motivations through structured conversations.',
    },
    phase: 'discovery',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'En début de projet pour comprendre le contexte utilisateur, ou lors de la validation de concepts.',
      en: 'At the beginning of a project to understand user context, or when validating concepts.',
    },
    deliverables: {
      fr: ['Grille d\'entretien', 'Notes d\'entretien', 'Synthèse des insights', 'Verbatims clés'],
      en: ['Interview guide', 'Interview notes', 'Insights summary', 'Key verbatims'],
    },
    tips: {
      fr: [
        'Préparez une grille d\'entretien flexible',
        'Privilégiez les questions ouvertes',
        'Enregistrez les sessions (avec accord)',
        'Prévoyez 45-60 min par entretien',
        'Visez 5-8 entretiens minimum',
      ],
      en: [
        'Prepare a flexible interview guide',
        'Favor open-ended questions',
        'Record sessions (with consent)',
        'Plan 45-60 min per interview',
        'Aim for 5-8 interviews minimum',
      ],
    },
    icon: 'ChatBubbleLeftRightIcon',
    templateUrl: '/templates/template-entretien-utilisateur.html',
    templateName: { fr: 'Grille d\'entretien', en: 'Interview guide' },
  },
  {
    id: '2',
    slug: 'personas',
    name: { fr: 'Personas', en: 'Personas' },
    description: {
      fr: 'Représentations fictives des utilisateurs types basées sur des données réelles, permettant d\'humaniser les cibles.',
      en: 'Fictional representations of typical users based on real data, allowing to humanize targets.',
    },
    phase: 'discovery',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'Après la phase de recherche utilisateur, pour synthétiser et partager la connaissance utilisateur.',
      en: 'After the user research phase, to synthesize and share user knowledge.',
    },
    deliverables: {
      fr: ['Fiches personas', 'Canvas persona', 'Carte d\'empathie'],
      en: ['Persona sheets', 'Persona canvas', 'Empathy map'],
    },
    tips: {
      fr: [
        'Basez-vous sur des données réelles',
        'Limitez-vous à 3-5 personas',
        'Incluez objectifs et frustrations',
        'Rendez-les mémorables avec un nom et une photo',
        'Partagez-les avec toute l\'équipe',
      ],
      en: [
        'Base them on real data',
        'Limit yourself to 3-5 personas',
        'Include goals and frustrations',
        'Make them memorable with a name and photo',
        'Share them with the whole team',
      ],
    },
    icon: 'UserGroupIcon',
    templateUrl: '/templates/template-persona.html',
    templateName: { fr: 'Canvas Persona', en: 'Persona Canvas' },
  },
  {
    id: '3',
    slug: 'parcours-utilisateur',
    name: { fr: 'Parcours utilisateur', en: 'User Journey Map' },
    description: {
      fr: 'Visualisation des étapes, émotions et points de contact d\'un utilisateur lors de son interaction avec un produit ou service.',
      en: 'Visualization of the steps, emotions and touchpoints of a user during their interaction with a product or service.',
    },
    phase: 'discovery',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'Pour identifier les pain points et opportunités d\'amélioration sur un parcours existant ou à concevoir.',
      en: 'To identify pain points and improvement opportunities on an existing or planned journey.',
    },
    deliverables: {
      fr: ['Carte de parcours', 'Identification des pain points', 'Opportunités d\'amélioration'],
      en: ['Journey map', 'Pain points identification', 'Improvement opportunities'],
    },
    tips: {
      fr: [
        'Définissez clairement le scope du parcours',
        'Incluez les émotions à chaque étape',
        'Identifiez tous les points de contact',
        'Impliquez des parties prenantes variées',
        'Priorisez les opportunités identifiées',
      ],
      en: [
        'Clearly define the journey scope',
        'Include emotions at each step',
        'Identify all touchpoints',
        'Involve various stakeholders',
        'Prioritize identified opportunities',
      ],
    },
    icon: 'MapIcon',
    templateUrl: '/templates/template-parcours-utilisateur.html',
    templateName: { fr: 'Template Journey Map', en: 'Journey Map Template' },
  },
  {
    id: '4',
    slug: 'benchmark',
    name: { fr: 'Benchmark concurrentiel', en: 'Competitive Benchmark' },
    description: {
      fr: 'Analyse comparative des solutions concurrentes ou similaires pour identifier les meilleures pratiques et différenciateurs.',
      en: 'Comparative analysis of competing or similar solutions to identify best practices and differentiators.',
    },
    phase: 'discovery',
    effort: 'low',
    impact: 'medium',
    whenToUse: {
      fr: 'En début de projet pour s\'inspirer du marché et positionner sa solution.',
      en: 'At the beginning of a project to get market inspiration and position your solution.',
    },
    deliverables: {
      fr: ['Grille d\'analyse', 'Rapport de benchmark', 'Recommandations'],
      en: ['Analysis grid', 'Benchmark report', 'Recommendations'],
    },
    tips: {
      fr: [
        'Définissez des critères d\'analyse clairs',
        'Analysez 5-10 concurrents',
        'Incluez des acteurs hors secteur inspirants',
        'Documentez avec des captures d\'écran',
        'Synthétisez les forces et faiblesses',
      ],
      en: [
        'Define clear analysis criteria',
        'Analyze 5-10 competitors',
        'Include inspiring players from other sectors',
        'Document with screenshots',
        'Summarize strengths and weaknesses',
      ],
    },
    icon: 'ChartBarIcon',
    templateUrl: '/templates/template-benchmark.html',
    templateName: { fr: 'Grille de benchmark', en: 'Benchmark Grid' },
  },
  {
    id: '5',
    slug: 'tri-de-cartes',
    name: { fr: 'Tri de cartes', en: 'Card Sorting' },
    description: {
      fr: 'Technique participative pour organiser et catégoriser le contenu selon le modèle mental des utilisateurs.',
      en: 'Participatory technique to organize and categorize content according to users\' mental model.',
    },
    phase: 'design',
    effort: 'low',
    impact: 'medium',
    whenToUse: {
      fr: 'Pour définir l\'architecture de l\'information d\'un site ou application.',
      en: 'To define the information architecture of a website or application.',
    },
    deliverables: {
      fr: ['Résultats du tri', 'Dendrogramme', 'Proposition d\'arborescence'],
      en: ['Sorting results', 'Dendrogram', 'Sitemap proposal'],
    },
    tips: {
      fr: [
        'Utilisez 30-60 cartes maximum',
        'Testez avec 15-20 participants',
        'Proposez un tri ouvert puis fermé',
        'Utilisez des outils comme OptimalSort',
        'Analysez les patterns récurrents',
      ],
      en: [
        'Use 30-60 cards maximum',
        'Test with 15-20 participants',
        'Propose an open then closed sort',
        'Use tools like OptimalSort',
        'Analyze recurring patterns',
      ],
    },
    icon: 'Squares2X2Icon',
  },
  {
    id: '6',
    slug: 'wireframes',
    name: { fr: 'Wireframes', en: 'Wireframes' },
    description: {
      fr: 'Maquettes basse fidélité représentant la structure et l\'organisation des écrans sans le design visuel.',
      en: 'Low-fidelity mockups representing the structure and organization of screens without visual design.',
    },
    phase: 'design',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'Pour valider rapidement la structure et les fonctionnalités avant d\'investir dans le design.',
      en: 'To quickly validate structure and features before investing in design.',
    },
    deliverables: {
      fr: ['Wireframes annotés', 'Documentation fonctionnelle', 'Spécifications'],
      en: ['Annotated wireframes', 'Functional documentation', 'Specifications'],
    },
    tips: {
      fr: [
        'Restez en noir et blanc',
        'Focalisez sur la structure, pas l\'esthétique',
        'Annotez les interactions',
        'Itérez rapidement',
        'Testez avec des utilisateurs',
      ],
      en: [
        'Stay in black and white',
        'Focus on structure, not aesthetics',
        'Annotate interactions',
        'Iterate quickly',
        'Test with users',
      ],
    },
    icon: 'DocumentIcon',
  },
  {
    id: '7',
    slug: 'prototypage',
    name: { fr: 'Prototypage', en: 'Prototyping' },
    description: {
      fr: 'Création de versions interactives du produit permettant de simuler l\'expérience utilisateur.',
      en: 'Creation of interactive versions of the product to simulate the user experience.',
    },
    phase: 'design',
    effort: 'high',
    impact: 'high',
    whenToUse: {
      fr: 'Pour tester des concepts avec des utilisateurs avant le développement.',
      en: 'To test concepts with users before development.',
    },
    deliverables: {
      fr: ['Prototype interactif', 'Scénarios de test', 'Documentation des interactions'],
      en: ['Interactive prototype', 'Test scenarios', 'Interaction documentation'],
    },
    tips: {
      fr: [
        'Adaptez la fidélité à l\'objectif',
        'Utilisez Figma ou Adobe XD',
        'Créez des parcours réalistes',
        'Préparez des données fictives crédibles',
        'Testez les interactions clés',
      ],
      en: [
        'Adapt fidelity to the objective',
        'Use Figma or Adobe XD',
        'Create realistic journeys',
        'Prepare credible dummy data',
        'Test key interactions',
      ],
    },
    icon: 'CubeIcon',
  },
  {
    id: '8',
    slug: 'design-system',
    name: { fr: 'Design System', en: 'Design System' },
    description: {
      fr: 'Bibliothèque de composants, patterns et guidelines assurant la cohérence et l\'efficacité du design.',
      en: 'Library of components, patterns and guidelines ensuring design consistency and efficiency.',
    },
    phase: 'design',
    effort: 'high',
    impact: 'high',
    whenToUse: {
      fr: 'Pour les projets à grande échelle ou multi-équipes nécessitant une cohérence forte.',
      en: 'For large-scale or multi-team projects requiring strong consistency.',
    },
    deliverables: {
      fr: ['Bibliothèque de composants', 'Guidelines d\'usage', 'Tokens de design', 'Documentation'],
      en: ['Component library', 'Usage guidelines', 'Design tokens', 'Documentation'],
    },
    tips: {
      fr: [
        'Commencez par les composants de base',
        'Documentez chaque composant',
        'Définissez des tokens (couleurs, typos...)',
        'Impliquez développeurs et designers',
        'Faites évoluer itérativement',
      ],
      en: [
        'Start with basic components',
        'Document each component',
        'Define tokens (colors, typography...)',
        'Involve developers and designers',
        'Evolve iteratively',
      ],
    },
    icon: 'SwatchIcon',
  },
  {
    id: '9',
    slug: 'tests-utilisateurs',
    name: { fr: 'Tests utilisateurs', en: 'Usability Testing' },
    description: {
      fr: 'Sessions d\'évaluation où des utilisateurs réels tentent d\'accomplir des tâches pour identifier les problèmes d\'utilisabilité.',
      en: 'Evaluation sessions where real users attempt to complete tasks to identify usability issues.',
    },
    phase: 'evaluation',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'Pour valider un concept, prototype ou produit existant avec de vrais utilisateurs.',
      en: 'To validate a concept, prototype or existing product with real users.',
    },
    deliverables: {
      fr: ['Protocole de test', 'Notes d\'observation', 'Rapport de synthèse', 'Recommandations'],
      en: ['Test protocol', 'Observation notes', 'Summary report', 'Recommendations'],
    },
    tips: {
      fr: [
        '5 utilisateurs détectent 85% des problèmes',
        'Préparez des scénarios réalistes',
        'Ne guidez pas l\'utilisateur',
        'Enregistrez les sessions',
        'Impliquez les parties prenantes en observation',
      ],
      en: [
        '5 users detect 85% of problems',
        'Prepare realistic scenarios',
        'Don\'t guide the user',
        'Record sessions',
        'Involve stakeholders as observers',
      ],
    },
    icon: 'UserIcon',
    templateUrl: '/templates/template-tests-utilisateurs.html',
    templateName: { fr: 'Protocole de test', en: 'Test Protocol' },
  },
  {
    id: '10',
    slug: 'tests-ab',
    name: { fr: 'Tests A/B', en: 'A/B Testing' },
    description: {
      fr: 'Expérimentation comparant deux versions d\'un élément pour déterminer laquelle performe le mieux.',
      en: 'Experimentation comparing two versions of an element to determine which performs better.',
    },
    phase: 'evaluation',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'Pour optimiser des éléments spécifiques basé sur des métriques quantitatives.',
      en: 'To optimize specific elements based on quantitative metrics.',
    },
    deliverables: {
      fr: ['Hypothèse de test', 'Résultats statistiques', 'Analyse et recommandations'],
      en: ['Test hypothesis', 'Statistical results', 'Analysis and recommendations'],
    },
    tips: {
      fr: [
        'Définissez une hypothèse claire',
        'Testez une seule variable à la fois',
        'Assurez une taille d\'échantillon suffisante',
        'Attendez la significativité statistique',
        'Documentez les apprentissages',
      ],
      en: [
        'Define a clear hypothesis',
        'Test one variable at a time',
        'Ensure sufficient sample size',
        'Wait for statistical significance',
        'Document learnings',
      ],
    },
    icon: 'BeakerIcon',
  },
  {
    id: '11',
    slug: 'audit-ux',
    name: { fr: 'Audit UX', en: 'UX Audit' },
    description: {
      fr: 'Évaluation experte d\'une interface existante basée sur des heuristiques et bonnes pratiques UX.',
      en: 'Expert evaluation of an existing interface based on heuristics and UX best practices.',
    },
    phase: 'evaluation',
    effort: 'medium',
    impact: 'high',
    whenToUse: {
      fr: 'Pour identifier rapidement les problèmes d\'utilisabilité d\'un produit existant.',
      en: 'To quickly identify usability issues of an existing product.',
    },
    deliverables: {
      fr: ['Grille d\'audit', 'Rapport détaillé', 'Priorisation des problèmes', 'Recommandations'],
      en: ['Audit grid', 'Detailed report', 'Problem prioritization', 'Recommendations'],
    },
    tips: {
      fr: [
        'Utilisez les heuristiques de Nielsen',
        'Documentez avec des captures d\'écran',
        'Classez par sévérité',
        'Proposez des solutions concrètes',
        'Complétez avec des tests utilisateurs',
      ],
      en: [
        'Use Nielsen\'s heuristics',
        'Document with screenshots',
        'Classify by severity',
        'Propose concrete solutions',
        'Complement with user testing',
      ],
    },
    icon: 'ClipboardDocumentCheckIcon',
    templateUrl: '/templates/template-audit-ux.html',
    templateName: { fr: 'Grille d\'audit UX', en: 'UX Audit Grid' },
  },
  {
    id: '12',
    slug: 'analytics-ux',
    name: { fr: 'Analytics UX', en: 'UX Analytics' },
    description: {
      fr: 'Analyse des données comportementales pour comprendre comment les utilisateurs interagissent avec le produit.',
      en: 'Analysis of behavioral data to understand how users interact with the product.',
    },
    phase: 'evaluation',
    effort: 'low',
    impact: 'medium',
    whenToUse: {
      fr: 'Pour un suivi continu de l\'expérience utilisateur et identifier les points de friction.',
      en: 'For continuous monitoring of user experience and identifying friction points.',
    },
    deliverables: {
      fr: ['Dashboard de métriques', 'Rapport d\'analyse', 'Identification des problèmes'],
      en: ['Metrics dashboard', 'Analysis report', 'Problem identification'],
    },
    tips: {
      fr: [
        'Définissez des KPIs pertinents',
        'Utilisez des heatmaps et session recordings',
        'Analysez les entonnoirs de conversion',
        'Croisez quanti et quali',
        'Automatisez les rapports récurrents',
      ],
      en: [
        'Define relevant KPIs',
        'Use heatmaps and session recordings',
        'Analyze conversion funnels',
        'Cross quantitative and qualitative data',
        'Automate recurring reports',
      ],
    },
    icon: 'ChartPieIcon',
  },
]

export const phaseColors: Record<Phase, { bg: string; text: string; label: { fr: string; en: string } }> = {
  discovery: { bg: 'bg-blue-100', text: 'text-blue-700', label: { fr: 'Découverte', en: 'Discovery' } },
  design: { bg: 'bg-purple-100', text: 'text-purple-700', label: { fr: 'Conception', en: 'Design' } },
  evaluation: { bg: 'bg-green-100', text: 'text-green-700', label: { fr: 'Évaluation', en: 'Evaluation' } },
}

export const effortLabels: Record<EffortLevel, { fr: string; en: string }> = {
  low: { fr: 'Faible', en: 'Low' },
  medium: { fr: 'Moyen', en: 'Medium' },
  high: { fr: 'Élevé', en: 'High' },
}

