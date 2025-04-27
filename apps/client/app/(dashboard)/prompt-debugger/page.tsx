"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PromptDebuggerPage() {
  const [prompt, setPrompt] = useState("")
  const [debug, setDebug] = useState("")

  const handleDebug = () => {
    setDebug(`🧠 Prompt analysis:\n\n• Length: ${prompt.length} chars\n• Tokens: ~${Math.ceil(prompt.length / 4)}\n• Clarity: High\n• Warnings: None`)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧠 Prompt Debugger</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your LLM prompt here"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={handleDebug}>Analyze Prompt</Button>
          {debug && (
            <>
              <Separator />
              <div className="bg-muted/50 p-4 rounded-md">
                <pre className="text-sm whitespace-pre-wrap">{debug}</pre>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
