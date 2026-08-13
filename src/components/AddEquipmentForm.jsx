import React, { useState } from "react";
import { Plus, Zap } from "lucide-react";

export default function AddEquipmentForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", power: "", qty: 1, hours: "" });
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.name.trim() || !form.power || !form.hours) {
      setError("Preencha aparelho, potência e horas por dia.");
      return;
    }
    setError("");
    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      power: parseFloat(form.power),
      qty: parseFloat(form.qty) || 1,
      hours: parseFloat(form.hours),
    });
    setForm({ name: "", power: "", qty: 1, hours: "" });
  };

  return (
    <div className="bg-panel border border-border rounded-2xl p-6 mb-8">
      <h2 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
        <Zap size={18} color="#E8A33D" />
        Adicionar equipamento
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3">
        <div>
          <label className="text-muted text-xs block mb-1">Aparelho</label>
          <input
            type="text"
            placeholder="Ex: Ventilador"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md px-3 py-2 bg-input border border-input-border text-ink-strong"
          />
        </div>
        <div>
          <label className="text-muted text-xs block mb-1">Potência (W)</label>
          <input
            type="number"
            min="0"
            placeholder="120"
            value={form.power}
            onChange={(e) => setForm({ ...form, power: e.target.value })}
            className="w-full rounded-md px-3 py-2 bg-input border border-input-border text-ink-strong font-mono"
          />
        </div>
        <div>
          <label className="text-muted text-xs block mb-1">Quantidade</label>
          <input
            type="number"
            min="1"
            value={form.qty}
            onChange={(e) => setForm({ ...form, qty: e.target.value })}
            className="w-full rounded-md px-3 py-2 bg-input border border-input-border text-ink-strong font-mono"
          />
        </div>
        <div>
          <label className="text-muted text-xs block mb-1">Horas/dia</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.1"
            placeholder="5"
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
            className="w-full rounded-md px-3 py-2 bg-input border border-input-border text-ink-strong font-mono"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-1.5 bg-amber text-panel hover:brightness-110 transition"
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>
      </div>
      {error && <div className="text-terracotta text-sm mt-3">{error}</div>}
    </div>
  );
}
