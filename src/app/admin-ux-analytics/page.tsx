'use client'

import { useState, useEffect } from 'react'
import { useAnalyticsStore, useFeedbackStore } from '@/store'
import { MainLayout } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  LightBulbIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  BugAntIcon,
  HeartIcon,
  StarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { uxMethods } from '@/data/methods'
import { faqItems } from '@/data/faq'

export default function AdminAnalyticsPage() {
  const { entries, clearEntries } = useAnalyticsStore()
  const { feedbacks, updateFeedbackStatus, clearFeedbacks } = useFeedbackStore()
  const [filter, setFilter] = useState<'all' | 'search' | 'chatbot'>('all')
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'analytics' | 'feedbacks'>('analytics')

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true
    return entry.type === filter
  })

  const searchCount = entries.filter(e => e.type === 'search').length
  const chatbotCount = entries.filter(e => e.type === 'chatbot').length

  // Grouper les requêtes par fréquence
  const queryFrequency = entries.reduce((acc, entry) => {
    const key = entry.query.toLowerCase().trim()
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topQueries = Object.entries(queryFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  // Générer des suggestions intelligentes basées sur les recherches
  const generateSuggestions = () => {
    const suggestions: {
      id: string
      type: 'add_content' | 'add_faq' | 'improve' | 'trending'
      priority: 'high' | 'medium' | 'low'
      title: string
      description: string
      query: string
      count: number
      action: string
    }[] = []

    // Mots-clés du contenu existant (méthodes UX)
    const existingMethodKeywords = uxMethods.flatMap(m => [
      m.name.fr.toLowerCase(),
      m.name.en.toLowerCase(),
      m.slug,
    ])

    // Mots-clés des FAQ existantes
    const existingFaqKeywords = faqItems.flatMap(f => [
      ...f.question.fr.toLowerCase().split(' '),
      ...f.question.en.toLowerCase().split(' '),
    ])

    // Analyser chaque requête fréquente
    topQueries.forEach(([query, count]) => {
      const queryLower = query.toLowerCase()
      
      // Vérifier si la requête correspond à du contenu existant
      const matchesMethod = existingMethodKeywords.some(kw => 
        queryLower.includes(kw) || kw.includes(queryLower)
      )
      
      const matchesFaq = existingFaqKeywords.some(kw => 
        queryLower.includes(kw) && kw.length > 3
      )

      // Questions du chatbot sans réponse claire
      const chatbotQueries = entries.filter(e => 
        e.type === 'chatbot' && e.query.toLowerCase().includes(queryLower)
      )

      // Suggestions basées sur l'analyse
      if (count >= 3 && !matchesMethod && !matchesFaq) {
        // Recherche fréquente sans contenu correspondant
        suggestions.push({
          id: `add-${query}`,
          type: 'add_content',
          priority: count >= 5 ? 'high' : 'medium',
          title: `Ajouter du contenu sur "${query}"`,
          description: `${count} recherches sur ce sujet sans contenu correspondant.`,
          query,
          count,
          action: 'Créer une nouvelle méthode ou ressource',
        })
      }

      if (chatbotQueries.length >= 2 && !matchesFaq) {
        // Question chatbot récurrente → ajouter à la FAQ
        suggestions.push({
          id: `faq-${query}`,
          type: 'add_faq',
          priority: chatbotQueries.length >= 4 ? 'high' : 'medium',
          title: `Ajouter à la FAQ : "${query}"`,
          description: `${chatbotQueries.length} fois posée au chatbot.`,
          query,
          count: chatbotQueries.length,
          action: 'Ajouter une entrée FAQ',
        })
      }

      if (count >= 2 && matchesMethod) {
        // Recherche fréquente sur contenu existant → améliorer visibilité
        suggestions.push({
          id: `improve-${query}`,
          type: 'improve',
          priority: 'low',
          title: `Améliorer la visibilité de "${query}"`,
          description: `${count} recherches - le contenu existe mais est peut-être difficile à trouver.`,
          query,
          count,
          action: 'Optimiser le référencement ou la navigation',
        })
      }
    })

    // Détecter les tendances (recherches récentes qui augmentent)
    const recentEntries = entries.filter(e => {
      const date = new Date(e.timestamp)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date > weekAgo
    })

    const recentFrequency = recentEntries.reduce((acc, entry) => {
      const key = entry.query.toLowerCase().trim()
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    Object.entries(recentFrequency)
      .filter(([, count]) => count >= 3)
      .forEach(([query, count]) => {
        if (!suggestions.find(s => s.query === query)) {
          suggestions.push({
            id: `trending-${query}`,
            type: 'trending',
            priority: 'medium',
            title: `Tendance : "${query}"`,
            description: `${count} recherches cette semaine - sujet en hausse.`,
            query,
            count,
            action: 'Surveiller et potentiellement créer du contenu',
          })
        }
      })

    // Trier par priorité et limiter
    return suggestions
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
      .slice(0, 8)
  }

  const suggestions = generateSuggestions()

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'add_content': return PlusCircleIcon
      case 'add_faq': return QuestionMarkCircleIcon
      case 'improve': return PencilSquareIcon
      case 'trending': return LightBulbIcon
      default: return LightBulbIcon
    }
  }

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'add_content': return 'bg-blue-100 text-blue-600'
      case 'add_faq': return 'bg-purple-100 text-purple-600'
      case 'improve': return 'bg-amber-100 text-amber-600'
      case 'trending': return 'bg-green-100 text-green-600'
      default: return 'bg-surface-100 text-surface-600'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return { label: 'Haute', color: 'bg-red-100 text-red-700' }
      case 'medium': return { label: 'Moyenne', color: 'bg-amber-100 text-amber-700' }
      case 'low': return { label: 'Basse', color: 'bg-surface-100 text-surface-600' }
      default: return { label: '', color: '' }
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!mounted) {
    return null
  }

  const newFeedbacksCount = feedbacks.filter(f => f.status === 'new').length

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return LightBulbIcon
      case 'bug': return BugAntIcon
      case 'question': return QuestionMarkCircleIcon
      case 'compliment': return HeartIcon
      default: return ChatBubbleLeftEllipsisIcon
    }
  }

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'bg-amber-100 text-amber-600'
      case 'bug': return 'bg-red-100 text-red-600'
      case 'question': return 'bg-blue-100 text-blue-600'
      case 'compliment': return 'bg-pink-100 text-pink-600'
      default: return 'bg-surface-100 text-surface-600'
    }
  }

  return (
    <MainLayout
      title="Admin"
      subtitle="Analytics et Feedbacks"
      breadcrumb={[
        { label: 'Accueil', href: '/' },
        { label: 'Admin' },
      ]}
      actions={
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            leftIcon={<ArrowPathIcon className="h-4 w-4" />}
            onClick={() => window.location.reload()}
          >
            Rafraîchir
          </Button>
        </div>
      }
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'analytics'
              ? 'bg-ux-600 text-white shadow-lg'
              : 'bg-white border border-surface-200 text-surface-600 hover:border-ux-300'
          }`}
        >
          <ChartBarIcon className="h-5 w-5" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('feedbacks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'feedbacks'
              ? 'bg-ux-600 text-white shadow-lg'
              : 'bg-white border border-surface-200 text-surface-600 hover:border-ux-300'
          }`}
        >
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          Feedbacks
          {newFeedbacksCount > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
              {newFeedbacksCount}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'analytics' && (
        <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-surface-900">{entries.length}</p>
            <p className="text-sm text-surface-500">Total entrées</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <MagnifyingGlassIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-surface-900">{searchCount}</p>
            <p className="text-sm text-surface-500">Recherches</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-surface-900">{chatbotCount}</p>
            <p className="text-sm text-surface-500">Questions chatbot</p>
          </div>
        </Card>
      </div>

      {/* Suggestions intelligentes */}
      <Card className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
            <LightBulbIcon className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-display font-bold text-surface-900">
              💡 Suggestions de contenu
            </h2>
            <p className="text-xs text-surface-500">
              Basées sur les recherches et questions des utilisateurs
            </p>
          </div>
        </div>

        {suggestions.length === 0 ? (
          <div className="text-center py-8 bg-surface-50 rounded-xl">
            <CheckCircleIcon className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <p className="text-surface-600 font-medium">Aucune suggestion pour le moment</p>
            <p className="text-sm text-surface-400 mt-1">
              Les suggestions apparaîtront quand des patterns seront détectés dans les recherches
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion) => {
              const Icon = getSuggestionIcon(suggestion.type)
              const colorClass = getSuggestionColor(suggestion.type)
              const priorityBadge = getPriorityBadge(suggestion.priority)
              
              return (
                <div 
                  key={suggestion.id}
                  className="p-4 bg-surface-50 rounded-xl border border-surface-100 hover:border-surface-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-surface-900 truncate">
                          {suggestion.title}
                        </h3>
                        <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${priorityBadge.color}`}>
                          {priorityBadge.label}
                        </span>
                      </div>
                      <p className="text-xs text-surface-500 mb-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-surface-400">
                          Action : <span className="text-surface-600">{suggestion.action}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-surface-100">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-100"></div>
                <span className="text-surface-500">Ajouter contenu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-100"></div>
                <span className="text-surface-500">Ajouter FAQ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-100"></div>
                <span className="text-surface-500">Améliorer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-100"></div>
                <span className="text-surface-500">Tendance</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Queries */}
        <Card className="lg:col-span-1">
          <h2 className="font-display font-bold text-surface-900 mb-4">
            🔥 Top requêtes
          </h2>
          {topQueries.length === 0 ? (
            <p className="text-surface-500 text-sm">Aucune requête pour le moment</p>
          ) : (
            <div className="space-y-2">
              {topQueries.map(([query, count], i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-surface-50 rounded-lg">
                  <span className="text-sm text-surface-700 truncate flex-1 mr-2">
                    {query}
                  </span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Liste des entrées */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-surface-900">
              📝 Historique
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filter === 'all' 
                    ? 'bg-ux-600 text-white' 
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                Tout ({entries.length})
              </button>
              <button
                onClick={() => setFilter('search')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filter === 'search' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                Recherches ({searchCount})
              </button>
              <button
                onClick={() => setFilter('chatbot')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filter === 'chatbot' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                Chatbot ({chatbotCount})
              </button>
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-12 w-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500">Aucune entrée pour le moment</p>
              <p className="text-sm text-surface-400 mt-1">
                Les recherches et questions du chatbot apparaîtront ici
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className="flex items-start gap-3 p-3 bg-surface-50 rounded-lg"
                >
                  <div className={`p-1.5 rounded-lg ${
                    entry.type === 'search' 
                      ? 'bg-purple-100' 
                      : 'bg-green-100'
                  }`}>
                    {entry.type === 'search' ? (
                      <MagnifyingGlassIcon className="h-4 w-4 text-purple-600" />
                    ) : (
                      <ChatBubbleLeftRightIcon className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-surface-900 font-medium break-words">
                      "{entry.query}"
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {entry.page}
                      </Badge>
                      <span className="text-xs text-surface-400 flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-surface-400 mt-8">
        🔒 Données stockées localement dans votre navigateur
      </p>
        </>
      )}

      {/* Feedbacks Tab */}
      {activeTab === 'feedbacks' && (
        <>
          {/* Stats feedbacks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">{feedbacks.length}</p>
                <p className="text-sm text-surface-500">Total feedbacks</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">{newFeedbacksCount}</p>
                <p className="text-sm text-surface-500">Nouveaux</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <LightBulbIcon className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">
                  {feedbacks.filter(f => f.type === 'suggestion').length}
                </p>
                <p className="text-sm text-surface-500">Suggestions</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <HeartIcon className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">
                  {feedbacks.filter(f => f.rating && f.rating >= 4).length}
                </p>
                <p className="text-sm text-surface-500">Satisfaits (4-5★)</p>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="secondary" 
              size="sm"
              leftIcon={<TrashIcon className="h-4 w-4" />}
              onClick={() => {
                if (confirm('Supprimer tous les feedbacks ?')) {
                  clearFeedbacks()
                }
              }}
            >
              Vider les feedbacks
            </Button>
          </div>

          {/* Liste des feedbacks */}
          <Card>
            <h2 className="font-display font-bold text-surface-900 mb-4">
              📬 Feedbacks reçus
            </h2>
            {feedbacks.length === 0 ? (
              <div className="text-center py-12">
                <ChatBubbleLeftEllipsisIcon className="h-12 w-12 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-500">Aucun feedback pour le moment</p>
                <p className="text-sm text-surface-400 mt-1">
                  Les feedbacks des utilisateurs apparaîtront ici
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbacks.map((feedback) => {
                  const TypeIcon = getFeedbackTypeIcon(feedback.type)
                  const typeColor = getFeedbackTypeColor(feedback.type)
                  return (
                    <div 
                      key={feedback.id} 
                      className={`p-4 rounded-xl border ${
                        feedback.status === 'new' 
                          ? 'bg-blue-50 border-blue-200' 
                          : feedback.status === 'resolved'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-surface-50 border-surface-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${typeColor}`}>
                            <TypeIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-surface-900 capitalize">
                                {feedback.type}
                              </span>
                              {feedback.status === 'new' && (
                                <Badge className="bg-blue-500 text-white text-xs">Nouveau</Badge>
                              )}
                              {feedback.status === 'resolved' && (
                                <Badge className="bg-green-500 text-white text-xs">Résolu</Badge>
                              )}
                            </div>
                            <span className="text-xs text-surface-400">
                              {formatDate(feedback.timestamp)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {feedback.status !== 'resolved' && (
                            <button
                              onClick={() => updateFeedbackStatus(feedback.id, feedback.status === 'new' ? 'read' : 'resolved')}
                              className="text-xs px-2 py-1 bg-surface-100 text-surface-600 rounded hover:bg-surface-200"
                            >
                              {feedback.status === 'new' ? 'Marquer lu' : 'Résoudre'}
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-surface-700 mb-3 whitespace-pre-wrap">
                        {feedback.message}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        {feedback.rating && (
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              star <= feedback.rating! ? (
                                <StarIconSolid key={star} className="h-4 w-4 text-amber-400" />
                              ) : (
                                <StarIcon key={star} className="h-4 w-4 text-surface-300" />
                              )
                            ))}
                          </div>
                        )}
                        {feedback.email && (
                          <div className="flex items-center gap-1 text-surface-500">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span>{feedback.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

          <p className="text-center text-xs text-surface-400 mt-8">
            🔒 Données stockées localement dans votre navigateur
          </p>
        </>
      )}
    </MainLayout>
  )
}
