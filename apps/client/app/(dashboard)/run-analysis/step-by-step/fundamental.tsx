"use client"

import { StepProps } from "@/types/type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function StepFundamental({ onNext, onBack, setLoading }: StepProps) {
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 1000)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📚 Fundamental Analysis</h1>
      <Input placeholder="Project Tokenomics Summary" />
      <Textarea placeholder="Governance Document Summary (optional)" />
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Analyze Fundamentals
        </Button>
      </div>
    </div>
  )
}
