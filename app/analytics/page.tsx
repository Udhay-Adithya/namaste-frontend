"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Search, 
  ArrowLeftRight, 
  Database, 
  Activity,
  RefreshCcw,
  Download,
  Clock,
  Globe,
  MapPin,
  Calendar,
  Zap
} from "lucide-react"

export default function AnalyticsPage() {
  const [refreshing, setRefreshing] = useState(false)
  
  // Mock data for analytics
  const overviewStats = {
    totalUsers: 2847,
    totalSearches: 15623,
    totalTranslations: 8934,
    systemUptime: 99.8,
    avgResponseTime: 0.23,
    dataProcessed: 125.6
  }

  const usageMetrics = [
    { name: "Search API", used: 8420, limit: 10000, percentage: 84, trend: "+12%" },
    { name: "Translation API", used: 3210, limit: 5000, percentage: 64, trend: "+18%" },
    { name: "FHIR Bundle", used: 1560, limit: 3000, percentage: 52, trend: "+8%" },
    { name: "Analytics API", used: 890, limit: 2000, percentage: 45, trend: "+15%" }
  ]

  const systemStatus = {
    cpu: 45,
    memory: 67,
    storage: 23,
    network: 34,
    uptime: 99.8,
    avgResponseTime: 0.23
  }

  const geographicData = [
    { state: "Maharashtra", users: 450, percentage: 18.5 },
    { state: "Karnataka", users: 380, percentage: 15.6 },
    { state: "Tamil Nadu", users: 320, percentage: 13.2 },
    { state: "Delhi", users: 290, percentage: 11.9 },
    { state: "West Bengal", users: 240, percentage: 9.9 },
    { state: "Gujarat", users: 220, percentage: 9.1 }
  ]

  const recentActivity = [
    {
      action: "Searched for 'Vata disorders'",
      user: "Dr. Sharma",
      time: "2 minutes ago",
      type: "search",
      status: "completed"
    },
    {
      action: "Translated AY001 to ICD-11 TM2",
      user: "System API",
      time: "5 minutes ago",
      type: "translation", 
      status: "completed"
    },
    {
      action: "Looked up Siddha code SI045",
      user: "Dr. Patel",
      time: "8 minutes ago",
      type: "lookup",
      status: "completed"
    },
    {
      action: "Clinical bundle validation",
      user: "AIIMS Integration",
      time: "12 minutes ago",
      type: "clinical",
      status: "completed"
    },
    {
      action: "Bulk upload: 25 patient records",
      user: "Data Manager",
      time: "15 minutes ago",
      type: "upload",
      status: "processing"
    },
    {
      action: "Generated analytics report",
      user: "System",
      time: "18 minutes ago",
      type: "report",
      status: "completed"
    },
    {
      action: "API rate limit adjustment",
      user: "Admin",
      time: "25 minutes ago",
      type: "system",
      status: "completed"
    },
    {
      action: "Database optimization",
      user: "System",
      time: "32 minutes ago",
      type: "maintenance",
      status: "completed"
    }
  ]

  const performanceData = [
    { endpoint: "/api/search", avgTime: 156, trend: "-12ms", description: "Code search endpoint" },
    { endpoint: "/api/translate", avgTime: 234, trend: "+8ms", description: "Translation service" },
    { endpoint: "/api/lookup", avgTime: 89, trend: "-5ms", description: "Code lookup endpoint" },
    { endpoint: "/api/fhir", avgTime: 445, trend: "+23ms", description: "FHIR bundle operations" }
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Comprehensive insights into NAMASTE system usage and performance
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                  <RefreshCcw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">+12.5% this month</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Searches</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.totalSearches.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">+8.3% this week</p>
                    </div>
                    <Search className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Translations</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.totalTranslations.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">+15.7% this week</p>
                    </div>
                    <ArrowLeftRight className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Uptime</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.systemUptime}%</p>
                      <p className="text-xs text-green-600 mt-1">99.9% target</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.avgResponseTime}s</p>
                      <p className="text-xs text-green-600 mt-1">-12ms improved</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Data Processed</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.dataProcessed}GB</p>
                      <p className="text-xs text-blue-600 mt-1">This month</p>
                    </div>
                    <Database className="h-8 w-8 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Tabs defaultValue="usage" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="usage">Usage Metrics</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="geographic">Geographic</TabsTrigger>
                <TabsTrigger value="system">System Status</TabsTrigger>
                <TabsTrigger value="activity">Real-time Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="usage" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Usage Trends</CardTitle>
                      <CardDescription>Monthly API call distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {usageMetrics.map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{metric.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">{metric.used.toLocaleString()}</span>
                                <Badge variant="outline" className="text-xs">{metric.trend}</Badge>
                              </div>
                            </div>
                            <Progress value={metric.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Usage</CardTitle>
                      <CardDescription>Most used NAMASTE features</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                          <div className="flex items-center space-x-3">
                            <Search className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Code Search</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">42.3%</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                          <div className="flex items-center space-x-3">
                            <ArrowLeftRight className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Translation</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">31.7%</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                          <div className="flex items-center space-x-3">
                            <Database className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Lookup</span>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">18.9%</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="h-5 w-5 text-orange-600" />
                            <span className="font-medium">Analytics</span>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">7.1%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Response Time Metrics</CardTitle>
                      <CardDescription>API endpoint performance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {performanceData.map((perf, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{perf.endpoint}</p>
                              <p className="text-sm text-gray-600">{perf.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{perf.avgTime}ms</p>
                              <p className={`text-xs ${perf.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                                {perf.trend}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Resources</CardTitle>
                      <CardDescription>Current resource utilization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">CPU Usage</span>
                            <span className="text-sm text-gray-600">{systemStatus.cpu}%</span>
                          </div>
                          <Progress value={systemStatus.cpu} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Memory Usage</span>
                            <span className="text-sm text-gray-600">{systemStatus.memory}%</span>
                          </div>
                          <Progress value={systemStatus.memory} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Storage</span>
                            <span className="text-sm text-gray-600">{systemStatus.storage}%</span>
                          </div>
                          <Progress value={systemStatus.storage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Network I/O</span>
                            <span className="text-sm text-gray-600">{systemStatus.network}%</span>
                          </div>
                          <Progress value={systemStatus.network} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="geographic" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage by Region</CardTitle>
                      <CardDescription>Geographic distribution of users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {geographicData.map((region, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">{region.state}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{region.users.toLocaleString()}</p>
                              <p className="text-xs text-gray-600">{region.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Institution Types</CardTitle>
                      <CardDescription>Users by healthcare institution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                          <span className="font-medium">Government Hospitals</span>
                          <Badge className="bg-green-100 text-green-800">38.5%</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                          <span className="font-medium">Private Hospitals</span>
                          <Badge className="bg-blue-100 text-blue-800">31.2%</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                          <span className="font-medium">Research Institutes</span>
                          <Badge className="bg-purple-100 text-purple-800">18.9%</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                          <span className="font-medium">Universities</span>
                          <Badge className="bg-orange-100 text-orange-800">11.4%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                      <CardDescription>Overall system status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <Activity className="h-10 w-10 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">{systemStatus.uptime}%</p>
                        <p className="text-sm text-gray-600">System Uptime</p>
                        <Badge className="mt-2 bg-green-100 text-green-800">All Systems Operational</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Database Status</CardTitle>
                      <CardDescription>Database performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Connection Pool</span>
                          <Badge variant="outline">85/100</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Query Performance</span>
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Index Efficiency</span>
                          <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Backup Status</span>
                          <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>API Endpoints</CardTitle>
                      <CardDescription>Service availability status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Search API</span>
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Translation API</span>
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">FHIR API</span>
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Auth Service</span>
                          <Badge className="bg-green-100 text-green-800">Online</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Analytics API</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Live Activity Feed</span>
                      <Badge variant="outline" className="text-xs">Real-time</Badge>
                    </CardTitle>
                    <CardDescription>Recent system interactions and user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'completed' ? 'bg-green-500' : 
                            activity.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-xs text-gray-600">{activity.user}</p>
                              <span className="text-xs text-gray-400">•</span>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                          <Badge 
                            variant={activity.status === 'completed' ? 'default' : 'secondary'} 
                            className="text-xs"
                          >
                            {activity.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}