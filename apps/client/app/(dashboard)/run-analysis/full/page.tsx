"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RunAnalysisPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: connect API call here
    setTimeout(() => {
      setLoading(false)
      alert("✅ Analysis started! Redirecting to results...")
      // router.push("/dashboard/analysis-results") // (if you want auto-redirect)
    }, 2000)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Initiate Full Asset Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Project Metadata */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">🗂️ Project Metadata</h3>
              <Input placeholder="GitHub Repo URL *" required />
            </div>

            {/* Section 2: Data Sources */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">📄 Data Sources</h3>
              <Textarea placeholder="Tokenomics Summary (optional)" rows={3} />
              <Textarea placeholder="Governance Docs Summary (optional)" rows={3} />
              <Textarea placeholder="Social Media Sentiment (Twitter, Reddit, etc.)" rows={3} />
              <Textarea placeholder="Onchain Behavior Summary" rows={3} />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Running Analysis..." : "🚀 Run Full Analysis"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
