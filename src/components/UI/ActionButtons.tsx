interface ActionButtonsProps {
  onSkip: () => void
  onSave: () => void
  onUndo: () => void
  canUndo: boolean
  disabled?: boolean
}

export function ActionButtons({ onSkip, onSave, onUndo, canUndo, disabled }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-6">

      {/* Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        title="Отменить (Ctrl+Z)"
        className="
          relative w-12 h-12 rounded-full flex items-center justify-center
          bg-pink-100 border-2 border-pink-300
          text-pink-600 text-lg font-medium
          disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-pink-50 disabled:border-pink-200 disabled:text-pink-300
          hover:bg-pink-200 hover:border-pink-400 hover:text-pink-700 hover:scale-105
          active:scale-95
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 focus:ring-offset-white
        "
      >
        ↩
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        disabled={disabled}
        title="Пропустить (←)"
        className="
          relative w-16 h-16 rounded-full flex items-center justify-center
          bg-pink-100 border-2 border-pink-300
          text-pink-600 text-2xl font-bold
          disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-pink-50 disabled:border-pink-200 disabled:text-pink-300
          hover:bg-pink-200 hover:border-pink-400 hover:text-pink-700 hover:scale-105
          active:scale-95
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 focus:ring-offset-white
        "
      >
        ✕
      </button>

      {/* Save */}
      <button
        onClick={onSave}
        disabled={disabled}
        title="Сохранить (→)"
        className="
          relative w-16 h-16 rounded-full flex items-center justify-center
          bg-pink-100 border-2 border-pink-300
          text-pink-600 text-2xl
          disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-pink-50 disabled:border-pink-200 disabled:text-pink-300
          hover:bg-pink-200 hover:border-pink-400 hover:text-pink-700 hover:scale-105
          active:scale-95
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 focus:ring-offset-white
        "
      >
        ♥
      </button>

    </div>
  )
}