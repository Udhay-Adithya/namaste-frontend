"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    User,
    Shield,
    Bell,
    Palette,
    Database,
    Key,
    LogOut,
    Settings,
    Save,
    RefreshCw,
    Download,
    Upload,
    Trash2,
    Eye,
    EyeOff
} from "lucide-react"
import { authService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
    const router = useRouter()
    const [showApiKey, setShowApiKey] = useState(false)
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
        system: true
    })

    const [preferences, setPreferences] = useState({
        theme: 'light',
        language: 'en',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        autoLogout: '30'
    })

    const handleLogout = () => {
        authService.logout()
        router.push("/")
    }

    const handleSaveProfile = () => {
        // Implement save profile logic
        console.log("Profile saved")
    }

    const handleGenerateApiKey = () => {
        // Implement API key generation
        console.log("Generate new API key")
    }

    const handleExportData = () => {
        // Implement data export
        console.log("Export user data")
    }

    const apiUsageStats = [
        { endpoint: "POST /fhir/translate", calls: 1247, lastUsed: "2 hours ago" },
        { endpoint: "GET /fhir/lookup", calls: 856, lastUsed: "5 minutes ago" },
        { endpoint: "POST /fhir/validate", calls: 432, lastUsed: "1 hour ago" },
        { endpoint: "GET /fhir/search", calls: 289, lastUsed: "30 minutes ago" }
    ]

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <Navigation />

                <main className="flex-1 container py-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-2">
                                Manage your account settings, preferences, and API access
                            </p>
                        </div>

                        <Tabs defaultValue="profile" className="space-y-8">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="profile" className="flex items-center space-x-2">
                                    <User className="h-4 w-4" />
                                    <span>Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="security" className="flex items-center space-x-2">
                                    <Shield className="h-4 w-4" />
                                    <span>Security</span>
                                </TabsTrigger>
                                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                                    <Bell className="h-4 w-4" />
                                    <span>Notifications</span>
                                </TabsTrigger>
                                <TabsTrigger value="preferences" className="flex items-center space-x-2">
                                    <Palette className="h-4 w-4" />
                                    <span>Preferences</span>
                                </TabsTrigger>
                                <TabsTrigger value="api" className="flex items-center space-x-2">
                                    <Key className="h-4 w-4" />
                                    <span>API</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Profile Tab */}
                            <TabsContent value="profile" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profile Information</CardTitle>
                                        <CardDescription>Update your personal information and organization details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input id="firstName" defaultValue="Demo" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" defaultValue="User" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" defaultValue="demo.user@namaste.ayush.gov.in" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="organization">Organization</Label>
                                            <Input id="organization" defaultValue="AIIMS New Delhi" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="role">Role</Label>
                                            <Select defaultValue="clinician">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="clinician">Clinician</SelectItem>
                                                    <SelectItem value="researcher">Researcher</SelectItem>
                                                    <SelectItem value="admin">Administrator</SelectItem>
                                                    <SelectItem value="developer">Developer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Tell us about yourself and your work with traditional medicine..."
                                                defaultValue="Practicing Ayurveda physician with 10+ years of experience in integrative medicine."
                                            />
                                        </div>

                                        <Button onClick={handleSaveProfile}>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Tab */}
                            <TabsContent value="security" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Password & Security</CardTitle>
                                        <CardDescription>Manage your password and security settings</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <Input id="currentPassword" type="password" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input id="newPassword" type="password" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <Input id="confirmPassword" type="password" />
                                        </div>

                                        <Button>Update Password</Button>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h4 className="font-medium">Two-Factor Authentication</h4>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">SMS Authentication</p>
                                                    <p className="text-xs text-gray-500">Receive codes via SMS</p>
                                                </div>
                                                <Switch />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">App Authentication</p>
                                                    <p className="text-xs text-gray-500">Use authenticator app</p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h4 className="font-medium">Active Sessions</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium">Current Session</p>
                                                        <p className="text-xs text-gray-500">Chrome on macOS • India • Active now</p>
                                                    </div>
                                                    <Badge variant="secondary">Current</Badge>
                                                </div>
                                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium">Mobile App</p>
                                                        <p className="text-xs text-gray-500">iOS App • India • 2 hours ago</p>
                                                    </div>
                                                    <Button variant="outline" size="sm">Revoke</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Notifications Tab */}
                            <TabsContent value="notifications" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Preferences</CardTitle>
                                        <CardDescription>Choose how you want to receive notifications</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">Email Notifications</p>
                                                    <p className="text-xs text-gray-500">Receive updates via email</p>
                                                </div>
                                                <Switch
                                                    checked={notifications.email}
                                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">Push Notifications</p>
                                                    <p className="text-xs text-gray-500">Browser and mobile notifications</p>
                                                </div>
                                                <Switch
                                                    checked={notifications.push}
                                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">SMS Notifications</p>
                                                    <p className="text-xs text-gray-500">Critical alerts via SMS</p>
                                                </div>
                                                <Switch
                                                    checked={notifications.sms}
                                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium">System Alerts</p>
                                                    <p className="text-xs text-gray-500">Maintenance and system updates</p>
                                                </div>
                                                <Switch
                                                    checked={notifications.system}
                                                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, system: checked }))}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Preferences Tab */}
                            <TabsContent value="preferences" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Display & Language Preferences</CardTitle>
                                        <CardDescription>Customize your experience</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="theme">Theme</Label>
                                                <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="language">Language</Label>
                                                <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                                                        <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                                                        <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="timezone">Timezone</Label>
                                                <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                                                        <SelectItem value="UTC">UTC</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="dateFormat">Date Format</Label>
                                                <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
                                            <Select value={preferences.autoLogout} onValueChange={(value) => setPreferences(prev => ({ ...prev, autoLogout: value }))}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="15">15 minutes</SelectItem>
                                                    <SelectItem value="30">30 minutes</SelectItem>
                                                    <SelectItem value="60">1 hour</SelectItem>
                                                    <SelectItem value="120">2 hours</SelectItem>
                                                    <SelectItem value="0">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Preferences
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* API Tab */}
                            <TabsContent value="api" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>API Access & Usage</CardTitle>
                                        <CardDescription>Manage your API keys and monitor usage</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <Alert>
                                            <Key className="h-4 w-4" />
                                            <AlertDescription>
                                                Your API key provides access to NAMASTE FHIR services. Keep it secure and never share it publicly.
                                            </AlertDescription>
                                        </Alert>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="apiKey">API Key</Label>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowApiKey(!showApiKey)}
                                                >
                                                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Input
                                                    id="apiKey"
                                                    type={showApiKey ? "text" : "password"}
                                                    value="nms_live_1234567890abcdef..."
                                                    readOnly
                                                    className="font-mono"
                                                />
                                                <Button variant="outline" onClick={handleGenerateApiKey}>
                                                    <RefreshCw className="h-4 w-4 mr-2" />
                                                    Regenerate
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h4 className="font-medium">API Usage Statistics</h4>
                                            <div className="space-y-3">
                                                {apiUsageStats.map((stat, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                        <div>
                                                            <p className="text-sm font-medium font-mono">{stat.endpoint}</p>
                                                            <p className="text-xs text-gray-500">Last used: {stat.lastUsed}</p>
                                                        </div>
                                                        <Badge variant="outline">{stat.calls} calls</Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h4 className="font-medium">Data Management</h4>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" onClick={handleExportData}>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Export Data
                                                </Button>
                                                <Button variant="outline">
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Import Data
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Danger Zone */}
                        <Card className="border-red-200">
                            <CardHeader>
                                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                <CardDescription>Irreversible actions that affect your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Sign out of all devices</p>
                                        <p className="text-xs text-gray-500">This will sign you out of all active sessions</p>
                                    </div>
                                    <Button variant="outline" onClick={handleLogout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign Out All
                                    </Button>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-red-600">Delete Account</p>
                                        <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                                    </div>
                                    <Button variant="destructive">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}