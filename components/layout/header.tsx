"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, User, Settings, LogOut, Bell, Home, Info, BarChart3, Search, ArrowLeftRight, Eye, Stethoscope } from "lucide-react"
import { authService } from "@/services/auth.service"
import { useRouter, usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "Portal Homepage"
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "User Dashboard"
  },
  {
    name: "Search",
    href: "/search",
    icon: Search,
    description: "Search NAMASTE Codes"
  },
  {
    name: "Translate",
    href: "/translate",
    icon: ArrowLeftRight,
    description: "Code Translation"
  },
  {
    name: "Lookup",
    href: "/lookup",
    icon: Eye,
    description: "Code Lookup"
  },
  {
    name: "Clinical",
    href: "/clinical",
    icon: Stethoscope,
    description: "Clinical Workflow"
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "System Analytics"
  }
]

const informationItems = [
  { name: "About NAMASTE", href: "/about" },
  { name: "User Manual", href: "/manual" },
  { name: "API Documentation", href: "/api-docs" },
  { name: "Contact Us", href: "/contact" }
]

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAuthenticated = authService.isAuthenticated()

  const handleLogout = () => {
    authService.logout()
    router.push("/")
  }

  return (
    <>
      {/* Government Header Bar */}
      <div className="bg-blue-900 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span>भारत सरकार | Government of India</span>
              <span>•</span>
              <span>मंत्रालय आयुष | Ministry of AYUSH</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="https://india.gov.in/" target="_blank" className="hover:underline">
                india.gov.in
              </Link>
              <span>•</span>
              <Link href="https://main.ayush.gov.in/" target="_blank" className="hover:underline">
                ayush.gov.in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Logo and Branding */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">न</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">NAMASTE</h1>
                  <p className="text-sm text-gray-600">Traditional Medicine Terminology Portal</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.slice(0, 4).map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    Services
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {navigationItems.slice(4).map((item) => {
                    const Icon = item.icon
                    return (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Information Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    <Info className="h-4 w-4 mr-2" />
                    Information
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {informationItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">

              {/* System Status */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">System Online</span>
              </div>

              {/* Notifications */}
              {isAuthenticated && (
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs">3</Badge>
                </Button>
              )}

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Demo User</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">Sign In</Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Menu</h2>
                  </div>

                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                            isActive
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </Link>
                      )
                    })}

                    <div className="pt-4 mt-4 border-t">
                      <p className="text-sm font-medium text-gray-900 mb-2">Information</p>
                      {informationItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
