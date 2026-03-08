interface ActionButtonsProps {
  onSkip: () => void
  onSave: () => void
  onUndo: () => void
  canUndo: boolean
  disabled?: boolean
}

export function ActionButtons({ onSkip, onSave, onUndo, canUndo, disabled }: ActionButtonsProps) {
  return (
    <div className="
      flex items-center justify-center gap-4 sm:gap-6 md:gap-8
      mt-6 sm:mt-6 md:mt-10
    ">

      {/* Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        title="Отменить (Ctrl+Z)"
        className="
          relative
          w-10 h-10
          sm:w-11 sm:h-11
          md:w-12 md:h-12
          rounded-full flex items-center justify-center
          bg-pink-100 border-2 border-pink-300
          text-pink-600
          text-base sm:text-lg
          font-medium
          disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-pink-50 disabled:border-pink-200 disabled:text-pink-300
          hover:bg-pink-200 hover:border-pink-400 hover:text-pink-700 hover:scale-105
          active:scale-95
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 focus:ring-offset-white
        "
      >
        <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        disabled={disabled}
        title="Пропустить (←)"
        className="
          relative
          w-13 h-13
          sm:w-14 sm:h-14
          md:w-16 md:h-16
          rounded-full flex items-center justify-center
          bg-pink-100 border-2 border-pink-300
          text-pink-600
          text-xl sm:text-2xl
          font-bold
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
          relative
          w-13 h-13
          sm:w-14 sm:h-14
          md:w-16 md:h-16
          rounded-full flex items-center justify-center
          bg-pink-100 border-2 border-pink-300
          text-pink-600
          text-xl sm:text-2xl
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