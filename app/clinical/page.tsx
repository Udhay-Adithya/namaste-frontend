"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { PatientSelector } from "@/components/clinical/patient-selector"
import { DiagnosisEntry, type ClinicalDiagnosis } from "@/components/clinical/diagnosis-entry"
import { BundlePreview } from "@/components/clinical/bundle-preview"
import type { Bundle } from "@/types/fhir"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  mrn: string
  lastVisit?: string
}

export default function ClinicalPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [diagnoses, setDiagnoses] = useState<ClinicalDiagnosis[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handlePatientSelect = (patient: Patient | null) => {
    setSelectedPatient(patient)
    if (!patient) {
      setDiagnoses([])
    }
  }

  const handleDiagnosisAdd = (diagnosis: ClinicalDiagnosis) => {
    setDiagnoses([...diagnoses, diagnosis])
  }

  const handleDiagnosisRemove = (index: number) => {
    setDiagnoses(diagnoses.filter((_, i) => i !== index))
  }

  const handleBundleSubmit = async (bundle: Bundle) => {
    setSubmitting(true)
    setSubmitResult(null)

    try {
      // In a real implementation, this would submit to the FHIR server
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      // Mock successful submission
      setSubmitResult({
        success: true,
        message: `Bundle successfully submitted to EMR. Bundle ID: ${bundle.id}`,
      })

      // Clear the form after successful submission
      setTimeout(() => {
        setSelectedPatient(null)
        setDiagnoses([])
        setSubmitResult(null)
      }, 3000)
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to submit bundle",
      })
    } finally {
      setSubmitting(false)
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
              <h1 className="text-3xl font-bold text-balance">Clinical Dual-Coding Workflow</h1>
              <p className="text-muted-foreground mt-2">
                Document patient conditions using traditional medicine codes with automatic ICD-11 mapping for
                comprehensive clinical records.
              </p>
            </div>

            {submitResult && (
              <Alert variant={submitResult.success ? "default" : "destructive"}>
                {submitResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{submitResult.message}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Patient Selection */}
              <div className="lg:col-span-1">
                <PatientSelector onPatientSelect={handlePatientSelect} selectedPatient={selectedPatient} />
              </div>

              {/* Middle Column: Diagnosis Entry */}
              <div className="lg:col-span-1">
                {selectedPatient ? (
                  <DiagnosisEntry
                    onDiagnosisAdd={handleDiagnosisAdd}
                    diagnoses={diagnoses}
                    onDiagnosisRemove={handleDiagnosisRemove}
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <p className="font-medium">Select a patient to begin</p>
                    <p className="text-sm">
                      Choose an existing patient or create a new one to start the clinical workflow
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Bundle Preview */}
              <div className="lg:col-span-1">
                <BundlePreview
                  patient={selectedPatient}
                  diagnoses={diagnoses}
                  onSubmit={handleBundleSubmit}
                  loading={submitting}
                />
              </div>
            </div>

            {/* Clinical Workflow Guidelines */}
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">Clinical Workflow Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-800">
                <div>
                  <h4 className="font-medium mb-2">Step 1: Patient Selection</h4>
                  <ul className="space-y-1">
                    <li>• Search existing patients by name or MRN</li>
                    <li>• Create new patient records as needed</li>
                    <li>• Verify patient demographics</li>
                    <li>• Review previous visit history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Step 2: Diagnosis Documentation</h4>
                  <ul className="space-y-1">
                    <li>• Search traditional medicine diagnoses</li>
                    <li>• Auto-translate to ICD-11 codes</li>
                    <li>• Add clinical severity and notes</li>
                    <li>• Review dual-coded conditions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Step 3: Bundle Submission</h4>
                  <ul className="space-y-1">
                    <li>• Preview FHIR bundle structure</li>
                    <li>• Validate all required fields</li>
                    <li>• Submit to electronic medical record</li>
                    <li>• Confirm successful integration</li>
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
