import type { AuthResponse } from "@/types/fhir"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
const TOKEN_STORAGE_KEY = "namaste_fhir_token"
const REFRESH_THRESHOLD_MINUTES = 5

class AuthService {
  private token: string | null = null
  private tokenExpiry: number | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.loadTokenFromStorage()
    }
  }

  private loadTokenFromStorage(): void {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    const storedExpiry = localStorage.getItem(`${TOKEN_STORAGE_KEY}_expiry`)

    if (storedToken && storedExpiry) {
      const expiryTime = Number.parseInt(storedExpiry, 10)
      if (Date.now() < expiryTime) {
        this.token = storedToken
        this.tokenExpiry = expiryTime
      } else {
        this.clearToken()
      }
    }
  }

  private saveTokenToStorage(token: string, expiresIn: number): void {
    const expiryTime = Date.now() + expiresIn * 1000
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    localStorage.setItem(`${TOKEN_STORAGE_KEY}_expiry`, expiryTime.toString())
    this.token = token
    this.tokenExpiry = expiryTime
  }

  private clearToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(`${TOKEN_STORAGE_KEY}_expiry`)
    this.token = null
    this.tokenExpiry = null
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Authentication failed")
    }

    const authResponse: AuthResponse = await response.json()
    // Default to 1 hour (3600 seconds) if expires_in is not provided
    const expiresIn = authResponse.expires_in || 3600
    this.saveTokenToStorage(authResponse.access_token, expiresIn)

    return authResponse
  }

  logout(): void {
    this.clearToken()
  }

  getToken(): string | null {
    return this.token
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.tokenExpiry !== null && Date.now() < this.tokenExpiry
  }

  async refreshToken(): Promise<void> {
    if (!this.tokenExpiry) return

    const timeUntilExpiry = this.tokenExpiry - Date.now()
    const refreshThreshold = REFRESH_THRESHOLD_MINUTES * 60 * 1000

    if (timeUntilExpiry < refreshThreshold) {
      // In a real implementation, you would call a refresh endpoint
      // For now, we'll just clear the token to force re-authentication
      this.clearToken()
    }
  }
}

export const authService = new AuthService()
