export type Locale = 'fr' | 'en'

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      guide: 'Guide UX',
      methods: 'Méthodes UX',
      projects: 'Projets',
      library: 'Bibliothèque',
      convince: 'Convaincre',
      contact: 'Contact',
      faq: 'FAQ',
    },
    // Home
    home: {
      hero: {
        title: 'Démocratisons l\'UX dans vos projets IT',
        subtitle: 'Découvrez les méthodes, explorez nos réalisations et accédez à nos ressources pour intégrer l\'UX dans vos projets.',
        cta: 'Découvrir les méthodes',
        ctaSecondary: 'Nous contacter',
      },
      methodsBlock: {
        title: 'Méthodes UX',
        subtitle: 'Boîte à outils méthodologique',
        cta: 'Voir toutes les méthodes',
      },
      projectsBlock: {
        title: 'Projets récents',
        subtitle: 'Nos réalisations et leurs bénéfices',
        cta: 'Voir tous les projets',
      },
      libraryBlock: {
        title: 'Bibliothèque',
        subtitle: 'Ressources téléchargeables',
        cta: 'Accéder à la bibliothèque',
      },
      contactBlock: {
        title: 'Besoin d\'accompagnement UX ?',
        subtitle: 'Notre équipe est là pour vous aider',
        cta: 'Nous contacter',
      },
    },
    // Methods
    methods: {
      title: 'Méthodes UX',
      subtitle: 'Boîte à outils méthodologique pour vos projets',
      search: 'Rechercher une méthode...',
      filters: {
        all: 'Toutes',
        discovery: 'Découverte',
        design: 'Conception',
        evaluation: 'Évaluation',
      },
      effort: 'Effort',
      impact: 'Impact',
      low: 'Faible',
      medium: 'Moyen',
      high: 'Élevé',
      whenToUse: 'Quand l\'utiliser',
      deliverables: 'Livrables',
      tips: 'Conseils pratiques',
      relatedResources: 'Ressources liées',
    },
    // Projects
    projects: {
      title: 'Projets',
      subtitle: 'Galerie de nos réalisations UX',
      search: 'Rechercher un projet...',
      filters: {
        all: 'Tous',
        byDepartment: 'Par département',
        byMethod: 'Par méthode',
        byYear: 'Par année',
      },
      context: 'Contexte',
      objectives: 'Objectifs',
      methodsUsed: 'Méthodes appliquées',
      deliverables: 'Livrables',
      benefits: 'Bénéfices mesurés',
      testimonial: 'Témoignage',
      before: 'Avant',
      after: 'Après',
    },
    // Library
    library: {
      title: 'Bibliothèque',
      subtitle: 'Ressources UX téléchargeables',
      search: 'Rechercher un document...',
      categories: {
        all: 'Toutes',
        templates: 'Templates',
        guides: 'Guides méthodologiques',
        checklists: 'Checklists',
        presentations: 'Présentations',
        caseStudies: 'Études de cas',
      },
      download: 'Télécharger',
      downloads: 'téléchargements',
      preview: 'Aperçu',
      relatedMethods: 'Méthodes liées',
    },
    // Contact
    contact: {
      title: 'Contact',
      subtitle: 'Sollicitez l\'équipe UX',
      form: {
        name: 'Nom',
        email: 'Email',
        department: 'Département',
        requestType: 'Type de demande',
        newProject: 'Nouveau projet',
        methodQuestion: 'Question méthodologique',
        other: 'Autre',
        projectName: 'Nom du projet',
        description: 'Description de la demande',
        timeline: 'Échéance souhaitée',
        attachments: 'Pièces jointes',
        submit: 'Envoyer',
        success: 'Votre demande a été envoyée avec succès !',
        successDetail: 'Notre équipe vous recontactera sous 48h.',
      },
      selectDepartment: 'Sélectionnez un département',
      departments: {
        it: 'IT',
        marketing: 'Marketing',
        sales: 'Commercial',
        hr: 'Ressources Humaines',
        finance: 'Finance',
        operations: 'Opérations',
        other: 'Autre',
      },
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      noResults: 'Aucun résultat',
      viewMore: 'Voir plus',
      viewDetails: 'Voir détails',
      back: 'Retour',
      language: 'Langue',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      guide: 'UX Guide',
      methods: 'UX Methods',
      projects: 'Projects',
      library: 'Library',
      convince: 'Convince',
      contact: 'Contact',
      faq: 'FAQ',
    },
    // Home
    home: {
      hero: {
        title: 'Let\'s democratize UX in your IT projects',
        subtitle: 'Discover methods, explore our achievements and access our resources to integrate UX into your projects.',
        cta: 'Discover methods',
        ctaSecondary: 'Contact us',
      },
      methodsBlock: {
        title: 'UX Methods',
        subtitle: 'Methodological toolbox',
        cta: 'View all methods',
      },
      projectsBlock: {
        title: 'Recent Projects',
        subtitle: 'Our achievements and their benefits',
        cta: 'View all projects',
      },
      libraryBlock: {
        title: 'Library',
        subtitle: 'Downloadable resources',
        cta: 'Access library',
      },
      contactBlock: {
        title: 'Need UX support?',
        subtitle: 'Our team is here to help',
        cta: 'Contact us',
      },
    },
    // Methods
    methods: {
      title: 'UX Methods',
      subtitle: 'Methodological toolbox for your projects',
      search: 'Search a method...',
      filters: {
        all: 'All',
        discovery: 'Discovery',
        design: 'Design',
        evaluation: 'Evaluation',
      },
      effort: 'Effort',
      impact: 'Impact',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      whenToUse: 'When to use',
      deliverables: 'Deliverables',
      tips: 'Practical tips',
      relatedResources: 'Related resources',
    },
    // Projects
    projects: {
      title: 'Projects',
      subtitle: 'Gallery of our UX achievements',
      search: 'Search a project...',
      filters: {
        all: 'All',
        byDepartment: 'By department',
        byMethod: 'By method',
        byYear: 'By year',
      },
      context: 'Context',
      objectives: 'Objectives',
      methodsUsed: 'Methods applied',
      deliverables: 'Deliverables',
      benefits: 'Measured benefits',
      testimonial: 'Testimonial',
      before: 'Before',
      after: 'After',
    },
    // Library
    library: {
      title: 'Library',
      subtitle: 'Downloadable UX resources',
      search: 'Search a document...',
      categories: {
        all: 'All',
        templates: 'Templates',
        guides: 'Methodology Guides',
        checklists: 'Checklists',
        presentations: 'Presentations',
        caseStudies: 'Case Studies',
      },
      download: 'Download',
      downloads: 'downloads',
      preview: 'Preview',
      relatedMethods: 'Related methods',
    },
    // Contact
    contact: {
      title: 'Contact',
      subtitle: 'Reach out to the UX team',
      form: {
        name: 'Name',
        email: 'Email',
        department: 'Department',
        requestType: 'Request type',
        newProject: 'New project',
        methodQuestion: 'Methodological question',
        other: 'Other',
        projectName: 'Project name',
        description: 'Request description',
        timeline: 'Desired timeline',
        attachments: 'Attachments',
        submit: 'Submit',
        success: 'Your request has been sent successfully!',
        successDetail: 'Our team will contact you within 48h.',
      },
      selectDepartment: 'Select a department',
      departments: {
        it: 'IT',
        marketing: 'Marketing',
        sales: 'Sales',
        hr: 'Human Resources',
        finance: 'Finance',
        operations: 'Operations',
        other: 'Other',
      },
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      noResults: 'No results',
      viewMore: 'View more',
      viewDetails: 'View details',
      back: 'Back',
      language: 'Language',
    },
  },
}

export function getTranslation(locale: Locale) {
  return translations[locale]
}

