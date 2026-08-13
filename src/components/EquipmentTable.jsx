import React from "react";
import { Clock, Trash2 } from "lucide-react";
import { calcItem, formatNumber, formatMoney } from "../utils/calculations.js";

export default function EquipmentTable({ items, tariff, totals, onUpdate, onRemove }) {
  return (
    <div className="bg-panel border border-border rounded-2xl p-6 mb-8 overflow-x-auto">
      <h2 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
        <Clock size={18} color="#4FD1C5" />
        Seus equipamentos
      </h2>

      {items.length === 0 ? (
        <p className="text-faint">Nenhum equipamento cadastrado ainda.</p>
      ) : (
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="text-left text-muted border-b border-border">
              <th className="pb-2 pr-2">Aparelho</th>
              <th className="pb-2 px-2">Potência</th>
              <th className="pb-2 px-2">Qtd</th>
              <th className="pb-2 px-2">h/dia</th>
              <th className="pb-2 px-2">kWh/mês</th>
              <th className="pb-2 px-2">Custo/mês</th>
              <th className="pb-2 pl-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const { kwhMonth, cost } = calcItem(item, tariff);
              return (
                <tr key={item.id} className="border-b border-border-soft">
                  <td className="py-2 pr-2">
                    <input
                      value={item.name}
                      onChange={(e) => onUpdate(item.id, "name", e.target.value)}
                      className="w-full bg-transparent text-ink-strong outline-none"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={item.power}
                        onChange={(e) => onUpdate(item.id, "power", e.target.value)}
                        className="w-16 bg-transparent text-ink-strong font-mono outline-none"
                      />
                      <span className="text-faint">W</span>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => onUpdate(item.id, "qty", e.target.value)}
                      className="w-14 bg-transparent text-ink-strong font-mono outline-none"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={item.hours}
                      onChange={(e) => onUpdate(item.id, "hours", e.target.value)}
                      className="w-14 bg-transparent text-ink-strong font-mono outline-none"
                    />
                  </td>
                  <td className="py-2 px-2 font-mono text-teal">{formatNumber(kwhMonth, 2)}</td>
                  <td className="py-2 px-2 font-mono text-amber">{formatMoney(cost)}</td>
                  <td className="py-2 pl-2 text-right">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-faint hover:text-red-400 transition"
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="pt-3 text-right pr-3 text-muted">
                Total
              </td>
              <td className="pt-3 font-mono text-teal font-bold">
                {formatNumber(totals.kwhMonth, 2)}
              </td>
              <td className="pt-3 font-mono text-amber font-bold">
                {formatMoney(totals.cost)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
