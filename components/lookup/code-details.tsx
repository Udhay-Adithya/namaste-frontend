"use client"

import { Label } from "@/components/ui/label"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Copy, ArrowLeftRight, Info } from "lucide-react"
import { fhirService } from "@/services/fhir.service"
import { cn } from "@/lib/utils"

interface CodeDetailsProps {
  details: CodeDetails | null
  loading?: boolean
  onTranslate?: (system: string, code: string, display: string) => void
}

export interface CodeDetails {
  system: string
  code: string
  display: string
  definition?: string
  status: "active" | "inactive" | "draft"
  version?: string
  publisher?: string
  lastUpdated?: string
  properties?: Array<{
    name: string
    value: string
    description?: string
  }>
  relationships?: Array<{
    type: "parent" | "child" | "equivalent"
    target: {
      system: string
      code: string
      display: string
    }
  }>
  validation: {
    isValid: boolean
    message: string
  }
}

export function CodeDetails({ details, loading, onTranslate }: CodeDetailsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Code Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-muted-foreground">Loading code details...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!details) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Code Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter a code system and code to view detailed information</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(details.code)
  }

  const handleTranslate = () => {
    onTranslate?.(details.system, details.code, details.display)
  }

  const getSystemBadgeColor = (system: string) => {
    if (system.includes("ayurveda")) return "bg-green-100 text-green-800"
    if (system.includes("siddha")) return "bg-blue-100 text-blue-800"
    if (system.includes("unani")) return "bg-purple-100 text-purple-800"
    if (system.includes("icd11") || system.includes("icd.who.int")) return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Code Details</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCopyCode}>
              <Copy className="h-4 w-4" />
            </Button>
            {details.system.includes("namaste") && (
              <Button variant="outline" size="sm" onClick={handleTranslate}>
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Translate
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Validation Status */}
        <div className="flex items-center space-x-2 p-3 rounded-lg border">
          {details.validation.isValid ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <div>
            <div className="font-medium">{details.validation.isValid ? "Valid Code" : "Invalid Code"}</div>
            <div className="text-sm text-muted-foreground">{details.validation.message}</div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={cn("text-xs", getSystemBadgeColor(details.system))}>
                {fhirService.getSystemLabel(details.system)}
              </Badge>
              {getStatusBadge(details.status)}
            </div>
            <h3 className="text-xl font-semibold">{details.display}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="font-mono">{details.code}</span>
            </div>
          </div>

          {details.definition && (
            <div>
              <Label className="text-sm font-medium">Definition</Label>
              <p className="text-sm text-muted-foreground mt-1">{details.definition}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* System Information */}
        <div className="space-y-3">
          <h4 className="font-medium">System Information</h4>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">System URI</span>
              <span className="font-mono text-xs break-all">{details.system}</span>
            </div>
            {details.version && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span>{details.version}</span>
              </div>
            )}
            {details.publisher && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Publisher</span>
                <span>{details.publisher}</span>
              </div>
            )}
            {details.lastUpdated && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{new Date(details.lastUpdated).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Properties */}
        {details.properties && details.properties.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium">Properties</h4>
              <div className="space-y-2">
                {details.properties.map((property, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{property.name}</div>
                      {property.description && (
                        <div className="text-xs text-muted-foreground">{property.description}</div>
                      )}
                    </div>
                    <div className="text-sm">{property.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Relationships */}
        {details.relationships && details.relationships.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium">Relationships</h4>
              <div className="space-y-2">
                {details.relationships.map((relationship, index) => (
                  <div key={index} className="p-2 border rounded">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="text-xs">
                        {relationship.type}
                      </Badge>
                      <Badge className={cn("text-xs", getSystemBadgeColor(relationship.target.system))}>
                        {fhirService.getSystemLabel(relationship.target.system)}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">{relationship.target.display}</div>
                    <div className="text-xs text-muted-foreground font-mono">{relationship.target.code}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
