"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, AlertTriangle, Info, CheckCircle, ExternalLink } from "lucide-react"

interface Insight {
  id: string
  type: "trend" | "alert" | "info" | "success"
  title: string
  description: string
  timestamp: string
  actionable?: boolean
  link?: string
}

const insights: Insight[] = [
  {
    id: "1",
    type: "trend",
    title: "Ayurveda Code Usage Increasing",
    description: "45% increase in Ayurveda code searches over the past week, particularly for Vata-related conditions.",
    timestamp: "2 hours ago",
    actionable: true,
    link: "/search?filter=ayurveda",
  },
  {
    id: "2",
    type: "success",
    title: "Translation Accuracy Improved",
    description: "ICD-11 mapping accuracy reached 96.8%, up from 94.2% last month due to enhanced algorithms.",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "alert",
    title: "High Volume Period Detected",
    description: "Unusual spike in clinical bundle submissions between 2-4 PM. Consider scaling resources.",
    timestamp: "6 hours ago",
    actionable: true,
  },
  {
    id: "4",
    type: "info",
    title: "New ICD-11 Codes Available",
    description: "WHO released 23 new Traditional Medicine codes in ICD-11 TM2. Update mappings recommended.",
    timestamp: "1 day ago",
    actionable: true,
  },
  {
    id: "5",
    type: "trend",
    title: "Cross-System Validation Patterns",
    description: "Users frequently validate codes across multiple systems before clinical documentation.",
    timestamp: "1 day ago",
    link: "/lookup",
  },
  {
    id: "6",
    type: "success",
    title: "Zero Downtime Achievement",
    description: "System maintained 100% uptime for 30 consecutive days across all services.",
    timestamp: "2 days ago",
  },
]

export function RecentInsights() {
  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Info className="h-4 w-4 text-gray-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getInsightBadge = (type: Insight["type"]) => {
    switch (type) {
      case "trend":
        return <Badge className="bg-blue-100 text-blue-800">Trend</Badge>
      case "alert":
        return <Badge className="bg-yellow-100 text-yellow-800">Alert</Badge>
      case "info":
        return <Badge className="bg-gray-100 text-gray-800">Info</Badge>
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getInsightBadge(insight.type)}
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                  {insight.link && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={insight.link}>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
