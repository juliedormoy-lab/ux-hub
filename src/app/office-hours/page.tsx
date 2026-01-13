'use client'

import { MainLayout } from '@/components/layout'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import { useState, useEffect } from 'react'
import {
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'

interface OfficeHour {
  id: string
  title: string
  description: string | null
  consultationType: string
  date: string
  startTime: string
  endTime: string
  maxBookings: number
  host: {
    name: string
    avatar: string | null
  }
  _count: {
    bookings: number
  }
}

export default function OfficeHoursPage() {
  const [officeHours, setOfficeHours] = useState<OfficeHour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOfficeHours()
  }, [])

  const fetchOfficeHours = async () => {
    try {
      const res = await fetch('/api/office-hours')
      const data = await res.json()
      setOfficeHours(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const typeLabels: Record<string, string> = {
    REVIEW: 'Review de designs',
    CONSULTATION: 'Consultation',
    WORKSHOP: 'Workshop',
  }

  return (
    <MainLayout
      title="Office Hours"
      subtitle="Réservez des créneaux de consultation UX"
      actions={
        <Button leftIcon={<PlusIcon className="h-4 w-4" />}>Créer un créneau</Button>
      }
    >
      {/* Calendar view placeholder */}
      <Card className="mb-6 p-8 text-center bg-gradient-to-br from-ux-50 to-surface-50">
        <CalendarIcon className="h-12 w-12 text-ux-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-surface-900 mb-2">Vue calendrier</h3>
        <p className="text-surface-500">La vue calendrier sera disponible prochainement.</p>
      </Card>

      {/* Upcoming sessions */}
      <h2 className="text-lg font-display font-semibold text-surface-900 mb-4">Créneaux disponibles</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-6 bg-surface-100 rounded w-1/2 mb-2" />
              <div className="h-4 bg-surface-100 rounded w-full" />
            </Card>
          ))}
        </div>
      ) : officeHours.length === 0 ? (
        <Card className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Aucun créneau disponible</h3>
          <p className="text-surface-500">Les créneaux seront bientôt publiés.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officeHours.map((oh) => {
            const spotsLeft = oh.maxBookings - oh._count.bookings
            return (
              <Card key={oh.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="primary">{typeLabels[oh.consultationType] || oh.consultationType}</Badge>
                  <span className={`text-sm font-medium ${spotsLeft > 0 ? 'text-success-600' : 'text-error-500'}`}>
                    {spotsLeft > 0 ? `${spotsLeft} place${spotsLeft > 1 ? 's' : ''} disponible${spotsLeft > 1 ? 's' : ''}` : 'Complet'}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">{oh.title}</h3>
                {oh.description && (
                  <p className="text-sm text-surface-500 mb-4">{oh.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-surface-500 mb-4">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {formatDate(oh.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {oh.startTime} - {oh.endTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserGroupIcon className="h-4 w-4" />
                    Max {oh.maxBookings}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                  <div className="flex items-center gap-2">
                    <Avatar src={oh.host.avatar} name={oh.host.name} size="sm" />
                    <span className="text-sm text-surface-600">{oh.host.name}</span>
                  </div>
                  <Button size="sm" disabled={spotsLeft === 0}>
                    {spotsLeft > 0 ? 'Réserver' : 'Complet'}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </MainLayout>
  )
}
