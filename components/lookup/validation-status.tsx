"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react"

interface ValidationStatusProps {
  validation: ValidationResult | null
  loading?: boolean
}

export interface ValidationResult {
  isValid: boolean
  system: string
  code: string
  display?: string
  message: string
  issues?: Array<{
    severity: "error" | "warning" | "information"
    code: string
    details: string
  }>
  metadata?: {
    checkedAt: string
    version?: string
    source: string
  }
}

export function ValidationStatus({ validation, loading }: ValidationStatusProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Validation Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="animate-pulse text-muted-foreground">Validating code...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!validation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Validation Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-4">
            <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Code validation results will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "information":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive"
      case "warning":
        return "default"
      case "information":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Validation Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Status */}
        <Alert variant={validation.isValid ? "default" : "destructive"}>
          <div className="flex items-center space-x-2">
            {validation.isValid ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
            <AlertDescription>
              <div className="font-medium">{validation.isValid ? "Code is valid" : "Code validation failed"}</div>
              <div className="text-sm mt-1">{validation.message}</div>
            </AlertDescription>
          </div>
        </Alert>

        {/* Code Information */}
        <div className="p-3 border rounded-lg bg-muted/30">
          <div className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">Code:</span> <span className="font-mono">{validation.code}</span>
            </div>
            {validation.display && (
              <div>
                <span className="text-muted-foreground">Display:</span> {validation.display}
              </div>
            )}
            <div>
              <span className="text-muted-foreground">System:</span>{" "}
              <span className="font-mono text-xs break-all">{validation.system}</span>
            </div>
          </div>
        </div>

        {/* Issues */}
        {validation.issues && validation.issues.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Validation Issues</h4>
            {validation.issues.map((issue, index) => (
              <Alert key={index} variant={getSeverityVariant(issue.severity) as any}>
                <div className="flex items-start space-x-2">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {issue.severity}
                      </Badge>
                      <span className="font-mono text-xs">{issue.code}</span>
                    </div>
                    <AlertDescription className="text-sm">{issue.details}</AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}

        {/* Metadata */}
        {validation.metadata && (
          <div className="pt-3 border-t">
            <h4 className="font-medium text-sm mb-2">Validation Metadata</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>
                <span>Checked at:</span> {new Date(validation.metadata.checkedAt).toLocaleString()}
              </div>
              {validation.metadata.version && (
                <div>
                  <span>Version:</span> {validation.metadata.version}
                </div>
              )}
              <div>
                <span>Source:</span> {validation.metadata.source}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
