import React from "react";
import { Trash2, Zap } from "lucide-react";
import { calcItem, formatNumber } from "../utils/calculations.js";

export default function EquipmentTable({ items, tariff, totals, onUpdate, onRemove }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl flex items-center gap-2">
          <Zap size={20} className="text-teal" />
          Equipamentos cadastrados
        </h2>
        <p className="text-muted text-sm mt-1">{items.length} equipamentos na sua residência</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-panel border border-border-soft rounded-2xl p-12 text-center">
          <Zap size={32} className="mx-auto text-faint mb-4 opacity-50" />
          <p className="text-muted">Nenhum equipamento cadastrado ainda.</p>
          <p className="text-faint text-sm mt-1">Adicione seus aparelhos usando o formulário acima.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {items.map((item) => {
            const { kwhMonth, cost } = calcItem(item, tariff);
            const percentOfTotal = totals.kwhMonth > 0 ? (kwhMonth / totals.kwhMonth) * 100 : 0;

            return (
              <div
                key={item.id}
                className="bg-panel border border-border rounded-xl p-4 hover:border-border-soft transition-colors group"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
                  {/* Nome do equipamento */}
                  <div className="lg:col-span-2">
                    <input
                      value={item.name}
                      onChange={(e) => onUpdate(item.id, "name", e.target.value)}
                      className="w-full text-lg font-semibold text-ink-strong bg-transparent border-0 focus:ring-1 focus:ring-amber rounded px-2 py-1 transition"
                      placeholder="Nome do equipamento"
                    />
                  </div>

                  {/* Potência, Quantidade, Horas */}
                  <div className="grid grid-cols-3 gap-2 lg:col-span-2">
                    <div>
                      <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-1">Potência</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={item.power}
                          onChange={(e) => onUpdate(item.id, "power", e.target.value)}
                          className="flex-1 bg-transparent text-ink-strong font-mono focus:ring-1 focus:ring-amber rounded px-2 py-1 transition border-0"
                        />
                        <span className="text-faint text-xs">W</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-1">Qtd</label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => onUpdate(item.id, "qty", e.target.value)}
                        className="w-full bg-transparent text-ink-strong font-mono focus:ring-1 focus:ring-amber rounded px-2 py-1 transition border-0"
                      />
                    </div>
                    <div>
                      <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-1">h/dia</label>
                      <input
                        type="number"
                        value={item.hours}
                        onChange={(e) => onUpdate(item.id, "hours", e.target.value)}
                        className="w-full bg-transparent text-ink-strong font-mono focus:ring-1 focus:ring-amber rounded px-2 py-1 transition border-0"
                      />
                    </div>
                  </div>

                  {/* Consumo e Custo */}
                  <div className="flex items-end gap-4 lg:justify-between">
                    <div className="text-right">
                      <div className="text-sm text-muted font-mono uppercase tracking-wider">Consumo</div>
                      <div className="text-lg font-bold text-teal font-mono">
                        {formatNumber(kwhMonth, 1)}
                      </div>
                      <div className="text-xs text-faint">kWh/mês</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted font-mono uppercase tracking-wider">Custo</div>
                      <div className="text-lg font-bold text-amber font-mono">
                        R$ {formatNumber(cost, 2)}
                      </div>
                      <div className="text-xs text-faint">{formatNumber(percentOfTotal, 0)}% do total</div>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-faint hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition"
                      aria-label={`Remover ${item.name}`}
                      title="Remover"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="mt-3 bg-panel-alt rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal to-amber transition-all duration-300"
                    style={{ width: `${percentOfTotal}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Card de Total */}
          <div className="bg-gradient-to-br from-panel-alt to-panel border border-border rounded-xl p-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Equipamentos</div>
                <div className="text-2xl font-bold text-ink-strong">{items.length}</div>
              </div>
              <div>
                <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Consumo Total</div>
                <div className="text-2xl font-bold text-teal font-mono">{formatNumber(totals.kwhMonth, 1)}</div>
                <div className="text-xs text-faint">kWh em 30 dias</div>
              </div>
              <div>
                <div className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Custo Estimado</div>
                <div className="text-2xl font-bold text-amber font-mono">R$ {formatNumber(totals.cost, 2)}</div>
                <div className="text-xs text-faint">com tarifa de R$ {formatNumber(tariff, 2)}/kWh</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
