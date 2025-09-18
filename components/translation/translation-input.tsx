"use client"
import type { NAMASTEConcept } from "@/types/fhir"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/search/search-input"
import { ArrowLeftRight, X } from "lucide-react"
import { fhirService } from "@/services/fhir.service"
import { cn } from "@/lib/utils"

interface TranslationInputProps {
  onTranslate?: (concept: NAMASTEConcept) => void
  loading?: boolean
  selectedConcept?: NAMASTEConcept | null
}

export function TranslationInput({ onTranslate, loading, selectedConcept }: TranslationInputProps) {
  const [concept, setConcept] = useState<NAMASTEConcept | null>(selectedConcept || null)

  const handleSelect = (selectedConcept: NAMASTEConcept) => {
    setConcept(selectedConcept)
  }

  const handleTranslate = () => {
    if (concept) {
      onTranslate?.(concept)
    }
  }

  const handleClear = () => {
    setConcept(null)
  }

  const getSystemBadgeColor = (system: string) => {
    if (system.includes("ayurveda")) return "bg-green-100 text-green-800"
    if (system.includes("siddha")) return "bg-blue-100 text-blue-800"
    if (system.includes("unani")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ArrowLeftRight className="h-5 w-5" />
          <span>Select NAMASTE Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!concept ? (
          <div>
            <SearchInput
              onSelect={handleSelect}
              placeholder="Search for a NAMASTE code to translate..."
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Start typing to search for Ayurveda, Siddha, or Unani codes
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={cn("text-xs", getSystemBadgeColor(concept.system))}>
                      {fhirService.getSystemLabel(concept.system)}
                    </Badge>
                    <span className="font-mono text-sm text-muted-foreground">{concept.code}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{concept.display}</h3>
                  {concept.definition && <p className="text-sm text-muted-foreground">{concept.definition}</p>}
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button onClick={handleTranslate} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <ArrowLeftRight className="mr-2 h-4 w-4 animate-pulse" />
                    Translating...
                  </>
                ) : (
                  <>
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    Translate to ICD-11
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
