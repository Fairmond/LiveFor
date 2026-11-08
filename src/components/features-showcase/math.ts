// Mathematical Helpers for 1440 x 700 standard design canvas
export const getX = (x: number): string => `${(x / 1440) * 100}%`;
export const getY = (y: number): string => `${(y / 700) * 100}%`;
export const getW = (w: number): string => `${(w / 1440) * 100}%`;
export const getH = (h: number): string => `${(h / 700) * 100}%`;

// Smooth programmatic scroll utility (ease-out only)
export const smoothScrollTo = (targetY: number, duration = 750): void => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;
  let start: number | null = null;

  // Ease-out only (no ease-in): immediate high velocity start, pronounced and smooth deceleration
  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);
    const ease = easeOutQuart(percent);
    window.scrollTo(0, startY + diff * ease);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};
