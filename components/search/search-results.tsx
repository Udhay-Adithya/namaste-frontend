"use client"

import type { NAMASTEConcept } from "@/types/fhir"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, ArrowLeftRight, Download } from "lucide-react"
import { fhirService } from "@/services/fhir.service"
import { cn } from "@/lib/utils"

interface SearchResultsProps {
  results: NAMASTEConcept[]
  loading?: boolean
  onViewDetails?: (concept: NAMASTEConcept) => void
  onTranslate?: (concept: NAMASTEConcept) => void
  onExport?: () => void
}

export function SearchResults({ results, loading, onViewDetails, onTranslate, onExport }: SearchResultsProps) {
  const getSystemBadgeColor = (system: string) => {
    if (system.includes("ayurveda")) return "bg-green-100 text-green-800"
    if (system.includes("siddha")) return "bg-blue-100 text-blue-800"
    if (system.includes("unani")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading results...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <div className="text-lg font-medium mb-2">No results found</div>
            <div className="text-sm">Try adjusting your search terms or filters</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Search Results ({results.length})</CardTitle>
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>System</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={`${result.system}-${result.code}`}>
                <TableCell className="font-mono text-sm">{result.code}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{result.display}</div>
                    {result.definition && (
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{result.definition}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-xs", getSystemBadgeColor(result.system))}>
                    {fhirService.getSystemLabel(result.system)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onViewDetails && (
                      <Button variant="ghost" size="sm" onClick={() => onViewDetails(result)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onTranslate && (
                      <Button variant="ghost" size="sm" onClick={() => onTranslate(result)}>
                        <ArrowLeftRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
