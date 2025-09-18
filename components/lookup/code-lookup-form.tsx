"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Loader2, AlertCircle } from "lucide-react"

interface CodeLookupFormProps {
  onLookup?: (system: string, code: string) => void
  loading?: boolean
}

const SYSTEM_OPTIONS = [
  {
    value: "https://namaste.ayush.gov.in/fhir/CodeSystem/ayurveda",
    label: "NAMASTE Ayurveda",
  },
  {
    value: "https://namaste.ayush.gov.in/fhir/CodeSystem/siddha",
    label: "NAMASTE Siddha",
  },
  {
    value: "https://namaste.ayush.gov.in/fhir/CodeSystem/unani",
    label: "NAMASTE Unani",
  },
  {
    value: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/tm2",
    label: "ICD-11 Traditional Medicine 2",
  },
  {
    value: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/mms",
    label: "ICD-11 MMS",
  },
]

export function CodeLookupForm({ onLookup, loading }: CodeLookupFormProps) {
  const [system, setSystem] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!system) {
      setError("Please select a code system")
      return
    }

    if (!code.trim()) {
      setError("Please enter a code")
      return
    }

    onLookup?.(system, code.trim())
  }

  const handleQuickLookup = (quickSystem: string, quickCode: string) => {
    setSystem(quickSystem)
    setCode(quickCode)
    onLookup?.(quickSystem, quickCode)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Code Lookup</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system">Code System</Label>
            <Select value={system} onValueChange={setSystem}>
              <SelectTrigger>
                <SelectValue placeholder="Select a code system" />
              </SelectTrigger>
              <SelectContent>
                {SYSTEM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter code (e.g., AY001, SI045)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading || !system || !code.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Looking up...
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Lookup Code
              </>
            )}
          </Button>
        </form>

        {/* Quick Lookup Examples */}
        <div className="pt-4 border-t">
          <Label className="text-sm font-medium mb-3 block">Quick Lookup Examples</Label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLookup("https://namaste.ayush.gov.in/fhir/CodeSystem/ayurveda", "AY001")}
              disabled={loading}
            >
              AY001 - Vata Dosha Imbalance
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLookup("https://namaste.ayush.gov.in/fhir/CodeSystem/siddha", "SI045")}
              disabled={loading}
            >
              SI045 - Kabam Excess
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLookup("https://namaste.ayush.gov.in/fhir/CodeSystem/unani", "UN123")}
              disabled={loading}
            >
              UN123 - Mizaj Imbalance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
