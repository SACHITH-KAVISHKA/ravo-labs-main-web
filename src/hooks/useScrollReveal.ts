import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px'
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, prefersReducedMotion]);

  return { elementRef, isRevealed };
}
