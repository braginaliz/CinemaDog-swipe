import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      {icon && (
        <div className="
          w-16 h-16 rounded-2xl
          bg-gradient-to-br from-pink-100 to-rose-100
          border border-pink-200/60
          flex items-center justify-center
          text-pink-300
        ">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-black text-pink-900 tracking-tight">{title}</h3>
      <p className="text-pink-500/80 text-sm max-w-xs leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="
            mt-2 px-6 py-3 rounded-full font-bold text-white text-sm
            bg-gradient-to-r from-pink-500 to-rose-500
            hover:from-pink-400 hover:to-rose-400
            active:scale-95 transition-all duration-200
            shadow-md shadow-pink-200
          "
        >
          {action.label}
        </button>
      )}
    </div>
  )
}