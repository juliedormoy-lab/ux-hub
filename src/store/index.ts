import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from '@/lib/i18n'

interface AppState {
  sidebarOpen: boolean
  locale: Locale
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setLocale: (locale: Locale) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      locale: 'fr',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'ux-hub-storage',
      partialize: (state) => ({ locale: state.locale }),
    }
  )
)

// Analytics Store - pour tracker les recherches et questions chatbot
export interface AnalyticsEntry {
  id: string
  type: 'search' | 'chatbot'
  query: string
  page: string
  timestamp: string
}

interface AnalyticsState {
  entries: AnalyticsEntry[]
  addEntry: (entry: Omit<AnalyticsEntry, 'id' | 'timestamp'>) => void
  clearEntries: () => void
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => set((state) => ({
        entries: [
          {
            ...entry,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
          },
          ...state.entries,
        ].slice(0, 500) // Garder les 500 dernières entrées
      })),
      clearEntries: () => set({ entries: [] }),
    }),
    {
      name: 'ux-hub-analytics',
    }
  )
)

// Feedback Store - pour stocker les feedbacks utilisateurs
export interface FeedbackEntry {
  id: string
  type: 'suggestion' | 'bug' | 'question' | 'compliment' | 'other'
  message: string
  rating?: number // 1-5
  email?: string
  page: string
  timestamp: string
  status: 'new' | 'read' | 'resolved'
}

interface FeedbackState {
  feedbacks: FeedbackEntry[]
  addFeedback: (feedback: Omit<FeedbackEntry, 'id' | 'timestamp' | 'status'>) => void
  updateFeedbackStatus: (id: string, status: FeedbackEntry['status']) => void
  clearFeedbacks: () => void
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbacks: [],
      addFeedback: (feedback) => set((state) => ({
        feedbacks: [
          {
            ...feedback,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            status: 'new',
          },
          ...state.feedbacks,
        ]
      })),
      updateFeedbackStatus: (id, status) => set((state) => ({
        feedbacks: state.feedbacks.map(f => 
          f.id === id ? { ...f, status } : f
        )
      })),
      clearFeedbacks: () => set({ feedbacks: [] }),
    }),
    {
      name: 'ux-hub-feedbacks',
    }
  )
)
