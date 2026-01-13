'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border border-surface-300 bg-white',
            'text-surface-900 placeholder:text-surface-400',
            'focus:outline-none focus:ring-2 focus:ring-ux-500 focus:border-transparent',
            'transition-all duration-200',
            error && 'border-error-500 focus:ring-error-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-error-500">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-surface-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
