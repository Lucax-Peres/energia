import React from "react";
import Gauge from "./Gauge.jsx";
import { formatNumber, formatMoney } from "../utils/calculations.js";

export default function SummaryPanel({ totals, maxScale, tariff, onTariffChange }) {
  return (
    <div className="bg-panel border border-border rounded-2xl p-6 sm:p-8 mb-8 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 items-center">
      <div>
        <Gauge value={totals.kwhMonth} max={maxScale} />
        <div className="text-center -mt-3">
          <div className="text-3xl font-bold font-mono text-ink-strong">
            {formatNumber(totals.kwhMonth, 1)}{" "}
            <span className="text-muted text-base align-middle">kWh/mês</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-panel-alt border border-border rounded-xl p-4">
          <div className="text-muted font-mono text-xs uppercase tracking-wider mb-1">
            custo estimado (30 dias)
          </div>
          <div className="text-3xl font-bold font-mono text-amber">
            {formatMoney(totals.cost)}
          </div>
        </div>

        <div className="bg-panel-alt border border-border rounded-xl p-4">
          <label className="text-muted font-mono text-xs uppercase tracking-wider mb-2 block">
            tarifa de energia (R$/kWh)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-muted">R$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={tariff}
              onChange={(e) => onTariffChange(parseFloat(e.target.value) || 0)}
              className="w-24 rounded-md px-2 py-1.5 bg-input border border-input-border text-ink-strong font-mono"
            />
            <span className="text-faint text-sm">por kWh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
