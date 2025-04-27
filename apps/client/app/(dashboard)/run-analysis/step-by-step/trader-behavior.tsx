"use client"

import { StepProps } from "@/types/type"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function StepTraderBehavior({ onNext, onBack, setLoading }: StepProps) {
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 1000)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📈 Trader Behavior</h1>
      <Textarea placeholder="Paste wallet cluster transaction summary..." />
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Analyze Trader Behavior
        </Button>
      </div>
    </div>
  )
}
