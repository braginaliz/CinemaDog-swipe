import { useState, useRef, useEffect } from 'react'
import type { Movie } from '../../types/movie'

interface MovieCardProps {
  movie: Movie
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.5}
    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${filled ? 'text-yellow-400' : 'text-pink-200'}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
)

function StarRating({ value }: { value: number }) {
  const stars = Math.round(value / 2)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < stars} />
      ))}
      <span className="ml-1 text-[10px] sm:text-xs text-pink-400 font-semibold">
        {value.toFixed(1)}
      </span>
    </div>
  )
}

const FilmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
)

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const StarBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="15" height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-pink-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export function MovieCard({ movie }: MovieCardProps) {
  const [castOpen, setCastOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const castRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  const posterUrl = movie.poster_path && !imgError ? movie.poster_path : null

  useEffect(() => {
    if (!castOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        castRef.current && !castRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setCastOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [castOpen])

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg shadow-pink-100/60 border border-pink-100 h-full">

      {/* ─── Poster ─── */}
      <div className="
        relative w-full flex-shrink-0 rounded-t-2xl overflow-hidden bg-pink-50
        h-60
        xs:h-64
        sm:h-72
        md:h-80
        lg:h-88
        xl:h-96
        2xl:h-[26rem]
      ">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.original_title}
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-pink-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 opacity-40"><FilmIcon /></div>
            <span className="text-[10px] sm:text-xs text-pink-300">No Poster</span>
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <span className="
            bg-black/50 backdrop-blur-sm text-white font-bold rounded-full
            text-[10px] px-1.5 py-0.5
            sm:text-xs sm:px-2
          ">
            {year}
          </span>
          <span className="
            flex items-center gap-1
            bg-black/50 backdrop-blur-sm text-yellow-400 font-bold rounded-full
            text-[10px] px-1.5 py-0.5
            sm:text-xs sm:px-2
          ">
            <StarBadgeIcon />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 pt-6 pb-2 sm:px-3">
          <h3 className="
            text-white font-bold leading-tight line-clamp-2
            text-xs sm:text-sm
          ">
            {movie.original_title}
          </h3>
        </div>
      </div>

      {/* ─── Info panel ─── */}
      <div className="
        relative flex flex-col flex-1 gap-1
        px-2.5 pt-2 pb-2
        sm:gap-1.5 sm:px-3 sm:pt-2.5 sm:pb-2.5
        2xl:gap-2 2xl:px-4 2xl:pt-3 2xl:pb-3
      ">

        {/* Accent stripe */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

        {/* Stars + votes */}
        <div className="flex items-center justify-between">
          <StarRating value={movie.vote_average} />
          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-pink-300">
            <span className="text-pink-400">✦</span>
            {movie.vote_count.toLocaleString()}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-pink-50" />

        {movie.overview && (
          <p className="
            text-pink-900/70 leading-relaxed flex-1
            text-[9px] line-clamp-1
            sm:text-[10px] sm:line-clamp-2
            2xl:text-xs 2xl:line-clamp-2
          ">
            {movie.overview}
          </p>
        )}

        {/* ─── Cast section ─── */}
        {movie.casts && movie.casts.length > 0 && (
          <div className="relative mt-auto">

            {/* Кнопка */}
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation()
                setCastOpen(!castOpen)
              }}
              className="
                flex items-center justify-between w-full
                bg-gradient-to-r from-pink-50 to-rose-50
                hover:from-pink-100 hover:to-rose-100
                border border-pink-100 hover:border-pink-200
                rounded-xl
                transition-all duration-200
                text-pink-500 hover:text-pink-700 font-bold
                px-2 py-1.5 text-xs
                sm:px-3 sm:py-2 sm:text-sm
              "
            >
              <span className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400">
                  <PersonIcon />
                </div>
                Актёры
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="
                  font-semibold bg-pink-100 text-pink-400 rounded-full
                  text-[10px] px-1 py-0.5
                  sm:text-xs sm:px-1.5
                ">
                  {movie.casts.length}
                </span>
                <ChevronIcon open={castOpen} />
              </span>
            </button>

            {/* ─── Дропдаун ─── */}
            {castOpen && (
              <div
                ref={castRef}
                className="
                  absolute bottom-full left-1/2 -translate-x-1/2
                  mb-2 z-50
                  bg-white/95 backdrop-blur-md
                  border border-pink-100
                  rounded-2xl shadow-2xl shadow-pink-200/60
                  flex flex-col
                  w-56 p-2
                  xs:w-64
                  sm:w-72 sm:p-3
                "
              >
                {/* Заголовок дропдауна */}
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-pink-100 flex-shrink-0 sm:mb-3 sm:pb-2">
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400">
                    <PersonIcon />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-pink-500 uppercase tracking-wide">
                    Актёры
                  </span>
                  <span className="ml-auto text-[10px] sm:text-xs font-semibold bg-pink-100 text-pink-400 rounded-full px-1.5 py-0.5">
                    {movie.casts.length}
                  </span>
                </div>

                {/* Сетка со скроллом */}
                <div className="
                  overflow-y-auto pr-1
                  max-h-52 sm:max-h-64
                  scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent
                  hover:scrollbar-thumb-pink-300
                ">
                  <div className="
                    grid gap-y-3
                    grid-cols-3 gap-x-1.5
                    sm:grid-cols-4 sm:gap-x-2
                    pt-1
                  ">
                    {movie.casts.map((cast, index) => (
                      <div
                        key={`${cast.name}-${index}`}
                        className="flex flex-col items-center gap-1 sm:gap-1.5"
                      >
                        <div className="
                          rounded-full overflow-hidden
                          border-2 border-pink-100 bg-pink-50
                          flex items-center justify-center flex-shrink-0
                          w-11 h-11
                          sm:w-14 sm:h-14
                        ">
                          {cast.profile_path ? (
                            <img
                              src={cast.profile_path}
                              alt={cast.name}
                              className="w-full h-full object-cover"
                              draggable={false}
                            />
                          ) : (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 text-pink-200">
                              <PersonIcon />
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-pink-800 text-center leading-tight line-clamp-2 font-semibold w-full">
                          {cast.name}
                        </p>
                        {cast.character && (
                          <p className="text-[10px] sm:text-xs text-pink-400/80 text-center line-clamp-1 w-full italic">
                            {cast.character}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}