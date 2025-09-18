"use client"

import type { NAMASTEConcept } from "@/types/fhir"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/search/search-input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Stethoscope, ArrowLeftRight, X, Plus } from "lucide-react"
import { fhirService } from "@/services/fhir.service"
import { cn } from "@/lib/utils"

interface DiagnosisEntryProps {
  onDiagnosisAdd?: (diagnosis: ClinicalDiagnosis) => void
  diagnoses?: ClinicalDiagnosis[]
  onDiagnosisRemove?: (index: number) => void
}

export interface ClinicalDiagnosis {
  id: string
  namasteCode: NAMASTEConcept
  icd11Codes: Array<{
    system: string
    code: string
    display: string
    equivalence?: string
  }>
  notes?: string
  severity?: "mild" | "moderate" | "severe"
  status: "active" | "resolved" | "inactive"
  recordedDate: string
}

export function DiagnosisEntry({ onDiagnosisAdd, diagnoses = [], onDiagnosisRemove }: DiagnosisEntryProps) {
  const [selectedConcept, setSelectedConcept] = useState<NAMASTEConcept | null>(null)
  const [translatedCodes, setTranslatedCodes] = useState<ClinicalDiagnosis["icd11Codes"]>([])
  const [notes, setNotes] = useState("")
  const [severity, setSeverity] = useState<ClinicalDiagnosis["severity"]>("moderate")
  const [translating, setTranslating] = useState(false)

  const handleConceptSelect = (concept: NAMASTEConcept) => {
    setSelectedConcept(concept)
    setTranslatedCodes([])
  }

  const handleTranslate = async () => {
    if (!selectedConcept) return

    setTranslating(true)
    try {
      // Mock translation for demonstration
      const mockTranslations = getMockTranslations(selectedConcept.code)
      setTranslatedCodes(mockTranslations)
    } catch (error) {
      console.error("Translation failed:", error)
    } finally {
      setTranslating(false)
    }
  }

  const handleAddDiagnosis = () => {
    if (!selectedConcept) return

    const diagnosis: ClinicalDiagnosis = {
      id: `diag-${Date.now()}`,
      namasteCode: selectedConcept,
      icd11Codes: translatedCodes,
      notes: notes.trim() || undefined,
      severity,
      status: "active",
      recordedDate: new Date().toISOString(),
    }

    onDiagnosisAdd?.(diagnosis)

    // Reset form
    setSelectedConcept(null)
    setTranslatedCodes([])
    setNotes("")
    setSeverity("moderate")
  }

  const getMockTranslations = (code: string): ClinicalDiagnosis["icd11Codes"] => {
    const translations: Record<string, ClinicalDiagnosis["icd11Codes"]> = {
      AY001: [
        {
          system: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/tm2",
          code: "TM2.001",
          display: "Constitutional imbalance - Wind element",
          equivalence: "equivalent",
        },
        {
          system: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/mms",
          code: "MMS.Z73.0",
          display: "Burn-out",
          equivalence: "wider",
        },
      ],
      SI045: [
        {
          system: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/tm2",
          code: "TM2.003",
          display: "Constitutional imbalance - Water element",
          equivalence: "equivalent",
        },
      ],
      UN123: [
        {
          system: "https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/tm2",
          code: "TM2.005",
          display: "Temperamental imbalance",
          equivalence: "equivalent",
        },
      ],
    }

    return translations[code] || []
  }

  const getSystemBadgeColor = (system: string) => {
    if (system.includes("ayurveda")) return "bg-green-100 text-green-800"
    if (system.includes("siddha")) return "bg-blue-100 text-blue-800"
    if (system.includes("unani")) return "bg-purple-100 text-purple-800"
    if (system.includes("icd11") || system.includes("icd.who.int")) return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "severe":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Add New Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>Add Diagnosis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1: Select NAMASTE Code */}
          <div>
            <Label className="text-sm font-medium mb-2 block">1. Select Traditional Medicine Diagnosis</Label>
            {!selectedConcept ? (
              <SearchInput onSelect={handleConceptSelect} placeholder="Search for traditional medicine diagnosis..." />
            ) : (
              <div className="p-3 border rounded-lg bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={cn("text-xs", getSystemBadgeColor(selectedConcept.system))}>
                        {fhirService.getSystemLabel(selectedConcept.system)}
                      </Badge>
                      <span className="font-mono text-sm text-muted-foreground">{selectedConcept.code}</span>
                    </div>
                    <h4 className="font-semibold">{selectedConcept.display}</h4>
                    {selectedConcept.definition && (
                      <p className="text-sm text-muted-foreground mt-1">{selectedConcept.definition}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedConcept(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Translate to ICD-11 */}
          {selectedConcept && (
            <div>
              <Label className="text-sm font-medium mb-2 block">2. Translate to ICD-11 Codes</Label>
              {translatedCodes.length === 0 ? (
                <Button onClick={handleTranslate} disabled={translating} className="w-full">
                  {translating ? (
                    <>
                      <ArrowLeftRight className="mr-2 h-4 w-4 animate-pulse" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      Auto-translate to ICD-11
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-2">
                  {translatedCodes.map((code, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={cn("text-xs", getSystemBadgeColor(code.system))}>
                          {code.system.includes("tm2") ? "ICD-11 TM2" : "ICD-11 MMS"}
                        </Badge>
                        {code.equivalence && (
                          <Badge variant="outline" className="text-xs">
                            {code.equivalence}
                          </Badge>
                        )}
                      </div>
                      <div className="font-medium text-sm">{code.display}</div>
                      <div className="text-xs text-muted-foreground font-mono">{code.code}</div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setTranslatedCodes([])}>
                    Re-translate
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Additional Details */}
          {translatedCodes.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">3. Additional Details</Label>

              <div>
                <Label htmlFor="severity" className="text-sm">
                  Severity
                </Label>
                <div className="flex space-x-2 mt-1">
                  {(["mild", "moderate", "severe"] as const).map((level) => (
                    <Button
                      key={level}
                      variant={severity === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSeverity(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm">
                  Clinical Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Additional clinical observations, treatment notes, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleAddDiagnosis} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Diagnosis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Diagnoses */}
      {diagnoses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Diagnoses ({diagnoses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {diagnoses.map((diagnosis, index) => (
                <div key={diagnosis.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={cn("text-xs", getSystemBadgeColor(diagnosis.namasteCode.system))}>
                          {fhirService.getSystemLabel(diagnosis.namasteCode.system)}
                        </Badge>
                        <Badge className={cn("text-xs", getSeverityColor(diagnosis.severity || "moderate"))}>
                          {diagnosis.severity || "moderate"}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{diagnosis.namasteCode.code}</span>
                      </div>
                      <h4 className="font-semibold">{diagnosis.namasteCode.display}</h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => onDiagnosisRemove?.(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {diagnosis.icd11Codes.length > 0 && (
                    <div className="mb-3">
                      <Label className="text-xs text-muted-foreground mb-1 block">ICD-11 Mappings</Label>
                      <div className="space-y-1">
                        {diagnosis.icd11Codes.map((code, codeIndex) => (
                          <div key={codeIndex} className="text-sm">
                            <span className="font-medium">{code.display}</span>
                            <span className="text-muted-foreground ml-2 font-mono text-xs">({code.code})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {diagnosis.notes && (
                    <div className="mb-2">
                      <Label className="text-xs text-muted-foreground mb-1 block">Notes</Label>
                      <p className="text-sm">{diagnosis.notes}</p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Recorded: {new Date(diagnosis.recordedDate).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
