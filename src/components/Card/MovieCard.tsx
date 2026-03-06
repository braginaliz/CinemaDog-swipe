import { useState } from 'react'
import type { Movie } from '../../types/movie'

interface MovieCardProps {
  movie: Movie
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}
    className={`w-3.5 h-3.5 transition-colors ${filled ? 'text-yellow-400' : 'text-pink-200'}`}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
)

function StarRating({ value }: { value: number }) {
  const stars = Math.round(value / 2)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < stars} />
      ))}
      <span className="text-xs text-pink-500 font-black ml-1 tracking-wide">{value.toFixed(1)}</span>
    </div>
  )
}

const FilmIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
    <rect x="2" y="2" width="20" height="20" rx="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="17" y1="7" x2="22" y2="7" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="2" y1="17" x2="7" y2="17" />
  </svg>
)

const PersonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const StarBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    className="w-3 h-3 text-yellow-400">
    <path fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`text-pink-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export function MovieCard({ movie }: MovieCardProps) {
  const [castOpen, setCastOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  const posterUrl = movie.poster_path && !imgError ? movie.poster_path : null

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl shadow-pink-200/50 border border-pink-100">

      {/* ─── Poster ─── */}
      <div className="relative h-[56%] flex-shrink-0 overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.original_title}
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 opacity-60">
              <FilmIcon />
              <span className="text-pink-300 text-xs font-semibold tracking-widest uppercase">No Poster</span>
            </div>
          </div>
        )}

        {/* Top badges row */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 pt-3">
          {/* Year */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-lg px-2.5 py-1">
            <span className="text-white text-xs font-bold tracking-wider">{year}</span>
          </div>

         {/* Rating */}
<div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5">
  <StarBadgeIcon />
  <span className="text-white text-sm font-black tracking-wide">{movie.vote_average.toFixed(1)}</span>
</div>
        </div>

       {/* Title block on image */}
<div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10
  bg-gradient-to-t from-black/70 via-black/30 to-transparent">
  <h2 className="text-white font-black text-2xl leading-tight line-clamp-2 drop-shadow-lg tracking-tight">
    {movie.original_title}
  </h2>
</div>
      </div>

      {/* ─── Info panel ─── */}
      <div className="flex-1 overflow-y-auto flex flex-col bg-white">

        {/* Accent top stripe */}
        <div className="h-0.5 w-full bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 flex-shrink-0" />

        <div className="flex-1 flex flex-col gap-3 px-4 py-3">

          {/* Stars + votes */}
          <div className="flex items-center justify-between">
            <StarRating value={movie.vote_average} />
            <div className="flex items-center gap-1">
              <span className="text-pink-300 text-xs">✦</span>
              <span className="text-xs text-pink-400 font-semibold tracking-wide">
                {movie.vote_count.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-pink-100 to-transparent" />

          {/* Overview */}
          {movie.overview && (
            <p className="text-pink-900/60 text-sm leading-relaxed line-clamp-4 flex-shrink-0">
              {movie.overview}
            </p>
          )}

          {/* Cast section */}
          {movie.casts && movie.casts.length > 0 && (
            <div className="mt-auto border-t border-pink-50 pt-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCastOpen(!castOpen)
                }}
                className="
                  group flex items-center justify-between w-full
                  bg-gradient-to-r from-pink-50 to-rose-50
                  hover:from-pink-100 hover:to-rose-100
                  border border-pink-100 hover:border-pink-200
                  rounded-xl px-3 py-2
                  text-sm font-bold text-pink-500 hover:text-pink-700
                  transition-all duration-200
                "
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🎬</span>
                  <span className="tracking-wide">Актёры</span>
                  <span className="bg-pink-200/70 text-pink-600 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                    {movie.casts.length}
                  </span>
                </div>
                <ChevronIcon open={castOpen} />
              </button>

              {castOpen && (
                <div className="mt-2.5 flex gap-2.5 overflow-x-auto pb-1 no-select scrollbar-none">
                  {movie.casts.slice(0, 8).map((cast, index) => (
                    <div
                      key={`${cast.name}-${index}`}
                      className="flex-shrink-0 flex flex-col items-center gap-1.5 w-14"
                    >
                      {/* Avatar */}
                      <div className="
                        relative w-11 h-11 rounded-full overflow-hidden
                        ring-2 ring-pink-200 ring-offset-1
                        bg-gradient-to-br from-pink-50 to-rose-100
                        flex items-center justify-center shadow-md shadow-pink-100
                      ">
                        {cast.profile_path ? (
                          <img
                            src={cast.profile_path}
                            alt={cast.name}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        ) : (
                          <PersonIcon />
                        )}
                      </div>

                      {/* Name */}
                      <p className="text-xs text-pink-800 text-center leading-tight line-clamp-2 font-semibold w-full">
                        {cast.name}
                      </p>

                      {/* Character */}
                      {cast.character && (
                        <p className="text-xs text-pink-400/80 text-center line-clamp-1 w-full italic">
                          {cast.character}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}