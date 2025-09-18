"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, BookOpen, Video, HelpCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ManualPage() {
    const manuals = [
        {
            title: "NAMASTE User Manual",
            description: "Comprehensive guide for using the NAMASTE portal and terminology services",
            version: "v2.1",
            size: "2.4 MB",
            format: "PDF",
            lastUpdated: "15-Sep-2025"
        },
        {
            title: "FHIR R4 Implementation Guide",
            description: "Technical documentation for FHIR R4 compliance and API integration",
            version: "v1.8",
            size: "1.8 MB",
            format: "PDF",
            lastUpdated: "10-Sep-2025"
        },
        {
            title: "ICD-11 Mapping Documentation",
            description: "Guide for mapping NAMASTE codes to ICD-11 Traditional Medicine Module 2",
            version: "v1.5",
            size: "3.1 MB",
            format: "PDF",
            lastUpdated: "05-Sep-2025"
        },
        {
            title: "API Reference Documentation",
            description: "Complete REST API documentation with examples and authentication guides",
            version: "v2.0",
            size: "1.2 MB",
            format: "PDF",
            lastUpdated: "01-Sep-2025"
        }
    ]

    const tutorials = [
        {
            title: "Getting Started with NAMASTE",
            description: "Introduction to the portal and basic navigation",
            duration: "5 min",
            type: "Video"
        },
        {
            title: "Code Search and Lookup",
            description: "How to search and lookup NAMASTE terminologies",
            duration: "8 min",
            type: "Video"
        },
        {
            title: "Translation and Mapping",
            description: "Converting between NAMASTE and ICD-11 codes",
            duration: "12 min",
            type: "Video"
        },
        {
            title: "Clinical Workflow Integration",
            description: "Integrating NAMASTE codes in clinical practice",
            duration: "15 min",
            type: "Video"
        }
    ]

    const faqItems = [
        {
            question: "What is NAMASTE?",
            answer: "NAMASTE (National AYUSH Morbidity & Standardized Terminologies Electronic) is a comprehensive coding system for traditional medicine disorders in India."
        },
        {
            question: "How do I access the API?",
            answer: "API access requires ABHA authentication. Contact your system administrator for credentials and endpoint details."
        },
        {
            question: "What FHIR version is supported?",
            answer: "The system supports FHIR R4 with full compliance to India's 2016 EHR Standards."
        },
        {
            question: "How often are codes updated?",
            answer: "NAMASTE codes are updated quarterly, while ICD-11 mappings are synchronized monthly with WHO standards."
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                            <Separator orientation="vertical" className="h-6" />
                            <h1 className="text-xl font-bold text-gray-900">User Manual & Documentation</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Introduction */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                                <span>Documentation Overview</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to the NAMASTE Portal documentation center. Here you'll find comprehensive guides,
                                API documentation, tutorials, and frequently asked questions to help you effectively use
                                the NAMASTE terminology services and integrate them with your healthcare systems.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Manuals and Documentation */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation Downloads</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {manuals.map((manual, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="h-8 w-8 text-red-600" />
                                                <div>
                                                    <CardTitle className="text-lg">{manual.title}</CardTitle>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Badge variant="outline">{manual.version}</Badge>
                                                        <Badge variant="secondary">{manual.format}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">{manual.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-gray-500">
                                                <p>Size: {manual.size}</p>
                                                <p>Updated: {manual.lastUpdated}</p>
                                            </div>
                                            <Button size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Video Tutorials */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Tutorials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tutorials.map((tutorial, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center space-x-3">
                                            <Video className="h-8 w-8 text-blue-600" />
                                            <div>
                                                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <Badge variant="outline">{tutorial.duration}</Badge>
                                                    <Badge variant="secondary">{tutorial.type}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">{tutorial.description}</p>
                                        <Button size="sm" className="w-full">
                                            <Video className="h-4 w-4 mr-2" />
                                            Watch Tutorial
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqItems.map((faq, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2 text-lg">
                                            <HelpCircle className="h-5 w-5 text-blue-600" />
                                            <span>{faq.question}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Additional Resources */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Resources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link href="https://www.hl7.org/fhir/" target="_blank">
                                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                                        <FileText className="h-6 w-6" />
                                        <span>FHIR R4 Specification</span>
                                    </Button>
                                </Link>
                                <Link href="https://icd.who.int/browse11" target="_blank">
                                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                                        <FileText className="h-6 w-6" />
                                        <span>WHO ICD-11 Browser</span>
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                                        <HelpCircle className="h-6 w-6" />
                                        <span>Technical Support</span>
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}