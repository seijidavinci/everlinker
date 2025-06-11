"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, Database, RefreshCw } from "lucide-react"

interface DatabaseStatus {
  tablesExist: boolean
  bucketsExist: boolean
  canConnect: boolean
  error?: string
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkDatabaseStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/check-database-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        tablesExist: false,
        bucketsExist: false,
        canConnect: false,
        error: "Failed to check database status",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const StatusIcon = ({ success }: { success: boolean | undefined }) => {
    if (success === undefined) return <Loader2 className="h-4 w-4 animate-spin" />
    return success ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Status
        </CardTitle>
        <CardDescription>Current status of your Supabase database integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status?.error && (
          <Alert variant="destructive">
            <AlertDescription>{status.error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Database Connection</span>
            <StatusIcon success={status?.canConnect} />
          </div>

          <div className="flex items-center justify-between">
            <span>Required Tables</span>
            <StatusIcon success={status?.tablesExist} />
          </div>

          <div className="flex items-center justify-between">
            <span>Storage Buckets</span>
            <StatusIcon success={status?.bucketsExist} />
          </div>
        </div>

        <Button onClick={checkDatabaseStatus} disabled={isLoading} variant="outline" className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  )
}
