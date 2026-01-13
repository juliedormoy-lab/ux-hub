'use client'

import { MainLayout } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { useState, useEffect } from 'react'
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  UsersIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

interface Stats {
  totalProjects: number
  completedProjects: number
  totalResources: number
  totalFeedbacks: number
  implementationRate: number
  avgTimeToFeedback: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = stats ? [
    {
      title: 'Projets terminés',
      value: stats.completedProjects,
      total: stats.totalProjects,
      icon: CheckCircleIcon,
      color: 'text-success-500',
      bgColor: 'bg-success-50',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Ressources',
      value: stats.totalResources,
      icon: DocumentTextIcon,
      color: 'text-ux-500',
      bgColor: 'bg-ux-50',
      trend: '+8',
      trendUp: true,
    },
    {
      title: 'Feedbacks collectés',
      value: stats.totalFeedbacks,
      icon: ChatBubbleLeftRightIcon,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      trend: '+5',
      trendUp: true,
    },
    {
      title: "Taux d'implémentation",
      value: `${stats.implementationRate}%`,
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      trend: '+5%',
      trendUp: true,
    },
  ] : []

  return (
    <MainLayout
      title="Dashboard"
      subtitle="Métriques et KPIs de l'impact UX"
    >
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-10 w-10 bg-surface-100 rounded-lg mb-4" />
              <div className="h-6 bg-surface-100 rounded w-1/2 mb-2" />
              <div className="h-4 bg-surface-100 rounded w-3/4" />
            </Card>
          ))
        ) : (
          statCards.map((stat, index) => (
            <Card key={index}>
              <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
                  {stat.total && (
                    <p className="text-sm text-surface-400">sur {stat.total}</p>
                  )}
                  <p className="text-sm text-surface-500 mt-1">{stat.title}</p>
                </div>
                <Badge variant={stat.trendUp ? 'success' : 'error'} className="flex items-center gap-1">
                  {stat.trendUp ? (
                    <ArrowTrendingUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3" />
                  )}
                  {stat.trend}
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-display font-semibold text-surface-900 mb-4">
            Évolution des projets
          </h3>
          <div className="h-64 bg-surface-50 rounded-lg flex items-center justify-center">
            <p className="text-surface-400">Graphique à venir</p>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-display font-semibold text-surface-900 mb-4">
            Répartition par équipe
          </h3>
          <div className="h-64 bg-surface-50 rounded-lg flex items-center justify-center">
            <p className="text-surface-400">Graphique à venir</p>
          </div>
        </Card>
      </div>

      {/* Quick wins */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold text-surface-900">Quick Wins identifiés</h3>
          <Badge variant="success">3 nouveaux</Badge>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Améliorer les messages d\'erreur formulaires', impact: 'HIGH', effort: 'LOW' },
            { title: 'Ajouter un indicateur de progression', impact: 'MEDIUM', effort: 'LOW' },
            { title: 'Optimiser les temps de chargement', impact: 'HIGH', effort: 'MEDIUM' },
          ].map((qw, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
              <span className="text-surface-700">{qw.title}</span>
              <div className="flex items-center gap-2">
                <Badge variant={qw.impact === 'HIGH' ? 'success' : 'warning'}>
                  Impact {qw.impact === 'HIGH' ? 'élevé' : 'moyen'}
                </Badge>
                <Badge variant={qw.effort === 'LOW' ? 'primary' : 'default'}>
                  Effort {qw.effort === 'LOW' ? 'faible' : 'moyen'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </MainLayout>
  )
}
