"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AnalysisResultsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Summary */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">🚀 Asset Analysis Results</h1>
        <p className="text-muted-foreground">Analysis Date: April 26, 2025 | Asset: ExampleToken</p>
      </div>

      {/* Risk Report */}
      <Card>
        <CardHeader>
          <CardTitle>🛡️ Risk Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Risk Level:</strong> <span className="text-yellow-400">MEDIUM</span>
          </div>
          <div>
            <strong>Risk Score:</strong> 5/10
          </div>
          <div>
            <strong>Recommendation:</strong> Maintain caution with diversified exposure.
          </div>
        </CardContent>
      </Card>

      {/* Fund Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Fund Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><strong>Strategy:</strong> Balanced</div>
          <div><strong>Goal:</strong> Short-term growth</div>

          <div className="space-y-2">
            <div>
              <strong>BTC:</strong> 40% — Stability & Long-term upside
              <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-2/5"></div>
              </div>
            </div>
            <div>
              <strong>Stablecoins:</strong> 30% — Preserve capital
              <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-3/10"></div>
              </div>
            </div>
            <div>
              <strong>DeFi Tokens:</strong> 30% — High-growth opportunities
              <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-3/10"></div>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            📌 <em>Note: Monitor markets weekly for rebalancing opportunities.</em>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="w-full">🛒 Apply Strategy</Button>
        <Button variant="outline" className="w-full">🔄 Re-run Analysis</Button>
      </div>
    </div>
  )
}
