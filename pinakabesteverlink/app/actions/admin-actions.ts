"use server"

import { getSupabaseAdmin } from "@/lib/supabase"

export async function getApplications() {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("applications")
      .select(`
        app_id,
        submission_date,
        status,
        personal_profiles(name, cellphone_number, email)
      `)
      .order("submission_date", { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching applications:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateApplicationStatus(applicationId: string, newStatus: string) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("applications").update({ status: newStatus }).eq("app_id", applicationId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating application status:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteApplication(applicationId: string) {
  try {
    const supabase = getSupabaseAdmin()

    // Get the person_id for this application to delete related records
    const { data: appData, error: appFetchError } = await supabase
      .from("applications")
      .select("person_id")
      .eq("app_id", applicationId)
      .single()

    if (appFetchError) throw appFetchError

    const personId = appData.person_id

    // Get employment records to find character references
    const { data: employmentData } = await supabase
      .from("employment")
      .select("character_reference_id")
      .eq("person_id", personId)

    // Delete character references
    if (employmentData) {
      for (const emp of employmentData) {
        if (emp.character_reference_id) {
          await supabase.from("character_references").delete().eq("character_reference_id", emp.character_reference_id)
        }
      }
    }

    // Delete employment records
    await supabase.from("employment").delete().eq("person_id", personId)

    // Delete education records
    await supabase.from("education").delete().eq("person_id", personId)

    // Delete application record
    await supabase.from("applications").delete().eq("app_id", applicationId)

    // Delete personal profile
    await supabase.from("personal_profiles").delete().eq("person_id", personId)

    return { success: true }
  } catch (error) {
    console.error("Error deleting application:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getApplicationStatistics() {
  try {
    const supabase = getSupabaseAdmin()

    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })

    if (countError) throw countError

    // Get status counts
    const { data: statusCounts, error: statusError } = await supabase.from("applications").select("status")

    if (statusError) throw statusError

    // Calculate counts by status
    const counts = {
      total: totalCount || 0,
      submitted: statusCounts?.filter((app) => app.status === "Submitted").length || 0,
      underReview: statusCounts?.filter((app) => app.status === "Under Review").length || 0,
      shortlisted: statusCounts?.filter((app) => app.status === "Shortlisted").length || 0,
      interview: statusCounts?.filter((app) => app.status === "Interview Scheduled").length || 0,
      rejected: statusCounts?.filter((app) => app.status === "Rejected").length || 0,
      offer: statusCounts?.filter((app) => app.status === "Offer").length || 0,
    }

    return { success: true, data: counts }
  } catch (error) {
    console.error("Error fetching application statistics:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getFullApplicationDetails(applicationId: string) {
  try {
    const supabase = getSupabaseAdmin()

    // Get application with personal profile
    const { data: application, error: appError } = await supabase
      .from("applications")
      .select(`
        *,
        personal_profiles(*)
      `)
      .eq("app_id", applicationId)
      .single()

    if (appError) throw appError

    // Get education records
    const { data: education, error: eduError } = await supabase
      .from("education")
      .select("*")
      .eq("person_id", application.person_id)

    if (eduError) throw eduError

    // Get employment records with character references
    const { data: employment, error: empError } = await supabase
      .from("employment")
      .select(`
        *,
        character_references(*)
      `)
      .eq("person_id", application.person_id)

    if (empError) throw empError

    return {
      success: true,
      data: {
        application,
        education: education || [],
        employment: employment || [],
      },
    }
  } catch (error) {
    console.error("Error fetching full application details:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function exportApplicationsCSV() {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("applications")
      .select(`
        app_id,
        submission_date,
        status,
        personal_profiles(
          name,
          sex,
          city_address,
          residential_address,
          birth_date,
          birth_place,
          civil_status,
          citizenship,
          height,
          weight,
          religion,
          cellphone_number,
          email,
          father_name,
          mother_name,
          emergency_contact_name,
          emergency_contact_number,
          is_pwd,
          disability_details,
          is_indigenous,
          indigenous_details
        )
      `)
      .order("submission_date", { ascending: false })

    if (error) throw error

    // Convert to CSV format
    const csvHeaders = [
      "Application ID",
      "Name",
      "Email",
      "Phone",
      "Sex",
      "Birth Date",
      "Civil Status",
      "City Address",
      "Residential Address",
      "Birth Place",
      "Citizenship",
      "Height",
      "Weight",
      "Religion",
      "Father Name",
      "Mother Name",
      "Emergency Contact",
      "Emergency Phone",
      "PWD",
      "Disability Details",
      "Indigenous",
      "Indigenous Details",
      "Status",
      "Submission Date",
    ]

    const csvRows = data.map((app) => [
      app.app_id,
      app.personal_profiles?.name || "",
      app.personal_profiles?.email || "",
      app.personal_profiles?.cellphone_number || "",
      app.personal_profiles?.sex || "",
      app.personal_profiles?.birth_date || "",
      app.personal_profiles?.civil_status || "",
      app.personal_profiles?.city_address || "",
      app.personal_profiles?.residential_address || "",
      app.personal_profiles?.birth_place || "",
      app.personal_profiles?.citizenship || "",
      app.personal_profiles?.height || "",
      app.personal_profiles?.weight || "",
      app.personal_profiles?.religion || "",
      app.personal_profiles?.father_name || "",
      app.personal_profiles?.mother_name || "",
      app.personal_profiles?.emergency_contact_name || "",
      app.personal_profiles?.emergency_contact_number || "",
      app.personal_profiles?.is_pwd ? "Yes" : "No",
      app.personal_profiles?.disability_details || "",
      app.personal_profiles?.is_indigenous ? "Yes" : "No",
      app.personal_profiles?.indigenous_details || "",
      app.status,
      app.submission_date,
    ])

    const csvContent = [csvHeaders, ...csvRows]
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","))
      .join("\n")

    return { success: true, data: csvContent }
  } catch (error) {
    console.error("Error exporting applications CSV:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function exportStatisticsCSV() {
  try {
    const supabase = getSupabaseAdmin()

    // Get status distribution
    const { data: statusData, error: statusError } = await supabase
      .from("applications")
      .select("status, submission_date")

    if (statusError) throw statusError

    // Calculate statistics
    const statusCounts = statusData.reduce((acc: any, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    }, {})

    // Monthly submissions
    const monthlyData = statusData.reduce((acc: any, app) => {
      const month = new Date(app.submission_date).toISOString().slice(0, 7) // YYYY-MM
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {})

    // Create CSV content
    const statusCSV = [["Status", "Count"], ...Object.entries(statusCounts).map(([status, count]) => [status, count])]

    const monthlyCSV = [
      ["Month", "Applications"],
      ...Object.entries(monthlyData).map(([month, count]) => [month, count]),
    ]

    const combinedCSV = [
      ["=== STATUS DISTRIBUTION ==="],
      ...statusCSV,
      [""],
      ["=== MONTHLY SUBMISSIONS ==="],
      ...monthlyCSV,
    ]

    const csvContent = combinedCSV
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","))
      .join("\n")

    return { success: true, data: csvContent }
  } catch (error) {
    console.error("Error exporting statistics CSV:", error)
    return { success: false, error: (error as Error).message }
  }
}
