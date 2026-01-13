'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore, useAnalyticsStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { usePathname } from 'next/navigation'
import { Card, Button } from '@/components/ui'
import Link from 'next/link'
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  LightBulbIcon,
  FolderIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  suggestions?: Suggestion[]
}

interface Suggestion {
  label: string
  action: string
  icon?: string
  link?: string
}

const quickSuggestions = {
  fr: [
    { label: 'Comment intégrer l\'UX ?', action: 'guide', icon: 'AcademicCapIcon' },
    { label: 'Quelle méthode utiliser ?', action: 'method_help', icon: 'LightBulbIcon' },
    { label: 'Voir les projets réalisés', action: 'projects', icon: 'FolderIcon' },
    { label: 'Télécharger des templates', action: 'library', icon: 'BookOpenIcon' },
  ],
  en: [
    { label: 'How to integrate UX?', action: 'guide', icon: 'AcademicCapIcon' },
    { label: 'Which method to use?', action: 'method_help', icon: 'LightBulbIcon' },
    { label: 'View completed projects', action: 'projects', icon: 'FolderIcon' },
    { label: 'Download templates', action: 'library', icon: 'BookOpenIcon' },
  ],
}

const methodQuestions = {
  fr: [
    { label: 'Comprendre mes utilisateurs', action: 'discovery' },
    { label: 'Concevoir une interface', action: 'design' },
    { label: 'Évaluer mon produit', action: 'evaluation' },
    { label: 'Je ne sais pas', action: 'all_methods' },
  ],
  en: [
    { label: 'Understand my users', action: 'discovery' },
    { label: 'Design an interface', action: 'design' },
    { label: 'Evaluate my product', action: 'evaluation' },
    { label: 'I don\'t know', action: 'all_methods' },
  ],
}

const botResponses = {
  fr: {
    welcome: 'Bonjour ! 👋 Je suis votre assistant UX. Comment puis-je vous aider ?',
    guide: 'Le guide d\'intégration UX vous explique les 6 étapes clés pour intégrer l\'UX dans vos projets. C\'est le meilleur point de départ !',
    method_help: 'Pour vous recommander la bonne méthode, dites-moi : quel est votre objectif principal ?',
    discovery: 'Pour comprendre vos utilisateurs, je vous recommande :\n\n• **Entretiens utilisateurs** - Pour explorer les besoins\n• **Personas** - Pour synthétiser les profils\n• **Parcours utilisateur** - Pour visualiser l\'expérience',
    design: 'Pour concevoir une interface, je vous recommande :\n\n• **Wireframes** - Pour structurer les écrans\n• **Prototypage** - Pour tester les interactions\n• **Design System** - Pour assurer la cohérence',
    evaluation: 'Pour évaluer votre produit, je vous recommande :\n\n• **Tests utilisateurs** - Avec 5 utilisateurs\n• **Audit UX** - Analyse experte\n• **Analytics UX** - Données comportementales',
    all_methods: 'Pas de problème ! Consultez notre catalogue de 12 méthodes UX, classées par phase (Découverte, Conception, Évaluation).',
    projects: 'Découvrez nos projets réalisés avec leurs résultats mesurés (KPIs avant/après). C\'est inspirant !',
    library: 'Notre bibliothèque contient des templates, guides et checklists téléchargeables pour vous aider.',
    contact: 'Vous pouvez contacter l\'équipe UX via le formulaire. Nous répondons sous 48h !',
    default: 'Je ne suis pas sûr de comprendre. Voici ce que je peux faire pour vous :',
  },
  en: {
    welcome: 'Hello! 👋 I\'m your UX assistant. How can I help you?',
    guide: 'The UX integration guide explains the 6 key steps to integrate UX into your projects. It\'s the best starting point!',
    method_help: 'To recommend the right method, tell me: what is your main goal?',
    discovery: 'To understand your users, I recommend:\n\n• **User Interviews** - To explore needs\n• **Personas** - To synthesize profiles\n• **User Journey** - To visualize the experience',
    design: 'To design an interface, I recommend:\n\n• **Wireframes** - To structure screens\n• **Prototyping** - To test interactions\n• **Design System** - To ensure consistency',
    evaluation: 'To evaluate your product, I recommend:\n\n• **Usability Testing** - With 5 users\n• **UX Audit** - Expert analysis\n• **UX Analytics** - Behavioral data',
    all_methods: 'No problem! Check out our catalog of 12 UX methods, organized by phase (Discovery, Design, Evaluation).',
    projects: 'Discover our completed projects with measured results (before/after KPIs). It\'s inspiring!',
    library: 'Our library contains downloadable templates, guides and checklists to help you.',
    contact: 'You can contact the UX team via the form. We respond within 48h!',
    default: 'I\'m not sure I understand. Here\'s what I can do for you:',
  },
}

const iconMap: Record<string, typeof LightBulbIcon> = {
  AcademicCapIcon,
  LightBulbIcon,
  FolderIcon,
  BookOpenIcon,
}

export function ChatBot() {
  const { locale } = useAppStore()
  const { addEntry } = useAnalyticsStore()
  const pathname = usePathname()
  const t = getTranslation(locale)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: botResponses[locale].welcome,
          suggestions: quickSuggestions[locale].map(s => ({ ...s, label: s.label })),
        },
      ])
    }
  }, [isOpen, locale, messages.length])

  const handleSuggestionClick = (action: string) => {
    let userMessage = ''
    let botResponse = ''
    let suggestions: Suggestion[] | undefined

    switch (action) {
      case 'guide':
        userMessage = locale === 'fr' ? 'Comment intégrer l\'UX ?' : 'How to integrate UX?'
        botResponse = botResponses[locale].guide
        suggestions = [{ label: locale === 'fr' ? 'Voir le guide' : 'View guide', action: 'link', link: '/guide' }]
        break
      case 'method_help':
        userMessage = locale === 'fr' ? 'Quelle méthode utiliser ?' : 'Which method to use?'
        botResponse = botResponses[locale].method_help
        suggestions = methodQuestions[locale]
        break
      case 'discovery':
        userMessage = locale === 'fr' ? 'Comprendre mes utilisateurs' : 'Understand my users'
        botResponse = botResponses[locale].discovery
        suggestions = [{ label: locale === 'fr' ? 'Voir les méthodes' : 'View methods', action: 'link', link: '/methodes' }]
        break
      case 'design':
        userMessage = locale === 'fr' ? 'Concevoir une interface' : 'Design an interface'
        botResponse = botResponses[locale].design
        suggestions = [{ label: locale === 'fr' ? 'Voir les méthodes' : 'View methods', action: 'link', link: '/methodes' }]
        break
      case 'evaluation':
        userMessage = locale === 'fr' ? 'Évaluer mon produit' : 'Evaluate my product'
        botResponse = botResponses[locale].evaluation
        suggestions = [{ label: locale === 'fr' ? 'Voir les méthodes' : 'View methods', action: 'link', link: '/methodes' }]
        break
      case 'all_methods':
        userMessage = locale === 'fr' ? 'Je ne sais pas' : 'I don\'t know'
        botResponse = botResponses[locale].all_methods
        suggestions = [{ label: locale === 'fr' ? 'Explorer les méthodes' : 'Explore methods', action: 'link', link: '/methodes' }]
        break
      case 'projects':
        userMessage = locale === 'fr' ? 'Voir les projets réalisés' : 'View completed projects'
        botResponse = botResponses[locale].projects
        suggestions = [{ label: locale === 'fr' ? 'Voir les projets' : 'View projects', action: 'link', link: '/projets' }]
        break
      case 'library':
        userMessage = locale === 'fr' ? 'Télécharger des templates' : 'Download templates'
        botResponse = botResponses[locale].library
        suggestions = [{ label: locale === 'fr' ? 'Accéder à la bibliothèque' : 'Access library', action: 'link', link: '/bibliotheque' }]
        break
      case 'link':
        return // Links are handled by the Link component
      default:
        botResponse = botResponses[locale].default
        suggestions = quickSuggestions[locale]
    }

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), type: 'user', content: userMessage },
      { id: (Date.now() + 1).toString(), type: 'bot', content: botResponse, suggestions },
    ]
    setMessages(newMessages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')

    // Log to analytics
    addEntry({
      type: 'chatbot',
      query: userMessage,
      page: pathname,
    })

    // Simple keyword matching
    let botResponse = botResponses[locale].default
    let suggestions: Suggestion[] = quickSuggestions[locale]

    const lowerInput = userMessage.toLowerCase()
    
    if (lowerInput.includes('méthode') || lowerInput.includes('method')) {
      botResponse = botResponses[locale].method_help
      suggestions = methodQuestions[locale]
    } else if (lowerInput.includes('guide') || lowerInput.includes('intégrer') || lowerInput.includes('integrate')) {
      botResponse = botResponses[locale].guide
      suggestions = [{ label: locale === 'fr' ? 'Voir le guide' : 'View guide', action: 'link', link: '/guide' }]
    } else if (lowerInput.includes('projet') || lowerInput.includes('project')) {
      botResponse = botResponses[locale].projects
      suggestions = [{ label: locale === 'fr' ? 'Voir les projets' : 'View projects', action: 'link', link: '/projets' }]
    } else if (lowerInput.includes('template') || lowerInput.includes('télécharger') || lowerInput.includes('download')) {
      botResponse = botResponses[locale].library
      suggestions = [{ label: locale === 'fr' ? 'Accéder à la bibliothèque' : 'Access library', action: 'link', link: '/bibliotheque' }]
    } else if (lowerInput.includes('contact') || lowerInput.includes('aide') || lowerInput.includes('help')) {
      botResponse = botResponses[locale].contact
      suggestions = [{ label: locale === 'fr' ? 'Nous contacter' : 'Contact us', action: 'link', link: '/contact' }]
    }

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), type: 'user', content: userMessage },
      { id: (Date.now() + 1).toString(), type: 'bot', content: botResponse, suggestions },
    ]
    setMessages(newMessages)
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-surface-200 text-surface-600 rotate-0' 
            : 'bg-ux-600 text-white hover:bg-ux-700 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] animate-in slide-in-from-bottom-4 fade-in duration-300">
          <Card className="flex flex-col h-[500px] max-h-[70vh] shadow-2xl border-surface-200">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-surface-200 bg-gradient-to-r from-ux-600 to-ux-700 text-white rounded-t-xl -m-4 mb-0">
              <div className="p-2 bg-white/20 rounded-lg">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold">Assistant UX</h3>
                <p className="text-xs text-white/70">
                  {locale === 'fr' ? 'Je suis là pour vous aider' : 'I\'m here to help'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`p-3 rounded-2xl text-sm ${
                        message.type === 'user'
                          ? 'bg-ux-600 text-white rounded-br-md'
                          : 'bg-surface-100 text-surface-900 rounded-bl-md'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          suggestion.link ? (
                            <Link key={i} href={suggestion.link} onClick={() => setIsOpen(false)}>
                              <button className="px-3 py-1.5 text-xs font-medium bg-white border border-ux-200 text-ux-700 rounded-full hover:bg-ux-50 transition-colors">
                                {suggestion.label}
                              </button>
                            </Link>
                          ) : (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion.action)}
                              className="px-3 py-1.5 text-xs font-medium bg-white border border-surface-200 text-surface-700 rounded-full hover:bg-surface-50 transition-colors flex items-center gap-1"
                            >
                              {suggestion.icon && iconMap[suggestion.icon] && (
                                (() => {
                                  const Icon = iconMap[suggestion.icon]
                                  return <Icon className="h-3 w-3" />
                                })()
                              )}
                              {suggestion.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-surface-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={locale === 'fr' ? 'Posez votre question...' : 'Ask your question...'}
                  className="flex-1 px-4 py-2 text-sm border border-surface-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ux-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-ux-600 text-white rounded-full hover:bg-ux-700 transition-colors"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

