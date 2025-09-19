import { describe, it, expect } from 'vitest';
import { computeRoi } from '../src/formulas';

describe('computeRoi', () => {
  it('computes ROI with basic inputs', () => {
    const out = computeRoi({
      casesPerMonth: 400,
      procedureMinutes: 60,
      turnoverMinutes: 20,
      cmPerCase: 1500,
      staffRatePerHour: 80,
      overtimeHoursReducedPerWeek: 2,
      delayMinutesReducedPerDay: 30,
      turnoverMinutesReducedPerCase: 5,
      wasteReductionPct: 0.05,
      baselineSupplySpendPerMonth: 100000,
      throughputLiftPct: 0,
      daysPerMonth: 20,
      turnoversPerDay: 20,
      projectAnnualCost: 120000,
      overtimeRatePerHour: 120,
    });
    expect(out.cmPerMinute).toBeCloseTo(25);
    expect(out.savedMinutesPerMonth).toBeGreaterThan(0);
    expect(out.totalBenefitPerYear).toBeGreaterThan(0);
  });
});
