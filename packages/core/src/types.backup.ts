export type RoiInputs = {
  casesPerMonth: number;
  procedureMinutes: number;
  turnoverMinutes: number;
  cmPerCase: number;
  staffRatePerHour: number;
  overtimeHoursReducedPerWeek: number;
  delayMinutesReducedPerDay: number;
  turnoverMinutesReducedPerCase: number;
  wasteReductionPct: number; // 0..1
  baselineSupplySpendPerMonth: number;
  throughputLiftPct: number; // 0..1
  daysPerMonth: number;
  turnoversPerDay: number;
  projectAnnualCost: number;
  overtimeRatePerHour: number;
};
export type RoiOutputs = {
  cmPerMinute: number;
  savedMinutesPerMonth: number;
  throughputCasesGained: number;
  cmImpactPerMonth: number;
  laborSavingsPerMonth: number;
  overtimeSavingsPerMonth: number;
  supplySavingsPerMonth: number;
  totalBenefitPerMonth: number;
  totalBenefitPerYear: number;
  paybackMonths: number;
  roiMultiple: number;
};
