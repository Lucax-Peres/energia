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

  return (
    <div className="bg-panel border border-border rounded-2xl p-6">
      <h2 className="font-display font-semibold text-xl mb-4">Quem mais pesa na conta</h2>
      <div style={{ width: "100%", height: Math.max(180, chartData.length * 44) }}>
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              tick={{ fill: "#C7CCD3", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`${formatNumber(v, 1)} kWh/mês`, ""]}
              contentStyle={{
                background: "#20262C",
                border: "1px solid #333B45",
                borderRadius: 8,
                color: "#F5F1E8",
              }}
              labelStyle={{ color: "#8B94A0" }}
            />
            <Bar dataKey="kwh" radius={[0, 6, 6, 0]} barSize={22}>
              {chartData.map((d, idx) => (
                <Cell key={idx} fill={d.fill} />
              ))}
              <LabelList
                dataKey="kwh"
                position="right"
                formatter={(v) => `${formatNumber(v, 1)} kWh`}
                style={{ fill: "#8B94A0", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
