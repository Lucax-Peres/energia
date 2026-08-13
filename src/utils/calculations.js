// Todas as fórmulas de consumo de energia vivem aqui, isoladas da UI,
// para que possam ser testadas e reaproveitadas sem depender do React.

export const DAYS_IN_CYCLE = 30;

/**
 * Calcula o consumo e o custo de um equipamento.
 * @param {{power:number, qty:number, hours:number}} item - potência (W), quantidade, horas/dia
 * @param {number} tariff - tarifa em R$/kWh
 * @returns {{whDay:number, kwhDay:number, kwhMonth:number, cost:number}}
 */
export function calcItem(item, tariff) {
  const power = Number(item.power) || 0;
  const qty = Number(item.qty) || 0;
  const hours = Number(item.hours) || 0;

  const whDay = power * qty * hours;
  const kwhDay = whDay / 1000;
  const kwhMonth = kwhDay * DAYS_IN_CYCLE;
  const cost = kwhMonth * tariff;

  return { whDay, kwhDay, kwhMonth, cost };
}

/**
 * Soma o consumo/custo de uma lista de equipamentos.
 * @param {Array} items
 * @param {number} tariff
 */
export function calcTotals(items, tariff) {
  return items.reduce(
    (acc, item) => {
      const { kwhMonth, cost } = calcItem(item, tariff);
      acc.kwhMonth += kwhMonth;
      acc.cost += cost;
      return acc;
    },
    { kwhMonth: 0, cost: 0 }
  );
}

/** Formata um número no padrão brasileiro (ex: 1.234,56). */
export function formatNumber(n, digits = 2) {
  if (!isFinite(n)) return "0";
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Formata um número como moeda brasileira (R$). */
export function formatMoney(n) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
