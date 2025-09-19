import React, { useMemo, useState } from 'react';

type RoiInputs = {
  // Drivers that DO affect ROI
  addedCasesPerWeek: number;          // only this and overtime below change ROI
  revenuePerCase: number;
  overtimeHoursReducedPerDay: number;
  overtimeCostPerHour: number;

  // Monthly investment (license/fees/etc.)
  investmentPerMonth: number;

  // Calendar
  daysPerMonth: number;

  // Capacity/quality knobs (DO NOT affect ROI math)
  delayMinutesReducedPerDay: number;
  throughputLiftPct: number;   // 0..1
  capacityUptakePct: number;   // 0..1
};

type RoiOutputs = {
  volumeBenefit: number;
  overtimeSavings: number;
  totalBenefit: number;
  roiNetPct: number;          // (benefit - investment) / investment
};

const currency = (v: number) =>
  isFinite(v) ? v.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '—';

export function RoiWidget() {
  const [inputs, setInputs] = useState<RoiInputs>({
    // ROI drivers
    addedCasesPerWeek: 2,
    revenuePerCase: 2500,
    overtimeHoursReducedPerDay: 1,
    overtimeCostPerHour: 75,

    // Investment
    investmentPerMonth: 3500,

    // Calendar
    daysPerMonth: 22,

    // Capacity/quality (informational only)
    delayMinutesReducedPerDay: 45,
    throughputLiftPct: 0.10,
    capacityUptakePct: 0.50,
  });

  const outputs: RoiOutputs = useMemo(() => {
    const volumeBenefit = inputs.addedCasesPerWeek * inputs.revenuePerCase * inputs.daysPerMonth;
    const overtimeSavings = inputs.overtimeHoursReducedPerDay * inputs.overtimeCostPerHour * inputs.daysPerMonth;
    const totalBenefit = volumeBenefit + overtimeSavings;

    const roiNetPct = inputs.investmentPerMonth > 0
      ? (totalBenefit - inputs.investmentPerMonth) / inputs.investmentPerMonth
      : Infinity;

    return { volumeBenefit, overtimeSavings, totalBenefit, roiNetPct };
  }, [inputs]);

  const onNum = (k: keyof RoiInputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((s) => ({ ...s, [k]: Number(e.target.value) }));

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 900, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2 style={{ margin: 0 }}>Ospitek ROI Calculator (decoupled capacity)</h2>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div style={{ padding: 12, border: '1px solid #ccd', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>ROI Drivers</h3>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Added cases/week
            <input type="number" value={inputs.addedCasesPerWeek} onChange={onNum('addedCasesPerWeek')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Contribution margin per case ($)
            <input type="number" value={inputs.revenuePerCase} onChange={onNum('revenuePerCase')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>
            OT hours reduced/day
            <input type="number" value={inputs.overtimeHoursReducedPerDay} onChange={onNum('overtimeHoursReducedPerDay')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>
            OT cost per hour ($)
            <input type="number" value={inputs.overtimeCostPerHour} onChange={onNum('overtimeCostPerHour')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Investment per month ($)
            <input type="number" value={inputs.investmentPerMonth} onChange={onNum('investmentPerMonth')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block' }}>
            Days per month
            <input type="number" value={inputs.daysPerMonth} onChange={onNum('daysPerMonth')}
              style={{ width: '100%' }} />
          </label>
        </div>

        <div style={{ padding: 12, border: '1px solid #ccd', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Capacity/Quality (info only)</h3>
          <p style={{ marginTop: 0, color: '#556' }}>
            These improve ability to do more cases or cut OT, but they do not change the ROI math directly.
          </p>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Delay minutes reduced/day
            <input type="number" value={inputs.delayMinutesReducedPerDay} onChange={onNum('delayMinutesReducedPerDay')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Throughput lift (0–1)
            <input type="number" step="0.01" value={inputs.throughputLiftPct} onChange={onNum('throughputLiftPct')}
              style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block' }}>
            Capacity uptake (0–1)
            <input type="number" step="0.01" value={inputs.capacityUptakePct} onChange={onNum('capacityUptakePct')}
              style={{ width: '100%' }} />
          </label>
        </div>

        <div style={{ padding: 12, border: '1px solid #ccd', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Results</h3>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>Volume benefit: <b>{currency(outputs.volumeBenefit)}</b></li>
            <li>Overtime savings: <b>{currency(outputs.overtimeSavings)}</b></li>
            <li>Total monthly benefit: <b>{currency(outputs.totalBenefit)}</b></li>
            <li>Investment: <b>{currency(inputs.investmentPerMonth)}</b></li>
            <li>ROI (net %): <b>{Number.isFinite(outputs.roiNetPct) ? Math.round(outputs.roiNetPct * 100) + '%' : '∞'}</b></li>
          </ul>
          <div style={{ marginTop: 8, fontSize: 12, color: '#556' }}>
            ROI only changes when you change <b>Added cases/week</b> or <b>OT hours reduced/day</b> (and their unit economics).
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoiWidget;
