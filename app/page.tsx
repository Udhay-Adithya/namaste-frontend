"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
