"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, ArrowLeftRight, Trash2 } from "lucide-react"
import type { TranslationResult } from "@/types/fhir"
import { fhirService } from "@/services/fhir.service"
import { cn } from "@/lib/utils"

interface TranslationHistoryProps {
  onSelectTranslation?: (result: TranslationResult) => void
}

// Mock translation history data
const mockHistory: TranslationResult[] = [
  {
    success: true,
    originalCode: {
      system: "https://namaste.ayush.gov.in/fhir/CodeSystem/ayurveda",
      code: "AY001",
      display: "Vata Dosha Imbalance",
    },
    mappedCodes: [
      {
        system: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/tm2",
        code: "TM2.001",
        display: "Constitutional imbalance - Wind element",
        equivalence: "equivalent",
        score: 0.95,
      },
    ],
    message: "Translation successful",
  },
  {
    success: true,
    originalCode: {
      system: "https://namaste.ayush.gov.in/fhir/CodeSystem/siddha",
      code: "SI045",
      display: "Kabam Excess",
    },
    mappedCodes: [
      {
        system: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/tm2",
        code: "TM2.045",
        display: "Constitutional imbalance - Phlegm element",
        equivalence: "equivalent",
        score: 0.88,
      },
    ],
    message: "Translation successful",
  },
  {
    success: false,
    originalCode: {
      system: "https://namaste.ayush.gov.in/fhir/CodeSystem/unani",
      code: "UN123",
      display: "Mizaj Imbalance",
    },
    mappedCodes: [],
    message: "No suitable ICD-11 mapping found",
  },
]

export function TranslationHistory({ onSelectTranslation }: TranslationHistoryProps) {
  const [history, setHistory] = useState<TranslationResult[]>(mockHistory)

  const handleSelectTranslation = (result: TranslationResult) => {
    onSelectTranslation?.(result)
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const getSystemBadgeColor = (system: string) => {
    if (system.includes("ayurveda")) return "bg-green-100 text-green-800"
    if (system.includes("siddha")) return "bg-blue-100 text-blue-800"
    if (system.includes("unani")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <span>Recent Translations</span>
        </CardTitle>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearHistory}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent translations</p>
            <p className="text-sm">Your translation history will appear here</p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {history.map((result, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSelectTranslation(result)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={cn("text-xs", getSystemBadgeColor(result.originalCode.system))}>
                          {fhirService.getSystemLabel(result.originalCode.system)}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{result.originalCode.code}</span>
                      </div>
                      <div className="font-medium text-sm">{result.originalCode.display}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {result.success ? (
                        <Badge variant="secondary" className="text-xs">
                          {result.mappedCodes.length} mapping{result.mappedCodes.length !== 1 ? "s" : ""}
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                  {result.success && result.mappedCodes.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <ArrowLeftRight className="h-3 w-3 inline mr-1" />
                      {result.mappedCodes[0].display}
                      {result.mappedCodes.length > 1 && ` +${result.mappedCodes.length - 1} more`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
