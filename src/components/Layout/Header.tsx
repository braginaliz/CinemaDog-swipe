import { useMovieStore } from "../../store/useMovieStore";
import { HeaderFilmIcon, HeaderHeartIcon, LayersIcon } from "../icons";

type Tab = "deck" | "watchlist";

export function Header() {
  const { activeTab, setActiveTab, watchlist } = useMovieStore();

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-pink-100/80 shadow-sm shadow-pink-100/40 z-50">
      <div
        className="
        w-full mx-auto
        max-w-[375px] xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1280px]
        px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10
        py-2.5 xs:py-3 sm:py-3.5 lg:py-4
        flex flex-col gap-2.5 xs:gap-3
      "
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 xs:gap-2.5 shrink-0">
            <div
              className="
              w-8 h-8
              xs:w-9 xs:h-9
              sm:w-10 sm:h-10
              lg:w-11 lg:h-11
              rounded-xl bg-gradient-to-br from-pink-400 to-rose-500
              flex items-center justify-center text-white
              shrink-0
            "
            >
              <HeaderFilmIcon />
            </div>
            <span
              className="
              text-gradient
              text-lg xs:text-xl sm:text-2xl lg:text-3xl
              font-black tracking-tight leading-none
            "
            >
              CinemaSwipe
            </span>
          </div>

          <div className="hidden lg:flex items-center bg-pink-100/60 border border-pink-200/50 rounded-2xl p-1 gap-1 ml-auto">
            <TabButtons
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              watchlist={watchlist}
            />
          </div>
        </div>

        <div className="flex lg:hidden items-center bg-pink-100/60 border border-pink-200/50 rounded-2xl p-1 gap-1">
          <TabButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            watchlist={watchlist}
          />
        </div>
      </div>
    </header>
  );
}

function TabButtons({
  activeTab,
  setActiveTab,
  watchlist,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  watchlist: unknown[];
}) {
  return (
    <>
      <button
        onClick={() => setActiveTab("deck")}
        className={`
          flex-1 flex items-center justify-center gap-1.5 xs:gap-2
          py-1.5 xs:py-2
          px-3 xs:px-4 sm:px-6 lg:px-10 xl:px-14
          rounded-xl
          text-xs xs:text-sm lg:text-base
          font-bold transition-all duration-200
          ${
            activeTab === "deck"
              ? "bg-white text-pink-600 border border-pink-200/80 shadow-sm"
              : "text-pink-400 hover:text-pink-600 hover:bg-white/50"
          }
        `}
      >
        <LayersIcon />
        <span className="truncate">Колода</span>
      </button>

      <button
        onClick={() => setActiveTab("watchlist")}
        className={`
          flex-1 relative flex items-center justify-center gap-1.5 xs:gap-2
          py-1.5 xs:py-2
          px-3 xs:px-4 sm:px-6 lg:px-10 xl:px-14
          rounded-xl
          text-xs xs:text-sm lg:text-base
          font-bold transition-all duration-200
          ${
            activeTab === "watchlist"
              ? "bg-white text-pink-600 border border-pink-200/80 shadow-sm"
              : "text-pink-400 hover:text-pink-600 hover:bg-white/50"
          }
        `}
      >
        <HeaderHeartIcon filled={activeTab === "watchlist"} />
        <span className="truncate">
          <span className="xs:hidden">Буду смотреть</span>
        </span>
        {watchlist.length > 0 && (
          <span
            className="
            absolute -top-1.5 -right-1.5
            min-w-[18px] xs:min-w-[20px]
            h-[18px] xs:h-5
            px-1 rounded-full
            bg-gradient-to-r from-pink-500 to-rose-500
            text-white text-[8px] xs:text-[9px]
            flex items-center justify-center tabular-nums
            border border-white
            shadow-sm
          "
          >
            {watchlist.length > 99 ? "99+" : watchlist.length}
          </span>
        )}
      </button>
    </>
  );
}
