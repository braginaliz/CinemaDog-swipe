import { useEffect } from "react";

interface UseKeyboardSwipeOptions {
  onLeft: () => void;
  onRight: () => void;
  onUndo: () => void;
  disabled?: boolean;
}

export function useKeyboardSwipe({
  onLeft,
  onRight,
  onUndo,
  disabled = false,
}: UseKeyboardSwipeOptions): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          onRight();
          break;
        case "z":
        case "Z":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onUndo();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onLeft, onRight, onUndo, disabled]);
}
