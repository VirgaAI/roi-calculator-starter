import React, { useMemo, useState } from 'react';

type Num = number;

export function RoiWidget() {
  const [addedCasesPerWeek, setAddedCasesPerWeek] = useState<Num>(0);
  const [contribMarginPerCase, setContribMarginPerCase] = useState<Num>(2500);
  const [otHoursReducedPerDay, setOtHoursReducedPerDay] = useState<Num>(0);
  const [otCostPerHour, setOtCostPerHour] = useState<Num>(75);
  const [investmentPerMonth, setInvestmentPerMonth] = useState<Num>(3500);
  const [daysPerMonth, setDaysPerMonth] = useState<Num>(22);

  const num = (v: any) => (typeof v === 'number' && Number.isFinite(v) ? v : Number(v) || 0);
  const onNum =
    (setter: (n: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(num(e.target.value));

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

  const fmtMoney = (n: number) =>
    Number.isFinite(n) ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '—';
  const fmtPct = (n: number) => (Number.isFinite(n) ? `${Math.round(n)}%` : '—');

  return (
    <div className="roi-card">
      <style>{`
        .roi-card {
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          border: 1px solid #d9dce6;
          border-radius: 10px;
          max-width: 960px;
          padding: 20px 24px;
          background: #fff;
        }
        .roi-title {
          font-size: 20px;
          font-weight: 700;
          color: #121826;
          margin: 0 0 12px 0;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .roi-subtle {
          font-weight: 500;
          color: #5b6477;
        }
        .roi-divider {
          height: 1px;
          background: #eceff5;
          margin: 8px 0 16px;
        }
        .roi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 820px) {
          .roi-grid { grid-template-columns: 1fr; }
        }
        .roi-col h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          color: #1b2430;
        }
        .roi-field {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 10px 0;
        }
        .roi-label {
          color: #2a3240;
          font-size: 14px;
          line-height: 1.2;
          flex: 1 1 auto;
        }
        .roi-input {
          width: 180px;
          padding: 8px 10px;
          border: 1px solid #cfd5e4;
          border-radius: 8px;
          font-size: 14px;
          text-align: right;
          background: #fafbfe;
        }
        .roi-input:focus {
          outline: none;
          border-color: #6b7cff;
          box-shadow: 0 0 0 3px rgba(107, 124, 255, 0.15);
          background: #fff;
        }
        .roi-results {
          list-style: disc;
          padding-left: 20px;
          margin: 6px 0 0 0;
        }
        .roi-results li {
          margin: 8px 0;
          color: #222a35;
          font-size: 15px;
        }
      `}</style>

      <div className="roi-title">
        <span>Ospitek ROI Calculator</span>
        <span className="roi-subtle">(Decoupled Capacity)</span>
      </div>
      <div className="roi-divider" />

      <div className="roi-grid">
        <div className="roi-col">
          <h3>ROI Drivers</h3>

          <div className="roi-field">
            <span className="roi-label">Added cases/week</span>
            <input
              className="roi-input"
              type="number"
              value={addedCasesPerWeek}
              onChange={onNum(setAddedCasesPerWeek)}
            />
          </div>

          <div className="roi-field">
            <span className="roi-label">Contribution margin per case ($)</span>
            <input
              className="roi-input"
              type="number"
              value={contribMarginPerCase}
              onChange={onNum(setContribMarginPerCase)}
            />
          </div>

          <div className="roi-field">
            <span className="roi-label">OT hours reduced/day</span>
            <input
              className="roi-input"
              type="number"
              value={otHoursReducedPerDay}
              onChange={onNum(setOtHoursReducedPerDay)}
            />
          </div>

          <div className="roi-field">
            <span className="roi-label">OT cost per hour ($)</span>
            <input
              className="roi-input"
              type="number"
              value={otCostPerHour}
              onChange={onNum(setOtCostPerHour)}
            />
          </div>

          <div className="roi-field">
            <span className="roi-label">Investment per month ($)</span>
            <input
              className="roi-input"
              type="number"
              value={investmentPerMonth}
              onChange={onNum(setInvestmentPerMonth)}
            />
          </div>

          <div className="roi-field">
            <span className="roi-label">Days per month</span>
            <input
              className="roi-input"
              type="number"
              value={daysPerMonth}
              onChange={onNum(setDaysPerMonth)}
            />
          </div>
        </div>

        <div className="roi-col">
          <h3>Results</h3>
          <ul className="roi-results">
            <li>
              Volume benefit: <b>{fmtMoney(volumeBenefitMonthly)}</b>
            </li>
            <li>
              Overtime savings: <b>{fmtMoney(otSavingsMonthly)}</b>
            </li>
            <li>
              Total monthly benefit: <b>{fmtMoney(totalMonthlyBenefit)}</b>
            </li>
            <li>
              Investment: <b>{fmtMoney(investmentPerMonth)}</b>
            </li>
            <li>
              ROI (net %): <b>{fmtPct(roiNetPct)}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoiWidget;
