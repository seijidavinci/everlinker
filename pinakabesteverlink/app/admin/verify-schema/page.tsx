"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"

export default function VerifySchemaPage() {
  const [loading, setLoading] = useState(false)
  const [schemaData, setSchemaData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const checkSchema = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-schema")
      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Failed to verify schema")
        setSchemaData(null)
      } else {
        setSchemaData(data.schema)
      }
    } catch (err) {
      setError(`Error checking schema: ${(err as Error).message}`)
      setSchemaData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkSchema()
  }, [])

  const hasEducIdColumn = schemaData?.applications?.some((col: any) => col.column_name === "educ_id")

  const hasEmploymentIdColumn = schemaData?.applications?.some((col: any) => col.column_name === "employment_id")

  const jobsTableExists = schemaData?.jobsTableExists

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Schema Verification</h1>
          <p className="text-muted-foreground">Verify database schema after refactoring</p>
        </div>
        <Button variant="outline" onClick={checkSchema} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Checking..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Applications Table Structure</CardTitle>
            <CardDescription>Verifying removal of redundant columns</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-10">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : schemaData?.applications ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span>educ_id column removed:</span>
                  {!hasEducIdColumn ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Success
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Failed
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span>employment_id column removed:</span>
                  {!hasEmploymentIdColumn ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Success
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Failed
                    </Badge>
                  )}
                </div>

                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Current Columns:</h3>
                  <ul className="space-y-1 text-sm">
                    {schemaData.applications.map((col: any, i: number) => (
                      <li key={i} className="flex items-center justify-between">
                        <span className="font-mono">{col.column_name}</span>
                        <span className="text-muted-foreground">{col.data_type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jobs Table Status</CardTitle>
            <CardDescription>Verifying table removal</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-10">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : schemaData ? (
              <div className="flex items-center gap-2">
                <span>jobs table removed:</span>
                {!jobsTableExists ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Success
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    Failed
                  </Badge>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Relationship Structure</CardTitle>
          <CardDescription>Database foreign key relationships</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : schemaData?.relationships ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-3 font-medium">Table</th>
                    <th className="text-left py-2 px-3 font-medium">Column</th>
                    <th className="text-left py-2 px-3 font-medium">References</th>
                    <th className="text-left py-2 px-3 font-medium">Foreign Column</th>
                  </tr>
                </thead>
                <tbody>
                  {schemaData.relationships.map((rel: any, i: number) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3">{rel.table}</td>
                      <td className="py-2 px-3">{rel.column}</td>
                      <td className="py-2 px-3">{rel.foreign_table}</td>
                      <td className="py-2 px-3">{rel.foreign_column}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">No relationship data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
