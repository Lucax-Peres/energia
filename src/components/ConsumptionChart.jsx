import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { calcItem, formatNumber } from "../utils/calculations.js";
import { TrendingUp } from "lucide-react";

const COLORS = [
  "#E8A33D",
  "#4FD1C5",
  "#EF7A6B",
  "#7C9EFF",
  "#C9A6F2",
  "#F2C14E",
  "#5EEAD4",
  "#F2A6C8",
];

export default function ConsumptionChart({ items, tariff }) {
  if (items.length === 0) return null;

  const chartData = [...items]
    .map((item) => ({ name: item.name, kwh: calcItem(item, tariff).kwhMonth }))
    .sort((a, b) => b.kwh - a.kwh)
    .map((d, idx) => ({ ...d, kwh: +d.kwh.toFixed(1), fill: COLORS[idx % COLORS.length] }));

  const topConsumer = chartData[0];
  const topPercentage = items.length > 0 ? (topConsumer.kwh / chartData.reduce((sum, d) => sum + d.kwh, 0)) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-panel to-panel-alt border border-border rounded-2xl p-6 sticky top-8">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl flex items-center gap-2 mb-2">
          <TrendingUp size={20} className="text-amber" />
          Consumo por equipamento
        </h2>
        <p className="text-muted text-sm">
          Ranking dos aparelhos que mais consomem energia
        </p>
      </div>

      {/* Card do maior consumidor */}
      <div className="bg-panel border border-border rounded-lg p-4 mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-muted text-xs font-mono uppercase tracking-wider">Maior consumidor</span>
          <span className="text-amber font-bold text-sm">{formatNumber(topPercentage, 0)}%</span>
        </div>
        <div className="text-lg font-semibold text-ink-strong">{topConsumer.name}</div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-teal font-mono">{formatNumber(topConsumer.kwh, 1)}</span>
          <span className="text-muted text-sm">kWh/mês</span>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div style={{ width: "100%", height: Math.max(200, Math.min(chartData.length * 40, 400)) }} className="mb-4">
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 24, top: 8, bottom: 8 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fill: "#8B94A0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`${formatNumber(v, 1)} kWh/mês`, ""]}
              contentStyle={{
                background: "#1B1F23",
                border: "1px solid #2A3038",
                borderRadius: 8,
                color: "#EDEDED",
                fontSize: 12,
              }}
              labelStyle={{ color: "#8B94A0" }}
            />
            <Bar dataKey="kwh" radius={[0, 8, 8, 0]} barSize={24}>
              {chartData.map((d, idx) => (
                <Cell key={idx} fill={d.fill} />
              ))}
              <LabelList
                dataKey="kwh"
                position="right"
                formatter={(v) => `${formatNumber(v, 1)}`}
                style={{ fill: "#8B94A0", fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda informativa */}
      <div className="text-xs text-faint border-t border-border-soft pt-4">
        <p>💡 Dica: Reduza o uso dos aparelhos que mais consomem para economizar na sua conta de energia.</p>
      </div>
    </div>
  );
}
