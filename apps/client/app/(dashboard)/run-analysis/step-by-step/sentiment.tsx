"use client"

import { StepProps } from "@/types/type"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function StepSentiment({ onNext, onBack, setLoading }: StepProps) {
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 1000)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💬 Sentiment Analysis</h1>
      <p>Summarize tweets, Reddit posts, and telegram discussions.</p>
      <Textarea placeholder="Paste social media summaries here..." />
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Run Sentiment Analysis
        </Button>
      </div>
    </div>
  )
}
