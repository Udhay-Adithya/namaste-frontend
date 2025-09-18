import type { ValueSet, Parameters, Bundle, TranslationResult } from "@/types/fhir"
import { authService } from "./auth.service"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://0.0.0.0:8000"
const API_TIMEOUT = 10000

class FHIRService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = authService.getToken()

    if (!token) {
      throw new Error("No authentication token available")
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: AbortSignal.timeout(API_TIMEOUT),
    })

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout()
        throw new Error("Authentication expired")
      }
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json()
  }

  async expandValueSet(url: string, filter?: string, count = 10): Promise<ValueSet> {
    const params = new URLSearchParams({
      url,
      count: count.toString(),
    })

    if (filter) {
      params.append("filter", filter)
    }

    return this.makeRequest<ValueSet>(`/fhir/ValueSet/$expand?${params}`)
  }

  async translateConcept(conceptMap: string, system: string, code: string): Promise<Parameters> {
    const body = {
      resourceType: "Parameters",
      parameter: [
        { name: "url", valueString: conceptMap },
        { name: "system", valueString: system },
        { name: "code", valueString: code },
      ],
    }

    return this.makeRequest<Parameters>("/fhir/ConceptMap/$translate", {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  async lookupCode(system: string, code: string): Promise<Parameters> {
    const params = new URLSearchParams({
      system,
      code,
    })

    return this.makeRequest<Parameters>(`/fhir/CodeSystem/$lookup?${params}`)
  }

  async validateCode(system: string, code: string): Promise<Parameters> {
    const params = new URLSearchParams({
      system,
      code,
    })

    return this.makeRequest<Parameters>(`/fhir/CodeSystem/$validate-code?${params}`)
  }

  async uploadBundle(bundle: Bundle): Promise<Bundle> {
    return this.makeRequest<Bundle>("/fhir/Bundle", {
      method: "POST",
      body: JSON.stringify(bundle),
    })
  }

  // Helper method to parse translation results
  parseTranslationResult(parameters: Parameters): TranslationResult {
    const params = parameters.parameter || []
    const resultParam = params.find((p) => p.name === "result")
    const success = resultParam?.valueBoolean || false

    const messageParam = params.find((p) => p.name === "message")
    const message = messageParam?.valueString || (success ? "Translation successful" : "Translation failed")

    const matchParams = params.filter((p) => p.name === "match")
    const mappedCodes = matchParams.map((match) => {
      // Parse the FHIR Parameters structure for match
      const parts = match.part || []
      const equivalencePart = parts.find((p: any) => p.name === "equivalence")
      const conceptPart = parts.find((p: any) => p.name === "concept")
      const scorePart = parts.find((p: any) => p.name === "score")

      const concept = conceptPart?.valueCoding

      return {
        system: concept?.system || "",
        code: concept?.code || "",
        display: concept?.display || "",
        equivalence: equivalencePart?.valueCode || "relatedto",
        score: scorePart?.valueDecimal || undefined,
      }
    })

    return {
      success,
      originalCode: {
        system: "",
        code: "",
        display: "",
      },
      mappedCodes,
      message,
    }
  }

  // Helper method to get system label
  getSystemLabel(system: string): string {
    if (system.includes("ayurveda")) return "Ayurveda"
    if (system.includes("siddha")) return "Siddha"
    if (system.includes("unani")) return "Unani"
    if (system.includes("icd11")) return "ICD-11"
    return "Unknown"
  }
}

export const fhirService = new FHIRService()
