"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsageCharts } from "@/components/analytics/usage-charts"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { RecentInsights } from "@/components/analytics/recent-insights"
import { TrendingUp, Users, Database, Activity, Clock, Server, Shield, Globe } from "lucide-react"

export default function AnalyticsPage() {
  const systemMetrics = [
    {
      title: "Total API Calls",
      value: "2.4M",
      change: "+12.5%",
      period: "vs last month",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Users",
      value: "1,847",
      change: "+8.2%",
      period: "vs last month",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Response Time",
      value: "142ms",
      change: "-15.3%",
      period: "average",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "System Uptime",
      value: "99.97%",
      change: "+0.02%",
      period: "this month",
      icon: Server,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]

  const terminologyStats = [
    {
      title: "NAMASTE Codes",
      value: "4,523",
      description: "Active terminology codes",
      growth: "+15 this week"
    },
    {
      title: "ICD-11 Mappings",
      value: "3,891",
      description: "Successfully mapped codes",
      growth: "+23 this week"
    },
    {
      title: "Translation Requests",
      value: "45,672",
      description: "Total translations performed",
      growth: "+1,247 this week"
    },
    {
      title: "Validation Success",
      value: "98.4%",
      description: "Code validation accuracy",
      growth: "+0.3% this week"
    }
  ]

  const geographicData = [
    { state: "Maharashtra", usage: 18.5, hospitals: 45 },
    { state: "Tamil Nadu", usage: 15.2, hospitals: 38 },
    { state: "Karnataka", usage: 12.8, hospitals: 32 },
    { state: "Gujarat", usage: 11.3, hospitals: 28 },
    { state: "Kerala", usage: 10.1, hospitals: 25 },
    { state: "West Bengal", usage: 8.7, hospitals: 22 },
    { state: "Rajasthan", usage: 7.9, hospitals: 18 },
    { state: "Others", usage: 15.5, hospitals: 64 }
  ]

  const realtimeActivity = [
    {
      action: "Code lookup: AY_DIS_0245",
      user: "Dr. Sharma (AIIMS Delhi)",
      time: "2 minutes ago",
      type: "lookup"
    },
    {
      action: "Translation: Vata Vyadhi → ICD-11",
      user: "System Integration (Apollo)",
      time: "3 minutes ago", 
      type: "translation"
    },
    {
      action: "Bulk upload: 150 patient records",
      user: "Data Manager (PGI Chandigarh)",
      time: "5 minutes ago",
      type: "upload"
    },
    {
      action: "API authentication: New client",
      user: "Technical Team (Max Healthcare)",
      time: "8 minutes ago",
      type: "auth"
    },
    {
      action: "Code validation: SI_SYM_0089",
      user: "Dr. Patel (NIMHANS)",
      time: "12 minutes ago",
      type: "validation"
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive analytics and insights for NAMASTE FHIR terminology services
              </p>
            </div>

            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant={metric.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                              {metric.change}
                            </Badge>
                            <span className="text-xs text-gray-500 ml-2">{metric.period}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full ${metric.bgColor}`}>
                          <Icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="geography">Geographic</TabsTrigger>
                <TabsTrigger value="realtime">Real-time</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                
                {/* Terminology Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Terminology Statistics</CardTitle>
                    <CardDescription>Current status of NAMASTE and ICD-11 terminology data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {terminologyStats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
                          <p className="text-xs text-green-600 mt-2">{stat.growth}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <RecentInsights />
              </TabsContent>

              <TabsContent value="usage" className="space-y-8">
                <UsageCharts />
              </TabsContent>

              <TabsContent value="performance" className="space-y-8">
                <PerformanceMetrics />
              </TabsContent>

              <TabsContent value="geography" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Geographic Distribution</span>
                    </CardTitle>
                    <CardDescription>Usage patterns across Indian states</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {geographicData.map((location, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 text-sm font-medium text-gray-600">{index + 1}.</div>
                            <div>
                              <p className="font-medium">{location.state}</p>
                              <p className="text-xs text-gray-500">{location.hospitals} hospitals</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${location.usage * 5}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{location.usage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="realtime" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Real-time Activity Feed</span>
                    </CardTitle>
                    <CardDescription>Live system activity and user interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {realtimeActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'lookup' ? 'bg-blue-500' :
                            activity.type === 'translation' ? 'bg-green-500' :
                            activity.type === 'upload' ? 'bg-purple-500' :
                            activity.type === 'auth' ? 'bg-orange-500' : 'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-600">{activity.user}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
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