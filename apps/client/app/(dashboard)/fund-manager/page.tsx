"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FundManagerPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="p-6 border-green-600 bg-green-50">
        <CardTitle className="text-green-700 text-xl">💹 Recommended Action: BUY / LONG</CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <ArrowUpRight className="text-green-600" />
          <span className="text-green-800">Risk approved by Risk Manager. Signals aligned across analysts.</span>
        </div>
      </Card>

      <Card className="p-6 border-red-500 bg-red-50">
        <CardTitle className="text-red-700 text-xl">🚫 Alternative Action: SELL / SHORT</CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <ArrowDownRight className="text-red-600" />
          <span className="text-red-800">Use if trend reverses or high volatility is detected.</span>
        </div>
      </Card>
    </div>
  );
}
