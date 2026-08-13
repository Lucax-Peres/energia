import React from "react";
import { Zap } from "lucide-react";

export default function Header() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-gradient-to-br from-amber to-amber/70">
          <Zap size={24} color="#15181C" strokeWidth={2.5} />
        </div>
        <span className="text-amber font-display font-bold text-2xl">Energia</span>
      </div>
      <h1 className="font-display font-bold text-5xl sm:text-6xl mb-3 leading-tight">
        Seu consumo em <span className="text-amber">30 dias</span>
      </h1>
      <p className="text-muted max-w-2xl text-lg">
        Cadastre seus aparelhos eletrônicos, quantidade e horas de uso diário para descobrir quanto você consome de energia.
      </p>
    </div>
  );
}
