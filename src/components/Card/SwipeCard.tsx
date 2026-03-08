import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import type { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";
import { HeartIcon, XIcon } from "../icons";

interface SwipeCardProps {
  movie: Movie;
  stackIndex: number;
  totalVisible: number;
  onSwipe: (movie: Movie, direction: "left" | "right") => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY_THRESHOLD = 500;
const MAX_ROTATION = 15;
const VISIBLE_CARDS = 3;

export function SwipeCard({
  movie,
  stackIndex,
  onSwipe,
  isTop,
}: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const swipeIndicator = useMotionValue<"left" | "right" | null>(null);
  const isDragging = useMotionValue(false);

  const rotate = useTransform(
    x,
    [-300, 0, 300],
    [-MAX_ROTATION, 0, MAX_ROTATION],
  );
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, -20], [1, 0]);
  const rightGlowOpacity = useTransform(x, [20, 80], [0, 1]);
  const leftGlowOpacity = useTransform(x, [-80, -20], [1, 0]);

  const scale = isTop ? 1 : Math.max(0.88, 1 - stackIndex * 0.04);
  const translateY = isTop ? 0 : stackIndex * 12;

  const flyOut = useCallback(
    async (direction: "left" | "right") => {
      await animate(x, direction === "right" ? 600 : -600, {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      onSwipe(movie, direction);
    },
    [x, movie, onSwipe],
  );

  const handleDragStart = useCallback(() => {
    isDragging.set(true);
  }, [isDragging]);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      swipeIndicator.set(
        info.offset.x > 40 ? "right" : info.offset.x < -40 ? "left" : null,
      );
    },
    [swipeIndicator],
  );

  const handleDragEnd = useCallback(
    async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      isDragging.set(false);
      swipeIndicator.set(null);
      const { offset, velocity } = info;
      if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) {
        await flyOut("right");
      } else if (
        offset.x < -SWIPE_THRESHOLD ||
        velocity.x < -SWIPE_VELOCITY_THRESHOLD
      ) {
        await flyOut("left");
      } else {
        animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      }
    },
    [flyOut, x, isDragging, swipeIndicator],
  );

  if (stackIndex >= VISIBLE_CARDS) return null;

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
        transformOrigin: "bottom center",
      }}
      animate={{ scale, y: translateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        className="w-full h-full rounded-3xl overflow-hidden bg-white border border-pink-200/60 shadow-xl shadow-pink-200/40 transition-shadow duration-200"
        style={{
          cursor: isTop ? "grab" : "default",
        }}
        whileDrag={{ boxShadow: "0 25px 50px -12px rgba(249,168,212,0.5)" }}
      >
        <MovieCard movie={movie} />

        <motion.div
          className="absolute top-6 left-6 rounded-2xl px-4 py-2 rotate-[-20deg] pointer-events-none bg-pink-50/90 border-2 border-pink-400 backdrop-blur-sm shadow-lg"
          style={{ opacity: likeOpacity }}
        >
          <div className="flex items-center gap-2 text-pink-500 font-black text-lg tracking-wider">
            <HeartIcon />
            <span>СОХРАНИТЬ</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-6 right-6 rounded-2xl px-4 py-2 rotate-[20deg] pointer-events-none bg-rose-50/90 border-2 border-rose-400 backdrop-blur-sm shadow-lg"
          style={{ opacity: nopeOpacity }}
        >
          <div className="flex items-center gap-2 text-rose-500 font-black text-lg tracking-wider">
            <XIcon />
            <span>ПРОПУСТИТЬ</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/15 to-transparent pointer-events-none"
          style={{ opacity: rightGlowOpacity }}
        />
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-l from-rose-400/15 to-transparent pointer-events-none"
          style={{ opacity: leftGlowOpacity }}
        />
      </motion.div>
    </motion.div>
  );
}
