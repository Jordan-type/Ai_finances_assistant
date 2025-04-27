"use client"

import { StepProps } from "@/types/type"
import { Button } from "@/components/ui/button"

export default function StepRisk({ onNext, onBack, setLoading }: StepProps) {
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 1000)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🚦 Risk Assessment</h1>
      <p>Aggregating all signals into a risk report.</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Generate Risk Report
        </Button>
      </div>
    </div>
  )
}
