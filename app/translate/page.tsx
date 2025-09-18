"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { TranslationInput } from "@/components/translation/translation-input"
import { TranslationResults } from "@/components/translation/translation-results"
import { TranslationHistory } from "@/components/translation/translation-history"
import type { NAMASTEConcept, TranslationResult } from "@/types/fhir"
import { fhirService } from "@/services/fhir.service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function TranslatePage() {
  const [selectedConcept, setSelectedConcept] = useState<NAMASTEConcept | null>(null)
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()

  // Load concept from URL parameters if provided
  useEffect(() => {
    const system = searchParams.get("system")
    const code = searchParams.get("code")
    const display = searchParams.get("display")

    if (system && code && display) {
      setSelectedConcept({
        system,
        code,
        display,
      })
    }
  }, [searchParams])

  const handleTranslate = async (concept: NAMASTEConcept) => {
    setLoading(true)
    setError(null)
    setTranslationResult(null)

    try {
      const parameters = await fhirService.translateConcept(
        "https://namaste.ayush.gov.in/fhir/ConceptMap/namaste-to-icd11",
        concept.system,
        concept.code,
      )

      const result = fhirService.parseTranslationResult(parameters)
      result.originalCode = concept

      setTranslationResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMapping = (result: TranslationResult) => {
    // In a real implementation, this would save the mapping to a backend
    console.log("Saving mapping:", result)
    // Show success message or update UI
  }

  const handleSelectFromHistory = (result: TranslationResult) => {
    setSelectedConcept(result.originalCode)
    setTranslationResult(result)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-balance">Code Translation</h1>
              <p className="text-muted-foreground mt-2">
                Translate NAMASTE traditional medicine codes to ICD-11 international standards.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <TranslationInput onTranslate={handleTranslate} loading={loading} selectedConcept={selectedConcept} />

                <TranslationResults result={translationResult} onSaveMapping={handleSaveMapping} />
              </div>

              <div className="lg:col-span-1">
                <TranslationHistory onSelectTranslation={handleSelectFromHistory} />
              </div>
            </div>

            {/* Translation Guidelines */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Translation Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">Equivalence Levels</h4>
                  <ul className="space-y-1">
                    <li>
                      • <strong>Equivalent:</strong> Direct conceptual match
                    </li>
                    <li>
                      • <strong>Wider:</strong> ICD-11 concept is broader
                    </li>
                    <li>
                      • <strong>Narrower:</strong> ICD-11 concept is more specific
                    </li>
                    <li>
                      • <strong>Inexact:</strong> Approximate mapping
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="space-y-1">
                    <li>• Review confidence scores carefully</li>
                    <li>• Consider multiple mappings when available</li>
                    <li>• Validate translations with clinical context</li>
                    <li>• Save preferred mappings for consistency</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
