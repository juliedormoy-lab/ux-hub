'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md'
}

export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-surface-100 text-surface-700',
    primary: 'bg-ux-100 text-ux-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-600',
    error: 'bg-error-100 text-error-600',
    outline: 'border border-surface-300 text-surface-600',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    IN_PROGRESS: { label: 'En cours', variant: 'primary' },
    COMPLETED: { label: 'Terminé', variant: 'success' },
    PAUSED: { label: 'En pause', variant: 'warning' },
    PENDING: { label: 'En attente', variant: 'warning' },
    IN_REVIEW: { label: 'En review', variant: 'primary' },
    CLOSED: { label: 'Fermé', variant: 'default' },
  }

  const { label, variant } = config[status] || { label: status, variant: 'default' }

  return <Badge variant={variant}>{label}</Badge>
}
