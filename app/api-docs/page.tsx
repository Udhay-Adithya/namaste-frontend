"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
    ArrowLeft,
    Code,
    Key,
    Send,
    Copy,
    ExternalLink,
    Book,
    Zap,
    Shield,
    Database
} from "lucide-react"
import Link from "next/link"

export default function ApiDocsPage() {
    const [selectedEndpoint, setSelectedEndpoint] = useState("search")
    const [apiKey, setApiKey] = useState("nms_test_1234567890abcdef")

    const endpoints = [
        {
            id: "search",
            method: "GET",
            path: "/fhir/search",
            title: "Search Terminologies",
            description: "Search NAMASTE codes and terminologies with filters"
        },
        {
            id: "lookup",
            method: "GET",
            path: "/fhir/lookup/{code}",
            title: "Code Lookup",
            description: "Get detailed information about a specific code"
        },
        {
            id: "translate",
            method: "POST",
            path: "/fhir/translate",
            title: "Code Translation",
            description: "Translate between NAMASTE and ICD-11 codes"
        },
        {
            id: "validate",
            method: "POST",
            path: "/fhir/validate",
            title: "Code Validation",
            description: "Validate terminology codes and mappings"
        },
        {
            id: "bundle",
            method: "POST",
            path: "/fhir/bundle",
            title: "Submit Bundle",
            description: "Submit FHIR bundles with clinical data"
        }
    ]

    const examples = {
        search: {
            request: `GET /fhir/search?q=vata&system=namaste&_format=json
Authorization: Bearer ${apiKey}
Content-Type: application/fhir+json`,
            response: `{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 15,
  "entry": [
    {
      "resource": {
        "resourceType": "CodeSystem",
        "id": "namaste-ayurveda",
        "concept": [
          {
            "code": "AY_DIS_0001",
            "display": "Vata Vyadhi",
            "definition": "Disorders related to Vata dosha imbalance"
          }
        ]
      }
    }
  ]
}`
        },
        translate: {
            request: `POST /fhir/translate
Authorization: Bearer ${apiKey}
Content-Type: application/fhir+json

{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "code",
      "valueCode": "AY_DIS_0001"
    },
    {
      "name": "system", 
      "valueUri": "http://namaste.ayush.gov.in/fhir/CodeSystem/ayurveda"
    },
    {
      "name": "target",
      "valueUri": "http://id.who.int/icd/release/11/2022-02/mms"
    }
  ]
}`,
            response: `{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "result",
      "valueBoolean": true
    },
    {
      "name": "match",
      "part": [
        {
          "name": "equivalence",
          "valueCode": "equivalent"
        },
        {
          "name": "concept",
          "valueCoding": {
            "system": "http://id.who.int/icd/release/11/2022-02/mms",
            "code": "TM41.0",
            "display": "Traditional medicine conditions, functions"
          }
        }
      ]
    }
  ]
}`
        }
    }

    const authenticationMethods = [
        {
            name: "API Key Authentication",
            description: "Include your API key in the Authorization header",
            example: "Authorization: Bearer nms_live_your_api_key_here"
        },
        {
            name: "ABHA OAuth 2.0",
            description: "Use ABHA tokens for healthcare provider authentication",
            example: "Authorization: Bearer abha_token_here"
        }
    ]

    const statusCodes = [
        { code: "200", description: "OK - Request successful" },
        { code: "201", description: "Created - Resource created successfully" },
        { code: "400", description: "Bad Request - Invalid request parameters" },
        { code: "401", description: "Unauthorized - Invalid or missing authentication" },
        { code: "404", description: "Not Found - Resource not found" },
        { code: "429", description: "Too Many Requests - Rate limit exceeded" },
        { code: "500", description: "Internal Server Error - Server error occurred" }
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
                            <h1 className="text-xl font-bold text-gray-900">API Documentation</h1>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            API v2.1.0
                        </Badge>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Introduction */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Code className="h-6 w-6 text-blue-600" />
                                <span>NAMASTE FHIR API</span>
                            </CardTitle>
                            <CardDescription>
                                RESTful API for accessing NAMASTE terminology services and ICD-11 mappings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center space-x-3">
                                    <Zap className="h-8 w-8 text-yellow-600" />
                                    <div>
                                        <p className="font-medium">Fast & Reliable</p>
                                        <p className="text-sm text-gray-600">99.9% uptime SLA</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Shield className="h-8 w-8 text-green-600" />
                                    <div>
                                        <p className="font-medium">Secure</p>
                                        <p className="text-sm text-gray-600">OAuth 2.0 & API keys</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Database className="h-8 w-8 text-blue-600" />
                                    <div>
                                        <p className="font-medium">FHIR Compliant</p>
                                        <p className="text-sm text-gray-600">HL7 FHIR R4 standard</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="quickstart" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
                            <TabsTrigger value="authentication">Authentication</TabsTrigger>
                            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                            <TabsTrigger value="examples">Examples</TabsTrigger>
                            <TabsTrigger value="reference">Reference</TabsTrigger>
                        </TabsList>

                        {/* Quick Start */}
                        <TabsContent value="quickstart" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Getting Started</CardTitle>
                                    <CardDescription>Quick setup guide for NAMASTE API</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">1. Get Your API Key</h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Sign up for a NAMASTE account and generate your API key from the settings page.
                                        </p>
                                        <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                                            Base URL: https://api.namaste.ayush.gov.in/v1
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">2. Make Your First Request</h4>
                                        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                                            <div className="text-green-400"># Search for Ayurveda terminologies</div>
                                            <div className="mt-2">curl -X GET "https://api.namaste.ayush.gov.in/v1/fhir/search?q=vata" \</div>
                                            <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                                            <div className="ml-4">-H "Content-Type: application/fhir+json"</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">3. Explore the Response</h4>
                                        <p className="text-sm text-gray-600">
                                            All responses follow FHIR R4 Bundle format with comprehensive metadata.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Authentication */}
                        <TabsContent value="authentication" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Key className="h-5 w-5" />
                                        <span>Authentication Methods</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {authenticationMethods.map((method, index) => (
                                        <div key={index} className="space-y-3">
                                            <h4 className="font-semibold">{method.name}</h4>
                                            <p className="text-sm text-gray-600">{method.description}</p>
                                            <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                                                {method.example}
                                            </div>
                                            {index < authenticationMethods.length - 1 && <Separator />}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Rate Limits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">1,000</div>
                                            <p className="text-sm text-gray-600">Requests per hour</p>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">10,000</div>
                                            <p className="text-sm text-gray-600">Requests per day</p>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">50</div>
                                            <p className="text-sm text-gray-600">Concurrent requests</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Endpoints */}
                        <TabsContent value="endpoints" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Available Endpoints</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            {endpoints.map((endpoint) => (
                                                <Button
                                                    key={endpoint.id}
                                                    variant={selectedEndpoint === endpoint.id ? "default" : "ghost"}
                                                    className="w-full justify-start"
                                                    onClick={() => setSelectedEndpoint(endpoint.id)}
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className={`mr-2 ${endpoint.method === 'GET' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}
                                                    >
                                                        {endpoint.method}
                                                    </Badge>
                                                    {endpoint.title}
                                                </Button>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="lg:col-span-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                {endpoints.find(e => e.id === selectedEndpoint)?.title}
                                            </CardTitle>
                                            <CardDescription>
                                                {endpoints.find(e => e.id === selectedEndpoint)?.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Endpoint</h4>
                                                <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                                                    <span>
                                                        <Badge className="mr-2">
                                                            {endpoints.find(e => e.id === selectedEndpoint)?.method}
                                                        </Badge>
                                                        {endpoints.find(e => e.id === selectedEndpoint)?.path}
                                                    </span>
                                                    <Button variant="ghost" size="sm">
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {selectedEndpoint === "search" && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Query Parameters</h4>
                                                    <div className="space-y-2">
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                            <div className="font-medium">Parameter</div>
                                                            <div className="font-medium">Type</div>
                                                            <div className="font-medium">Description</div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                            <div className="font-mono">q</div>
                                                            <div>string</div>
                                                            <div>Search query term</div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                            <div className="font-mono">system</div>
                                                            <div>string</div>
                                                            <div>Terminology system (namaste, icd11)</div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                            <div className="font-mono">_format</div>
                                                            <div>string</div>
                                                            <div>Response format (json, xml)</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Examples */}
                        <TabsContent value="examples" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Code Examples</CardTitle>
                                    <CardDescription>Sample requests and responses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="search-example" className="space-y-4">
                                        <TabsList>
                                            <TabsTrigger value="search-example">Search</TabsTrigger>
                                            <TabsTrigger value="translate-example">Translate</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="search-example" className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Request</h4>
                                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                                                    <pre>{examples.search.request}</pre>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Response</h4>
                                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                                                    <pre>{examples.search.response}</pre>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="translate-example" className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Request</h4>
                                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                                                    <pre>{examples.translate.request}</pre>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Response</h4>
                                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                                                    <pre>{examples.translate.response}</pre>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Reference */}
                        <TabsContent value="reference" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>HTTP Status Codes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {statusCodes.map((status, index) => (
                                            <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                                                <Badge
                                                    variant={status.code.startsWith('2') ? 'default' : status.code.startsWith('4') ? 'destructive' : 'secondary'}
                                                    className="font-mono"
                                                >
                                                    {status.code}
                                                </Badge>
                                                <span className="text-sm">{status.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Resources</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Link href="https://www.hl7.org/fhir/" target="_blank">
                                            <Button variant="outline" className="w-full justify-between">
                                                <span>HL7 FHIR R4 Specification</span>
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href="/manual">
                                            <Button variant="outline" className="w-full justify-between">
                                                <span>User Manual</span>
                                                <Book className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    )
}