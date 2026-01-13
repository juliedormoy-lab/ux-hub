'use client'

import { useAppStore } from '@/store'
import { LanguageSwitcher } from '@/components/ui'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

interface HeaderProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
  breadcrumb?: { label: string; href?: string }[]
}

export function Header({ title, subtitle, actions, breadcrumb }: HeaderProps) {
  const { toggleSidebar } = useAppStore()

  const hasContent = title || breadcrumb?.length

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-surface-200">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-100"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          {hasContent && (
            <div className="flex items-center gap-4">
              <div>
                {breadcrumb && breadcrumb.length > 0 && (
                  <nav className="flex items-center gap-2 text-xs text-surface-400">
                    {breadcrumb.map((item, index) => (
                      <span key={index} className="flex items-center gap-2">
                        {index > 0 && <span>/</span>}
                        {item.href ? (
                          <a href={item.href} className="hover:text-ux-600 transition-colors">
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-surface-600">{item.label}</span>
                        )}
                      </span>
                    ))}
                  </nav>
                )}
                {title && (
                  <h1 className="text-base font-display font-bold text-surface-900 leading-tight">{title}</h1>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-surface-400 hidden md:block border-l border-surface-200 pl-4">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {actions}
          <LanguageSwitcher className="hidden sm:flex" />
        </div>
      </div>
    </header>
  )
}
