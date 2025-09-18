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
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock statistics data
  const statistics = {
    hospitalsRegistered: 272,
    patientsServed: 45680,
    ayurvedaDoctors: 1840,
    research: 156,
    successRate: 87.5,
    activeCases: 2890
  }
    uploadingData: 192,
    opdDataOthers: 206240,
    opdDataSince2017: 787064,
    ipdDataSince2017: 26554
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated())
    
    // Load real statistics from the backend
    const loadStatistics = async () => {
      try {
        const data = await analyticsService.getPublicStatistics()
        setStatistics(data)
      } catch (error) {
        console.error("Failed to load statistics:", error)
        // Keep fallback data if API fails
      } finally {
        setLoading(false)
      }
    }

    loadStatistics()
  }, [])

  const statisticsDisplay = [
    {
      title: "Hospitals Registered",
      value: loading ? "..." : statistics.hospitalsRegistered.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Uploading Data",
      value: loading ? "..." : statistics.uploadingData.toLocaleString(),
      icon: Database,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "OPD Data (Others)",
      value: loading ? "..." : statistics.opdDataOthers.toLocaleString(),
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "OPD Data (Since 2017)",
      value: loading ? "..." : statistics.opdDataSince2017.toLocaleString(),
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "IPD Data (Since 2017)",
      value: loading ? "..." : statistics.ipdDataSince2017.toLocaleString(),
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ]

  const quickLinks = [
    { title: "Ministry of AYUSH", href: "https://main.ayush.gov.in/", external: true },
    { title: "MoHFW", href: "https://www.mohfw.nic.in/", external: true },
    { title: "User Manual", href: "/manual", external: false },
    { title: "Contact Us", href: "/contact", external: false },
    { title: "Search Codes", href: "/search", external: false },
    { title: "Translate Codes", href: "/translate", external: false }
  ]

  const supportiveInfo = [
    { title: "Ayurveda", href: "http://www.ccras.nic.in/", external: true },
    { title: "Yoga & Naturopathy", href: "http://ccryn.gov.in/", external: true },
    { title: "Unani", href: "https://ccrum.res.in/", external: true },
    { title: "Siddha", href: "http://siddhacouncil.com/", external: true },
    { title: "Homoeopathy", href: "https://www.ccrhindia.nic.in/", external: true },
    { title: "DHARA", href: "http://www.dharaonline.org/Forms/Home.aspx", external: true }
  ]

  const announcements = [
    {
      title: "New FHIR R4 Implementation Available",
      date: "15-SEP-2025",
      description: "Enhanced terminology services now support full FHIR R4 compliance with ICD-11 integration."
    },
    {
      title: "NAMASTE Code System Updated",
      date: "10-SEP-2025", 
      description: "Latest version includes 4,500+ standardized terms for Ayurveda, Siddha and Unani disorders."
    },
    {
      title: "WHO ICD-11 TM2 Integration Complete",
      date: "05-SEP-2025",
      description: "Traditional Medicine Module 2 is now fully integrated with automatic code mapping."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">NAMASTE Portal</h1>
                  <p className="text-xs text-gray-600">Ministry of AYUSH, Government of India</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NAMASTE
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              National AYUSH Morbidity & Standardized Terminologies Electronic Portal
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">
              Harmonizing India's traditional medicine terminologies with global ICD-11 standards. 
              Supporting FHIR R4 compliance for interoperable digital health systems.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Enter keyword to search NAMASTE codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-12 py-3 text-lg bg-white text-gray-900"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <Link href={`/search${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''}`}>
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unlocking Insights Through Data
            </h2>
            <p className="text-lg text-gray-600">
              Real-time statistics from AYUSH healthcare providers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {statisticsDisplay.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {loading && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">Loading real-time data...</p>
            </div>
          )}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Announcements</h2>
            <Bell className="h-6 w-6 text-gray-600" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{announcement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((link, index) => (
                  <Link 
                    key={index} 
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    className="group"
                  >
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        {link.title}
                      </span>
                      {link.external ? (
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Supportive Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Supportive Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {supportiveInfo.map((info, index) => (
                  <Link 
                    key={index} 
                    href={info.href}
                    target="_blank"
                    className="group"
                  >
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                        {info.title}
                      </span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About NAMASTE</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                The NAMASTE Portal developed by Ministry of AYUSH, provides information about 
                Standardised terminologies and Morbidity Codes along with dedicated data entry 
                module for updating morbidity statistics.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Government Links</h4>
              <div className="space-y-2">
                <Link href="https://india.gov.in/" target="_blank" className="block text-sm text-gray-300 hover:text-white">
                  Government of India
                </Link>
                <Link href="https://www.digitalindia.gov.in/" target="_blank" className="block text-sm text-gray-300 hover:text-white">
                  Digital India
                </Link>
                <Link href="https://www.mygov.in/" target="_blank" className="block text-sm text-gray-300 hover:text-white">
                  MyGov
                </Link>
                <Link href="https://data.gov.in/" target="_blank" className="block text-sm text-gray-300 hover:text-white">
                  Data Portal India
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Ministry of AYUSH</p>
                <p>Government of India</p>
                <p>Designed & Maintained by BISAG-N</p>
                <p className="mt-4">
                  <strong>Last Updated:</strong> 15-SEPTEMBER-2025 12:30 PM
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-sm text-gray-400">
            <p>
              Website content owned by Ministry of Ayush, Government of India. 
              Designed, developed and maintained by BISAG-N, MeitY-GOI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
