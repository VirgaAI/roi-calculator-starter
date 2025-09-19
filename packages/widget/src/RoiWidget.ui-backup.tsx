import React, { useMemo, useState } from 'react';

type Num = number;

export function RoiWidget() {
  // ROI Drivers (editable)
  const [addedCasesPerWeek, setAddedCasesPerWeek] = useState<Num>(0);
  const [contribMarginPerCase, setContribMarginPerCase] = useState<Num>(2500);
  const [otHoursReducedPerDay, setOtHoursReducedPerDay] = useState<Num>(0);
  const [otCostPerHour, setOtCostPerHour] = useState<Num>(75);
  const [investmentPerMonth, setInvestmentPerMonth] = useState<Num>(3500);
  const [daysPerMonth, setDaysPerMonth] = useState<Num>(22);

  // Helpers
  const num = (v: any) => (typeof v === 'number' && Number.isFinite(v) ? v : Number(v) || 0);
  const onNum =
    (setter: (n: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(num(e.target.value));

  // Results
  const { volumeBenefitMonthly, otSavingsMonthly, totalMonthlyBenefit, roiNetPct } = useMemo(() => {
    const weeksPerMonth = daysPerMonth / 7;
    const volumeBenefit = addedCasesPerWeek * weeksPerMonth * contribMarginPerCase;
    const otSavings = otHoursReducedPerDay * otCostPerHour * daysPerMonth;
    const total = volumeBenefit + otSavings;
    const roiPct = investmentPerMonth > 0 ? ((total - investmentPerMonth) / investmentPerMonth) * 100 : 0;
    return {
      volumeBenefitMonthly: volumeBenefit,
      otSavingsMonthly: otSavings,
      totalMonthlyBenefit: total,
      roiNetPct: roiPct,
    };
  }, [
    addedCasesPerWeek,
    contribMarginPerCase,
    otHoursReducedPerDay,
    otCostPerHour,
    investmentPerMonth,
    daysPerMonth,
  ]);

  const fmt = (n: number) =>
    Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—';
  const fmtMoney = (n: number) =>
    Number.isFinite(n) ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '—';
  const fmtPct = (n: number) =>
    Number.isFinite(n) ? `${Math.round(n)}%` : '—';

  return (
    <div style={{ padding: 16, border: '1px solid #ccd', borderRadius: 8, maxWidth: 720 }}>
      <div style={{ marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e3e6ef' }}>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
          Ospitek ROI Calculator <span style={{ fontWeight: 500, color: '#556' }}>(Decoupled Capacity)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* ROI Drivers */}
        <div>
          <h3 style={{ marginTop: 0 }}>ROI Drivers</h3>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Added cases/week{' '}
            <input
              type="number"
              value={addedCasesPerWeek}
              onChange={onNum(setAddedCasesPerWeek)}
              style={{ width: 140, marginLeft: 8 }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Contribution margin per case ($){' '}
            <input
              type="number"
              value={contribMarginPerCase}
              onChange={onNum(setContribMarginPerCase)}
              style={{ width: 140, marginLeft: 8 }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            OT hours reduced/day{' '}
            <input
              type="number"
              value={otHoursReducedPerDay}
              onChange={onNum(setOtHoursReducedPerDay)}
              style={{ width: 140, marginLeft: 8 }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            OT cost per hour ($){' '}
            <input
              type="number"
              value={otCostPerHour}
              onChange={onNum(setOtCostPerHour)}
              style={{ width: 140, marginLeft: 8 }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Investment per month ($){' '}
            <input
              type="number"
              value={investmentPerMonth}
              onChange={onNum(setInvestmentPerMonth)}
              style={{ width: 140, marginLeft: 8 }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Days per month{' '}
            <input
              type="number"
              value={daysPerMonth}
              onChange={onNum(setDaysPerMonth)}
              style={{ width: 140, marginLeft: 8 }}
            />
          </label>
        </div>

        {/* Results */}
        <div>
          <h3 style={{ marginTop: 0 }}>Results</h3>
          <ul>
            <li>Volume benefit: <b>{fmtMoney(volumeBenefitMonthly)}</b></li>
            <li>Overtime savings: <b>{fmtMoney(otSavingsMonthly)}</b></li>
            <li>Total monthly benefit: <b>{fmtMoney(totalMonthlyBenefit)}</b></li>
            <li>Investment: <b>{fmtMoney(investmentPerMonth)}</b></li>
            <li>ROI (net %): <b>{fmtPct(roiNetPct)}</b></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoiWidget;
