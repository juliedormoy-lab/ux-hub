import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'julie@example.com' },
    update: {},
    create: {
      email: 'julie@example.com',
      name: 'Julie Dormoy',
      role: 'ADMIN',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julie',
    },
  })

  const contributor = await prisma.user.upsert({
    where: { email: 'thomas@example.com' },
    update: {},
    create: {
      email: 'thomas@example.com',
      name: 'Thomas Martin',
      role: 'CONTRIBUTOR',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    },
  })

  const reader = await prisma.user.upsert({
    where: { email: 'marie@example.com' },
    update: {},
    create: {
      email: 'marie@example.com',
      name: 'Marie Dupont',
      role: 'READER',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'guidelines' },
      update: {},
      create: {
        name: 'Guidelines',
        slug: 'guidelines',
        description: 'Standards et bonnes pratiques UX',
        icon: 'BookOpenIcon',
        color: '#0c8ee9',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'templates' },
      update: {},
      create: {
        name: 'Templates',
        slug: 'templates',
        description: 'Modèles et gabarits réutilisables',
        icon: 'DocumentDuplicateIcon',
        color: '#10b981',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'checklists' },
      update: {},
      create: {
        name: 'Checklists',
        slug: 'checklists',
        description: 'Listes de vérification UX',
        icon: 'ClipboardDocumentCheckIcon',
        color: '#f59e0b',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'patterns' },
      update: {},
      create: {
        name: 'Design Patterns',
        slug: 'patterns',
        description: 'Patterns UI/UX éprouvés',
        icon: 'Squares2X2Icon',
        color: '#8b5cf6',
      },
    }),
  ])

  // Create resources
  await prisma.resource.upsert({
    where: { slug: 'guide-design-system' },
    update: {},
    create: {
      title: 'Guide du Design System',
      slug: 'guide-design-system',
      excerpt: 'Documentation complète du design system de l\'entreprise',
      content: `<h2>Introduction au Design System</h2>
<p>Ce guide présente les fondamentaux de notre design system et comment l'utiliser efficacement.</p>
<h3>Principes fondamentaux</h3>
<ul>
<li>Cohérence visuelle</li>
<li>Accessibilité</li>
<li>Réutilisabilité</li>
<li>Scalabilité</li>
</ul>
<h3>Composants</h3>
<p>Notre bibliothèque comprend plus de 50 composants React documentés et testés.</p>`,
      type: 'GUIDE',
      tags: JSON.stringify(['design-system', 'components', 'react']),
      pinned: true,
      categoryId: categories[0].id,
      createdById: admin.id,
      publishedAt: new Date(),
    },
  })

  await prisma.resource.upsert({
    where: { slug: 'checklist-accessibilite' },
    update: {},
    create: {
      title: 'Checklist Accessibilité WCAG',
      slug: 'checklist-accessibilite',
      excerpt: 'Points de contrôle essentiels pour l\'accessibilité',
      content: `<h2>Points de contrôle WCAG essentiels</h2>
<p>Cette checklist couvre les critères WCAG 2.1 niveau AA les plus importants.</p>
<h3>Perceptible</h3>
<ul>
<li>☐ Toutes les images ont un texte alternatif pertinent</li>
<li>☐ Les vidéos ont des sous-titres</li>
<li>☐ Le contraste des couleurs est suffisant (4.5:1 minimum)</li>
<li>☐ Le texte peut être agrandi à 200% sans perte de contenu</li>
<li>☐ L'information n'est pas véhiculée uniquement par la couleur</li>
</ul>
<h3>Utilisable</h3>
<ul>
<li>☐ Toutes les fonctionnalités sont accessibles au clavier</li>
<li>☐ L'ordre de focus est logique</li>
<li>☐ Le focus est visible</li>
<li>☐ Pas de contenu qui clignote plus de 3 fois par seconde</li>
<li>☐ Un mécanisme permet de passer les blocs de navigation</li>
</ul>
<h3>Compréhensible</h3>
<ul>
<li>☐ La langue de la page est déclarée</li>
<li>☐ Les labels des formulaires sont explicites</li>
<li>☐ Les erreurs sont clairement identifiées et expliquées</li>
<li>☐ La navigation est cohérente sur toutes les pages</li>
</ul>
<h3>Robuste</h3>
<ul>
<li>☐ Le HTML est valide</li>
<li>☐ Les composants custom sont compatibles avec les technologies d'assistance</li>
<li>☐ Les messages de statut sont annoncés aux lecteurs d'écran</li>
</ul>`,
      type: 'CHECKLIST',
      tags: JSON.stringify(['accessibilité', 'wcag', 'a11y', 'checklist']),
      pinned: true,
      categoryId: categories[2].id,
      createdById: admin.id,
      publishedAt: new Date(),
    },
  })

  await prisma.resource.upsert({
    where: { slug: 'template-audit-ux' },
    update: {},
    create: {
      title: 'Template Audit UX',
      slug: 'template-audit-ux',
      excerpt: 'Modèle complet pour réaliser un audit UX',
      content: `<h2>Template d'Audit UX</h2>
<p>Utilisez ce template pour structurer vos audits UX de manière professionnelle.</p>
<h3>1. Contexte</h3>
<p>Décrivez le contexte du produit/service audité, les objectifs business et les KPIs.</p>
<h3>2. Méthodologie</h3>
<p>Détaillez les méthodes utilisées : heuristiques, tests utilisateurs, analytics...</p>
<h3>3. Findings</h3>
<p>Listez les problèmes identifiés avec leur sévérité et leur impact.</p>
<h3>4. Recommandations</h3>
<p>Proposez des solutions priorisées avec effort estimé et impact attendu.</p>`,
      type: 'TEMPLATE',
      tags: JSON.stringify(['audit', 'template', 'methodology']),
      pinned: false,
      categoryId: categories[1].id,
      createdById: contributor.id,
      publishedAt: new Date(),
    },
  })

  // Create projects
  await prisma.project.upsert({
    where: { id: 'project-1' },
    update: {},
    create: {
      id: 'project-1',
      title: 'Refonte du parcours de souscription',
      description: 'Optimisation du tunnel de conversion pour augmenter le taux de completion.',
      team: 'Équipe Acquisition',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-15'),
      status: 'COMPLETED',
      tags: JSON.stringify(['redesign', 'conversion', 'forms']),
      context: '<p>Le parcours de souscription actuel présente un taux d\'abandon de 67% à l\'étape 3.</p>',
      analysis: '<p>Analyse des points de friction identifiés via Hotjar et tests utilisateurs.</p>',
      recommendations: '<p>Simplification en 3 étapes au lieu de 5, avec sauvegarde automatique.</p>',
      metrics: JSON.stringify({
        before: { 'Taux completion': '33%', 'Temps moyen': '8min' },
        after: { 'Taux completion': '58%', 'Temps moyen': '4min' }
      }),
      featured: true,
      createdById: admin.id,
    },
  })

  await prisma.project.upsert({
    where: { id: 'project-2' },
    update: {},
    create: {
      id: 'project-2',
      title: 'Audit UX - Espace client mobile',
      description: 'Audit heuristique complet de l\'application mobile espace client.',
      team: 'Équipe Mobile',
      startDate: new Date('2024-02-01'),
      status: 'IN_PROGRESS',
      tags: JSON.stringify(['audit', 'mobile', 'heuristiques']),
      context: '<p>L\'application mobile a reçu des notes basses sur les stores (3.2/5).</p>',
      analysis: '<p>En cours d\'analyse des 10 heuristiques de Nielsen.</p>',
      featured: false,
      createdById: contributor.id,
    },
  })

  // Create feedback requests
  await prisma.feedbackRequest.create({
    data: {
      title: 'Maquettes nouvelle homepage',
      description: 'Review des maquettes Figma pour la nouvelle homepage B2B.',
      figmaUrl: 'https://figma.com/file/xxx',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'PENDING',
      priority: 'HIGH',
      requesterId: contributor.id,
    },
  })

  // Create office hours
  const nextMonday = new Date()
  nextMonday.setDate(nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7))
  
  await prisma.officeHour.create({
    data: {
      title: 'Office Hours UX',
      description: 'Créneau ouvert pour questions UX, reviews de maquettes, conseils...',
      consultationType: 'REVIEW',
      date: nextMonday,
      startTime: '14:00',
      endTime: '15:00',
      maxBookings: 3,
      isRecurring: true,
      recurringDays: JSON.stringify(['monday', 'wednesday']),
      hostId: admin.id,
    },
  })

  // Create quick wins
  await prisma.quickWin.create({
    data: {
      title: 'Améliorer les messages d\'erreur formulaires',
      description: 'Rendre les messages d\'erreur plus explicites et actionables.',
      impact: 'HIGH',
      effort: 'LOW',
      status: 'IDENTIFIED',
      createdById: admin.id,
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
