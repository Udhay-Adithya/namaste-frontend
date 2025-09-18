"use client"

import type { TranslationResult } from "@/types/fhir"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, ArrowRight, Star, Save, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface TranslationResultsProps {
  result: TranslationResult | null
  onSaveMapping?: (result: TranslationResult) => void
}

export function TranslationResults({ result, onSaveMapping }: TranslationResultsProps) {
  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5" />
            <span>Translation Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <ArrowRight className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a NAMASTE code and click translate to see results here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const getEquivalenceBadge = (equivalence: string) => {
    switch (equivalence.toLowerCase()) {
      case "equivalent":
        return <Badge className="bg-green-100 text-green-800">Equivalent</Badge>
      case "wider":
        return <Badge className="bg-blue-100 text-blue-800">Wider</Badge>
      case "narrower":
        return <Badge className="bg-orange-100 text-orange-800">Narrower</Badge>
      case "inexact":
        return <Badge className="bg-yellow-100 text-yellow-800">Inexact</Badge>
      default:
        return <Badge variant="secondary">{equivalence}</Badge>
    }
  }

  const getScoreStars = (score?: number) => {
    if (!score) return null
    const stars = Math.round(score * 5)
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn("h-3 w-3", i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({score.toFixed(2)})</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5" />
            <span>Translation Results</span>
          </div>
          {result.success && onSaveMapping && (
            <Button variant="outline" size="sm" onClick={() => onSaveMapping(result)}>
              <Save className="h-4 w-4 mr-2" />
              Save Mapping
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Alert */}
        <Alert variant={result.success ? "default" : "destructive"}>
          <div className="flex items-center space-x-2">
            {result.success ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
            <AlertDescription>
              {result.message || (result.success ? "Translation completed successfully" : "Translation failed")}
            </AlertDescription>
          </div>
        </Alert>

        {/* Original Code */}
        <div className="p-4 border rounded-lg bg-muted/30">
          <h4 className="font-medium text-sm text-muted-foreground mb-2">Original Code</h4>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{result.originalCode.display}</div>
              <div className="text-sm text-muted-foreground">
                <span className="font-mono">{result.originalCode.code}</span> • {result.originalCode.system}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleCopyCode(result.originalCode.code)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mapped Codes */}
        {result.success && result.mappedCodes.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Mapped ICD-11 Codes</h4>
            {result.mappedCodes.map((mappedCode, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getEquivalenceBadge(mappedCode.equivalence)}
                      <Badge variant="outline" className="text-xs">
                        {mappedCode.system.includes("tm2") ? "ICD-11 TM2" : "ICD-11 MMS"}
                      </Badge>
                    </div>
                    <div className="font-semibold">{mappedCode.display}</div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-mono">{mappedCode.code}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyCode(mappedCode.code)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {mappedCode.score && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Confidence Score</span>
                    {getScoreStars(mappedCode.score)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : result.success ? (
          <div className="text-center text-muted-foreground py-4">
            <p>No ICD-11 mappings found for this code</p>
          </div>
        ) : null}

        {/* Translation Notes */}
        {result.success && result.mappedCodes.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-medium text-sm text-blue-900 mb-1">Translation Notes</h5>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Equivalent mappings indicate direct conceptual matches</li>
              <li>• Wider/Narrower mappings show hierarchical relationships</li>
              <li>• Confidence scores help assess mapping quality</li>
              <li>• Multiple mappings may be available for comprehensive coding</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
