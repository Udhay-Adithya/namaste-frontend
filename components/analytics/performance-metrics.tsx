"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Clock, Zap, Target, Users } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  description: string
}

function MetricCard({ title, value, change, trend, icon: Icon, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="flex items-center space-x-1">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <Badge variant={trend === "up" ? "secondary" : "destructive"} className="text-xs">
              {change}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PerformanceMetrics() {
  const metrics = [
    {
      title: "Average Response Time",
      value: "245ms",
      change: "-12%",
      trend: "up" as const,
      icon: Clock,
      description: "API response time",
    },
    {
      title: "Translation Accuracy",
      value: "96.8%",
      change: "+2.1%",
      trend: "up" as const,
      icon: Target,
      description: "Successful mappings",
    },
    {
      title: "System Throughput",
      value: "1,247/hr",
      change: "+18%",
      trend: "up" as const,
      icon: Zap,
      description: "Requests per hour",
    },
    {
      title: "Active Users",
      value: "89",
      change: "+7%",
      trend: "up" as const,
      icon: Users,
      description: "This month",
    },
  ]

  const systemHealth = [
    { component: "Search Service", health: 98, status: "Excellent" },
    { component: "Translation Engine", health: 95, status: "Good" },
    { component: "Validation Service", health: 99, status: "Excellent" },
    { component: "Bundle Generator", health: 92, status: "Good" },
    { component: "Authentication", health: 100, status: "Perfect" },
  ]

  const getHealthColor = (health: number) => {
    if (health >= 98) return "text-green-600"
    if (health >= 90) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBadgeVariant = (health: number) => {
    if (health >= 98) return "secondary"
    if (health >= 90) return "outline"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map((system) => (
              <div key={system.component} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{system.component}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getHealthColor(system.health)}`}>{system.health}%</span>
                      <Badge variant={getHealthBadgeVariant(system.health) as any} className="text-xs">
                        {system.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={system.health} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
