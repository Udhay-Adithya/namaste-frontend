"use client"

import { Button } from "@/components/ui/button"
import { Stethoscope, LogOut, User } from "lucide-react"
import { authService } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()

  const handleLogout = () => {
    authService.logout()
    router.push("/login")
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">NAMASTE FHIR</span>
          </div>
          <div className="hidden md:block text-sm text-muted-foreground">Traditional Medicine Terminology Service</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-sm text-muted-foreground">
            API Status: <span className="text-green-600">Connected</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Demo User
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
