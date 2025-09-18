export interface NAMASTEConcept {
  system: string
  code: string
  display: string
  definition?: string
}

export interface TranslationResult {
  success: boolean
  originalCode: NAMASTEConcept
  mappedCodes: Array<{
    system: string
    code: string
    display: string
    equivalence: string
    score?: number
  }>
  message?: string
}

export interface ClinicalCondition {
  patientId: string
  namasteCode: NAMASTEConcept
  icd11Codes: Array<{
    system: string
    code: string
    display: string
  }>
  recordedDate: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  expires_in?: number // Make optional since server might not return it
}

export interface ValueSet {
  resourceType: "ValueSet"
  id?: string
  url?: string
  expansion?: {
    contains?: NAMASTEConcept[]
    total?: number
    offset?: number
  }
}

export interface Parameters {
  resourceType: "Parameters"
  parameter?: Array<{
    name: string
    valueString?: string
    valueBoolean?: boolean
    valueDecimal?: number
    valueCode?: string
    valueCoding?: {
      system: string
      code: string
      display: string
    }
    part?: Array<{
      name: string
      valueString?: string
      valueBoolean?: boolean
      valueDecimal?: number
      valueCode?: string
      valueCoding?: {
        system: string
        code: string
        display: string
      }
    }>
  }>
}

export interface Bundle {
  resourceType: "Bundle"
  id?: string
  type:
  | "collection"
  | "document"
  | "message"
  | "transaction"
  | "transaction-response"
  | "batch"
  | "batch-response"
  | "history"
  | "searchset"
  entry?: Array<{
    resource: any
  }>
}
