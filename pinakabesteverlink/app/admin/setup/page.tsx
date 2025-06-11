"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DatabaseStatus } from "@/components/database-status"
import { Loader2, Database, Play } from "lucide-react"

export default function SetupPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [initResult, setInitResult] = useState<string | null>(null)

  const initializeStorage = async () => {
    setIsInitializing(true)
    setInitResult(null)

    try {
      const response = await fetch("/api/init-storage")
      const data = await response.json()

      if (data.success) {
        setInitResult("✅ Storage initialized successfully!")
      } else {
        setInitResult(`❌ Storage initialization failed: ${data.error}`)
      }
    } catch (error) {
      setInitResult(`❌ Storage initialization failed: ${error}`)
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <div className="container px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Database Setup</h1>
        <p className="text-muted-foreground">Initialize and verify your Supabase database integration</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DatabaseStatus />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Initialize Storage
            </CardTitle>
            <CardDescription>Create the applications storage bucket if it doesn't exist</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {initResult && (
              <Alert>
                <AlertDescription>{initResult}</AlertDescription>
              </Alert>
            )}

            <Button onClick={initializeStorage} disabled={isInitializing} className="w-full">
              {isInitializing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              Initialize Storage Bucket
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>Follow these steps to complete your Supabase setup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Run Database Scripts</h4>
            <p className="text-sm text-muted-foreground">
              Go to your Supabase Dashboard → SQL Editor and run the scripts in the `/scripts` folder:
            </p>
            <ul className="text-sm text-muted-foreground ml-4 space-y-1">
              <li>
                • <code>001_create_tables.sql</code> - Creates all required tables
              </li>
              <li>
                • <code>002_update_schema_and_sequences.sql</code> - Adds additional fields and RLS policies
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">2. Environment Variables</h4>
            <p className="text-sm text-muted-foreground">
              Ensure these environment variables are set in your Vercel deployment:
            </p>
            <ul className="text-sm text-muted-foreground ml-4 space-y-1">
              <li>
                • <code>SUPABASE_URL</code>
              </li>
              <li>
                • <code>SUPABASE_SERVICE_ROLE_KEY</code>
              </li>
              <li>
                • <code>NEXT_PUBLIC_SUPABASE_URL</code>
              </li>
              <li>
                • <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">3. Test the Integration</h4>
            <p className="text-sm text-muted-foreground">
              Try submitting a test application to verify everything works correctly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
