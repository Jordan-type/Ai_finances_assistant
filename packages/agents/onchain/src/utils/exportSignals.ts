import fs from "fs";
import path from "path";

/**
 * Exports trading signals to a CSV file.
 * @param signals List of trade signals.
 * @param currentPrices Latest token prices.
 */
export function exportSignalsToCSV(signals: string[], currentPrices: Record<string, number>) {
  const rows = signals.map(signal => {
    const match = signal.match(/^(.*?)\:.*?([+-]?\d+\.\d+)%.*?(BUY|SELL|HOLD)?/);
    if (!match) return null;
    const [_, symbol, change, action] = match;
    return {
      timestamp: new Date().toISOString(),
      symbol: symbol.trim(),
      newPrice: currentPrices[symbol.trim()],
      change: `${parseFloat(change).toFixed(2)}%`,
      signal: action || "UNKNOWN"
    };
  }).filter(Boolean);

  const csvLine = rows.map(row =>
    `${row?.timestamp},${row?.symbol},${row?.newPrice},${row?.change},${row?.signal}`
  ).join("\n");

  const filePath = path.join("quant_signals_log.csv");
  const header = "timestamp,symbol,newPrice,change,signal";

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `${header}\n${csvLine}\n`);
  } else {
    fs.appendFileSync(filePath, `${csvLine}\n`);
  }
}
