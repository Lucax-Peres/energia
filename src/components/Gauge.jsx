import React from "react";

/**
 * Medidor semicircular estilo "painel elétrico" que mostra o quanto do
 * consumo estimado (kWh/mês) ocupa a escala atual.
 *
 * Convenção geométrica: 180° = extremo esquerdo (0%), 90° = topo (50%),
 * 0° = extremo direito (100%). Isso mantém todo o arco entre y=32 e y=150,
 * dentro do viewBox (0 0 300 175) — sem vazar para fora e sobrepor o
 * conteúdo abaixo do medidor.
 */
export default function Gauge({ value, max }) {
  const clamped = Math.max(0, Math.min(value, max));
  const pct = max > 0 ? clamped / max : 0;

  const cx = 150;
  const cy = 150;
  const r = 118;

  const angleForPct = (p) => 180 - p * 180;

  const polar = (deg, radius) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy - radius * Math.sin(rad)];
  };

  const arcByPct = (pStart, pEnd, radius, color, width, key) => {
    const startDeg = angleForPct(pStart);
    const endDeg = angleForPct(pEnd);
    const [x1, y1] = polar(startDeg, radius);
    const [x2, y2] = polar(endDeg, radius);
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return (
      <path
        key={key}
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`}
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
      />
    );
  };

  const needleDeg = angleForPct(pct);
  const needleRad = (needleDeg * Math.PI) / 180;
  const nx = cx + (r - 22) * Math.cos(needleRad);
  const ny = cy - (r - 22) * Math.sin(needleRad);

  return (
    <svg viewBox="0 0 300 175" className="w-full max-w-md mx-auto">
      {arcByPct(0, 1, r, "#2E3540", 16, "track")}
      {arcByPct(0, 1 / 3, r, "#4FD1C5", 16, "low")}
      {arcByPct(1 / 3, 2 / 3, r, "#E8A33D", 16, "mid")}
      {arcByPct(2 / 3, 1, r, "#EF7A6B", 16, "high")}

      <text x="18" y="168" fill="#8B94A0" fontSize="11" fontFamily="'JetBrains Mono', monospace">
        0
      </text>
      <text
        x="270"
        y="168"
        fill="#8B94A0"
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="end"
      >
        {Math.round(max)}
      </text>

      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke="#F5F1E8"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="9" fill="#F5F1E8" stroke="#1B1F23" strokeWidth="2" />
    </svg>
  );
}
