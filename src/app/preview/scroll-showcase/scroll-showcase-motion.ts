// Scroll-space proportions inferred from the reference, not video timestamps.
export const ENTRANCE_END = 0.12;
export const EXIT_START = 0.84;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function showcaseMotion(progress: number) {
  const p = clamp(Number.isFinite(progress) ? progress : 0);
  const chapterProgress = clamp(
    (p - ENTRANCE_END) / (EXIT_START - ENTRANCE_END),
  );
  const expansion =
    p < ENTRANCE_END
      ? p / ENTRANCE_END
      : p > EXIT_START
        ? (1 - p) / (1 - EXIT_START)
        : 1;
  return {
    expansion: clamp(expansion),
    chapter: Math.min(3, Math.floor(chapterProgress * 4)),
    chapterProgress,
    immersive: p >= ENTRANCE_END && p < EXIT_START,
  };
}

export function chapterScrollProgress(index: number) {
  const chapter = Math.max(0, Math.min(3, Math.floor(index)));
  return ENTRANCE_END + ((chapter + 0.5) / 4) * (EXIT_START - ENTRANCE_END);
}

export function hideShowcaseNavigation(
  progress: number,
  followingTop: number,
  viewportHeight: number,
) {
  return progress >= ENTRANCE_END && followingTop > viewportHeight * 0.75;
}
