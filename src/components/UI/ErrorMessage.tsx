interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-pink-400"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="8" cy="9" r="1.5" fill="currentColor" />
        <circle cx="16" cy="9" r="1.5" fill="currentColor" />
        <path
          d="M8 15 C9.5 17, 14.5 17, 16 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <h3 className="text-xl font-bold text-white">Что-то пошло не так</h3>
      <p className="text-pink-300 text-sm max-w-xs">{message}</p>
      <button
        onClick={onRetry}
        className="
          px-6 py-3 rounded-full font-semibold text-white
          bg-gradient-to-r from-pink-600 to-rose-500
          hover:from-pink-500 hover:to-rose-400
          active:scale-95 transition-all duration-200
          shadow-lg shadow-pink-900/50
        "
      >
        Попробовать снова
      </button>
    </div>
  );
}
