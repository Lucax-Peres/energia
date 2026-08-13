import React, { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import AddEquipmentForm from "./components/AddEquipmentForm.jsx";
import EquipmentTable from "./components/EquipmentTable.jsx";
import ConsumptionChart from "./components/ConsumptionChart.jsx";
import initialItems from "./data/initialItems.js";
import { calcTotals } from "./utils/calculations.js";

const DEFAULT_TARIFF = 0.85;

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [tariff, setTariff] = useState(DEFAULT_TARIFF);

  const totals = useMemo(() => calcTotals(items, tariff), [items, tariff]);

  const addItem = (item) => setItems((prev) => [...prev, item]);

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateItem = (id, field, value) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, [field]: field === "name" ? value : value === "" ? "" : parseFloat(value) }
          : i
      )
    );

  return (
    <div className="min-h-screen bg-bg text-ink font-body">
      <div className="max-w-6xl mx-auto px-5 py-10 md:py-16">
        <Header />

        <SummaryPanel
          totals={totals}
          tariff={tariff}
          onTariffChange={setTariff}
        />

        <AddEquipmentForm onAdd={addItem} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <EquipmentTable
              items={items}
              tariff={tariff}
              totals={totals}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          </div>
          <div className="lg:col-span-1">
            <ConsumptionChart items={items} tariff={tariff} />
          </div>
        </div>

        <p className="text-faint text-xs text-center">
          Estimativa baseada em potência nominal × quantidade × horas de uso, para um ciclo de 30 dias. O consumo real pode variar conforme o modelo do aparelho e o modo de uso.
        </p>
      </div>
    </div>
  );
}
