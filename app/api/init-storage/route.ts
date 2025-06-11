import { getSupabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    // Check if the applications bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error("Error listing buckets:", listError)
      return NextResponse.json({ success: false, error: listError.message }, { status: 500 })
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === "applications")

    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { error } = await supabase.storage.createBucket("applications", {
        public: false,
        fileSizeLimit: 10485760, // 10MB
      })

      if (error) {
        // If the error is not because the bucket already exists, return an error
        if (!error.message.includes("already exists")) {
          console.error("Error creating bucket:", error)
          return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }
        // If the bucket already exists, just continue
        console.log("Bucket already exists, continuing...")
      }

      return NextResponse.json({ success: true, message: "Bucket created or already exists" })
    }

    return NextResponse.json({ success: true, message: "Bucket already exists" })
  } catch (error) {
    console.error("Error initializing storage:", error)
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
