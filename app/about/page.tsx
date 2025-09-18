"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft,
    BookOpen,
    Users,
    Database,
    Globe,
    Shield,
    Stethoscope,
    Target,
    Award,
    TrendingUp,
    ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
    const keyFeatures = [
        {
            icon: Database,
            title: "Comprehensive Terminology Database",
            description: "Over 4,500 standardized terms for Ayurveda, Siddha, and Unani disorders with continuous updates"
        },
        {
            icon: Globe,
            title: "ICD-11 Integration",
            description: "Seamless mapping to WHO ICD-11 Traditional Medicine Module 2 (TM2) for global interoperability"
        },
        {
            icon: Shield,
            title: "FHIR R4 Compliance",
            description: "Full compliance with India's 2016 EHR Standards including ABHA-linked OAuth 2.0 authentication"
        },
        {
            icon: Stethoscope,
            title: "Clinical Decision Support",
            description: "Enables accurate clinical documentation and supports evidence-based traditional medicine practice"
        }
    ]

    const statistics = [
        { label: "Traditional Medicine Systems", value: "3", description: "Ayurveda, Siddha, Unani" },
        { label: "Standardized Terms", value: "4,500+", description: "Continuously expanding database" },
        { label: "ICD-11 Mappings", value: "529", description: "Disorder categories mapped" },
        { label: "Pattern Codes", value: "196", description: "Integrated into global framework" },
        { label: "Registered Hospitals", value: "272", description: "Actively using the system" },
        { label: "Healthcare Providers", value: "1,500+", description: "Trained professionals" }
    ]

    const objectives = [
        "Enable accurate clinical documentation in traditional medicine practices",
        "Facilitate interoperability between traditional and modern healthcare systems",
        "Support insurance claims processing under global ICD-11 coding rules",
        "Provide real-time morbidity analytics for Ministry of Ayush",
        "Ensure compliance with India's 2016 EHR Standards",
        "Bridge traditional Indian medicine with international healthcare standards"
    ]

    const technicalSpecs = [
        { spec: "FHIR Version", value: "R4" },
        { spec: "Authentication", value: "ABHA-linked OAuth 2.0" },
        { spec: "Terminology Standards", value: "SNOMED CT, LOINC" },
        { spec: "Access Control", value: "ISO 22600" },
        { spec: "API Architecture", value: "RESTful microservices" },
        { spec: "Data Format", value: "JSON, XML, CSV" }
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
                            <h1 className="text-xl font-bold text-gray-900">About NAMASTE</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
                        <div className="max-w-4xl">
                            <h1 className="text-4xl font-bold mb-4">
                                National AYUSH Morbidity & Standardized Terminologies Electronic
                            </h1>
                            <p className="text-xl text-blue-100 mb-6">
                                Revolutionizing traditional medicine documentation through standardized terminologies
                                and global interoperability standards.
                            </p>
                            <div className="flex items-center space-x-4">
                                <Badge className="bg-white text-blue-600 px-4 py-2">
                                    Ministry of AYUSH Initiative
                                </Badge>
                                <Badge className="bg-blue-700 text-white px-4 py-2">
                                    FHIR R4 Compliant
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="h-6 w-6 text-blue-600" />
                                    <span>Our Mission</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">
                                    To transform India's traditional medicine sector by providing standardized,
                                    interoperable digital health terminology services that bridge ancient wisdom
                                    with modern healthcare infrastructure, enabling seamless integration with
                                    global health information systems.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                    <span>Our Vision</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">
                                    To establish NAMASTE as the global standard for traditional medicine
                                    terminology, fostering evidence-based practice, supporting insurance
                                    integration, and contributing to the advancement of integrative healthcare
                                    through robust data analytics and international collaboration.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Key Features */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Features & Capabilities</CardTitle>
                            <CardDescription>
                                Comprehensive solutions for traditional medicine terminology management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {keyFeatures.map((feature, index) => {
                                    const Icon = feature.icon
                                    return (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="p-3 bg-blue-50 rounded-lg">
                                                <Icon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                                <p className="text-sm text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Impact & Statistics</CardTitle>
                            <CardDescription>Current reach and system usage across India</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                {statistics.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                        <p className="text-sm font-medium text-gray-900 mb-1">{stat.label}</p>
                                        <p className="text-xs text-gray-500">{stat.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Objectives */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Award className="h-6 w-6 text-orange-600" />
                                <span>Core Objectives</span>
                            </CardTitle>
                            <CardDescription>
                                Strategic goals driving the NAMASTE initiative
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {objectives.map((objective, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm text-gray-700">{objective}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technical Specifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Specifications</CardTitle>
                            <CardDescription>
                                Technology stack and compliance standards
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {technicalSpecs.map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-600">{spec.spec}</span>
                                        <Badge variant="outline">{spec.value}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Compliance & Standards */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Compliance & Standards</CardTitle>
                            <CardDescription>
                                Adherence to national and international healthcare standards
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">National Standards</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• India's 2016 EHR Standards compliance</li>
                                            <li>• ABHA (Ayushman Bharat Health Account) integration</li>
                                            <li>• Ministry of AYUSH guidelines adherence</li>
                                            <li>• Digital India initiative alignment</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">International Standards</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• WHO ICD-11 Traditional Medicine Module 2</li>
                                            <li>• HL7 FHIR R4 specification</li>
                                            <li>• ISO 22600 access control standards</li>
                                            <li>• SNOMED CT and LOINC semantics</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Development Team */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Users className="h-6 w-6 text-purple-600" />
                                <span>Development & Maintenance</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900 mb-2">Ministry of AYUSH</h4>
                                    <p className="text-sm text-gray-600">Policy guidance and domain expertise</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900 mb-2">BISAG-N</h4>
                                    <p className="text-sm text-gray-600">Technical development and maintenance</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-semibold text-gray-900 mb-2">MeitY-GOI</h4>
                                    <p className="text-sm text-gray-600">Digital infrastructure support</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* External Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Related Resources</CardTitle>
                            <CardDescription>
                                Additional information and external references
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="https://main.ayush.gov.in/" target="_blank">
                                    <Button variant="outline" className="w-full justify-between">
                                        <span>Ministry of AYUSH</span>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="https://icd.who.int/browse11" target="_blank">
                                    <Button variant="outline" className="w-full justify-between">
                                        <span>WHO ICD-11 Browser</span>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="https://www.hl7.org/fhir/" target="_blank">
                                    <Button variant="outline" className="w-full justify-between">
                                        <span>HL7 FHIR Specification</span>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="https://abdm.gov.in/" target="_blank">
                                    <Button variant="outline" className="w-full justify-between">
                                        <span>Ayushman Bharat Digital Mission</span>
                                        <ExternalLink className="h-4 w-4" />
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