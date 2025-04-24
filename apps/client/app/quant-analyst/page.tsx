// app/quant-analyst/page.tsx

"use client";

import React from "react";

const mockSignals = [
  {
    asset: "ETH/USD",
    interval: "1H",
    signal: "BUY",
    confidence: "High",
    change: "+3.5%",
    timestamp: "2025-04-23 14:00 UTC",
  },
  {
    asset: "BTC/USD",
    interval: "4H",
    signal: "HOLD",
    confidence: "Medium",
    change: "+0.7%",
    timestamp: "2025-04-23 10:00 UTC",
  },
  {
    asset: "SOL/USD",
    interval: "1D",
    signal: "SELL",
    confidence: "Low",
    change: "-1.9%",
    timestamp: "2025-04-22 00:00 UTC",
  },
];

export default function QuantAnalystPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📈 Quant Analyst Dashboard</h1>
      <p className="text-gray-600 mb-6">AI-generated trading signals from the Quant Agent.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Asset</th>
              <th className="px-4 py-2 border-b">Interval</th>
              <th className="px-4 py-2 border-b">Signal</th>
              <th className="px-4 py-2 border-b">Confidence</th>
              <th className="px-4 py-2 border-b">% Change</th>
              <th className="px-4 py-2 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {mockSignals.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border-b">{row.asset}</td>
                <td className="px-4 py-2 border-b">{row.interval}</td>
                <td className="px-4 py-2 border-b font-semibold text-blue-600">{row.signal}</td>
                <td className="px-4 py-2 border-b">{row.confidence}</td>
                <td className={`px-4 py-2 border-b ${row.change.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
                  {row.change}
                </td>
                <td className="px-4 py-2 border-b text-sm">{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
