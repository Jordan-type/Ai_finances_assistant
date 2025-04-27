"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentPlaygroundPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const handleRun = () => {
    setOutput(`🤖 Agent says: This is a mock response for: "${input}"`)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🤖 Agent Playground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter a prompt or instruction..."
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleRun}>Run Agent</Button>
          {output && (
            <div className="bg-muted p-4 rounded-md mt-4">
              <pre className="text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
