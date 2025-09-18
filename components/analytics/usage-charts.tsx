"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyUsageData = [
  { month: "Jan", searches: 890, translations: 654, lookups: 1234, bundles: 89 },
  { month: "Feb", searches: 1120, translations: 789, lookups: 1456, bundles: 102 },
  { month: "Mar", searches: 1340, translations: 892, lookups: 1678, bundles: 134 },
  { month: "Apr", searches: 1180, translations: 756, lookups: 1523, bundles: 118 },
  { month: "May", searches: 1450, translations: 934, lookups: 1789, bundles: 156 },
  { month: "Jun", searches: 1234, translations: 856, lookups: 2341, bundles: 123 },
]

const systemDistributionData = [
  { name: "Ayurveda", value: 45, color: "#10b981" },
  { name: "Siddha", value: 30, color: "#3b82f6" },
  { name: "Unani", value: 25, color: "#8b5cf6" },
]

const translationSuccessData = [
  { week: "Week 1", successful: 234, failed: 12, rate: 95.1 },
  { week: "Week 2", successful: 267, failed: 8, rate: 97.1 },
  { week: "Week 3", successful: 198, failed: 15, rate: 92.9 },
  { week: "Week 4", successful: 289, failed: 6, rate: 98.0 },
]

export function UsageCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Usage Trends */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Usage Trends</CardTitle>
          <CardDescription>Activity across all NAMASTE FHIR services over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="searches" fill="hsl(var(--chart-1))" name="Searches" />
              <Bar dataKey="translations" fill="hsl(var(--chart-2))" name="Translations" />
              <Bar dataKey="lookups" fill="hsl(var(--chart-3))" name="Lookups" />
              <Bar dataKey="bundles" fill="hsl(var(--chart-4))" name="Clinical Bundles" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Traditional Medicine Systems</CardTitle>
          <CardDescription>Distribution of code usage by system</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={systemDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {systemDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {systemDistributionData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Translation Success Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Translation Success Rate</CardTitle>
          <CardDescription>Weekly translation performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={translationSuccessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[90, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, "Success Rate"]} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
