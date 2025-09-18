"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, ArrowLeftRight, Eye, Stethoscope, BarChart3, Activity, Users, Database, Clock, Bell, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data for dashboard
  const dashboardStats = {
    todaysSearches: 156,
    translations: 89,
    activeUsers: 42,
    systemHealth: 99.8
  }

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
    }
  ]

  const systemAlerts = [
    {
      type: "info",
      title: "Scheduled Maintenance",
      message: "System maintenance scheduled for Sunday 2:00 AM - 4:00 AM IST",
      time: "2 hours ago"
    },
    {
      type: "success",
      title: "ICD-11 Update Complete",
      message: "Successfully synchronized with WHO ICD-11 API. 15 new mappings added.",
      time: "6 hours ago"
    },
    {
      type: "warning",
      title: "High API Usage",
      message: "API usage at 85% of daily limit. Consider upgrading your plan.",
      time: "1 day ago"
    }
  ]

  const usageProgress = [
    { name: "API Calls", used: 8420, limit: 10000, percentage: 84 },
    { name: "Storage", used: 2.3, limit: 5, percentage: 46, unit: "GB" },
    { name: "Users", used: 28, limit: 50, percentage: 56 },
    { name: "Translations", used: 1247, limit: 2000, percentage: 62 }
  ]

  const quickStats = [
    {
      title: "Today's Searches",
      value: dashboardStats.todaysSearches.toString(),
      description: "Code lookups performed",
      icon: Search,
      trend: "+23 vs yesterday",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Translations",
      value: dashboardStats.translations.toString(),
      description: "NAMASTE to ICD-11",
      icon: ArrowLeftRight,
      trend: "+12 vs yesterday",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Users",
      value: dashboardStats.activeUsers.toString(),
      description: "Currently online",
      icon: Users,
      trend: "Peak: 67 today",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "System Health",
      value: `${dashboardStats.systemHealth}%`,
      description: "Uptime this month",
      icon: Activity,
      trend: "All systems operational",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Navigation />

        <main className="flex-1 container py-8">
          <div className="space-y-8">

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, Demo User!</h1>
                  <p className="text-blue-100 mt-2">
                    Manage NAMASTE terminology services and access comprehensive healthcare data
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-100">Current Time</p>
                    <p className="text-xl font-bold">{new Date().toLocaleTimeString('en-IN')}</p>
                    <p className="text-xs text-blue-200">IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                          <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                          <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Quick Actions */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/search">
                        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200">
                          <Search className="h-6 w-6 text-blue-600" />
                          <div className="text-center">
                            <p className="font-medium text-sm">Search Codes</p>
                            <p className="text-xs text-gray-500">Find NAMASTE terminologies</p>
                          </div>
                        </Button>
                      </Link>

                      <Link href="/translate">
                        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200">
                          <ArrowLeftRight className="h-6 w-6 text-green-600" />
                          <div className="text-center">
                            <p className="font-medium text-sm">Translate</p>
                            <p className="text-xs text-gray-500">NAMASTE to ICD-11</p>
                          </div>
                        </Button>
                      </Link>

                      <Link href="/lookup">
                        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200">
                          <Eye className="h-6 w-6 text-purple-600" />
                          <div className="text-center">
                            <p className="font-medium text-sm">Code Lookup</p>
                            <p className="text-xs text-gray-500">Detailed code information</p>
                          </div>
                        </Button>
                      </Link>

                      <Link href="/clinical">
                        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200">
                          <Stethoscope className="h-6 w-6 text-orange-600" />
                          <div className="text-center">
                            <p className="font-medium text-sm">Clinical Workflow</p>
                            <p className="text-xs text-gray-500">FHIR bundle management</p>
                          </div>
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <Link href="/analytics">
                        <Button className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Detailed Analytics
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Activity</span>
                      <Badge variant="outline" className="text-xs">Live</Badge>
                    </CardTitle>
                    <CardDescription>Latest system interactions and user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'completed' ? 'bg-green-500' :
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
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">

                {/* System Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>System Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {systemAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                        {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                        {alert.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                        {alert.type === 'info' && <Bell className="h-4 w-4 text-blue-600 mt-0.5" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{alert.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Usage Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Usage Overview</span>
                    </CardTitle>
                    <CardDescription>Current month usage limits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {usageProgress.map((usage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{usage.name}</span>
                          <span className="text-xs text-gray-500">
                            {usage.used}{usage.unit || ''} / {usage.limit}{usage.unit || ''}
                          </span>
                        </div>
                        <Progress value={usage.percentage} className="h-2" />
                        <p className="text-xs text-gray-500">{usage.percentage}% used</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/manual" className="block">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        User Manual & Documentation
                      </Button>
                    </Link>
                    <Link href="/contact" className="block">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        Technical Support
                      </Button>
                    </Link>
                    <Link href="/settings" className="block">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        Account Settings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
