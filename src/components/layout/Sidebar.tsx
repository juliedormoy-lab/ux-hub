'use client'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/store'
import { getTranslation } from '@/lib/i18n'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  LightBulbIcon,
  FolderIcon,
  BookOpenIcon,
  EnvelopeIcon,
  XMarkIcon,
  AcademicCapIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react'

type NavIcon = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & { title?: string; titleId?: string } & RefAttributes<SVGSVGElement>>

interface NavItem {
  name: string
  href: string
  icon: NavIcon
  badgeText?: string
  badgeColor?: 'blue' | 'purple' | 'pink' | 'indigo'
}

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen, locale } = useAppStore()
  const t = getTranslation(locale)

  const navigation: NavItem[] = [
    { name: t.nav.home, href: '/', icon: HomeIcon },
    { name: locale === 'fr' ? 'Guide d\'intégration UX' : 'UX Integration Guide', href: '/guide', icon: AcademicCapIcon },
    { name: t.nav.methods, href: '/methodes', icon: LightBulbIcon },
    { name: t.nav.projects, href: '/projets', icon: FolderIcon },
    { name: t.nav.library, href: '/bibliotheque', icon: BookOpenIcon },
    { name: locale === 'fr' ? 'Veille UX' : 'UX Watch', href: '/veille', icon: NewspaperIcon },
    { name: t.nav.convince, href: '/convaincre', icon: MegaphoneIcon },
    { name: t.nav.faq, href: '/faq', icon: QuestionMarkCircleIcon },
  ]

  const bottomNavigation: NavItem[] = [
    { name: t.nav.contact, href: '/contact', icon: EnvelopeIcon },
    { name: locale === 'fr' ? 'Feedback' : 'Feedback', href: '/feedback', icon: ChatBubbleLeftEllipsisIcon },
    { name: 'Admin', href: '/admin-ux-analytics', icon: ChartBarIcon },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-surface-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-[280px] bg-white border-r border-surface-200',
          'flex flex-col transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-surface-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ux-500 to-ux-700 flex items-center justify-center text-white font-bold text-lg">
              UX
            </div>
            <div>
              <h1 className="font-display font-bold text-surface-900">UX Hub</h1>
              <p className="text-xs text-surface-500">Design & Impact</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-surface-400 hover:bg-surface-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            
            // Couleurs selon le badge
            const getBadgeClasses = () => {
              if (!item.badgeText) return { bg: 'bg-ux-50', text: 'text-ux-700', icon: 'text-ux-600', iconInactive: 'text-surface-400', badge: '' }
              switch (item.badgeColor) {
                case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600', iconInactive: 'text-blue-400', badge: 'bg-blue-100 text-blue-600' }
                case 'purple': return { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-600', iconInactive: 'text-purple-400', badge: 'bg-purple-100 text-purple-600' }
                case 'pink': return { bg: 'bg-pink-50', text: 'text-pink-700', icon: 'text-pink-600', iconInactive: 'text-pink-400', badge: 'bg-pink-100 text-pink-600' }
                case 'indigo': return { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: 'text-indigo-600', iconInactive: 'text-indigo-400', badge: 'bg-indigo-100 text-indigo-600' }
                default: return { bg: 'bg-ux-50', text: 'text-ux-700', icon: 'text-ux-600', iconInactive: 'text-surface-400', badge: '' }
              }
            }
            const colors = getBadgeClasses()
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? `${colors.bg} ${colors.text}`
                    : item.badgeText 
                      ? `${colors.text.replace('700', '500')} hover:${colors.bg} hover:${colors.text}`
                      : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive ? colors.icon : (item.badgeText ? colors.iconInactive : 'text-surface-400'))} />
                <span className="font-medium">{item.name}</span>
                {item.badgeText && (
                  <span className={cn("ml-auto text-xs px-1.5 py-0.5 rounded font-bold", colors.badge)}>
                    {item.badgeText}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Navigation secondaire (bas) */}
        <div className="px-4 py-4 border-t border-surface-200 space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-ux-50 text-ux-700'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive ? 'text-ux-600' : 'text-surface-400')} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
