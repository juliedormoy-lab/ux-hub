export interface ROIStat {
  id: string
  value: string
  label: { fr: string; en: string }
  source: string
  sourceUrl?: string
  sector?: string
}

export interface CaseStudy {
  id: string
  company: string
  context: { fr: string; en: string }
  intervention: { fr: string; en: string }
  results: { fr: string; en: string }
  metrics: { label: string; before: string; after: string }[]
  source: string
  year: number
}

export interface Objection {
  id: string
  category: 'budget' | 'time' | 'value' | 'methodology'
  objection: { fr: string; en: string }
  empathy: { fr: string; en: string }
  shortAnswer: { fr: string; en: string }
  longAnswer: { fr: string; en: string }
  data?: { fr: string; en: string }
  example?: { fr: string; en: string }
}

export interface SuccessStory {
  id: string
  title: { fr: string; en: string }
  department: { fr: string; en: string }
  date: string
  context: { fr: string; en: string }
  challenge: { fr: string; en: string }
  approach: { fr: string; en: string }
  results: { fr: string; en: string }
  testimonial: { fr: string; en: string }
  testimonialAuthor: string
  metrics: { label: { fr: string; en: string }; before: string; after: string; improvement: string }[]
  methods: string[]
}

export const roiStats: ROIStat[] = [
  {
    id: '1',
    value: '100€',
    label: { fr: 'retour pour chaque 1€ investi en UX', en: 'return for every €1 invested in UX' },
    source: 'Forrester Research',
    sourceUrl: 'https://forrester.com',
  },
  {
    id: '2',
    value: '10x',
    label: { fr: 'moins cher de corriger en conception qu\'en production', en: 'cheaper to fix in design than in production' },
    source: 'IBM Systems Sciences Institute',
  },
  {
    id: '3',
    value: '+400%',
    label: { fr: 'de taux de conversion avec une UX optimisée', en: 'conversion rate with optimized UX' },
    source: 'Forrester Research',
  },
  {
    id: '4',
    value: '88%',
    label: { fr: 'des utilisateurs ne reviennent pas après une mauvaise UX', en: 'of users don\'t return after a bad UX' },
    source: 'Amazon Web Services',
  },
  {
    id: '5',
    value: '-50%',
    label: { fr: 'de temps de développement avec des specs UX claires', en: 'development time with clear UX specs' },
    source: 'IEEE Software',
  },
  {
    id: '6',
    value: '70%',
    label: { fr: 'des projets échouent par manque de compréhension utilisateur', en: 'of projects fail due to lack of user understanding' },
    source: 'Standish Group',
  },
  {
    id: '7',
    value: '+83%',
    label: { fr: 'de satisfaction client avec une démarche UX', en: 'customer satisfaction with UX approach' },
    source: 'McKinsey Design Index',
  },
  {
    id: '8',
    value: '2x',
    label: { fr: 'plus de revenus pour les entreprises design-driven', en: 'more revenue for design-driven companies' },
    source: 'McKinsey Design Index',
  },
]

export const caseStudies: CaseStudy[] = [
  // Études de cas publiques vérifiables
  {
    id: '1',
    company: 'Bank of America',
    context: {
      fr: 'Refonte complète de l\'application mobile banking "Keep the Change" pour encourager l\'épargne automatique.',
      en: 'Complete redesign of "Keep the Change" mobile banking app to encourage automatic savings.',
    },
    intervention: {
      fr: 'Recherche ethnographique, tests utilisateurs itératifs, simplification du parcours d\'inscription.',
      en: 'Ethnographic research, iterative user testing, simplified onboarding journey.',
    },
    results: {
      fr: 'Programme adopté par des millions de clients, générant des milliards en épargne.',
      en: 'Program adopted by millions of customers, generating billions in savings.',
    },
    metrics: [
      { label: 'Clients', before: '0', after: '12.3M' },
      { label: 'Épargne générée', before: '-', after: '$3.1B' },
    ],
    source: 'IDEO Case Study',
    year: 2019,
  },
  {
    id: '2',
    company: 'Capital One',
    context: {
      fr: 'Transformation digitale avec création d\'une équipe design de 500+ personnes et refonte des apps.',
      en: 'Digital transformation with 500+ design team creation and app redesign.',
    },
    intervention: {
      fr: 'Intégration du design thinking à tous les niveaux, labs d\'innovation, tests continus.',
      en: 'Design thinking integration at all levels, innovation labs, continuous testing.',
    },
    results: {
      fr: 'Classée #1 des apps bancaires US et augmentation massive de l\'engagement client.',
      en: 'Ranked #1 US banking app and massive increase in customer engagement.',
    },
    metrics: [
      { label: 'App Store Rating', before: '2.5★', after: '4.8★' },
      { label: 'Engagement', before: '-', after: '+35%' },
    ],
    source: 'McKinsey Design Index',
    year: 2020,
  },
  {
    id: '3',
    company: 'ING Bank',
    context: {
      fr: 'Refonte du parcours d\'ouverture de compte en ligne pour réduire les abandons.',
      en: 'Redesign of online account opening journey to reduce drop-offs.',
    },
    intervention: {
      fr: 'Analyse des analytics, simplification formulaires, réduction des étapes de 10 à 5.',
      en: 'Analytics analysis, form simplification, step reduction from 10 to 5.',
    },
    results: {
      fr: 'Augmentation significative du taux de complétion des ouvertures de compte.',
      en: 'Significant increase in account opening completion rate.',
    },
    metrics: [
      { label: 'Taux complétion', before: '30%', after: '60%' },
      { label: 'Temps parcours', before: '20 min', after: '8 min' },
    ],
    source: 'Forrester Research',
    year: 2021,
  },
  {
    id: '4',
    company: 'USAA (Assurance Auto)',
    context: {
      fr: 'Simplification du processus de déclaration de sinistre automobile via l\'app mobile.',
      en: 'Simplification of auto insurance claim process via mobile app.',
    },
    intervention: {
      fr: 'Co-design avec les assurés, prototypage rapide, tests utilisateurs en situation réelle.',
      en: 'Co-design with policyholders, rapid prototyping, real-world user testing.',
    },
    results: {
      fr: 'Réduction drastique du temps de déclaration et amélioration satisfaction client.',
      en: 'Drastic reduction in claim filing time and improved customer satisfaction.',
    },
    metrics: [
      { label: 'Temps déclaration', before: '1h', after: '10 min' },
      { label: 'NPS', before: '+42', after: '+78' },
    ],
    source: 'Harvard Business Review',
    year: 2020,
  },
  {
    id: '5',
    company: 'Tesla Financial Services',
    context: {
      fr: 'Digitalisation complète du parcours de financement véhicule intégré à l\'achat en ligne.',
      en: 'Complete digitalization of vehicle financing journey integrated with online purchase.',
    },
    intervention: {
      fr: 'Parcours sans friction, pré-approbation instantanée, signature 100% digitale.',
      en: 'Frictionless journey, instant pre-approval, 100% digital signature.',
    },
    results: {
      fr: 'Majorité des ventes financées via le parcours digital sans intervention humaine.',
      en: 'Majority of sales financed through digital journey without human intervention.',
    },
    metrics: [
      { label: 'Financement digital', before: '15%', after: '85%' },
      { label: 'Temps approbation', before: '2-3 jours', after: '< 1 min' },
    ],
    source: 'Tesla Investor Report',
    year: 2022,
  },
  {
    id: '6',
    company: 'Toyota Financial Services',
    context: {
      fr: 'Refonte du portail concessionnaires pour accélérer les demandes de financement.',
      en: 'Redesign of dealer portal to accelerate financing requests.',
    },
    intervention: {
      fr: 'Étude terrain avec concessionnaires, simplification des workflows, formation UX.',
      en: 'Field study with dealers, workflow simplification, UX training.',
    },
    results: {
      fr: 'Réduction du temps de traitement et amélioration de la satisfaction concessionnaires.',
      en: 'Reduced processing time and improved dealer satisfaction.',
    },
    metrics: [
      { label: 'Temps traitement', before: '45 min', after: '15 min' },
      { label: 'Satisfaction dealers', before: '62%', after: '89%' },
    ],
    source: 'JD Power Dealer Study',
    year: 2021,
  },
]

export const objections: Objection[] = [
  // Budget & Coûts
  {
    id: '1',
    category: 'budget',
    objection: { fr: 'L\'UX, c\'est trop cher', en: 'UX is too expensive' },
    empathy: { fr: 'Je comprends que le budget soit une préoccupation majeure.', en: 'I understand that budget is a major concern.' },
    shortAnswer: {
      fr: 'L\'UX fait économiser de l\'argent : corriger un problème en conception coûte 10x moins qu\'en production.',
      en: 'UX saves money: fixing an issue in design costs 10x less than in production.',
    },
    longAnswer: {
      fr: 'Ne pas investir en UX coûte plus cher à long terme. Les corrections post-lancement, le support utilisateur, les formations, et surtout la non-adoption du produit représentent des coûts cachés considérables. L\'UX est un investissement, pas une dépense.',
      en: 'Not investing in UX costs more in the long run. Post-launch fixes, user support, training, and especially product non-adoption represent significant hidden costs. UX is an investment, not an expense.',
    },
    data: { fr: 'Chaque euro investi en UX rapporte en moyenne 100€ (Forrester)', en: 'Every euro invested in UX returns an average of €100 (Forrester)' },
  },
  {
    id: '2',
    category: 'budget',
    objection: { fr: 'On n\'a pas le budget pour ça', en: 'We don\'t have the budget for that' },
    empathy: { fr: 'Je comprends que les ressources soient limitées.', en: 'I understand that resources are limited.' },
    shortAnswer: {
      fr: 'L\'UX peut démarrer petit : 5 tests utilisateurs suffisent pour identifier 85% des problèmes.',
      en: 'UX can start small: 5 user tests are enough to identify 85% of problems.',
    },
    longAnswer: {
      fr: 'Il existe des approches UX légères et économiques : entretiens utilisateurs (gratuits), tests guérilla, audit heuristique rapide. L\'important est de commencer, même modestement. Le ROI démontré justifiera des budgets futurs.',
      en: 'There are lightweight and economical UX approaches: user interviews (free), guerrilla testing, quick heuristic audit. The important thing is to start, even modestly. The demonstrated ROI will justify future budgets.',
    },
  },
  // Temps & Planning
  {
    id: '3',
    category: 'time',
    objection: { fr: 'On n\'a pas le temps', en: 'We don\'t have time' },
    empathy: { fr: 'Je comprends la pression des délais.', en: 'I understand the deadline pressure.' },
    shortAnswer: {
      fr: 'L\'UX fait gagner du temps : moins d\'itérations de développement, moins de corrections post-lancement.',
      en: 'UX saves time: fewer development iterations, fewer post-launch fixes.',
    },
    longAnswer: {
      fr: 'Investir du temps en amont pour comprendre les utilisateurs évite de développer des fonctionnalités inutiles ou mal conçues. Le temps "perdu" en recherche UX est largement compensé par le temps gagné en développement et en corrections.',
      en: 'Investing time upfront to understand users avoids developing useless or poorly designed features. The time "lost" in UX research is largely offset by time saved in development and fixes.',
    },
    data: { fr: '50% de réduction du temps de développement avec des specs UX claires (IEEE)', en: '50% reduction in development time with clear UX specs (IEEE)' },
  },
  {
    id: '4',
    category: 'time',
    objection: { fr: 'On doit livrer vite, on verra l\'UX après', en: 'We need to deliver fast, we\'ll see UX later' },
    empathy: { fr: 'Je comprends l\'urgence de livrer.', en: 'I understand the urgency to deliver.' },
    shortAnswer: {
      fr: 'L\'UX "après" coûte 10 à 100 fois plus cher. Mieux vaut intégrer un minimum d\'UX dès maintenant.',
      en: 'UX "later" costs 10 to 100 times more. Better to integrate minimum UX now.',
    },
    longAnswer: {
      fr: 'La dette UX, comme la dette technique, s\'accumule et devient de plus en plus coûteuse à rembourser. Un produit mal conçu qui échoue à l\'adoption ne sera jamais "amélioré après" - il sera abandonné ou refait from scratch.',
      en: 'UX debt, like technical debt, accumulates and becomes increasingly expensive to repay. A poorly designed product that fails adoption will never be "improved later" - it will be abandoned or redone from scratch.',
    },
  },
  // Pertinence & Valeur
  {
    id: '5',
    category: 'value',
    objection: { fr: 'Nos utilisateurs savent ce qu\'ils veulent', en: 'Our users know what they want' },
    empathy: { fr: 'Je comprends que vous connaissiez bien vos utilisateurs.', en: 'I understand that you know your users well.' },
    shortAnswer: {
      fr: 'Les utilisateurs savent ce dont ils ont besoin, pas toujours ce qu\'ils veulent. L\'UX révèle les besoins cachés.',
      en: 'Users know what they need, not always what they want. UX reveals hidden needs.',
    },
    longAnswer: {
      fr: 'Henry Ford disait : "Si j\'avais demandé aux gens ce qu\'ils voulaient, ils auraient répondu des chevaux plus rapides." L\'UX ne demande pas aux utilisateurs de concevoir la solution, mais observe et comprend leurs vrais problèmes pour proposer des solutions innovantes.',
      en: 'Henry Ford said: "If I had asked people what they wanted, they would have said faster horses." UX doesn\'t ask users to design the solution, but observes and understands their real problems to propose innovative solutions.',
    },
  },
  {
    id: '6',
    category: 'value',
    objection: { fr: 'C\'est juste du bon sens', en: 'It\'s just common sense' },
    empathy: { fr: 'Je comprends que certains principes semblent évidents.', en: 'I understand that some principles seem obvious.' },
    shortAnswer: {
      fr: 'Le "bon sens" des concepteurs n\'est pas celui des utilisateurs. L\'UX remplace les opinions par des données.',
      en: 'Designers\' "common sense" is not users\'. UX replaces opinions with data.',
    },
    longAnswer: {
      fr: 'Nous sommes tous victimes de biais cognitifs. L\'UX apporte une méthodologie rigoureuse pour sortir de nos suppositions et tester nos hypothèses avec de vrais utilisateurs. Ce qui semble "évident" pour l\'équipe projet ne l\'est souvent pas pour l\'utilisateur final.',
      en: 'We are all victims of cognitive biases. UX brings a rigorous methodology to get out of our assumptions and test our hypotheses with real users. What seems "obvious" to the project team is often not for the end user.',
    },
  },
  // Méthodologie
  {
    id: '7',
    category: 'methodology',
    objection: { fr: 'Ça ne marche pas dans notre contexte', en: 'It doesn\'t work in our context' },
    empathy: { fr: 'Je comprends que chaque contexte soit unique.', en: 'I understand that every context is unique.' },
    shortAnswer: {
      fr: 'L\'UX s\'adapte à tous les contextes : B2B, B2C, interne, réglementé... La méthode s\'ajuste, pas les principes.',
      en: 'UX adapts to all contexts: B2B, B2C, internal, regulated... The method adjusts, not the principles.',
    },
    longAnswer: {
      fr: 'L\'UX n\'est pas un processus rigide mais une boîte à outils flexible. Pour un projet contraint, on fera des entretiens courts plutôt que longs, des tests guérilla plutôt qu\'en labo. L\'essentiel est de toujours valider avec des vrais utilisateurs.',
      en: 'UX is not a rigid process but a flexible toolbox. For a constrained project, we\'ll do short interviews rather than long ones, guerrilla testing rather than lab testing. The key is to always validate with real users.',
    },
  },
  {
    id: '8',
    category: 'methodology',
    objection: { fr: 'L\'agile remplace l\'UX', en: 'Agile replaces UX' },
    empathy: { fr: 'Je comprends que l\'agile intègre des feedbacks utilisateurs.', en: 'I understand that agile integrates user feedback.' },
    shortAnswer: {
      fr: 'L\'agile et l\'UX sont complémentaires. L\'agile dit "quoi livrer quand", l\'UX dit "quoi concevoir pour qui".',
      en: 'Agile and UX are complementary. Agile says "what to deliver when", UX says "what to design for whom".',
    },
    longAnswer: {
      fr: 'L\'agile permet de livrer vite et d\'itérer, mais ne garantit pas qu\'on livre la bonne chose. L\'UX en amont (discovery) s\'assure qu\'on part dans la bonne direction. Les deux approches se renforcent mutuellement dans un modèle "Dual Track Agile".',
      en: 'Agile allows fast delivery and iteration, but doesn\'t guarantee we\'re delivering the right thing. UX upstream (discovery) ensures we\'re heading in the right direction. Both approaches reinforce each other in a "Dual Track Agile" model.',
    },
  },
]

export const objectionCategories = {
  fr: [
    { id: 'budget', label: 'Budget & Coûts', icon: 'CurrencyDollarIcon' },
    { id: 'time', label: 'Temps & Planning', icon: 'ClockIcon' },
    { id: 'value', label: 'Pertinence & Valeur', icon: 'QuestionMarkCircleIcon' },
    { id: 'methodology', label: 'Méthodologie', icon: 'CogIcon' },
  ],
  en: [
    { id: 'budget', label: 'Budget & Costs', icon: 'CurrencyDollarIcon' },
    { id: 'time', label: 'Time & Planning', icon: 'ClockIcon' },
    { id: 'value', label: 'Relevance & Value', icon: 'QuestionMarkCircleIcon' },
    { id: 'methodology', label: 'Methodology', icon: 'CogIcon' },
  ],
}

export const successStories: SuccessStory[] = [
  {
    id: '1',
    title: { fr: 'Refonte du parcours de souscription', en: 'Subscription flow redesign' },
    department: { fr: 'Équipe Acquisition', en: 'Acquisition Team' },
    date: '2024',
    context: {
      fr: 'Le parcours de souscription présentait un taux d\'abandon de 67% à l\'étape 3, générant une perte significative de prospects qualifiés.',
      en: 'The subscription flow had a 67% abandonment rate at step 3, generating significant loss of qualified prospects.',
    },
    challenge: {
      fr: 'Identifier les points de friction et proposer un parcours simplifié sans impacter les contraintes réglementaires.',
      en: 'Identify friction points and propose a simplified journey without impacting regulatory constraints.',
    },
    approach: {
      fr: 'Entretiens utilisateurs (8 prospects), analyse des analytics, parcours utilisateur as-is, ateliers de co-conception, prototypage et tests utilisateurs (5 sessions).',
      en: 'User interviews (8 prospects), analytics analysis, as-is user journey, co-design workshops, prototyping and user testing (5 sessions).',
    },
    results: {
      fr: 'Le nouveau parcours a permis d\'augmenter le taux de complétion de 25 points, générant une hausse significative des souscriptions.',
      en: 'The new flow increased completion rate by 25 points, generating a significant increase in subscriptions.',
    },
    testimonial: {
      fr: 'L\'approche UX nous a permis d\'identifier des problèmes que nous n\'aurions jamais vus autrement. Le ROI a été immédiat.',
      en: 'The UX approach allowed us to identify issues we would never have seen otherwise. The ROI was immediate.',
    },
    testimonialAuthor: 'Jean Martin, Product Owner',
    metrics: [
      { label: { fr: 'Taux de complétion', en: 'Completion rate' }, before: '33%', after: '58%', improvement: '+25 pts' },
      { label: { fr: 'Temps moyen parcours', en: 'Average journey time' }, before: '12 min', after: '7 min', improvement: '-42%' },
    ],
    methods: ['entretiens-utilisateurs', 'parcours-utilisateur', 'tests-utilisateurs'],
  },
  {
    id: '2',
    title: { fr: 'Audit UX - Espace client mobile', en: 'UX Audit - Mobile customer area' },
    department: { fr: 'Équipe Mobile', en: 'Mobile Team' },
    date: '2024',
    context: {
      fr: 'L\'application mobile avait reçu des notes basses sur les stores (3.2/5) avec des commentaires négatifs récurrents sur l\'ergonomie.',
      en: 'The mobile app had received low ratings on stores (3.2/5) with recurring negative comments on ergonomics.',
    },
    challenge: {
      fr: 'Améliorer rapidement la satisfaction utilisateur tout en préparant une refonte plus profonde.',
      en: 'Quickly improve user satisfaction while preparing a deeper redesign.',
    },
    approach: {
      fr: 'Audit heuristique complet, analyse des verbatims stores, tests utilisateurs sur parcours critiques, priorisation des quick wins.',
      en: 'Complete heuristic audit, store verbatim analysis, user testing on critical journeys, quick wins prioritization.',
    },
    results: {
      fr: 'Les corrections rapides ont permis de remonter la note significativement en 3 mois.',
      en: 'Quick fixes raised the rating significantly in 3 months.',
    },
    testimonial: {
      fr: 'L\'audit UX nous a donné une roadmap claire et priorisée. On a pu agir vite sur les vrais irritants.',
      en: 'The UX audit gave us a clear and prioritized roadmap. We could act quickly on real pain points.',
    },
    testimonialAuthor: 'Sophie Durand, Lead Mobile',
    metrics: [
      { label: { fr: 'Note App Store', en: 'App Store rating' }, before: '3.2/5', after: '4.4/5', improvement: '+1.2 pts' },
      { label: { fr: 'Tickets support', en: 'Support tickets' }, before: '450/mois', after: '180/mois', improvement: '-60%' },
    ],
    methods: ['audit-ux', 'tests-utilisateurs', 'analytics-ux'],
  },
]

