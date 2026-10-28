import { ProductId } from '../types';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  product: ProductId | 'enterprise';
  productName: string;
  metric: string;
  metricLabel: string;
  avatarBg: string;
  stars: number;
}

export function getNextIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function getPrevIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}

export function filterTestimonials(
  testimonials: Testimonial[],
  filter: ProductId | 'all'
): Testimonial[] {
  if (filter === 'all') return testimonials;
  return testimonials.filter(
    (t) => t.product === filter || t.product === 'enterprise'
  );
}
