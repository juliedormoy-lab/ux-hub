'use client'

import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useAppStore()

  const languages: { code: Locale; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ]

  return (
    <div className={cn('flex items-center bg-surface-100 rounded-lg p-1', className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            locale === lang.code
              ? 'bg-white text-ux-700 shadow-sm'
              : 'text-surface-500 hover:text-surface-700'
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}

