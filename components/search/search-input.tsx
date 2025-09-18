"use client"

import type React from "react"
import type { NAMASTEConcept } from "@/types/fhir"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { fhirService } from "@/services/fhir.service"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  onSelect?: (concept: NAMASTEConcept) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ onSelect, placeholder = "Search NAMASTE codes...", className }: SearchInputProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<NAMASTEConcept[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const searchCodes = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fhirService.expandValueSet(
          "https://namaste.ayush.gov.in/fhir/ValueSet/ayush",
          debouncedQuery,
          10,
        )

        const concepts = response.expansion?.contains || []
        setResults(concepts)
        setShowResults(true)
        setSelectedIndex(-1)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed")
        setResults([])
        setShowResults(false)
      } finally {
        setLoading(false)
      }
    }

    searchCodes()
  }, [debouncedQuery])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex])
        }
        break
      case "Escape":
        setShowResults(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSelect = (concept: NAMASTEConcept) => {
    setQuery(concept.display)
    setShowResults(false)
    setSelectedIndex(-1)
    onSelect?.(concept)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const getSystemBadgeColor = (system: string) => {
    if (system.includes("ayurveda")) return "bg-green-100 text-green-800"
    if (system.includes("siddha")) return "bg-blue-100 text-blue-800"
    if (system.includes("unani")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setShowResults(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-auto">
          <CardContent className="p-0">
            {error ? (
              <div className="p-4 text-sm text-destructive">Error: {error}</div>
            ) : results.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">No results found</div>
            ) : (
              <div ref={resultsRef}>
                {results.map((result, index) => (
                  <div
                    key={`${result.system}-${result.code}`}
                    className={cn(
                      "p-3 cursor-pointer border-b last:border-b-0 hover:bg-muted/50",
                      selectedIndex === index && "bg-muted",
                    )}
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{result.display}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span className="font-mono">{result.code}</span>
                        </div>
                        {result.definition && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.definition}</div>
                        )}
                      </div>
                      <Badge className={cn("text-xs", getSystemBadgeColor(result.system))}>
                        {fhirService.getSystemLabel(result.system)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
