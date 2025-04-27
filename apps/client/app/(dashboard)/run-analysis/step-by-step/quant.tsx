"use client"

import { StepProps } from "@/types/type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StepQuant({ onNext, setLoading }: StepProps) {
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 1000)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">⚡ Quant Analysis</h1>
      <p>Upload a GitHub repo URL or input project codebase to analyze technical signals.</p>
      <Input placeholder="GitHub Repository URL" />
      <Button className="w-full" onClick={handleSubmit}>
        Run Quant Analysis
      </Button>
    </div>
  )
}
