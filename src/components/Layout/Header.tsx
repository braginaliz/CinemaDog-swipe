import { useMovieStore } from '../../store/useMovieStore'

type Tab = 'deck' | 'watchlist'

const FilmIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
    <line x1="17" y1="17" x2="22" y2="17" />
  </svg>
)

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const LayersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

export function Header() {
  const { activeTab, setActiveTab, watchlist } = useMovieStore()

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-pink-100/80 shadow-sm shadow-pink-100/40 z-50">
      <div className="
        w-full mx-auto
        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl
        px-3 sm:px-4
        py-3 sm:py-3.5 lg:py-4
        flex flex-col gap-3
      ">

        {/* Top row */}
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="
              w-9 h-9
              sm:w-10 sm:h-10
              lg:w-11 lg:h-11
              rounded-xl bg-gradient-to-br from-pink-400 to-rose-500
              flex items-center justify-center text-white
            ">
              <FilmIcon />
            </div>
            <span className="text-gradient text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-none">
              CinemaSwipe
            </span>
          </div>

          {/* Tabs — desktop inline (lg+) */}
          <div className="hidden lg:flex items-center bg-pink-100/60 border border-pink-200/50 rounded-2xl p-1 gap-1 ml-auto">
            <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} watchlist={watchlist} />
          </div>

        </div>

        {/* Tabs — mobile/tablet отдельная строка */}
        <div className="flex lg:hidden items-center bg-pink-100/60 border border-pink-200/50 rounded-2xl p-1 gap-1">
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} watchlist={watchlist} />
        </div>

      </div>
    </header>
  )
}

function TabButtons({
  activeTab,
  setActiveTab,
  watchlist,
}: {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  watchlist: unknown[]
}) {
  return (
    <>
      <button
        onClick={() => setActiveTab('deck')}
        className={`
          flex-1 flex items-center justify-center gap-2
          py-2 px-6 lg:px-10 xl:px-14
          rounded-xl text-sm lg:text-base font-bold transition-all duration-200
          ${activeTab === 'deck'
            ? 'bg-white text-pink-600 border border-pink-200/80'
            : 'text-pink-400 hover:text-pink-600 hover:bg-white/50'
          }
        `}
      >
        <LayersIcon />
        Колода
      </button>

      <button
        onClick={() => setActiveTab('watchlist')}
        className={`
          flex-1 relative flex items-center justify-center gap-2
          py-2 px-6 lg:px-10 xl:px-14
          rounded-xl text-sm lg:text-base font-bold transition-all duration-200
          ${activeTab === 'watchlist'
            ? 'bg-white text-pink-600 border border-pink-200/80'
            : 'text-pink-400 hover:text-pink-600 hover:bg-white/50'
          }
        `}
      >
        <HeartIcon filled={activeTab === 'watchlist'} />
        Буду смотреть
        {watchlist.length > 0 && (
          <span className="
            absolute -top-1.5 -right-1.5
            min-w-[20px] h-5 px-1 rounded-full
            bg-gradient-to-r from-pink-500 to-rose-500
            text-white text-[9px]
            flex items-center justify-center tabular-nums
            border border-white
          ">
            {watchlist.length > 99 ? '99+' : watchlist.length}
          </span>
        )}
      </button>
    </>
  )
}