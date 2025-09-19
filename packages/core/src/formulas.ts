/**
 * Core ROI math that ignores capacity/quality fields.
 * It uses ONLY these ROI drivers:
 * - addedCasesPerWeek
 * - contributionMarginPerCase
 * - otHoursReducedPerDay
 * - otCostPerHour
 * - investmentPerMonth
 * - daysPerMonth
 */
export function computeRoi(inputs: any) {
  const daysPerMonth = Number(inputs?.daysPerMonth ?? 22);
  const weeksPerMonth = daysPerMonth / 5; // assume 5 workdays per week

  const addedCasesPerWeek = Number(inputs?.addedCasesPerWeek ?? 0);
  const contributionMarginPerCase = Number(inputs?.contributionMarginPerCase ?? 0);

  const otHoursReducedPerDay = Number(inputs?.otHoursReducedPerDay ?? 0);
  const otCostPerHour = Number(inputs?.otCostPerHour ?? 0);

  const investmentPerMonth = Number(inputs?.investmentPerMonth ?? 0);

  // Drivers -> benefits
  const addedCasesPerMonth = addedCasesPerWeek * weeksPerMonth;
  const volumeBenefit = addedCasesPerMonth * contributionMarginPerCase;

  const overtimeSavings = otHoursReducedPerDay * otCostPerHour * daysPerMonth;

  const totalMonthlyBenefit = volumeBenefit + overtimeSavings;

  const roiNetPct =
    investmentPerMonth > 0
      ? ((totalMonthlyBenefit - investmentPerMonth) / investmentPerMonth) * 100
      : Number.POSITIVE_INFINITY;

  return {
    addedCasesPerMonth,
    volumeBenefit,
    overtimeSavings,
    totalMonthlyBenefit,
    roiNetPct,
    // keep capacity fields out of the math by design
  };
}

export default { computeRoi };
