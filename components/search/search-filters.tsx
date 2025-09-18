"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange?: (filters: SearchFilters) => void
}

export interface SearchFilters {
  systems: string[]
  hasDefinition: boolean
}

const SYSTEM_OPTIONS = [
  { id: "ayurveda", label: "Ayurveda", color: "bg-green-100 text-green-800" },
  { id: "siddha", label: "Siddha", color: "bg-blue-100 text-blue-800" },
  { id: "unani", label: "Unani", color: "bg-purple-100 text-purple-800" },
]

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    systems: [],
    hasDefinition: false,
  })

  const handleSystemChange = (systemId: string, checked: boolean) => {
    const newSystems = checked ? [...filters.systems, systemId] : filters.systems.filter((s) => s !== systemId)

    const newFilters = { ...filters, systems: newSystems }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleDefinitionChange = (checked: boolean) => {
    const newFilters = { ...filters, hasDefinition: checked }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const clearFilters = () => {
    const newFilters = { systems: [], hasDefinition: false }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const hasActiveFilters = filters.systems.length > 0 || filters.hasDefinition

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filters</CardTitle>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Traditional Medicine Systems</Label>
          <div className="space-y-3">
            {SYSTEM_OPTIONS.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={filters.systems.includes(option.id)}
                  onCheckedChange={(checked) => handleSystemChange(option.id, checked as boolean)}
                />
                <Label htmlFor={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <Badge className={option.color}>{option.label}</Badge>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Content Filters</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="hasDefinition" checked={filters.hasDefinition} onCheckedChange={handleDefinitionChange} />
            <Label htmlFor="hasDefinition" className="cursor-pointer">
              Has definition
            </Label>
          </div>
        </div>

        {hasActiveFilters && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.systems.map((systemId) => {
                const option = SYSTEM_OPTIONS.find((opt) => opt.id === systemId)
                return (
                  <Badge key={systemId} variant="secondary" className="text-xs">
                    {option?.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => handleSystemChange(systemId, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
              {filters.hasDefinition && (
                <Badge variant="secondary" className="text-xs">
                  Has definition
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleDefinitionChange(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
