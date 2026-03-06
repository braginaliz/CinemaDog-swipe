import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion'
import type { Movie } from '../../types/movie'
import { MovieCard } from './MovieCard'

interface SwipeCardProps {
  movie: Movie
  stackIndex: number
  totalVisible: number
  onSwipe: (movie: Movie, direction: 'left' | 'right') => void
  isTop: boolean
}

const SWIPE_THRESHOLD = 100
const SWIPE_VELOCITY_THRESHOLD = 500
const MAX_ROTATION = 15
const VISIBLE_CARDS = 3

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export function SwipeCard({ movie, stackIndex, onSwipe, isTop }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeIndicator, setSwipeIndicator] = useState<'left' | 'right' | null>(null)

  const rotate = useTransform(x, [-300, 0, 300], [-MAX_ROTATION, 0, MAX_ROTATION])
  const likeOpacity = useTransform(x, [20, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, -20], [1, 0])

  const scale = isTop ? 1 : Math.max(0.88, 1 - stackIndex * 0.04)
  const translateY = isTop ? 0 : stackIndex * 12

  const flyOut = useCallback(
    async (direction: 'left' | 'right') => {
      const target = direction === 'right' ? 600 : -600
      await animate(x, target, { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] })
      onSwipe(movie, direction)
    },
    [x, movie, onSwipe]
  )

  const handleDragStart = useCallback(() => setIsDragging(true), [])

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > 40) setSwipeIndicator('right')
      else if (info.offset.x < -40) setSwipeIndicator('left')
      else setSwipeIndicator(null)
    }, []
  )

  const handleDragEnd = useCallback(
    async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false)
      setSwipeIndicator(null)
      const { offset, velocity } = info
      if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) {
        await flyOut('right')
      } else if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
        await flyOut('left')
      } else {
        animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 })
      }
    }, [flyOut, x]
  )

  if (stackIndex >= VISIBLE_CARDS) return null

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 no-select"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        y: translateY,
        zIndex: 10 - stackIndex,
        transformOrigin: 'bottom center',
      }}
      animate={{ scale, y: translateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div className={`
        w-full h-full rounded-3xl overflow-hidden
        bg-white border border-pink-200/60
        shadow-xl shadow-pink-200/40
        ${isTop ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
        ${isDragging ? 'shadow-2xl shadow-pink-300/50' : ''}
        transition-shadow duration-200
      `}>
        <MovieCard movie={movie} />

        {/* LIKE overlay */}
        <motion.div
          className="absolute top-6 left-6 rounded-2xl px-4 py-2 rotate-[-20deg] pointer-events-none
            bg-pink-50/90 border-2 border-pink-400 backdrop-blur-sm shadow-lg"
          style={{ opacity: likeOpacity }}
        >
          <div className="flex items-center gap-2 text-pink-500 font-black text-lg tracking-wider">
            <HeartIcon />
            <span>СОХРАНИТЬ</span>
          </div>
        </motion.div>

        {/* NOPE overlay */}
        <motion.div
          className="absolute top-6 right-6 rounded-2xl px-4 py-2 rotate-[20deg] pointer-events-none
            bg-rose-50/90 border-2 border-rose-400 backdrop-blur-sm shadow-lg"
          style={{ opacity: nopeOpacity }}
        >
          <div className="flex items-center gap-2 text-rose-500 font-black text-lg tracking-wider">
            <XIcon />
            <span>ПРОПУСТИТЬ</span>
          </div>
        </motion.div>

        {/* Direction glow */}
        {swipeIndicator === 'right' && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/15 to-transparent pointer-events-none" />
        )}
        {swipeIndicator === 'left' && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-l from-rose-400/15 to-transparent pointer-events-none" />
        )}
      </div>
    </motion.div>
  )
}