import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  determineActiveProductSection,
  calculateProductShowcaseProgress,
  SectionBound
} from './scrollNavigation';

describe('scrollNavigation', () => {
  const mockSections: SectionBound[] = [
    { id: 'hr', top: 1000, bottom: 2000 },
    { id: 'fuel', top: 2000, bottom: 3000 },
    { id: 'pos', top: 3000, bottom: 4000 }
  ];

  it('identifies HR when scrolled near HR section', () => {
    // scrollPosition 800 + (800 * 0.35 = 280) = 1080 (>= 1000)
    const active = determineActiveProductSection(800, mockSections, 800);
    assert.strictEqual(active, 'hr');
  });

  it('identifies Fuel when scrolled into Fuel section', () => {
    // scrollPosition 1800 + 280 = 2080 (>= 2000)
    const active = determineActiveProductSection(1800, mockSections, 800);
    assert.strictEqual(active, 'fuel');
  });

  it('identifies POS when scrolled into POS section', () => {
    // scrollPosition 2800 + 280 = 3080 (>= 3000)
    const active = determineActiveProductSection(2800, mockSections, 800);
    assert.strictEqual(active, 'pos');
  });

  it('returns null when far above first section', () => {
    const active = determineActiveProductSection(0, mockSections, 800);
    assert.strictEqual(active, null);
  });

  it('calculates 0% when above showcase start', () => {
    const progress = calculateProductShowcaseProgress(500, 1000, 4000, 800);
    assert.strictEqual(progress, 0);
  });

  it('calculates 100% when at or past showcase end', () => {
    const progress = calculateProductShowcaseProgress(4000, 1000, 4000, 800);
    assert.strictEqual(progress, 100);
  });

  it('calculates intermediate percentage correctly', () => {
    const progress = calculateProductShowcaseProgress(2300, 1000, 4000, 800);
    assert.ok(progress > 30 && progress < 60);
  });
});
