export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-white" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" />
      </div>
      <p className="text-pink-300 text-sm font-medium animate-pulse">
        Загружаем фильмы…
      </p>
    </div>
  )
}