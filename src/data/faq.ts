export interface FAQItem {
  id: string
  category: string
  question: { fr: string; en: string }
  answer: { fr: string; en: string }
}

export const faqCategories = {
  fr: [
    { id: 'general', label: 'Général' },
    { id: 'heuristics', label: 'Heuristiques de Nielsen' },
    { id: 'methods', label: 'Méthodes UX' },
    { id: 'process', label: 'Processus & Planning' },
    { id: 'resources', label: 'Ressources & Outils' },
    { id: 'team', label: 'Équipe UX' },
  ],
  en: [
    { id: 'general', label: 'General' },
    { id: 'heuristics', label: 'Nielsen Heuristics' },
    { id: 'methods', label: 'UX Methods' },
    { id: 'process', label: 'Process & Planning' },
    { id: 'resources', label: 'Resources & Tools' },
    { id: 'team', label: 'UX Team' },
  ],
}

export const faqItems: FAQItem[] = [
  // Général
  {
    id: '1',
    category: 'general',
    question: {
      fr: 'Qu\'est-ce que l\'UX (User Experience) ?',
      en: 'What is UX (User Experience)?',
    },
    answer: {
      fr: 'L\'UX (User Experience) désigne l\'expérience globale ressentie par un utilisateur lors de son interaction avec un produit, service ou système. Elle englobe l\'utilisabilité, l\'accessibilité, les émotions et la satisfaction. L\'objectif est de créer des produits utiles, utilisables et agréables.',
      en: 'UX (User Experience) refers to the overall experience felt by a user when interacting with a product, service, or system. It encompasses usability, accessibility, emotions, and satisfaction. The goal is to create products that are useful, usable, and enjoyable.',
    },
  },
  {
    id: '2',
    category: 'general',
    question: {
      fr: 'Quelle est la différence entre UX et UI ?',
      en: 'What is the difference between UX and UI?',
    },
    answer: {
      fr: 'L\'UX (User Experience) concerne l\'expérience globale et les parcours utilisateurs, tandis que l\'UI (User Interface) concerne l\'aspect visuel : couleurs, typographies, icônes, boutons. L\'UX répond à "Comment ça fonctionne ?", l\'UI répond à "Comment ça se présente ?". Les deux sont complémentaires.',
      en: 'UX (User Experience) concerns the overall experience and user journeys, while UI (User Interface) concerns the visual aspect: colors, typography, icons, buttons. UX answers "How does it work?", UI answers "How does it look?". Both are complementary.',
    },
  },
  {
    id: '3',
    category: 'general',
    question: {
      fr: 'Pourquoi investir dans l\'UX ?',
      en: 'Why invest in UX?',
    },
    answer: {
      fr: 'Investir dans l\'UX permet de : réduire les coûts (corriger un problème en conception coûte 10x moins qu\'en production), améliorer l\'adoption utilisateur, augmenter la productivité, réduire les demandes de support, et améliorer la satisfaction. Le ROI de l\'UX est prouvé : chaque euro investi en UX rapporte entre 10 et 100 euros.',
      en: 'Investing in UX allows you to: reduce costs (fixing an issue in design costs 10x less than in production), improve user adoption, increase productivity, reduce support requests, and improve satisfaction. The ROI of UX is proven: every euro invested in UX returns between 10 and 100 euros.',
    },
  },
  // Heuristiques de Nielsen
  {
    id: 'h0',
    category: 'heuristics',
    question: {
      fr: 'Que sont les 10 heuristiques de Nielsen ?',
      en: 'What are Nielsen\'s 10 heuristics?',
    },
    answer: {
      fr: 'Les 10 heuristiques de Nielsen sont des principes généraux d\'utilisabilité créés par Jakob Nielsen en 1994. Ce sont des règles empiriques ("rules of thumb") qui servent de guide pour la conception d\'interfaces utilisables. Elles sont utilisées lors d\'audits UX heuristiques pour identifier rapidement les problèmes d\'ergonomie.',
      en: 'Nielsen\'s 10 heuristics are general usability principles created by Jakob Nielsen in 1994. They are empirical rules ("rules of thumb") that serve as a guide for designing usable interfaces. They are used during heuristic UX audits to quickly identify ergonomic issues.',
    },
  },
  {
    id: 'h1',
    category: 'heuristics',
    question: {
      fr: '1. Visibilité de l\'état du système',
      en: '1. Visibility of system status',
    },
    answer: {
      fr: 'Le système doit toujours tenir l\'utilisateur informé de ce qui se passe, par un feedback approprié dans un délai raisonnable.\n\n**Exemples :**\n• Barre de progression lors d\'un téléchargement\n• Indicateur de chargement (spinner)\n• Message de confirmation après une action\n• Fil d\'Ariane pour indiquer où l\'on se trouve\n• Notification de sauvegarde automatique',
      en: 'The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.\n\n**Examples:**\n• Progress bar during download\n• Loading indicator (spinner)\n• Confirmation message after an action\n• Breadcrumb to indicate location\n• Auto-save notification',
    },
  },
  {
    id: 'h2',
    category: 'heuristics',
    question: {
      fr: '2. Correspondance entre le système et le monde réel',
      en: '2. Match between system and the real world',
    },
    answer: {
      fr: 'Le système doit parler le langage de l\'utilisateur, avec des mots, phrases et concepts familiers, plutôt que du jargon technique. Suivez les conventions du monde réel.\n\n**Exemples :**\n• Icône de corbeille pour supprimer\n• Icône de disquette pour sauvegarder\n• Panier d\'achat pour un e-commerce\n• Vocabulaire métier adapté à la cible\n• Organisation logique de l\'information',
      en: 'The system should speak the users\' language, with words, phrases and concepts familiar to the user, rather than technical jargon. Follow real-world conventions.\n\n**Examples:**\n• Trash icon to delete\n• Floppy disk icon to save\n• Shopping cart for e-commerce\n• Business vocabulary adapted to target\n• Logical information organization',
    },
  },
  {
    id: 'h3',
    category: 'heuristics',
    question: {
      fr: '3. Contrôle et liberté de l\'utilisateur',
      en: '3. User control and freedom',
    },
    answer: {
      fr: 'Les utilisateurs choisissent souvent des fonctions par erreur et ont besoin d\'une "sortie de secours" clairement identifiée. Permettez l\'annulation et le rétablissement.\n\n**Exemples :**\n• Bouton "Annuler" et "Rétablir" (Ctrl+Z)\n• Bouton "Fermer" sur les pop-ups\n• Lien "Retour" ou fil d\'Ariane\n• Possibilité de modifier/supprimer une action\n• Option "Quitter sans enregistrer"',
      en: 'Users often choose system functions by mistake and need a clearly marked "emergency exit". Support undo and redo.\n\n**Examples:**\n• "Undo" and "Redo" button (Ctrl+Z)\n• "Close" button on pop-ups\n• "Back" link or breadcrumb\n• Ability to edit/delete an action\n• "Exit without saving" option',
    },
  },
  {
    id: 'h4',
    category: 'heuristics',
    question: {
      fr: '4. Cohérence et standards',
      en: '4. Consistency and standards',
    },
    answer: {
      fr: 'Les utilisateurs ne devraient pas avoir à se demander si des mots, situations ou actions différents signifient la même chose. Suivez les conventions de la plateforme.\n\n**Exemples :**\n• Liens toujours de la même couleur\n• Boutons d\'action primaire toujours au même endroit\n• Terminologie uniforme ("Panier" partout, pas "Panier" puis "Caddie")\n• Respect des conventions web (logo cliquable = retour accueil)\n• Design system cohérent',
      en: 'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.\n\n**Examples:**\n• Links always the same color\n• Primary action buttons always in the same place\n• Uniform terminology\n• Respect for web conventions (clickable logo = return home)\n• Consistent design system',
    },
  },
  {
    id: 'h5',
    category: 'heuristics',
    question: {
      fr: '5. Prévention des erreurs',
      en: '5. Error prevention',
    },
    answer: {
      fr: 'Mieux qu\'un bon message d\'erreur, une conception soignée qui empêche le problème de se produire. Éliminez les conditions propices aux erreurs ou vérifiez-les avant de valider.\n\n**Exemples :**\n• Désactiver le bouton "Envoyer" si le formulaire est incomplet\n• Autocomplétion pour éviter les fautes de frappe\n• Sélecteur de date plutôt que saisie libre\n• Confirmation avant suppression définitive\n• Contraintes de format (email, téléphone)',
      en: 'Even better than good error messages is a careful design which prevents a problem from occurring. Eliminate error-prone conditions or check for them before committing.\n\n**Examples:**\n• Disable "Send" button if form is incomplete\n• Autocomplete to avoid typos\n• Date picker rather than free entry\n• Confirmation before permanent deletion\n• Format constraints (email, phone)',
    },
  },
  {
    id: 'h6',
    category: 'heuristics',
    question: {
      fr: '6. Reconnaissance plutôt que rappel',
      en: '6. Recognition rather than recall',
    },
    answer: {
      fr: 'Minimisez la charge cognitive en rendant les objets, actions et options visibles. L\'utilisateur ne devrait pas avoir à mémoriser des informations d\'une partie de l\'interface à une autre.\n\n**Exemples :**\n• Historique des recherches récentes\n• Suggestions basées sur les actions précédentes\n• Labels toujours visibles (pas seulement en placeholder)\n• Menu de navigation persistant\n• Rappel des critères de filtre actifs',
      en: 'Minimize memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the interface to another.\n\n**Examples:**\n• Recent search history\n• Suggestions based on previous actions\n• Always visible labels (not just placeholders)\n• Persistent navigation menu\n• Reminder of active filter criteria',
    },
  },
  {
    id: 'h7',
    category: 'heuristics',
    question: {
      fr: '7. Flexibilité et efficacité d\'utilisation',
      en: '7. Flexibility and efficiency of use',
    },
    answer: {
      fr: 'Des accélérateurs, invisibles pour le novice, peuvent accélérer l\'interaction pour l\'utilisateur expert. Permettez aux utilisateurs de personnaliser les actions fréquentes.\n\n**Exemples :**\n• Raccourcis clavier (Ctrl+C, Ctrl+V)\n• Actions en masse (sélection multiple)\n• Favoris et raccourcis personnalisés\n• Recherche rapide (Ctrl+K)\n• Interfaces simplifiées vs avancées\n• Templates et préréglages',
      en: 'Accelerators, invisible to the novice, may speed up interaction for the expert user. Allow users to tailor frequent actions.\n\n**Examples:**\n• Keyboard shortcuts (Ctrl+C, Ctrl+V)\n• Bulk actions (multiple selection)\n• Favorites and custom shortcuts\n• Quick search (Ctrl+K)\n• Simplified vs advanced interfaces\n• Templates and presets',
    },
  },
  {
    id: 'h8',
    category: 'heuristics',
    question: {
      fr: '8. Design esthétique et minimaliste',
      en: '8. Aesthetic and minimalist design',
    },
    answer: {
      fr: 'Les dialogues ne doivent pas contenir d\'informations non pertinentes ou rarement utiles. Chaque unité d\'information supplémentaire entre en compétition avec les unités pertinentes et diminue leur visibilité relative.\n\n**Exemples :**\n• Supprimer les éléments décoratifs inutiles\n• Hiérarchie visuelle claire (ce qui est important est visible)\n• Espace blanc pour aérer l\'interface\n• Un seul call-to-action principal par écran\n• Divulgation progressive de l\'information',
      en: 'Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with relevant units and diminishes their relative visibility.\n\n**Examples:**\n• Remove unnecessary decorative elements\n• Clear visual hierarchy (what\'s important is visible)\n• White space to lighten interface\n• Single primary call-to-action per screen\n• Progressive disclosure of information',
    },
  },
  {
    id: 'h9',
    category: 'heuristics',
    question: {
      fr: '9. Aide à la reconnaissance, diagnostic et récupération des erreurs',
      en: '9. Help users recognize, diagnose, and recover from errors',
    },
    answer: {
      fr: 'Les messages d\'erreur doivent être exprimés en langage clair (pas de codes), indiquer précisément le problème et suggérer une solution constructive.\n\n**Exemples :**\n• ❌ "Erreur 404" → ✅ "Page introuvable. Retournez à l\'accueil ou utilisez la recherche."\n• ❌ "Champ invalide" → ✅ "L\'email doit contenir un @ (ex: nom@domaine.fr)"\n• Mise en évidence visuelle du champ en erreur\n• Suggestions de correction (orthographe)\n• Lien vers l\'aide contextuelle',
      en: 'Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.\n\n**Examples:**\n• ❌ "Error 404" → ✅ "Page not found. Return to home or use search."\n• ❌ "Invalid field" → ✅ "Email must contain @ (e.g.: name@domain.com)"\n• Visual highlight of field in error\n• Correction suggestions (spelling)\n• Link to contextual help',
    },
  },
  {
    id: 'h10',
    category: 'heuristics',
    question: {
      fr: '10. Aide et documentation',
      en: '10. Help and documentation',
    },
    answer: {
      fr: 'Même s\'il est préférable que le système puisse être utilisé sans documentation, il peut être nécessaire de fournir une aide. Celle-ci doit être facile à trouver, centrée sur la tâche de l\'utilisateur, et concise.\n\n**Exemples :**\n• Tooltips et infobulles contextuelles\n• FAQ et base de connaissances\n• Tutoriels interactifs (onboarding)\n• Chat d\'aide en direct\n• Aide contextuelle (? à côté des champs complexes)\n• Documentation accessible depuis l\'interface',
      en: 'Even though it is better if the system can be used without documentation, it may be necessary to provide help. Help should be easy to find, focused on the user\'s task, and concise.\n\n**Examples:**\n• Contextual tooltips\n• FAQ and knowledge base\n• Interactive tutorials (onboarding)\n• Live help chat\n• Contextual help (? next to complex fields)\n• Documentation accessible from interface',
    },
  },
  // Méthodes UX
  {
    id: '4',
    category: 'methods',
    question: {
      fr: 'Combien d\'utilisateurs faut-il pour un test utilisateur ?',
      en: 'How many users do you need for a user test?',
    },
    answer: {
      fr: 'Selon les recherches de Jakob Nielsen, 5 utilisateurs suffisent pour détecter environ 85% des problèmes d\'utilisabilité. Au-delà, les retours deviennent redondants. Pour des tests quantitatifs (A/B testing), il faut un échantillon plus large pour atteindre la significativité statistique.',
      en: 'According to Jakob Nielsen\'s research, 5 users are enough to detect about 85% of usability issues. Beyond that, feedback becomes redundant. For quantitative tests (A/B testing), a larger sample is needed to achieve statistical significance.',
    },
  },
  {
    id: '5',
    category: 'methods',
    question: {
      fr: 'Quelle méthode UX choisir pour mon projet ?',
      en: 'Which UX method should I choose for my project?',
    },
    answer: {
      fr: 'Le choix dépend de votre objectif :\n• **Comprendre les utilisateurs** : Entretiens, Personas, Parcours utilisateur\n• **Concevoir des solutions** : Wireframes, Prototypage, Tri de cartes\n• **Évaluer un produit** : Tests utilisateurs, Audit UX, Analytics\n\nConsultez notre catalogue de méthodes ou utilisez le chatbot pour des recommandations personnalisées.',
      en: 'The choice depends on your goal:\n• **Understand users**: Interviews, Personas, User Journey\n• **Design solutions**: Wireframes, Prototyping, Card Sorting\n• **Evaluate a product**: User Testing, UX Audit, Analytics\n\nCheck our methods catalog or use the chatbot for personalized recommendations.',
    },
  },
  {
    id: '6',
    category: 'methods',
    question: {
      fr: 'Qu\'est-ce qu\'un persona et à quoi ça sert ?',
      en: 'What is a persona and what is it for?',
    },
    answer: {
      fr: 'Un persona est une représentation fictive d\'un utilisateur type, basée sur des données réelles (entretiens, observations). Il inclut : nom, photo, objectifs, frustrations, comportements. Les personas permettent d\'humaniser les cibles, d\'aligner l\'équipe sur les besoins utilisateurs, et de prendre des décisions centrées utilisateur.',
      en: 'A persona is a fictional representation of a typical user, based on real data (interviews, observations). It includes: name, photo, goals, frustrations, behaviors. Personas help humanize targets, align the team on user needs, and make user-centered decisions.',
    },
  },
  {
    id: '7',
    category: 'methods',
    question: {
      fr: 'Faut-il faire des wireframes avant les maquettes ?',
      en: 'Should we create wireframes before mockups?',
    },
    answer: {
      fr: 'Oui, c\'est recommandé. Les wireframes (maquettes basse fidélité en noir et blanc) permettent de valider la structure et les fonctionnalités avant d\'investir du temps dans le design visuel. C\'est plus rapide à itérer et évite de s\'attacher trop tôt à l\'esthétique.',
      en: 'Yes, it\'s recommended. Wireframes (low-fidelity black and white mockups) allow you to validate structure and features before investing time in visual design. It\'s faster to iterate and avoids getting attached to aesthetics too early.',
    },
  },
  // Processus & Planning
  {
    id: '8',
    category: 'process',
    question: {
      fr: 'Combien de temps prend une démarche UX complète ?',
      en: 'How long does a complete UX process take?',
    },
    answer: {
      fr: 'Une démarche UX complète prend généralement 4 à 6 semaines (hors développement), réparties ainsi :\n• Cadrage : 2-3 jours\n• Découverte : 5-7 jours\n• Cartographie : 2-3 jours\n• Conception : 5-10 jours\n• Validation : 5-8 jours\n• Accompagnement dev : continu\n\nLe temps varie selon la complexité du projet.',
      en: 'A complete UX process generally takes 4 to 6 weeks (excluding development), distributed as follows:\n• Scoping: 2-3 days\n• Discovery: 5-7 days\n• Mapping: 2-3 days\n• Design: 5-10 days\n• Validation: 5-8 days\n• Dev support: ongoing\n\nTime varies depending on project complexity.',
    },
  },
  {
    id: '9',
    category: 'process',
    question: {
      fr: 'À quel moment impliquer l\'UX dans un projet ?',
      en: 'When should UX be involved in a project?',
    },
    answer: {
      fr: 'Le plus tôt possible ! Idéalement dès la phase de cadrage, avant même que les specs fonctionnelles ne soient figées. Plus l\'UX intervient tôt, plus l\'impact est fort et moins les corrections coûtent cher. L\'UX ne doit pas être une étape finale de "polish", mais un acteur du début à la fin.',
      en: 'As early as possible! Ideally from the scoping phase, even before functional specs are finalized. The earlier UX is involved, the greater the impact and the cheaper the corrections. UX should not be a final "polish" step, but an actor from start to finish.',
    },
  },
  {
    id: '10',
    category: 'process',
    question: {
      fr: 'Comment intégrer l\'UX dans une méthodologie Agile ?',
      en: 'How to integrate UX in an Agile methodology?',
    },
    answer: {
      fr: 'L\'UX peut s\'intégrer en Agile de plusieurs façons :\n• **Dual Track** : un track discovery (UX) en avance d\'un sprint sur le track delivery (dev)\n• **Sprint 0** : démarrer par un sprint dédié à la recherche utilisateur\n• **UX dans chaque sprint** : intégrer des activités UX (tests, itérations) dans chaque sprint\n\nL\'important est que l\'UX soit toujours en légère avance sur le développement.',
      en: 'UX can be integrated into Agile in several ways:\n• **Dual Track**: a discovery track (UX) one sprint ahead of the delivery track (dev)\n• **Sprint 0**: start with a sprint dedicated to user research\n• **UX in each sprint**: integrate UX activities (tests, iterations) in each sprint\n\nThe important thing is that UX is always slightly ahead of development.',
    },
  },
  {
    id: '11',
    category: 'process',
    question: {
      fr: 'Quels sont les prérequis pour démarrer une démarche UX ?',
      en: 'What are the prerequisites to start a UX process?',
    },
    answer: {
      fr: 'Les prérequis obligatoires sont :\n• Périmètre fonctionnel défini\n• Utilisateurs cibles identifiés\n• Accès à 5-8 utilisateurs pour les entretiens\n• Sponsor projet identifié\n• Planning avec temps UX prévu (4-6 semaines)\n\nLes éléments recommandés : documentation existante, accès à l\'application actuelle, contraintes techniques connues.',
      en: 'Mandatory prerequisites are:\n• Defined functional scope\n• Identified target users\n• Access to 5-8 users for interviews\n• Identified project sponsor\n• Planning with allocated UX time (4-6 weeks)\n\nRecommended elements: existing documentation, access to current application, known technical constraints.',
    },
  },
  // Ressources & Outils
  {
    id: '12',
    category: 'resources',
    question: {
      fr: 'Quels outils utiliser pour le prototypage ?',
      en: 'Which tools to use for prototyping?',
    },
    answer: {
      fr: 'Les outils les plus utilisés sont :\n• **Figma** : collaboratif, gratuit pour débuter, le plus populaire\n• **Adobe XD** : intégré à la suite Adobe\n• **Sketch** : référence historique (Mac uniquement)\n• **Axure** : pour les prototypes complexes avec logique conditionnelle\n\nPour des wireframes rapides, un simple papier-crayon ou Miro/FigJam suffisent.',
      en: 'The most used tools are:\n• **Figma**: collaborative, free to start, most popular\n• **Adobe XD**: integrated with Adobe suite\n• **Sketch**: historical reference (Mac only)\n• **Axure**: for complex prototypes with conditional logic\n\nFor quick wireframes, simple pen and paper or Miro/FigJam are enough.',
    },
  },
  {
    id: '13',
    category: 'resources',
    question: {
      fr: 'Où trouver des templates UX ?',
      en: 'Where to find UX templates?',
    },
    answer: {
      fr: 'Notre bibliothèque UX Hub propose des templates téléchargeables : canvas persona, grille d\'entretien, template parcours utilisateur, checklist accessibilité, etc. Vous pouvez également trouver des ressources sur Figma Community, Nielsen Norman Group, et UX Collective.',
      en: 'Our UX Hub library offers downloadable templates: persona canvas, interview guide, user journey template, accessibility checklist, etc. You can also find resources on Figma Community, Nielsen Norman Group, and UX Collective.',
    },
  },
  {
    id: '14',
    category: 'resources',
    question: {
      fr: 'Comment mesurer la qualité de l\'UX ?',
      en: 'How to measure UX quality?',
    },
    answer: {
      fr: 'Plusieurs métriques permettent de mesurer l\'UX :\n• **SUS (System Usability Scale)** : score d\'utilisabilité sur 100\n• **NPS (Net Promoter Score)** : recommandation utilisateur\n• **Taux de complétion** : % de tâches réussies\n• **Temps de tâche** : durée pour accomplir une action\n• **Taux d\'erreur** : fréquence des erreurs\n• **CSAT** : satisfaction client',
      en: 'Several metrics measure UX:\n• **SUS (System Usability Scale)**: usability score out of 100\n• **NPS (Net Promoter Score)**: user recommendation\n• **Completion rate**: % of successful tasks\n• **Task time**: duration to complete an action\n• **Error rate**: frequency of errors\n• **CSAT**: customer satisfaction',
    },
  },
  // Équipe UX
  {
    id: '15',
    category: 'team',
    question: {
      fr: 'Comment solliciter l\'équipe UX ?',
      en: 'How to request the UX team?',
    },
    answer: {
      fr: 'Vous pouvez solliciter l\'équipe UX via le formulaire de contact du UX Hub. Précisez votre projet, vos objectifs, vos contraintes de planning et vos utilisateurs cibles. L\'équipe vous recontactera sous 48h pour qualifier votre demande et proposer un accompagnement adapté.',
      en: 'You can request the UX team via the UX Hub contact form. Specify your project, goals, planning constraints, and target users. The team will contact you within 48h to qualify your request and propose appropriate support.',
    },
  },
  {
    id: '16',
    category: 'team',
    question: {
      fr: 'L\'équipe UX peut-elle former mon équipe ?',
      en: 'Can the UX team train my team?',
    },
    answer: {
      fr: 'Oui ! L\'équipe UX propose des sessions de sensibilisation et de formation sur différents sujets : introduction à l\'UX, conduite d\'entretiens utilisateurs, animation d\'ateliers de co-conception, etc. Contactez-nous pour définir un programme adapté à vos besoins.',
      en: 'Yes! The UX team offers awareness and training sessions on various topics: introduction to UX, conducting user interviews, facilitating co-design workshops, etc. Contact us to define a program adapted to your needs.',
    },
  },
  {
    id: '17',
    category: 'team',
    question: {
      fr: 'Peut-on faire de l\'UX sans UX designer ?',
      en: 'Can we do UX without a UX designer?',
    },
    answer: {
      fr: 'Certaines pratiques UX peuvent être adoptées sans expert dédié : observer les utilisateurs, collecter des feedbacks, tester avec 5 utilisateurs, appliquer des heuristiques de base. Cependant, pour des projets complexes ou à fort enjeu, l\'expertise d\'un UX designer apporte une vraie valeur ajoutée en termes de méthode et de qualité.',
      en: 'Some UX practices can be adopted without a dedicated expert: observing users, collecting feedback, testing with 5 users, applying basic heuristics. However, for complex or high-stakes projects, the expertise of a UX designer brings real added value in terms of method and quality.',
    },
  },
]

