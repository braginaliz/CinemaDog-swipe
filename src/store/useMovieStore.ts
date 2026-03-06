import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie, SwipeHistoryItem } from '../types/movie'
import { fetchRandomMovies } from '../api/movies'

interface MovieStore {
  deck: Movie[]
  watchlist: Movie[]
  history: SwipeHistoryItem[]
  isLoading: boolean
  error: string | null
  activeTab: 'deck' | 'watchlist'

  loadMovies: () => Promise<void>
  saveMovie: (movie: Movie) => void
  skipMovie: (movie: Movie) => void
  undoLastSwipe: () => void
  removeFromWatchlist: (id: number) => void
  clearWatchlist: () => void
  setActiveTab: (tab: 'deck' | 'watchlist') => void
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      deck: [],
      watchlist: [],
      history: [],
      isLoading: false,
      error: null,
      activeTab: 'deck',

      loadMovies: async () => {
        const { isLoading } = get()
        if (isLoading) return // защита от параллельных вызовов

        set({ isLoading: true, error: null })
        try {
          const movies = await fetchRandomMovies()
          set((state) => {
            const existingIds = new Set(state.deck.map((m) => m.id))
            const unique = movies.filter((m) => !existingIds.has(m.id))
            return {
              deck: [...state.deck, ...unique],
              isLoading: false,
            }
          })
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Неизвестная ошибка',
            isLoading: false,
          })
        }
      },

      saveMovie: (movie: Movie) => {
        set((state) => ({
          deck: state.deck.filter((m) => m.id !== movie.id),
          watchlist: state.watchlist.some((m) => m.id === movie.id)
            ? state.watchlist
            : [movie, ...state.watchlist],
          history: [
            { movie, direction: 'right' as const },
            ...state.history,
          ].slice(0, 20),
        }))
        if (get().deck.length <= 3) get().loadMovies()
      },

      skipMovie: (movie: Movie) => {
        set((state) => ({
          deck: state.deck.filter((m) => m.id !== movie.id),
          history: [
            { movie, direction: 'left' as const },
            ...state.history,
          ].slice(0, 20),
        }))
        if (get().deck.length <= 3) get().loadMovies()
      },

      undoLastSwipe: () => {
        const { history } = get()
        if (history.length === 0) return

        const [last, ...rest] = history
        set((state) => {
          // не возвращаем фильм если он уже есть в колоде
          const alreadyInDeck = state.deck.some((m) => m.id === last.movie.id)
          return {
            history: rest,
            deck: alreadyInDeck
              ? state.deck
              : [last.movie, ...state.deck],
            watchlist:
              last.direction === 'right'
                ? state.watchlist.filter((m) => m.id !== last.movie.id)
                : state.watchlist,
          }
        })
      },

      removeFromWatchlist: (id: number) => {
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        }))
      },

      clearWatchlist: () => set({ watchlist: [] }),

      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'movie-swipe-storage',
      partialize: (state) => ({ watchlist: state.watchlist }),
    }
  )
)