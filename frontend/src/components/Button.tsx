import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ButtonProps {
  onClick?: () => void
  to?: string
  children: React.ReactNode
  className?: string
  loading?: boolean
  contained?: boolean
  text?: boolean
}

export function Button({
  onClick,
  to,
  children,
  className = '',
  loading,
  contained,
  text,
}: ButtonProps) {
  const navigate = useNavigate()
  const handleTo = () => {
    if (to) navigate(to)
  }

  const baseClasses = `px-2 py-1 text-sm font-bold uppercase border border-ember text-ember bg-lavender cursor-pointer relative no-underline w-max group ${
    loading ? 'pl-4' : ''
  }`

  const containedClasses = contained ? 'bg-ember! text-lavender' : ''
  const textClasses = text ? 'text-lavender border-0' : ''

  return (
    <button
      className={`${baseClasses} ${containedClasses} ${textClasses} ${className}`}
      onClick={to ? handleTo : onClick}
    >
      {loading && (
        <span className="absolute left-1 top-1/2 w-2.5 h-2.5 bg-ember rounded-full animate-pulse transform -translate-y-1/2"></span>
      )}
      {text && (
        <span className="absolute bottom-0.5 left-0 w-full h-0.5 bg-lavender"></span>
      )}
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200"></span>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
