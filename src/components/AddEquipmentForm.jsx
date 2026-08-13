import React, { useState } from "react";
import { Plus } from "lucide-react";

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-panel border border-border rounded-2xl p-8 mb-8">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl flex items-center gap-2">
          <Plus size={20} className="text-amber" />
          Adicionar novo equipamento
        </h2>
        <p className="text-muted text-sm mt-1">Preencha os dados do seu aparelho eletrônico</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-2">Aparelho</label>
          <input
            type="text"
            placeholder="Ex: Ventilador"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onKeyPress={handleKeyPress}
            className="w-full rounded-lg px-4 py-3 bg-input border border-input-border text-ink-strong placeholder-faint focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
          />
        </div>
        <div>
          <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-2">Potência (W)</label>
          <input
            type="number"
            min="0"
            placeholder="500"
            value={form.power}
            onChange={(e) => setForm({ ...form, power: e.target.value })}
            onKeyPress={handleKeyPress}
            className="w-full rounded-lg px-4 py-3 bg-input border border-input-border text-ink-strong placeholder-faint font-mono focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
          />
        </div>
        <div>
          <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-2">Quantidade</label>
          <input
            type="number"
            min="1"
            value={form.qty}
            onChange={(e) => setForm({ ...form, qty: e.target.value })}
            onKeyPress={handleKeyPress}
            className="w-full rounded-lg px-4 py-3 bg-input border border-input-border text-ink-strong font-mono focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
          />
        </div>
        <div>
          <label className="text-muted text-xs font-mono uppercase tracking-wider block mb-2">Horas/dia</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.1"
            placeholder="8"
            value={form.hours}
            onChange={(e) => setForm({ ...form, hours: e.target.value })}
            onKeyPress={handleKeyPress}
            className="w-full rounded-lg px-4 py-3 bg-input border border-input-border text-ink-strong placeholder-faint font-mono focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleAdd}
            className="w-full rounded-lg px-6 py-3 font-semibold flex items-center justify-center gap-2 bg-amber text-panel hover:bg-amber/90 hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <Plus size={18} />
            Adicionar
          </button>
        </div>
      </div>
      {error && (
        <div className="text-terracotta text-sm mt-4 p-3 bg-terracotta/10 border border-terracotta/30 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
