"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  name: string
  href?: string
}

const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [
    { name: "Home", href: "/" },
    { name: "Dashboard" }
  ],
  "/search": [
    { name: "Home", href: "/" },
    { name: "Search" }
  ],
  "/translate": [
    { name: "Home", href: "/" },
    { name: "Translate" }
  ],
  "/lookup": [
    { name: "Home", href: "/" },
    { name: "Lookup" }
  ],
  "/clinical": [
    { name: "Home", href: "/" },
    { name: "Clinical" }
  ],
  "/analytics": [
    { name: "Home", href: "/" },
    { name: "Analytics" }
  ],
  "/settings": [
    { name: "Home", href: "/" },
    { name: "Settings" }
  ],
  "/manual": [
    { name: "Home", href: "/" },
    { name: "User Manual" }
  ],
  "/contact": [
    { name: "Home", href: "/" },
    { name: "Contact Us" }
  ]
}

export function Navigation() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === "/") {
    return null
  }

  const breadcrumbs = routeBreadcrumbs[pathname] || [
    { name: "Home", href: "/" },
    { name: "Page" }
  ]

  return (
    <nav className="bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 py-3 text-sm">
          <Home className="h-4 w-4 text-gray-500" />
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
