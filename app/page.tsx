"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Search,
  ArrowLeftRight,
  Eye,
  BarChart3,
  Users,
  Activity,
  Clock,
  Globe,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Bell,
  Zap,
  Shield,
  Database,
  BookOpen,
  Heart,
  Stethoscope,
  Building,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock statistics data - more comprehensive for government portal feel
  const statisticsDisplay = [
    {
      title: "Hospitals Registered",
      value: "2,847",
      icon: Building,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+156 this month"
    },
    {
      title: "Healthcare Providers",
      value: "15,623",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+892 this quarter"
    },
    {
      title: "Patient Records",
      value: "2,45,680",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+12,340 today"
    },
    {
      title: "NAMASTE Codes",
      value: "4,521",
      icon: Database,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "Latest update"
    },
    {
      title: "Research Papers",
      value: "1,089",
      icon: BookOpen,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      trend: "+89 this year"
    },
    {
      title: "Success Rate",
      value: "94.7%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "↑ 2.3% from last year"
    }
  ]

  const quickActions = [
    {
      title: "Code Search",
      description: "Search NAMASTE terminology codes",
      href: "/search",
      icon: Search,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Translation Service",
      description: "Convert codes to ICD-11",
      href: "/translate",
      icon: ArrowLeftRight,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Code Lookup",
      description: "Detailed code information",
      href: "/lookup",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Clinical Workflow",
      description: "FHIR bundle management",
      href: "/clinical",
      icon: Stethoscope,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ]

  const quickLinks = [
    { title: "Ministry of AYUSH", href: "https://main.ayush.gov.in/", external: true },
    { title: "MoHFW", href: "https://www.mohfw.nic.in/", external: true },
    { title: "WHO ICD-11", href: "https://icd.who.int/en", external: true },
    { title: "FHIR R4", href: "https://hl7.org/fhir/R4/", external: true },
    { title: "User Manual", href: "/manual", external: false },
    { title: "API Documentation", href: "/api-docs", external: false },
    { title: "Contact Support", href: "/contact", external: false },
    { title: "System Analytics", href: "/analytics", external: false }
  ]

  const supportiveInfo = [
    { title: "Ayurveda Research", href: "http://www.ccras.nic.in/", external: true, description: "Central Council for Research in Ayurvedic Sciences" },
    { title: "Yoga & Naturopathy", href: "http://ccryn.gov.in/", external: true, description: "Central Council for Research in Yoga & Naturopathy" },
    { title: "Unani Medicine", href: "https://ccrum.res.in/", external: true, description: "Central Council for Research in Unani Medicine" },
    { title: "Siddha Medicine", href: "http://siddhacouncil.com/", external: true, description: "Central Council for Research in Siddha" },
    { title: "Homoeopathy", href: "https://www.ccrhindia.nic.in/", external: true, description: "Central Council for Research in Homoeopathy" },
    { title: "DHARA Portal", href: "http://www.dharaonline.org/Forms/Home.aspx", external: true, description: "Digital Helpline for AYUSH Research & Activities" }
  ]

  const announcements = [
    {
      title: "New FHIR R4 Implementation Available",
      date: "15-SEP-2025",
      priority: "high",
      description: "Enhanced terminology services now support full FHIR R4 compliance with ICD-11 integration. Updated APIs available for healthcare providers.",
      category: "System Update"
    },
    {
      title: "NAMASTE Code System Updated",
      date: "10-SEP-2025",
      priority: "medium",
      description: "Latest version includes 4,500+ standardized terms for Ayurveda, Siddha and Unani disorders with improved mapping accuracy.",
      category: "Content Update"
    },
    {
      title: "Research Integration Program",
      date: "05-SEP-2025",
      priority: "medium",
      description: "New partnership with leading medical institutions for AYUSH research data integration and terminology validation.",
      category: "Partnership"
    },
    {
      title: "Mobile App Beta Testing",
      date: "01-SEP-2025",
      priority: "low",
      description: "NAMASTE mobile application for healthcare providers now available for beta testing. Register for early access.",
      category: "Mobile App"
    }
  ]

  const systemFeatures = [
    {
      title: "Real-time Translation",
      description: "Instant conversion between NAMASTE and ICD-11 codes",
      icon: Zap,
      status: "active"
    },
    {
      title: "FHIR Compliance",
      description: "Full HL7 FHIR R4 standard implementation",
      icon: Shield,
      status: "active"
    },
    {
      title: "Multi-language Support",
      description: "Available in English, Hindi, and regional languages",
      icon: Globe,
      status: "active"
    },
    {
      title: "24/7 System Monitoring",
      description: "Continuous uptime monitoring and support",
      icon: Activity,
      status: "active"
    }
  ]

  const researchHighlights = [
    {
      title: "Clinical Trial Integration",
      description: "50+ ongoing clinical trials using NAMASTE terminology",
      value: "50+",
      icon: Heart
    },
    {
      title: "Publication Citations",
      description: "Research papers citing NAMASTE standards",
      value: "340+",
      icon: BookOpen
    },
    {
      title: "International Collaborations",
      description: "Countries using NAMASTE for traditional medicine",
      value: "12",
      icon: Globe
    },
    {
      title: "Academic Partnerships",
      description: "Universities and research institutions",
      value: "89",
      icon: Award
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/10 rounded-full p-4 mr-4">
                  <Stethoscope className="h-12 w-12" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    National AYUSH Mission
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100">
                    Terminology Services & Exchange
                  </p>
                </div>
              </div>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Comprehensive digital platform for standardized AYUSH terminology, FHIR-compliant healthcare data exchange,
                and interoperability between traditional and modern medical systems across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center bg-white/20 rounded-lg px-6 py-3">
                  <div className="relative flex items-center w-full max-w-md">
                    <Search className="absolute left-3 h-5 w-5 text-blue-200" />
                    <Input
                      placeholder="Search NAMASTE codes, terms, or documentation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-blue-200 focus:border-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/search">
                    <Button variant="secondary" size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                      Advanced Search
                    </Button>
                  </Link>
                  <Link href="/translate">
                    <Button variant="outline" size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                      Quick Translate
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">24/7 Available</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">FHIR R4 Compliant</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Globe className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">Multi-language</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Award className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-200">WHO Aligned</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Dashboard */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">System Statistics</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real-time data showcasing the reach and impact of NAMASTE across India's healthcare ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              {statisticsDisplay.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <Badge variant="outline" className="text-xs">Live</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <p className="text-xs text-green-600">{stat.trend}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 space-y-12">

          {/* Quick Actions */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <p className="text-gray-600">
                Access core NAMASTE functionality with these commonly used tools and services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Link key={index} href={action.href}>
                    <Card className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 ${action.borderColor}`}>
                      <CardContent className="pt-6">
                        <div className={`w-16 h-16 rounded-full ${action.bgColor} flex items-center justify-center mb-4 mx-auto`}>
                          <Icon className={`h-8 w-8 ${action.color}`} />
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* System Features */}
          <section className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">System Features</h2>
              <p className="text-gray-600">
                Advanced capabilities designed for modern healthcare interoperability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="bg-white rounded-lg p-6 text-center border shadow-sm">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Research Highlights */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Research & Impact</h2>
              <p className="text-gray-600">
                NAMASTE's contribution to advancing traditional medicine through digital innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchHighlights.map((highlight, index) => {
                const Icon = highlight.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div className="text-3xl font-bold text-indigo-600 mb-2">{highlight.value}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Announcements */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Announcements</h2>
                <p className="text-gray-600">Stay updated with the latest developments and system updates</p>
              </div>
              <Link href="/announcements">
                <Button variant="outline">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {announcements.slice(0, 4).map((announcement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={announcement.priority === 'high' ? 'destructive' :
                              announcement.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {announcement.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {announcement.date}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      </div>
                      {announcement.priority === 'high' && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      {announcement.priority === 'medium' && (
                        <Bell className="h-5 w-5 text-yellow-500" />
                      )}
                      {announcement.priority === 'low' && (
                        <Lightbulb className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{announcement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Links Grid */}
          <section className="bg-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* External Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-blue-600" />
                  Government Resources
                </h3>
                <div className="space-y-3">
                  {quickLinks.filter(link => link.external).map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow border"
                    >
                      <span className="font-medium text-gray-800">{link.title}</span>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Internal Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Documentation & Support
                </h3>
                <div className="space-y-3">
                  {quickLinks.filter(link => !link.external).map((link, index) => (
                    <Link key={index} href={link.href}>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow border cursor-pointer">
                        <span className="font-medium text-gray-800">{link.title}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AYUSH Ecosystem */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AYUSH Research Ecosystem</h2>
              <p className="text-gray-600">
                Explore research councils and institutions advancing traditional medicine systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportiveInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-orange-100 p-3 rounded-full">
                          <Heart className="h-6 w-6 text-orange-600" />
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">1800-11-0011 (Toll Free)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">support@namaste.ayush.gov.in</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                    <span className="text-sm">Ministry of AYUSH, Shastri Bhawan, New Delhi - 110001</span>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Access</h3>
                <div className="space-y-2">
                  <Link href="/search" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    Code Search
                  </Link>
                  <Link href="/translate" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    Translation Service
                  </Link>
                  <Link href="/analytics" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    System Analytics
                  </Link>
                  <Link href="/manual" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    User Manual
                  </Link>
                </div>
              </div>

              {/* System Status */}
              <div>
                <h3 className="text-xl font-bold mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">All Systems Operational</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-green-400" />
                    <span className="text-sm">99.8% Uptime This Month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Last Updated: {new Date().toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Government Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Government of India</h3>
                <div className="space-y-2">
                  <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    India.gov.in
                  </a>
                  <a href="https://main.ayush.gov.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    Ministry of AYUSH
                  </a>
                  <a href="https://www.mohfw.nic.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    Ministry of Health & FW
                  </a>
                  <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                    Digital India
                  </a>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-gray-700" />

            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 Ministry of AYUSH, Government of India. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}