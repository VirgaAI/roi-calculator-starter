import React, { useState } from 'react';
import { RoiWidget } from '@ospitek/roi-widget';

export default function App() {
  // Info-only capacity inputs (independent of ROI math)
  const [plannedCasesPerWeek, setPlannedCasesPerWeek] = useState<number>(0);
  const [turnoverMinReduction, setTurnoverMinReduction] = useState<number>(0);

  // Simple, independent capacity math
  const minutesSavedPerWeek = plannedCasesPerWeek * turnoverMinReduction; // min/week
  const hoursSavedPerWeek = minutesSavedPerWeek / 60;

  return (
    <div style={{ padding: 24 }}>
      <h1>Ospitek ROI Calculator — Demo</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: your existing ROI widget (unchanged) */}
        <div>
          <RoiWidget />
        </div>

        {/* Right: capacity info-only panel (independent) */}
        <div
          style={{
            border: '1px solid #ccd',
            borderRadius: 8,
            padding: 16,
            background: '#fafbff',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Capacity (info only)</h2>
          <p style={{ marginTop: 0, color: '#556' }}>
            Independent calculations to help reason about throughput. These do not
            change ROI unless you manually translate them into added cases/week or
            reduced OT hours in the ROI panel.
          </p>

          <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
            <label style={{ display: 'grid', gridTemplateColumns: '1fr 140px', alignItems: 'center', gap: 8 }}>
              <span>Planned cases / week</span>
              <input
                type="number"
                value={Number.isFinite(plannedCasesPerWeek) ? plannedCasesPerWeek : 0}
                onChange={(e) => setPlannedCasesPerWeek(Number(e.target.value))}
                style={{ padding: 6, border: '1px solid #ccd', borderRadius: 6 }}
              />
            </label>

            <label style={{ display: 'grid', gridTemplateColumns: '1fr 140px', alignItems: 'center', gap: 8 }}>
              <span>OR turnover time reduction (min / case)</span>
              <input
                type="number"
                step="1"
                value={Number.isFinite(turnoverMinReduction) ? turnoverMinReduction : 0}
                onChange={(e) => setTurnoverMinReduction(Number(e.target.value))}
                style={{ padding: 6, border: '1px solid #ccd', borderRadius: 6 }}
              />
            </label>

            <div style={{ height: 1, background: '#e6e9f2', margin: '4px 0 8px' }} />

            <div style={{ lineHeight: 1.6 }}>
              <div>
                <b>Minutes saved / week:</b>{' '}
                {Number.isFinite(minutesSavedPerWeek) ? Math.max(0, Math.round(minutesSavedPerWeek)) : 0} min
              </div>
              <div>
                <b>Hours saved / week:</b>{' '}
                {Number.isFinite(hoursSavedPerWeek) ? Math.max(0, Math.round(hoursSavedPerWeek * 10) / 10) : 0} hr
              </div>
            </div>

            <small style={{ color: '#667', marginTop: 6 }}>
              To reflect these gains in ROI, translate the time saved into either
              additional cases/week or fewer OT hours/day in the ROI Drivers panel.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
