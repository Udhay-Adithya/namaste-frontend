"use client"

import type { Bundle } from "@/types/fhir"
import type { ClinicalDiagnosis } from "./diagnosis-entry"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileText, Upload, Download, Eye } from "lucide-react"
import { useState } from "react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  mrn: string
}

interface BundlePreviewProps {
  patient: Patient | null
  diagnoses: ClinicalDiagnosis[]
  onSubmit?: (bundle: Bundle) => void
  loading?: boolean
}

export function BundlePreview({ patient, diagnoses, onSubmit, loading }: BundlePreviewProps) {
  const [showJson, setShowJson] = useState(false)

  const generateBundle = (): Bundle => {
    if (!patient) {
      throw new Error("Patient is required")
    }

    const bundle: Bundle = {
      resourceType: "Bundle",
      id: `bundle-${Date.now()}`,
      type: "collection",
      entry: [
        // Patient resource
        {
          resource: {
            resourceType: "Patient",
            id: patient.id,
            identifier: [
              {
                system: "http://hospital.example.org/mrn",
                value: patient.mrn,
              },
            ],
            name: [
              {
                family: patient.name.split(" ").slice(-1)[0],
                given: patient.name.split(" ").slice(0, -1),
              },
            ],
            gender: patient.gender.toLowerCase(),
            birthDate: new Date(Date.now() - patient.age * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          },
        },
        // Condition resources for each diagnosis
        ...diagnoses.map((diagnosis, index) => ({
          resource: {
            resourceType: "Condition",
            id: `condition-${index + 1}`,
            subject: {
              reference: `Patient/${patient.id}`,
            },
            code: {
              coding: [
                // Primary NAMASTE code
                {
                  system: diagnosis.namasteCode.system,
                  code: diagnosis.namasteCode.code,
                  display: diagnosis.namasteCode.display,
                },
                // ICD-11 mappings
                ...diagnosis.icd11Codes.map((icd11Code) => ({
                  system: icd11Code.system,
                  code: icd11Code.code,
                  display: icd11Code.display,
                })),
              ],
            },
            clinicalStatus: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                  code: diagnosis.status,
                  display: diagnosis.status.charAt(0).toUpperCase() + diagnosis.status.slice(1),
                },
              ],
            },
            severity: diagnosis.severity
              ? {
                  coding: [
                    {
                      system: "http://snomed.info/sct",
                      code:
                        diagnosis.severity === "mild"
                          ? "255604002"
                          : diagnosis.severity === "moderate"
                            ? "6736007"
                            : "24484000",
                      display: diagnosis.severity.charAt(0).toUpperCase() + diagnosis.severity.slice(1),
                    },
                  ],
                }
              : undefined,
            recordedDate: diagnosis.recordedDate,
            note: diagnosis.notes
              ? [
                  {
                    text: diagnosis.notes,
                  },
                ]
              : undefined,
          },
        })),
      ],
    }

    return bundle
  }

  const handleSubmit = () => {
    try {
      const bundle = generateBundle()
      onSubmit?.(bundle)
    } catch (error) {
      console.error("Failed to generate bundle:", error)
    }
  }

  const handleDownload = () => {
    try {
      const bundle = generateBundle()
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `fhir-bundle-${patient?.id || "unknown"}-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download bundle:", error)
    }
  }

  const canGenerateBundle = patient && diagnoses.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>FHIR Bundle Preview</span>
          </div>
          <div className="flex items-center space-x-2">
            {canGenerateBundle && (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowJson(!showJson)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showJson ? "Hide" : "Show"} JSON
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!canGenerateBundle ? (
          <div className="text-center text-muted-foreground py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">Bundle Preview</p>
            <p className="text-sm">Select a patient and add diagnoses to generate a FHIR bundle</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Bundle Summary */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2">Bundle Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Patient:</span> {patient.name}
                </div>
                <div>
                  <span className="text-muted-foreground">MRN:</span> {patient.mrn}
                </div>
                <div>
                  <span className="text-muted-foreground">Conditions:</span> {diagnoses.length}
                </div>
                <div>
                  <span className="text-muted-foreground">Bundle Type:</span> Collection
                </div>
              </div>
            </div>

            {/* Diagnoses Summary */}
            <div>
              <h4 className="font-medium mb-2">Included Diagnoses</h4>
              <div className="space-y-2">
                {diagnoses.map((diagnosis, index) => (
                  <div key={diagnosis.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{diagnosis.namasteCode.display}</span>
                      <Badge variant="outline" className="text-xs">
                        {diagnosis.icd11Codes.length} ICD-11 mapping{diagnosis.icd11Codes.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-mono">{diagnosis.namasteCode.code}</span>
                      {diagnosis.severity && <span> • {diagnosis.severity}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* JSON Preview */}
            {showJson && (
              <div>
                <h4 className="font-medium mb-2">FHIR Bundle JSON</h4>
                <ScrollArea className="h-80 w-full border rounded-lg">
                  <pre className="p-4 text-xs">
                    <code>{JSON.stringify(generateBundle(), null, 2)}</code>
                  </pre>
                </ScrollArea>
              </div>
            )}

            <Separator />

            {/* Submit Actions */}
            <div className="flex space-x-2">
              <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-pulse" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit to EMR
                  </>
                )}
              </Button>
            </div>

            {/* Submission Guidelines */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-medium text-sm text-blue-900 mb-1">Submission Guidelines</h5>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Bundle includes patient demographics and all dual-coded conditions</li>
                <li>• Each condition contains both NAMASTE and ICD-11 codes for comprehensive documentation</li>
                <li>• Clinical notes and severity levels are preserved in the FHIR structure</li>
                <li>• Bundle follows FHIR R4 specification for interoperability</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
