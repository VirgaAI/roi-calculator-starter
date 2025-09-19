export type RoiInputs = {
  // ROI drivers (only these change ROI)
  addedCasesPerWeek: number;
  contributionMarginPerCase: number;
  overtimeHoursReducedPerDay: number;
  overtimeCostPerHour: number;

  // Monthly investment
  investmentPerMonth: number;

  // Calendar
  daysPerMonth: number;

  // Capacity/quality (info-only; do NOT affect ROI)
  delayMinutesReducedPerDay: number;
  throughputLiftPct: number;   // 0..1
  capacityUptakePct: number;   // 0..1
};

export type RoiOutputs = {
  volumeBenefit: number;
  overtimeSavings: number;
  totalBenefit: number;
  investmentPerMonth: number;
  roiNetPct: number;  // (benefit - investment) / investment
  capacityInfo: {
    delayMinutesReducedPerDay: number;
    throughputLiftPct: number;
    capacityUptakePct: number;
  };
};
