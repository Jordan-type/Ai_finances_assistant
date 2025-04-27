"use client"

import { StepFundProps } from "@/types/type"
import { Button } from "@/components/ui/button"

export default function StepFund({ onBack }: StepFundProps) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💼 Fund Strategy Recommendation</h1>
      <p>Allocation across BTC, Stablecoins, and DeFi Tokens based on your risk profile.</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button disabled>
          Fund Strategy Generated ✅
        </Button>
      </div>
    </div>
  )
}
