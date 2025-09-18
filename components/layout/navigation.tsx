"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Search, ArrowLeftRight, Eye, Stethoscope, BarChart3 } from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Search",
    href: "/search",
    icon: Search,
  },
  {
    name: "Translate",
    href: "/translate",
    icon: ArrowLeftRight,
  },
  {
    name: "Lookup",
    href: "/lookup",
    icon: Eye,
  },
  {
    name: "Clinical",
    href: "/clinical",
    icon: Stethoscope,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-muted/30">
      <div className="container">
        <div className="flex space-x-8 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
