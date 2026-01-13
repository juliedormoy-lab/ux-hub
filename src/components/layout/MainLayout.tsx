'use client'

import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { ChatBot } from '@/components/chat/ChatBot'

interface MainLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  actions?: ReactNode
  breadcrumb?: { label: string; href?: string }[]
}

export function MainLayout({ children, title, subtitle, actions, breadcrumb }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <div className="lg:ml-[280px]">
        <Header title={title} subtitle={subtitle} actions={actions} breadcrumb={breadcrumb} />
        <main className="px-6 py-6">{children}</main>
      </div>
      <ChatBot />
    </div>
  )
}
