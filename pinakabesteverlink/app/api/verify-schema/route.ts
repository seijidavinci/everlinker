import { getSupabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    // Check if applications table exists and what columns it has
    const { data: applicationsInfo, error: applicationsError } = await supabase.rpc("check_table_structure", {
      table_name: "applications",
    })

    if (applicationsError) {
      return NextResponse.json(
        {
          success: false,
          error: `Error checking applications table: ${applicationsError.message}`,
        },
        { status: 500 },
      )
    }

    // Check if jobs table exists
    const { data: jobsInfo, error: jobsError } = await supabase.rpc("check_if_table_exists", { table_name: "jobs" })

    if (jobsError) {
      return NextResponse.json(
        {
          success: false,
          error: `Error checking for jobs table: ${jobsError.message}`,
        },
        { status: 500 },
      )
    }

    // Check relationships
    const { data: relationships, error: relError } = await supabase.rpc("check_foreign_keys", { schema_name: "public" })

    if (relError) {
      return NextResponse.json(
        {
          success: false,
          error: `Error checking relationships: ${relError.message}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      schema: {
        applications: applicationsInfo,
        jobsTableExists: jobsInfo,
        relationships: relationships,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Server error: ${(error as Error).message}`,
      },
      { status: 500 },
    )
  }
}
