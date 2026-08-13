import React from "react";
import { Gauge as GaugeIcon } from "lucide-react";

export default function Header() {
  return (
    <>
      <div className="flex items-center gap-3 mb-1">
        <div className="p-2 rounded-lg bg-panel-alt border border-border">
          <GaugeIcon size={20} color="#E8A33D" />
        </div>
        <span className="text-muted text-xs uppercase tracking-widest font-mono">
          painel de consumo residencial
        </span>
      </div>
      <h1 className="font-display font-bold text-4xl sm:text-5xl mb-2">
        Quanto sua casa <span className="text-amber">consome</span>?
      </h1>
      <p className="text-muted max-w-xl mb-8">
        Cadastre os equipamentos, a quantidade de cada um e quantas horas por dia ficam ligados.
        O cálculo usa um ciclo fixo de 30 dias — igual ao seu ciclo de fatura.
      </p>
    </>
  );
}
