export interface Cast {
  name: string
  character: string
  profile_path: string | null
}

export interface Movie {
  id: number
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  casts: Cast[]
}

export type SwipeDirection = 'left' | 'right'

export interface SwipeHistoryItem {
  movie: Movie
  direction: SwipeDirection
}