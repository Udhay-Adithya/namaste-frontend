"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, ArrowLeft, Send, Building, Users } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
    const contactInfo = [
        {
            title: "Ministry of AYUSH",
            icon: Building,
            details: [
                "Ayush Bhawan, Block B, GPO Complex",
                "INA, New Delhi - 110023",
                "India"
            ]
        },
        {
            title: "Technical Support",
            icon: Users,
            details: [
                "BISAG-N (Bhaskaracharya National Institute",
                "for Space Applications and Geo-informatics)",
                "Email: support@namaste.ayush.gov.in"
            ]
        }
    ]

    const officeHours = [
        { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
        { day: "Sunday", hours: "Closed" },
        { day: "Public Holidays", hours: "Closed" }
    ]

    const quickContacts = [
        {
            title: "General Inquiries",
            icon: Phone,
            contact: "+91-11-2345-6789",
            description: "For general questions about NAMASTE portal"
        },
        {
            title: "Technical Support",
            icon: Mail,
            contact: "tech-support@namaste.ayush.gov.in",
            description: "For technical issues and API support"
        },
        {
            title: "API Access",
            icon: Mail,
            contact: "api-access@namaste.ayush.gov.in",
            description: "For API credentials and integration support"
        },
        {
            title: "Training & Documentation",
            icon: Phone,
            contact: "+91-11-2345-6790",
            description: "For training sessions and documentation requests"
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
                            <h1 className="text-xl font-bold text-gray-900">Contact Us</h1>
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
                                <Mail className="h-6 w-6 text-blue-600" />
                                <span>Get in Touch</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                We're here to help you with any questions about the NAMASTE portal, technical support,
                                API integration, or general inquiries about traditional medicine terminologies.
                                Reach out to us through any of the channels below.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send us a Message</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name *</Label>
                                            <Input id="firstName" placeholder="Enter your first name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name *</Label>
                                            <Input id="lastName" placeholder="Enter your last name" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input id="email" type="email" placeholder="Enter your email" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" placeholder="Enter your phone number" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="organization">Organization</Label>
                                        <Input id="organization" placeholder="Enter your organization name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject *</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select inquiry type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Inquiry</SelectItem>
                                                <SelectItem value="technical">Technical Support</SelectItem>
                                                <SelectItem value="api">API Access Request</SelectItem>
                                                <SelectItem value="training">Training & Documentation</SelectItem>
                                                <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Please describe your inquiry in detail..."
                                            className="min-h-32"
                                        />
                                    </div>

                                    <Button className="w-full">
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Message
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">

                            {/* Quick Contacts */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Contacts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {quickContacts.map((contact, index) => {
                                        const Icon = contact.icon
                                        return (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Icon className="h-4 w-4 text-blue-600" />
                                                    <span className="font-medium text-sm">{contact.title}</span>
                                                </div>
                                                <p className="text-sm font-mono text-gray-900">{contact.contact}</p>
                                                <p className="text-xs text-gray-600">{contact.description}</p>
                                                {index < quickContacts.length - 1 && <Separator className="mt-3" />}
                                            </div>
                                        )
                                    })}
                                </CardContent>
                            </Card>

                            {/* Office Hours */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <span>Office Hours</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {officeHours.map((schedule, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-sm text-gray-600">{schedule.day}</span>
                                            <span className="text-sm font-medium">{schedule.hours}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Address Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        <span>Office Locations</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon
                                        return (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Icon className="h-4 w-4 text-blue-600" />
                                                    <span className="font-medium text-sm">{info.title}</span>
                                                </div>
                                                {info.details.map((detail, detailIndex) => (
                                                    <p key={detailIndex} className="text-sm text-gray-600 ml-6">
                                                        {detail}
                                                    </p>
                                                ))}
                                                {index < contactInfo.length - 1 && <Separator className="mt-3" />}
                                            </div>
                                        )
                                    })}
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                    {/* Additional Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Important Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Response Time</h4>
                                    <p className="text-sm text-gray-600">
                                        We typically respond to general inquiries within 24-48 hours during business days.
                                        Technical support requests are prioritized and handled within 4-8 hours.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">API Support</h4>
                                    <p className="text-sm text-gray-600">
                                        For API access requests, please include your organization details, use case,
                                        and expected integration timeline. ABHA authentication is required for API access.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}