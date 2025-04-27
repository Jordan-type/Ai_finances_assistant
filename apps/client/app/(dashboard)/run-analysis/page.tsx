"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AnalysisLauncherPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Choose Analysis Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full" 
            variant="default"
            onClick={() => router.push("/run-analysis/full")}
          >
            🚀 Run Full Analysis
          </Button>

          <Button 
            className="w-full" 
            variant="secondary"
            onClick={() => router.push("/run-analysis/step-by-step")}
          >
            🧩 Run Step-by-Step Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
