"use client"

import { cn } from "@/lib/utils/utils"
import { Check } from "lucide-react"
import React from "react"

interface WizardStepperProps {
  currentStep: number
  steps: { title: string }[]
}

const WizardStepper = ({ currentStep, steps }: WizardStepperProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold",
                currentStep > index + 1
                  ? "border-green-500 bg-green-100 text-green-600"
                  : currentStep === index + 1
                  ? "border-blue-500 bg-blue-100 text-blue-600"
                  : "border-gray-300 bg-white text-gray-400"
              )}
            >
              {currentStep > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center",
                currentStep >= index + 1 ? "text-primary font-semibold" : "text-gray-400"
              )}
            >
              {step.title}
            </span>
          </div>

          {/* Line connector */}
          {index !== steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-1",
                currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default WizardStepper
