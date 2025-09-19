import React, { useMemo, useState } from 'react';

type Inputs = {
  // ROI Drivers (these drive Results)
  addedCasesPerWeek: number;
  contributionMarginPerCase: number;
  otHoursReducedPerDay: number;
  otCostPerHour: number;
  investmentPerMonth: number;
  daysPerMonth: number;

  // Capacity/Quality (info only)
  baselineCasesPerWeek_info: number;
  turnoverReductionMinPerTurnover: number;
  capacityUptakePct: number; // 0..1
};

function num(v: number) { return Number.isFinite(v) ? v : 0; }

export function RoiWidget() {
  const [inputs, setInputs] = useState<Inputs>({
    // ROI Drivers defaults
    addedCasesPerWeek: 0,
    contributionMarginPerCase: 2500,
    otHoursReducedPerDay: 0,
    otCostPerHour: 75,
    investmentPerMonth: 3500,
    daysPerMonth: 22,

    // Capacity/Quality info-only defaults
    baselineCasesPerWeek_info: 0,
    turnoverReductionMinPerTurnover: 0,
    capacityUptakePct: 0.5,
  });

  const setNum =
    (key: keyof Inputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputs((s) => ({ ...s, [key]: e.target.value === '' ? 0 : Number(e.target.value) }));

  // === RESULTS (ROI) ===
  const results = useMemo(() => {
    const weeksPerMonth = inputs.daysPerMonth / 7; // simple, transparent conversion
    const monthlyAddedCases = num(inputs.addedCasesPerWeek) * weeksPerMonth;
    const volumeBenefit = monthlyAddedCases * num(inputs.contributionMarginPerCase);

    const otSavings =
      num(inputs.otHoursReducedPerDay) * num(inputs.otCostPerHour) * num(inputs.daysPerMonth);

    const totalBenefit = volumeBenefit + otSavings;
    const invest = num(inputs.investmentPerMonth);

    let roiPctDisplay: string;
    if (invest <= 0) {
      roiPctDisplay = '∞';
    } else {
      const netPct = ((totalBenefit - invest) / invest) * 100;
      roiPctDisplay = `${Math.round(netPct)}%`;
    }

    return {
      monthlyAddedCases,
      volumeBenefit,
      otSavings,
      totalBenefit,
      investment: invest,
      roiPctDisplay,
    };
  }, [inputs]);

  // === CAPACITY/QUALITY (INFO ONLY) ===
  const capacityInfo = useMemo(() => {
    const turnoversPerCase = 1; // simple assumption
    const turnoversPerWeek = num(inputs.baselineCasesPerWeek_info) * turnoversPerCase;
    const potentialSavedMinPerWeek =
      num(inputs.turnoverReductionMinPerTurnover) * turnoversPerWeek;
    const usedSavedMinPerWeek = potentialSavedMinPerWeek * num(inputs.capacityUptakePct);
    const usedSavedHrsPerWeek = usedSavedMinPerWeek / 60;

    return {
      turnoversPerWeek,
      potentialSavedMinPerWeek,
      usedSavedMinPerWeek,
      usedSavedHrsPerWeek,
    };
  }, [inputs]);

  const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
      <label style={{ fontWeight: 500 }}>{label}</label>
      <div>{children}</div>
    </div>
  );

  const NumberInput: React.FC<{
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    step?: number;
    min?: number;
    placeholder?: string;
  }> = ({ value, onChange, step, min, placeholder }) => (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={onChange}
      step={step ?? 1}
      min={min}
      placeholder={placeholder}
      style={{ width: '100%', padding: 6 }}
    />
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* Left column: ROI Drivers */}
      <div style={{ padding: 12, border: '1px solid #ccd', borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>ROI Drivers</h2>

        <Row label="Added cases/week">
          <NumberInput value={inputs.addedCasesPerWeek} onChange={setNum('addedCasesPerWeek')} />
        </Row>

        <Row label="Contribution margin per case ($)">
          <NumberInput
            value={inputs.contributionMarginPerCase}
            onChange={setNum('contributionMarginPerCase')}
          />
        </Row>

        <Row label="OT hours reduced/day">
          <NumberInput value={inputs.otHoursReducedPerDay} onChange={setNum('otHoursReducedPerDay')} step={0.1} />
        </Row>

        <Row label="OT cost per hour ($)">
          <NumberInput value={inputs.otCostPerHour} onChange={setNum('otCostPerHour')} />
        </Row>

        <Row label="Investment per month ($)">
          <NumberInput value={inputs.investmentPerMonth} onChange={setNum('investmentPerMonth')} />
        </Row>

        <Row label="Days per month">
          <NumberInput value={inputs.daysPerMonth} onChange={setNum('daysPerMonth')} />
        </Row>

        <h3 style={{ marginTop: 16 }}>Results</h3>
        <ul style={{ marginTop: 8 }}>
          <li>Volume benefit: <b>${Math.round(results.volumeBenefit).toLocaleString()}</b></li>
          <li>Overtime savings: <b>${Math.round(results.otSavings).toLocaleString()}</b></li>
          <li>Total monthly benefit: <b>${Math.round(results.totalBenefit).toLocaleString()}</b></li>
          <li>Investment: <b>${Math.round(results.investment).toLocaleString()}</b></li>
          <li>ROI (net %): <b>{results.roiPctDisplay}</b></li>
        </ul>
      </div>

      {/* Right column: Capacity/Quality (info only) */}
      <div style={{ padding: 12, border: '1px solid #ccd', borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Capacity/Quality (info only)</h2>
        <p style={{ marginTop: 0, color: '#556' }}>
          These improve ability to do more cases or cut OT, but they do not change the ROI math directly.
        </p>

        <Row label="Baseline cases/week">
          <NumberInput
            value={inputs.baselineCasesPerWeek_info}
            onChange={setNum('baselineCasesPerWeek_info')}
          />
        </Row>

        <Row label="OR turnover time reduction (min/turnover)">
          <NumberInput
            value={inputs.turnoverReductionMinPerTurnover}
            onChange={setNum('turnoverReductionMinPerTurnover')}
          />
        </Row>

        <Row label="Capacity uptake (0–1)">
          <NumberInput
            value={inputs.capacityUptakePct}
            onChange={setNum('capacityUptakePct')}
            step={0.05}
            min={0}
          />
        </Row>

        <h3 style={{ marginTop: 16 }}>Capacity impact (derived)</h3>
        <ul style={{ marginTop: 8 }}>
          <li>Turnovers/week (≈ cases/week): <b>{Math.round(capacityInfo.turnoversPerWeek)}</b></li>
          <li>Potential minutes saved/week: <b>{Math.round(capacityInfo.potentialSavedMinPerWeek).toLocaleString()}</b></li>
          <li>Usable capacity time/week: <b>{capacityInfo.usedSavedHrsPerWeek.toFixed(2)}</b> hrs</li>
        </ul>
      </div>
    </div>
  );
}

export default RoiWidget;
