import React from "react";
import { Zap, DollarSign, Lightbulb } from "lucide-react";
import { formatNumber } from "../utils/calculations.js";

export default function SummaryPanel({ totals, tariff, onTariffChange }) {
  return (
    <div className="mb-12">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Consumo Total */}
        <div className="bg-gradient-to-br from-panel to-panel-alt border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted text-sm font-mono uppercase tracking-wider">Consumo Total</span>
            <div className="p-2 rounded-lg bg-amber/10">
              <Lightbulb size={18} className="text-amber" />
            </div>
          </div>
          <div className="text-4xl font-bold font-mono text-ink-strong mb-1">
            {formatNumber(totals.kwhMonth, 1)}
          </div>
          <div className="text-muted text-sm">kWh em 30 dias</div>
        </div>

        {/* Custo Estimado */}
        <div className="bg-gradient-to-br from-panel to-panel-alt border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted text-sm font-mono uppercase tracking-wider">Custo Estimado</span>
            <div className="p-2 rounded-lg bg-teal/10">
              <DollarSign size={18} className="text-teal" />
            </div>
          </div>
          <div className="text-4xl font-bold font-mono text-teal mb-1">
            R$ {formatNumber(totals.cost, 2)}
          </div>
          <div className="text-muted text-sm">valor aproximado</div>
        </div>

        {/* Tarifa */}
        <div className="bg-gradient-to-br from-panel to-panel-alt border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted text-sm font-mono uppercase tracking-wider">Tarifa</span>
            <div className="p-2 rounded-lg bg-amber/10">
              <Zap size={18} className="text-amber" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold text-ink-strong">R$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={tariff}
              onChange={(e) => onTariffChange(parseFloat(e.target.value) || 0)}
              className="flex-1 text-2xl font-bold font-mono bg-transparent border-b border-border text-amber focus:border-amber transition"
            />
          </div>
          <div className="text-muted text-sm">por kWh</div>
        </div>
      </div>

      {/* Barra informativa */}
      <div className="bg-panel-alt border border-border-soft rounded-xl px-6 py-4 flex items-center gap-3">
        <Zap size={18} className="text-amber flex-shrink-0" />
        <p className="text-muted text-sm">
          Ciclo de <span className="font-mono text-amber">30 dias</span> • Cálculo: Potência (W) × Quantidade × Horas/dia × 30
        </p>
      </div>
    </div>
  );
}
