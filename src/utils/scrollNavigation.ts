import { ProductId } from '../types';

export interface SectionBound {
  id: ProductId;
  top: number;
  bottom: number;
}

/**
 * Determines which product section is currently most active in viewport
 */
export function determineActiveProductSection(
  scrollPosition: number,
  sections: SectionBound[],
  viewportHeight: number = 800
): ProductId | null {
  if (!sections || sections.length === 0) return null;

  // Viewport trigger line (roughly 35% down from top of viewport)
  const triggerPoint = scrollPosition + viewportHeight * 0.35;

  for (let i = sections.length - 1; i >= 0; i--) {
    const s = sections[i];
    if (triggerPoint >= s.top) {
      return s.id;
    }
  }

  // If before first section, return first if close, otherwise null
  if (scrollPosition + viewportHeight >= sections[0].top) {
    return sections[0].id;
  }

  return null;
}

/**
 * Calculate progress percentage across product sections (0 to 100%)
 */
export function calculateProductShowcaseProgress(
  scrollPosition: number,
  firstSectionTop: number,
  lastSectionBottom: number,
  viewportHeight: number = 800
): number {
  const start = firstSectionTop;
  const end = Math.max(start + 1, lastSectionBottom - viewportHeight * 0.5);
  const current = scrollPosition;

  if (current <= start) return 0;
  if (current >= end) return 100;

  const percentage = Math.round(((current - start) / (end - start)) * 100);
  return Math.min(100, Math.max(0, percentage));
}
