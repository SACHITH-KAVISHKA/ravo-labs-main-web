import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTankPercentage, calculateShiftVariance } from './fuel';

test('calculateTankPercentage calculates correct ratios', () => {
  assert.equal(calculateTankPercentage(15000, 20000), 75);
  assert.equal(calculateTankPercentage(20000, 20000), 100);
  assert.equal(calculateTankPercentage(0, 20000), 0);
  assert.equal(calculateTankPercentage(100, 0), 0);
});

test('calculateShiftVariance checks dispensed vs sales match', () => {
  const balanced = calculateShiftVariance(10000, 11500, 1500);
  assert.equal(balanced.pumpDispensed, 1500);
  assert.equal(balanced.variance, 0);
  assert.equal(balanced.isBalanced, true);

  const discrepancy = calculateShiftVariance(10000, 11520, 1500);
  assert.equal(discrepancy.variance, 20);
  assert.equal(discrepancy.isBalanced, false);
});
