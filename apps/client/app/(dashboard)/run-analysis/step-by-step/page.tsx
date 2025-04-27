"use client"

import { useState } from "react"
import WizardStepper from "@/components/WizardStepper"
import Loading from "@/components/Loading"
import StepQuant from "./quant"
import StepSentiment from "./sentiment"
import StepFundamental from "./fundamental"
import StepTraderBehavior from "./trader-behavior"
import StepRisk from "./risk"
import StepFund from "./fund"

const steps = [
  { title: "Quant Analysis" },
  { title: "Sentiment Analysis" },
  { title: "Fundamental Analysis" },
  { title: "Trader Behavior Analysis" },
  { title: "Risk Management" },
  { title: "Fund Strategy" },
]

export default function StepByStepWizardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepQuant onNext={goNext} setLoading={setLoading} />
      case 2:
        return <StepSentiment onNext={goNext} onBack={goBack} setLoading={setLoading} />
      case 3:
        return <StepFundamental onNext={goNext} onBack={goBack} setLoading={setLoading} />
      case 4:
        return <StepTraderBehavior onNext={goNext} onBack={goBack} setLoading={setLoading} />
      case 5:
        return <StepRisk onNext={goNext} onBack={goBack} setLoading={setLoading} />
      case 6:
        return <StepFund onBack={goBack} />
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      <WizardStepper currentStep={currentStep} steps={steps} />
      {loading ? <Loading /> : <div className="space-y-6">{renderStep()}</div>}
    </div>
  )
}
