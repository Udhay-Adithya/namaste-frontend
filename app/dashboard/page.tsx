"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsageCharts } from "@/components/analytics/usage-charts"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { RecentInsights } from "@/components/analytics/recent-insights"
import { Search, ArrowLeftRight, Eye, Stethoscope, BarChart3, Activity } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const quickStats = [
    {
      title: "Total Searches",
      value: "1,234",
      description: "This month",
      icon: Search,
      trend: "+12%",
    },
    {
      title: "Translations",
      value: "856",
      description: "Successful mappings",
      icon: ArrowLeftRight,
      trend: "+8%",
    },
    {
      title: "Code Lookups",
      value: "2,341",
      description: "Detailed views",
      icon: Eye,
      trend: "+15%",
    },
    {
      title: "Clinical Bundles",
      value: "123",
      description: "Submitted",
      icon: Stethoscope,
      trend: "+5%",
    },
  ]

  const recentActivity = [
    {
      action: "Searched for 'Vata disorders'",
      time: "2 minutes ago",
      type: "search",
    },
    {
      action: "Translated Ayurveda code AY001 to ICD-11",
      time: "5 minutes ago",
      type: "translation",
    },
    {
      action: "Looked up Siddha code SI045",
      time: "10 minutes ago",
      type: "lookup",
    },
    {
      action: "Created clinical bundle for patient P001",
      time: "15 minutes ago",
      type: "clinical",
    },
  ]

  const systemStatus = [
    { name: "NAMASTE API", status: "operational", uptime: "99.9%" },
    { name: "ICD-11 Integration", status: "operational", uptime: "99.8%" },
    { name: "Authentication", status: "operational", uptime: "100%" },
    { name: "Database", status: "operational", uptime: "99.9%" },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive analytics and insights for your NAMASTE FHIR terminology service.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {stat.trend}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Insights</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks and workflows</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/search">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Search className="mr-2 h-4 w-4" />
                          Search NAMASTE Codes
                        </Button>
                      </Link>
                      <Link href="/translate">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <ArrowLeftRight className="mr-2 h-4 w-4" />
                          Translate Codes
                        </Button>
                      </Link>
                      <Link href="/lookup">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          Lookup Code Details
                        </Button>
                      </Link>
                      <Link href="/clinical">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Stethoscope className="mr-2 h-4 w-4" />
                          Clinical Workflow
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Status</CardTitle>
                      <CardDescription>Service health and uptime</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {systemStatus.map((system) => (
                          <div key={system.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm font-medium">{system.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {system.uptime}
                              </Badge>
                              <Badge variant="outline" className="text-xs text-green-600">
                                {system.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Information</CardTitle>
                      <CardDescription>Version and configuration details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Frontend Version</span>
                        <span className="text-sm font-medium">v1.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">API Version</span>
                        <span className="text-sm font-medium">v2.1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">FHIR Version</span>
                        <span className="text-sm font-medium">R4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Last Updated</span>
                        <span className="text-sm font-medium">Today, 2:30 PM</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8">
                <PerformanceMetrics />
                <UsageCharts />
              </TabsContent>

              <TabsContent value="insights" className="space-y-8">
                <RecentInsights />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
