import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMovieStore } from '../../store/useMovieStore'
import { EmptyState } from '../UI/EmptyState'
import type { Movie } from '../../types/movie'

// ─── Icons ───────────────────────────────────────────────────────────────────

const FilmIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.5" />
    <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5" />
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24"
    fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const LayersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

// ─── WatchlistItem ────────────────────────────────────────────────────────────

function WatchlistItem({ movie, onRemove }: { movie: Movie; onRemove: () => void }) {
  const [imgError, setImgError] = useState(false)
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="
        flex gap-3 p-3 rounded-2xl
        bg-white/70 backdrop-blur-sm
        border border-pink-200/50
        hover:border-pink-300/70
        hover:shadow-sm
        transition-all duration-200
      "
    >
      {/* Poster */}
      <div className="flex-shrink-0 w-14 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 border border-pink-200/40 flex items-center justify-center">
        {movie.poster_path && !imgError ? (
          <img
            src={movie.poster_path}
            alt={movie.original_title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="text-pink-300">
            <FilmIcon />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-pink-900 leading-snug line-clamp-2">
            {movie.original_title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold text-pink-500">
          <span className="flex items-center gap-1 text-amber-500">
            <StarIcon />
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-pink-300">·</span>
          <span className="flex items-center gap-1 text-pink-400">
            <CalendarIcon />
            {year}
          </span>
        </div>

        {movie.overview && (
          <p className="text-[11px] text-pink-700/70 leading-relaxed line-clamp-2">
            {movie.overview}
          </p>
        )}
      </div>

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="
          flex-shrink-0 w-8 h-8 rounded-full
          flex items-center justify-center
          text-rose-400 hover:text-rose-600
          hover:bg-rose-100/70
          active:scale-90
          transition-all duration-200
          self-start mt-0.5
        "
        title="Удалить"
      >
        <XIcon />
      </button>
    </motion.div>
  )
}

// ─── Watchlist ────────────────────────────────────────────────────────────────

export function Watchlist() {
  const { watchlist, removeFromWatchlist, clearWatchlist, setActiveTab } = useMovieStore()

  if (watchlist.length === 0) {
    return (
      <EmptyState
        title="Список пуст"
        description="Свайпните фильм вправо, чтобы добавить его в список «Буду смотреть»"
        icon={<FilmIcon />}
        action={{
          label: 'К колоде',
          onClick: () => setActiveTab('deck'),
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-3 px-4 pb-6">

      {/* Header row */}
      <div className="flex items-center justify-between pt-1 pb-0.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white">
            <LayersIcon />
          </div>
          <span className="text-base font-black text-pink-900 tracking-tight">
            Буду смотреть
          </span>
          <span className="
            min-w-[22px] h-5 px-1.5 rounded-full
            bg-gradient-to-r from-pink-500 to-rose-500
            text-white text-[11px] font-extrabold
            flex items-center justify-center tabular-nums
          ">
            {watchlist.length > 99 ? '99+' : watchlist.length}
          </span>
        </div>

        <button
          onClick={clearWatchlist}
          className="
            flex items-center gap-1.5
            px-3 py-1.5 rounded-xl
            text-[12px] font-bold text-rose-400
            hover:text-rose-600 hover:bg-rose-100/70
            active:scale-95
            transition-all duration-200
          "
        >
          <TrashIcon />
          Очистить
        </button>
      </div>

      {/* List */}
      <AnimatePresence mode="popLayout">
        {watchlist.map((movie) => (
          <WatchlistItem
            key={movie.id}
            movie={movie}
            onRemove={() => removeFromWatchlist(movie.id)}
          />
        ))}
      </AnimatePresence>

    </div>
  )
}