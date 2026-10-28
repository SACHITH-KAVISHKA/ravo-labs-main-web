import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  getNextIndex,
  getPrevIndex,
  filterTestimonials,
  Testimonial
} from './carouselLogic';

describe('carouselLogic', () => {
  it('increments index with wraparound', () => {
    assert.strictEqual(getNextIndex(0, 3), 1);
    assert.strictEqual(getNextIndex(1, 3), 2);
    assert.strictEqual(getNextIndex(2, 3), 0);
  });

  it('decrements index with wraparound', () => {
    assert.strictEqual(getPrevIndex(0, 3), 2);
    assert.strictEqual(getPrevIndex(2, 3), 1);
    assert.strictEqual(getPrevIndex(1, 3), 0);
  });

  it('handles zero or single item safely', () => {
    assert.strictEqual(getNextIndex(0, 0), 0);
    assert.strictEqual(getPrevIndex(0, 0), 0);
    assert.strictEqual(getNextIndex(0, 1), 0);
    assert.strictEqual(getPrevIndex(0, 1), 0);
  });

  const sample: Testimonial[] = [
    {
      id: '1',
      quote: 'Great HR',
      author: 'A',
      role: 'R',
      company: 'C',
      location: 'L',
      product: 'hr',
      productName: 'Ravo HR',
      metric: '5x',
      metricLabel: 'Faster',
      avatarBg: '#000',
      stars: 5
    },
    {
      id: '2',
      quote: 'Great Fuel',
      author: 'B',
      role: 'R',
      company: 'C',
      location: 'L',
      product: 'fuel',
      productName: 'Ravo Fuel',
      metric: '0%',
      metricLabel: 'Variance',
      avatarBg: '#000',
      stars: 5
    },
    {
      id: '3',
      quote: 'Great POS',
      author: 'C',
      role: 'R',
      company: 'C',
      location: 'L',
      product: 'pos',
      productName: 'Ravo POS',
      metric: '2s',
      metricLabel: 'Checkout',
      avatarBg: '#000',
      stars: 5
    },
    {
      id: '4',
      quote: 'Great Enterprise Suite',
      author: 'D',
      role: 'R',
      company: 'C',
      location: 'L',
      product: 'enterprise',
      productName: 'Enterprise Suite',
      metric: '3 in 1',
      metricLabel: 'Unified',
      avatarBg: '#000',
      stars: 5
    }
  ];

  it('returns all items when filter is all', () => {
    const res = filterTestimonials(sample, 'all');
    assert.strictEqual(res.length, 4);
  });

  it('filters specifically by product and includes enterprise', () => {
    const hrItems = filterTestimonials(sample, 'hr');
    assert.strictEqual(hrItems.length, 2);
    assert.ok(hrItems.some((i) => i.product === 'hr'));
    assert.ok(hrItems.some((i) => i.product === 'enterprise'));

    const fuelItems = filterTestimonials(sample, 'fuel');
    assert.strictEqual(fuelItems.length, 2);
    assert.ok(fuelItems.some((i) => i.product === 'fuel'));

    const posItems = filterTestimonials(sample, 'pos');
    assert.strictEqual(posItems.length, 2);
    assert.ok(posItems.some((i) => i.product === 'pos'));
  });
});
