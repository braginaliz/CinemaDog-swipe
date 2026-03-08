import { useEffect, useCallback } from 'react'
import { useMovieStore } from '../../store/useMovieStore'
import { SwipeCard } from '../Card/SwipeCard'
import { ActionButtons } from '../UI/ActionButtons'
import { Loader } from '../UI/Loader'
import { ErrorMessage } from '../UI/ErrorMessage'
import { EmptyState } from '../UI/EmptyState'
import { useKeyboardSwipe } from '../../hooks/useKeyboardSwipe'

export function Deck() {
  const {
    deck,
    isLoading,
    error,
    history,
    loadMovies,
    saveMovie,
    skipMovie,
    undoLastSwipe,
  } = useMovieStore()

  useEffect(() => {
    if (deck.length === 0 && !isLoading) {
      loadMovies()
    }
  }, [])

  const uniqueDeck = deck.filter(
    (movie, index, self) => self.findIndex((m) => m.id === movie.id) === index
  )

  const topMovie = uniqueDeck[0]

  const handleSave = useCallback(() => {
    if (topMovie) saveMovie(topMovie)
  }, [topMovie, saveMovie])

  const handleSkip = useCallback(() => {
    if (topMovie) skipMovie(topMovie)
  }, [topMovie, skipMovie])

  useKeyboardSwipe({
    onLeft: handleSkip,
    onRight: handleSave,
    onUndo: undoLastSwipe,
    disabled: !topMovie || isLoading,
  })

  if (error && uniqueDeck.length === 0) {
    return (
      <div className="
        w-full mx-auto
        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl
        px-3 sm:px-4
        pt-6
      ">
        <ErrorMessage message={error} onRetry={loadMovies} />
      </div>
    )
  }

  return (
    <div className="
      w-full mx-auto
      max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl
      px-3 sm:px-4
      flex flex-col items-center gap-4 pt-4 pb-6
    ">

      {/* Card deck area */}
      <div className="relative w-full" style={{ height: 'min(580px, 75dvh)' }}>
        {isLoading && uniqueDeck.length === 0 ? (
          <Loader />
        ) : uniqueDeck.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState
              title="Колода пуста"
              description="Вы просмотрели все фильмы! Загрузим новые?"
              action={{ label: 'Загрузить ещё', onClick: loadMovies }}
            />
          </div>
        ) : (
          uniqueDeck.slice(0, 3).map((movie, index) => (
            <SwipeCard
              key={movie.id}
              movie={movie}
              stackIndex={index}
              totalVisible={Math.min(uniqueDeck.length, 3)}
              onSwipe={(m, dir) => {
                if (dir === 'right') saveMovie(m)
                else skipMovie(m)
              }}
              isTop={index === 0}
            />
          ))
        )}
      </div>

      {/* Loading more indicator */}
      {isLoading && uniqueDeck.length > 0 && (
        <p className="text-sm text-pink-400 font-medium animate-pulse">
          Загружаем ещё фильмы…
        </p>
      )}

      {/* Keyboard hint */}
      {topMovie && !isLoading && (
        <p className="text-[11px] text-pink-300/70 font-medium select-none">
          ← пропустить &nbsp;·&nbsp; сохранить → &nbsp;·&nbsp; Ctrl+Z отменить
        </p>
      )}

      {/* Action buttons */}
      <ActionButtons
        onSave={handleSave}
        onSkip={handleSkip}
        onUndo={undoLastSwipe}
        canUndo={history.length > 0}
        disabled={!topMovie || isLoading}
      />

    </div>
  )
}