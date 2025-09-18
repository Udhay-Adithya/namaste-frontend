"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { SearchInput } from "@/components/search/search-input"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters, type SearchFilters as SearchFiltersType } from "@/components/search/search-filters"
import type { NAMASTEConcept } from "@/types/fhir"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<NAMASTEConcept[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<SearchFiltersType>({ systems: [], hasDefinition: false })
  const router = useRouter()

  const handleSearch = (concept: NAMASTEConcept) => {
    // Add the selected concept to results for demonstration
    setSearchResults([concept])
  }

  const handleViewDetails = (concept: NAMASTEConcept) => {
    // Navigate to lookup page with the concept
    router.push(`/lookup?system=${encodeURIComponent(concept.system)}&code=${encodeURIComponent(concept.code)}`)
  }

  const handleTranslate = (concept: NAMASTEConcept) => {
    // Navigate to translate page with the concept
    router.push(
      `/translate?system=${encodeURIComponent(concept.system)}&code=${encodeURIComponent(concept.code)}&display=${encodeURIComponent(concept.display)}`,
    )
  }

  const handleExport = () => {
    // Export results as CSV
    const csvContent = [
      ["Code", "Display", "System", "Definition"],
      ...searchResults.map((result) => [result.code, result.display, result.system, result.definition || ""]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "namaste-search-results.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters)
    // In a real implementation, you would re-run the search with filters
    console.log("Filters changed:", newFilters)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-balance">Search NAMASTE Codes</h1>
              <p className="text-muted-foreground mt-2">
                Search and browse traditional medicine terminology codes from Ayurveda, Siddha, and Unani systems.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <SearchFilters onFiltersChange={handleFiltersChange} />
              </div>

              <div className="lg:col-span-3 space-y-6">
                <SearchInput onSelect={handleSearch} className="w-full" />

                <SearchResults
                  results={searchResults}
                  loading={loading}
                  onViewDetails={handleViewDetails}
                  onTranslate={handleTranslate}
                  onExport={searchResults.length > 0 ? handleExport : undefined}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
