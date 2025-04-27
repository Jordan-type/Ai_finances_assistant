"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { ArrowDown, AlertTriangle, CheckCircle2 } from "lucide-react";

const mockSignals = [
  { source: "Quant Analyst", signal: "BUY", confidence: "High" },
  { source: "Technical Analyst", signal: "BUY", confidence: "Medium" },
  { source: "Sentiment Analyst", signal: "HOLD", confidence: "Neutral" },
  { source: "Fundamental Analyst", signal: "BUY", confidence: "High" },
];

export default function RiskManagerPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="p-6">
        <CardTitle>📊 Risk Summary</CardTitle>
        <div className="mt-4 flex gap-4 items-center">
          <Badge variant="default" className="text-green-700 bg-green-100 border border-green-400">
            ✅ Risk Level: Low
          </Badge>
          <CheckCircle2 className="text-green-600" />
        </div>
      </Card>

      <Card className="p-6">
        <CardTitle className="mb-4">📈 Analyst Signals</CardTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSignals.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.source}</TableCell>
                <TableCell>{s.signal}</TableCell>
                <TableCell>{s.confidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
