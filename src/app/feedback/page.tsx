'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import { useAppStore, useFeedbackStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import {
  ChatBubbleLeftEllipsisIcon,
  LightBulbIcon,
  BugAntIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

const feedbackTypes = [
  { id: 'suggestion', icon: LightBulbIcon, color: 'bg-amber-100 text-amber-600 border-amber-200' },
  { id: 'bug', icon: BugAntIcon, color: 'bg-red-100 text-red-600 border-red-200' },
  { id: 'question', icon: QuestionMarkCircleIcon, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: 'compliment', icon: HeartIcon, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: 'other', icon: ChatBubbleLeftEllipsisIcon, color: 'bg-surface-100 text-surface-600 border-surface-200' },
] as const

type FeedbackType = typeof feedbackTypes[number]['id']

export default function FeedbackPage() {
  const { locale } = useAppStore()
  const { addFeedback } = useFeedbackStore()
  const t = getTranslation(locale)

  const [type, setType] = useState<FeedbackType>('suggestion')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  const typeLabels: Record<FeedbackType, { fr: string; en: string }> = {
    suggestion: { fr: 'Suggestion', en: 'Suggestion' },
    bug: { fr: 'Bug / Problème', en: 'Bug / Issue' },
    question: { fr: 'Question', en: 'Question' },
    compliment: { fr: 'Compliment', en: 'Compliment' },
    other: { fr: 'Autre', en: 'Other' },
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setIsSubmitting(true)

    // Stocker localement aussi pour l'admin
    addFeedback({
      type,
      message: message.trim(),
      rating: rating > 0 ? rating : undefined,
      email: email.trim() || undefined,
      page: '/feedback',
    })

    const typeLabelsEmail: Record<FeedbackType, string> = {
      suggestion: 'Suggestion',
      bug: 'Bug / Problème',
      question: 'Question',
      compliment: 'Compliment',
      other: 'Autre',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE', // Remplacer par la vraie clé
          subject: `[UX Hub Feedback] ${typeLabelsEmail[type]}`,
          feedback_type: typeLabelsEmail[type],
          rating: rating > 0 ? `${rating}/5 étoiles` : 'Non noté',
          email: email || 'Non fourni',
          message: message.trim(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setMessage('')
        setRating(0)
        setEmail('')
        setType('suggestion')
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert(locale === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Error sending. Please try again.')
      }
    } catch (error) {
      alert(locale === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Error sending. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout
      title={locale === 'fr' ? 'Votre feedback' : 'Your feedback'}
      subtitle={locale === 'fr' ? 'Aidez-nous à améliorer le UX Hub' : 'Help us improve the UX Hub'}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: locale === 'fr' ? 'Feedback' : 'Feedback' },
      ]}
    >
      {submitted ? (
        <Card className="max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-display font-bold text-surface-900 mb-2">
            {locale === 'fr' ? 'Merci pour votre feedback !' : 'Thank you for your feedback!'}
          </h2>
          <p className="text-surface-500 mb-6">
            {locale === 'fr' 
              ? 'Votre retour nous aide à améliorer continuellement le UX Hub.'
              : 'Your feedback helps us continuously improve the UX Hub.'}
          </p>
          <Button onClick={() => setSubmitted(false)}>
            {locale === 'fr' ? 'Envoyer un autre feedback' : 'Send another feedback'}
          </Button>
        </Card>
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <Card className="mb-6 bg-gradient-to-r from-ux-50 to-blue-50 border-ux-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-ux-100 rounded-xl">
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-ux-600" />
              </div>
              <div>
                <h2 className="font-display font-bold text-surface-900 mb-1">
                  {locale === 'fr' ? 'Votre avis compte' : 'Your opinion matters'}
                </h2>
                <p className="text-sm text-surface-600">
                  {locale === 'fr'
                    ? 'Suggestions, bugs, questions ou compliments - tout feedback est précieux pour améliorer votre expérience.'
                    : 'Suggestions, bugs, questions or compliments - any feedback is valuable to improve your experience.'}
                </p>
              </div>
            </div>
          </Card>

          {/* Formulaire */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de feedback */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-3">
                  {locale === 'fr' ? 'Type de feedback' : 'Feedback type'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {feedbackTypes.map((ft) => {
                    const Icon = ft.icon
                    const isSelected = type === ft.id
                    return (
                      <button
                        key={ft.id}
                        type="button"
                        onClick={() => setType(ft.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? ft.color + ' border-current'
                            : 'border-surface-200 text-surface-500 hover:border-surface-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{typeLabels[ft.id][locale]}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  {locale === 'fr' ? 'Votre message *' : 'Your message *'}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={locale === 'fr' ? 'Décrivez votre feedback en détail...' : 'Describe your feedback in detail...'}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ux-500 resize-none"
                />
              </div>

              {/* Note de satisfaction */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  {locale === 'fr' ? 'Satisfaction globale (optionnel)' : 'Overall satisfaction (optional)'}
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (hoverRating || rating)
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        {isFilled ? (
                          <StarIconSolid className="h-8 w-8 text-amber-400" />
                        ) : (
                          <StarIcon className="h-8 w-8 text-surface-300" />
                        )}
                      </button>
                    )
                  })}
                  {rating > 0 && (
                    <span className="ml-3 text-sm text-surface-500">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  {locale === 'fr' ? 'Email (optionnel, pour suivi)' : 'Email (optional, for follow-up)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === 'fr' ? 'votre.email@exemple.com' : 'your.email@example.com'}
                  className="w-full px-4 py-2.5 border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ux-500"
                />
                <p className="text-xs text-surface-400 mt-1">
                  {locale === 'fr' 
                    ? 'Si vous souhaitez être recontacté concernant votre feedback'
                    : 'If you would like to be contacted about your feedback'}
                </p>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-surface-100">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  leftIcon={<PaperAirplaneIcon className="h-4 w-4" />}
                  disabled={!message.trim() || isSubmitting}
                >
                  {isSubmitting 
                    ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...')
                    : (locale === 'fr' ? 'Envoyer mon feedback' : 'Send my feedback')}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </MainLayout>
  )
}
