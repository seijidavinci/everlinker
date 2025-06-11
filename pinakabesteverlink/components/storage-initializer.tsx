"use client"

import { useEffect, useState } from "react"

export function StorageInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initStorage = async () => {
      try {
        const response = await fetch("/api/init-storage")

        if (!response.ok) {
          const errorData = await response.json()
          console.warn("Storage initialization warning:", errorData)
          // Don't set error state for "already exists" errors
          if (errorData.error && !errorData.error.includes("already exists")) {
            setError(errorData.error)
          }
        } else {
          const data = await response.json()
          console.log("Storage initialization:", data)
        }

        setInitialized(true)
      } catch (error) {
        console.error("Failed to initialize storage:", error)
        setError((error as Error).message)
      }
    }

    initStorage()
  }, [])

  // This component doesn't render anything unless there's an error
  if (error) {
    return (
      <div className="hidden">
        {/* Hidden error message for debugging */}
        Storage initialization error: {error}
      </div>
    )
  }

  return null
}
