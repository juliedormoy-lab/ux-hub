'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Input } from '@/components/ui'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import { useState } from 'react'
import {
  EnvelopeIcon,
  CheckCircleIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline'

type RequestType = 'newProject' | 'methodQuestion' | 'other'

export default function ContactPage() {
  const { locale } = useAppStore()
  const t = getTranslation(locale)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    requestType: 'newProject' as RequestType,
    projectName: '',
    description: '',
    timeline: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const requestTypeLabels = {
      newProject: locale === 'fr' ? 'Nouveau projet' : 'New project',
      methodQuestion: locale === 'fr' ? 'Question méthodologique' : 'Methodology question',
      other: locale === 'fr' ? 'Autre' : 'Other',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE', // Remplacer par la vraie clé
          subject: `[UX Hub] ${requestTypeLabels[formData.requestType]}${formData.projectName ? ` - ${formData.projectName}` : ''}`,
          from_name: formData.name,
          email: formData.email,
          department: formData.department,
          request_type: requestTypeLabels[formData.requestType],
          project_name: formData.projectName || 'N/A',
          timeline: formData.timeline || 'Non spécifié',
          message: formData.description,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert(locale === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Error sending. Please try again.')
      }
    } catch (error) {
      alert(locale === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Error sending. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <MainLayout
        title={t.contact.title}
        breadcrumb={[
          { label: t.nav.home, href: '/' },
          { label: t.contact.title },
        ]}
      >
        <Card className="max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-surface-900 mb-2">
            {t.contact.form.success}
          </h2>
          <p className="text-surface-500 mb-6">{t.contact.form.successDetail}</p>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            {locale === 'fr' ? 'Envoyer une autre demande' : 'Send another request'}
          </Button>
        </Card>
      </MainLayout>
    )
  }

  return (
    <MainLayout
      title={t.contact.title}
      subtitle={t.contact.subtitle}
      breadcrumb={[
        { label: t.nav.home, href: '/' },
        { label: t.contact.title },
      ]}
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-200">
            <div className="p-3 bg-ux-100 rounded-xl">
              <EnvelopeIcon className="h-6 w-6 text-ux-600" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-surface-900">
                {locale === 'fr' ? 'Formulaire de contact' : 'Contact form'}
              </h2>
              <p className="text-sm text-surface-500">
                {locale === 'fr' ? 'Tous les champs marqués * sont obligatoires' : 'All fields marked * are required'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={`${t.contact.form.name} *`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label={`${t.contact.form.email} *`}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">
                {t.contact.form.department} *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500"
                required
              >
                <option value="">{t.contact.selectDepartment}</option>
                {Object.entries(t.contact.departments).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            {/* Request Type */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-3">
                {t.contact.form.requestType} *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'newProject', label: t.contact.form.newProject },
                  { value: 'methodQuestion', label: t.contact.form.methodQuestion },
                  { value: 'other', label: t.contact.form.other },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.requestType === option.value
                        ? 'border-ux-500 bg-ux-50'
                        : 'border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="requestType"
                      value={option.value}
                      checked={formData.requestType === option.value}
                      onChange={(e) => setFormData({ ...formData, requestType: e.target.value as RequestType })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.requestType === option.value ? 'border-ux-500' : 'border-surface-300'
                    }`}>
                      {formData.requestType === option.value && (
                        <div className="w-2 h-2 rounded-full bg-ux-500" />
                      )}
                    </div>
                    <span className="text-sm text-surface-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Name (conditional) */}
            {formData.requestType === 'newProject' && (
              <Input
                label={t.contact.form.projectName}
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              />
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">
                {t.contact.form.description} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-surface-300 focus:outline-none focus:ring-2 focus:ring-ux-500 resize-none"
                required
              />
            </div>

            {/* Timeline */}
            <Input
              label={t.contact.form.timeline}
              type="date"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            />

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">
                {t.contact.form.attachments}
              </label>
              <div className="border-2 border-dashed border-surface-300 rounded-lg p-6 text-center hover:border-ux-400 transition-colors cursor-pointer">
                <PaperClipIcon className="h-8 w-8 text-surface-400 mx-auto mb-2" />
                <p className="text-sm text-surface-500">
                  {locale === 'fr' ? 'Glissez vos fichiers ici ou cliquez pour sélectionner' : 'Drag files here or click to select'}
                </p>
                <p className="text-xs text-surface-400 mt-1">
                  PDF, DOCX, PPTX, PNG, JPG (max 10MB)
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full" 
              leftIcon={<EnvelopeIcon className="h-4 w-4" />}
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...') 
                : t.contact.form.submit}
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}

