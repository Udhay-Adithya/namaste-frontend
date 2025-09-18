"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { CodeLookupForm } from "@/components/lookup/code-lookup-form"
import { CodeDetails, type CodeDetails as CodeDetailsType } from "@/components/lookup/code-details"
import { ValidationStatus, type ValidationResult } from "@/components/lookup/validation-status"
import { fhirService } from "@/services/fhir.service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LookupPage() {
  const [codeDetails, setCodeDetails] = useState<CodeDetailsType | null>(null)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  // Load code from URL parameters if provided
  useEffect(() => {
    const system = searchParams.get("system")
    const code = searchParams.get("code")

    if (system && code) {
      handleLookup(system, code)
    }
  }, [searchParams])

  const handleLookup = async (system: string, code: string) => {
    setLoading(true)
    setError(null)
    setCodeDetails(null)
    setValidationResult(null)

    try {
      // Perform both lookup and validation in parallel
      const [lookupResult, validationResult] = await Promise.allSettled([
        fhirService.lookupCode(system, code),
        fhirService.validateCode(system, code),
      ])

      // Process lookup result
      if (lookupResult.status === "fulfilled") {
        const mockDetails: CodeDetailsType = createMockCodeDetails(system, code)
        setCodeDetails(mockDetails)
      }

      // Process validation result
      if (validationResult.status === "fulfilled") {
        const mockValidation: ValidationResult = createMockValidationResult(system, code)
        setValidationResult(mockValidation)
      }

      if (lookupResult.status === "rejected" && validationResult.status === "rejected") {
        throw new Error("Both lookup and validation failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed")
    } finally {
      setLoading(false)
    }
  }

  const handleTranslate = (system: string, code: string, display: string) => {
    router.push(
      `/translate?system=${encodeURIComponent(system)}&code=${encodeURIComponent(code)}&display=${encodeURIComponent(display)}`,
    )
  }

  // Mock data creation functions
  const createMockCodeDetails = (system: string, code: string): CodeDetailsType => {
    const systemLabel = fhirService.getSystemLabel(system)

    const mockData: Record<string, Partial<CodeDetailsType>> = {
      AY001: {
        display: "Vata Dosha Imbalance",
        definition:
          "Constitutional imbalance characterized by excess Vata dosha, leading to symptoms of dryness, coldness, and irregular functions.",
        properties: [
          { name: "Dosha", value: "Vata", description: "Primary dosha involved" },
          { name: "Severity", value: "Moderate", description: "Clinical severity level" },
          { name: "Category", value: "Constitutional", description: "Type of disorder" },
        ],
        relationships: [
          {
            type: "parent",
            target: {
              system: "https://namaste.ayush.gov.in/fhir/CodeSystem/ayurveda",
              code: "AY000",
              display: "Dosha Imbalances",
            },
          },
        ],
      },
      SI045: {
        display: "Kabam Excess",
        definition:
          "Excess of Kabam (phlegm) humor in Siddha medicine, causing symptoms of heaviness, sluggishness, and excessive mucus production.",
        properties: [
          { name: "Humor", value: "Kabam", description: "Primary humor involved" },
          { name: "Manifestation", value: "Excess", description: "Type of imbalance" },
        ],
      },
      UN123: {
        display: "Mizaj Imbalance",
        definition:
          "Temperamental imbalance in Unani medicine affecting the natural constitution and physiological functions.",
        properties: [
          { name: "Temperament", value: "Cold & Moist", description: "Affected temperament" },
          { name: "Organ", value: "Brain", description: "Primary organ affected" },
        ],
      },
    }

    const specificData = mockData[code] || {}

    return {
      system,
      code,
      display: specificData.display || `${systemLabel} Code ${code}`,
      definition: specificData.definition,
      status: "active",
      version: "1.0.0",
      publisher: "Ministry of AYUSH, Government of India",
      lastUpdated: "2024-01-15T10:30:00Z",
      properties: specificData.properties || [],
      relationships: specificData.relationships || [],
      validation: {
        isValid: true,
        message: "Code exists and is active in the system",
      },
    }
  }

  const createMockValidationResult = (system: string, code: string): ValidationResult => {
    const isKnownCode = ["AY001", "SI045", "UN123"].includes(code)

    return {
      isValid: isKnownCode,
      system,
      code,
      display: isKnownCode ? createMockCodeDetails(system, code).display : undefined,
      message: isKnownCode
        ? "Code is valid and active in the specified system"
        : "Code not found in the specified system",
      issues: isKnownCode
        ? []
        : [
          {
            severity: "error",
            code: "not-found",
            details: "The specified code does not exist in the given code system",
          },
        ],
      metadata: {
        checkedAt: new Date().toISOString(),
        version: "1.0.0",
        source: "NAMASTE FHIR Terminology Server",
      },
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-balance">Code Lookup & Validation</h1>
              <p className="text-muted-foreground mt-2">
                Look up detailed information about codes and validate their existence in terminology systems.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <CodeLookupForm onLookup={handleLookup} loading={loading} />
                  <ValidationStatus validation={validationResult} loading={loading} />
                </div>
              </div>

              <div className="lg:col-span-2">
                <CodeDetails details={codeDetails} loading={loading} onTranslate={handleTranslate} />
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Lookup & Validation Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">Code Lookup</h4>
                  <ul className="space-y-1">
                    <li>• Retrieves comprehensive code information</li>
                    <li>• Shows definitions, properties, and relationships</li>
                    <li>• Displays system metadata and versioning</li>
                    <li>• Provides translation links for NAMASTE codes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Code Validation</h4>
                  <ul className="space-y-1">
                    <li>• Verifies code existence in specified system</li>
                    <li>• Checks code status and validity</li>
                    <li>• Reports validation issues and warnings</li>
                    <li>• Provides validation metadata and timestamps</li>
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
