import { getSupabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    let canConnect = false
    let tablesExist = false
    let bucketsExist = false

    // Test connection
    try {
      const { error: connectionError } = await supabase.from("applications").select("count").limit(1)
      canConnect = !connectionError
    } catch (error) {
      console.error("Connection test failed:", error)
    }

    // Check if required tables exist
    try {
      const { data, error } = await supabase.rpc("check_tables_exist")
      if (!error && data) {
        tablesExist = true
      } else {
        // Fallback: try to query each table
        const tables = ["personal_profiles", "education", "employment", "character_references", "applications"]
        const tableChecks = await Promise.all(
          tables.map(async (table) => {
            const { error } = await supabase.from(table).select("*").limit(1)
            return !error
          }),
        )
        tablesExist = tableChecks.every(Boolean)
      }
    } catch (error) {
      console.error("Table check failed:", error)
      tablesExist = false
    }

    // Check if storage bucket exists
    try {
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
      if (!bucketError && buckets) {
        bucketsExist = buckets.some((bucket) => bucket.name === "applications")
      }
    } catch (error) {
      console.error("Bucket check failed:", error)
      bucketsExist = false
    }

    return NextResponse.json({
      canConnect,
      tablesExist,
      bucketsExist,
    })
  } catch (error) {
    console.error("Database status check failed:", error)
    return NextResponse.json(
      {
        canConnect: false,
        tablesExist: false,
        bucketsExist: false,
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
