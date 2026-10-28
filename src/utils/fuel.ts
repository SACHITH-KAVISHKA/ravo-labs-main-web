export interface TankData {
  id: string;
  name: string;
  fuelType: string;
  capacityLiters: number;
  currentLiters: number;
  temperatureC: number;
  status: 'optimal' | 'warning' | 'critical';
}

export function calculateTankPercentage(currentLiters: number, capacityLiters: number): number {
  if (capacityLiters <= 0) return 0;
  const pct = (currentLiters / capacityLiters) * 100;
  return Math.min(100, Math.max(0, Math.round(pct * 10) / 10));
}

export function calculateShiftVariance(
  openingMeter: number,
  closingMeter: number,
  recordedSalesLiters: number
): { pumpDispensed: number; variance: number; isBalanced: boolean } {
  const pumpDispensed = Math.round((closingMeter - openingMeter) * 100) / 100;
  const variance = Math.round((pumpDispensed - recordedSalesLiters) * 100) / 100;
  // Variance within ±2 liters is considered normal meter tolerance
  const isBalanced = Math.abs(variance) <= 2;
  return { pumpDispensed, variance, isBalanced };
}
