"use server"

import { v4 as uuidv4 } from "uuid"
import { getSupabaseAdmin } from "@/lib/supabase"

// Type definitions based on our database schema
type PersonalInfo = {
  name: string
  sex: "Male" | "Female" | "Other"
  cityAddress: string
  birthdate: string
  birthPlace: string
  residentialAddress: string
  civilStatus: "Single" | "Married" | "Widowed" | "Other"
  citizenship: string
  height: string
  weight: string
  religion?: string
  contactNumber: string
  email?: string
  fatherName: string
  motherName: string
  emergencyPerson?: string
  emergencyNumber?: string
  languages?: string[]
  skills?: string[]
  isPwd?: boolean
  disabilityDetails?: string
  isIndigenous?: boolean
  indigenousDetails?: string
}

type Education = {
  id: string
  level: string
  school: string
  yearGraduated: string
}

type Employment = {
  id: string
  position: string
  company: string
  startDate: string
  endDate?: string
  location?: string
  responsibilities?: string
  achievements?: string
}

type CharacterReference = {
  id: string
  name: string
  occupation: string
  company: string
  relatedEmploymentId: string
}

// Helper function to safely format dates
function formatDateForDB(dateString: string | null | undefined): string | null {
  console.log("Formatting date:", dateString)

  if (!dateString || dateString.trim() === "" || dateString === "undefined" || dateString === "null") {
    console.log("Date is empty or invalid, returning null")
    return null
  }

  try {
    // Clean the date string
    const cleanDate = dateString.trim()

    // If it's just a year (4 digits), convert to a full date
    if (/^\d{4}$/.test(cleanDate)) {
      const year = Number.parseInt(cleanDate)
      if (year >= 1900 && year <= new Date().getFullYear() + 10) {
        const result = `${year}-01-01`
        console.log(`Converted year ${cleanDate} to ${result}`)
        return result
      }
    }

    // If it's already in YYYY-MM-DD format, validate it
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      const date = new Date(cleanDate + "T00:00:00.000Z")
      if (!isNaN(date.getTime())) {
        console.log(`Date ${cleanDate} is valid`)
        return cleanDate
      }
    }

    // Try to parse as a regular date
    const date = new Date(cleanDate)
    if (!isNaN(date.getTime())) {
      const result = date.toISOString().split("T")[0]
      console.log(`Converted ${cleanDate} to ${result}`)
      return result
    }

    console.error(`Could not parse date: ${cleanDate}`)
    return null
  } catch (error) {
    console.error(`Error parsing date ${dateString}:`, error)
    return null
  }
}

export async function submitApplication(formData: FormData) {
  try {
    const supabase = getSupabaseAdmin()

    // Parse form data with detailed logging
    console.log("=== Starting application submission ===")

    const personalDataRaw = formData.get("personalInfo") as string
    console.log("Raw personal data:", personalDataRaw)

    const personalData = JSON.parse(personalDataRaw) as PersonalInfo
    console.log("Parsed personal data:", personalData)

    const educationData = JSON.parse(formData.get("education") as string) as Education[]
    console.log("Education data:", educationData)

    const employmentData = JSON.parse(formData.get("employment") as string) as Employment[]
    console.log("Employment data:", employmentData)

    const referencesData = JSON.parse(formData.get("references") as string) as CharacterReference[]
    const position = formData.get("position") as string

    // Generate IDs
    const personId = uuidv4()
    const applicantId = uuidv4()

    // Validate required fields
    if (!personalData.name || !personalData.sex || !personalData.civilStatus) {
      throw new Error("Missing required personal information")
    }

    // Ensure civil status is one of the allowed values
    const allowedCivilStatus = ["Single", "Married", "Widowed", "Other"]
    if (!allowedCivilStatus.includes(personalData.civilStatus)) {
      throw new Error(`Invalid civil status: ${personalData.civilStatus}`)
    }

    // Ensure sex is one of the allowed values
    const allowedSex = ["Male", "Female", "Other"]
    if (!allowedSex.includes(personalData.sex)) {
      throw new Error(`Invalid sex: ${personalData.sex}`)
    }

    // Format birth date safely
    console.log("Processing birth date:", personalData.birthdate)
    const formattedBirthDate = formatDateForDB(personalData.birthdate)
    console.log("Formatted birth date:", formattedBirthDate)

    if (!formattedBirthDate) {
      throw new Error(`Invalid birth date provided: ${personalData.birthdate}`)
    }

    // Prepare the profile data
    const profileData = {
      person_id: personId,
      applicant_id: applicantId,
      name: personalData.name.trim(),
      sex: personalData.sex,
      city_address: personalData.cityAddress?.trim() || "",
      residential_address: personalData.residentialAddress?.trim() || "",
      birth_date: formattedBirthDate,
      birth_place: personalData.birthPlace?.trim() || "",
      civil_status: personalData.civilStatus,
      citizenship: personalData.citizenship?.trim() || "",
      height: personalData.height ? Number.parseFloat(personalData.height) : null,
      weight: personalData.weight ? Number.parseFloat(personalData.weight) : null,
      religion: personalData.religion?.trim() || null,
      cellphone_number: personalData.contactNumber?.trim() || "",
      email: personalData.email?.trim() || null,
      father_name: personalData.fatherName?.trim() || "",
      mother_name: personalData.motherName?.trim() || "",
      emergency_contact_name: personalData.emergencyPerson?.trim() || null,
      emergency_contact_number: personalData.emergencyNumber?.trim() || null,
      languages: personalData.languages || [],
      skills: personalData.skills || [],
      is_pwd: personalData.isPwd || false,
      disability_details: personalData.disabilityDetails?.trim() || null,
      is_indigenous: personalData.isIndigenous || false,
      indigenous_details: personalData.indigenousDetails?.trim() || null,
    }

    console.log("Profile data to insert:", profileData)

    // Insert personal profile
    const { error: profileError } = await supabase.from("personal_profiles").insert(profileData)

    if (profileError) {
      console.error("Profile insertion error:", profileError)
      throw new Error(`Profile error: ${profileError.message}`)
    }

    console.log("Profile inserted successfully")

    // Insert education records
    for (let i = 0; i < educationData.length; i++) {
      const edu = educationData[i]
      console.log(`Processing education record ${i + 1}:`, edu)

      const educId = uuidv4()

      // Format graduation year safely
      const formattedGradYear = formatDateForDB(edu.yearGraduated)
      console.log(`Formatted graduation year for ${edu.school}:`, formattedGradYear)

      if (!formattedGradYear) {
        console.warn(`Skipping education record with invalid year: ${edu.yearGraduated}`)
        continue
      }

      const educationRecord = {
        educ_id: educId,
        person_id: personId,
        education_level: edu.level?.trim() || "",
        school: edu.school?.trim() || "",
        year_graduated: formattedGradYear,
      }

      console.log("Education record to insert:", educationRecord)

      const { error: educError } = await supabase.from("education").insert(educationRecord)

      if (educError) {
        console.error("Education insertion error:", educError)
        throw new Error(`Education error: ${educError.message}`)
      }
    }

    console.log("Education records inserted successfully")

    // Insert character references and employment records
    for (let i = 0; i < employmentData.length; i++) {
      const emp = employmentData[i]
      console.log(`Processing employment record ${i + 1}:`, emp)

      const employmentId = uuidv4()

      // Format employment dates safely
      const formattedStartDate = formatDateForDB(emp.startDate)
      const formattedEndDate = emp.endDate ? formatDateForDB(emp.endDate) : null

      console.log(`Employment dates - Start: ${formattedStartDate}, End: ${formattedEndDate}`)

      if (!formattedStartDate) {
        console.warn(`Skipping employment record with invalid start date: ${emp.startDate}`)
        continue
      }

      // Find related references
      const relatedRefs = referencesData.filter((ref) => ref.relatedEmploymentId === emp.id)
      let characterReferenceId = null

      // Insert references if any
      if (relatedRefs.length > 0) {
        const ref = relatedRefs[0]
        characterReferenceId = uuidv4()

        const referenceRecord = {
          character_reference_id: characterReferenceId,
          reference_name: ref.name?.trim() || "",
          reference_occupation: ref.occupation?.trim() || "",
          reference_company: ref.company?.trim() || "",
        }

        console.log("Reference record to insert:", referenceRecord)

        const { error: refError } = await supabase.from("character_references").insert(referenceRecord)

        if (refError) {
          console.error("Reference insertion error:", refError)
          throw new Error(`Reference error: ${refError.message}`)
        }
      }

      // Insert employment
      const employmentRecord = {
        employment_id: employmentId,
        person_id: personId,
        character_reference_id: characterReferenceId,
        position: emp.position?.trim() || "",
        company: emp.company?.trim() || "",
        occupation_start: formattedStartDate,
        occupation_end: formattedEndDate,
      }

      console.log("Employment record to insert:", employmentRecord)

      const { error: empError } = await supabase.from("employment").insert(employmentRecord)

      if (empError) {
        console.error("Employment insertion error:", empError)
        throw new Error(`Employment error: ${empError.message}`)
      }
    }

    console.log("Employment records inserted successfully")

    // Handle file uploads
    const resumeFile = formData.get("resume") as File
    const coverLetterFile = formData.get("coverLetter") as File
    const supportingMaterialsFile = formData.get("supportingMaterials") as File

    let resumeUrl = null
    let coverLetterUrl = null
    let supportingMaterialsUrl = null

    // Use the applications bucket we created
    const bucketName = "applications"

    if (resumeFile && resumeFile.size > 0) {
      console.log("Uploading resume file:", resumeFile.name)
      const { data: resumeData, error: resumeError } = await supabase.storage
        .from(bucketName)
        .upload(`${personId}/resume-${resumeFile.name}`, resumeFile)

      if (resumeError) {
        console.error("Resume upload error:", resumeError)
        throw new Error(`Resume upload error: ${resumeError.message}`)
      }
      resumeUrl = resumeData?.path
      console.log("Resume uploaded successfully:", resumeUrl)
    }

    if (coverLetterFile && coverLetterFile.size > 0) {
      console.log("Uploading cover letter file:", coverLetterFile.name)
      const { data: coverData, error: coverError } = await supabase.storage
        .from(bucketName)
        .upload(`${personId}/cover-${coverLetterFile.name}`, coverLetterFile)

      if (coverError) {
        console.error("Cover letter upload error:", coverError)
        throw new Error(`Cover letter upload error: ${coverError.message}`)
      }
      coverLetterUrl = coverData?.path
      console.log("Cover letter uploaded successfully:", coverLetterUrl)
    }

    if (supportingMaterialsFile && supportingMaterialsFile.size > 0) {
      console.log("Uploading supporting materials file:", supportingMaterialsFile.name)
      const { data: supportingData, error: supportingError } = await supabase.storage
        .from(bucketName)
        .upload(`${personId}/supporting-${supportingMaterialsFile.name}`, supportingMaterialsFile)

      if (supportingError) {
        console.error("Supporting materials upload error:", supportingError)
        throw new Error(`Supporting materials upload error: ${supportingError.message}`)
      }
      supportingMaterialsUrl = supportingData?.path
      console.log("Supporting materials uploaded successfully:", supportingMaterialsUrl)
    }

    // Create application record
    const appId = uuidv4()
    const currentDate = new Date().toISOString().split("T")[0]

    const applicationRecord = {
      app_id: appId,
      person_id: personId,
      submission_date: currentDate,
      status: "Submitted",
      resume_url: resumeUrl,
      cover_letter_url: coverLetterUrl,
      supporting_materials_url: supportingMaterialsUrl,
    }

    console.log("Application record to insert:", applicationRecord)

    const { error: appError } = await supabase.from("applications").insert(applicationRecord)

    if (appError) {
      console.error("Application insertion error:", appError)
      throw new Error(`Application error: ${appError.message}`)
    }

    console.log("Application submitted successfully with ID:", appId)
    return { success: true, applicationId: appId }
  } catch (error) {
    console.error("Application submission error:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getApplicationStatus(applicationId: string, surname: string) {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("applications")
      .select(`
        app_id,
        submission_date,
        status,
        person_id,
        personal_profiles(
          name, 
          cellphone_number, 
          email, 
          city_address,
          residential_address,
          birth_date,
          birth_place,
          sex,
          civil_status,
          citizenship,
          height,
          weight,
          religion,
          father_name,
          mother_name,
          emergency_contact_name,
          emergency_contact_number,
          languages,
          skills,
          is_pwd,
          disability_details,
          is_indigenous,
          indigenous_details
        )
      `)
      .eq("app_id", applicationId)
      .single()

    if (error) throw error

    // Get all education and employment records for this person
    const personId = data.person_id
    const { data: educationData, error: educError } = await supabase
      .from("education")
      .select("*")
      .eq("person_id", personId)

    if (educError) throw educError

    const { data: employmentData, error: empError } = await supabase
      .from("employment")
      .select(`
        employment_id,
        position,
        company,
        occupation_start,
        occupation_end,
        character_references(
          reference_name,
          reference_occupation,
          reference_company
        )
      `)
      .eq("person_id", personId)

    if (empError) throw empError

    // Verify surname matches (case-insensitive)
    const applicantName = data.personal_profiles?.name || ""
    const nameParts = applicantName.toLowerCase().split(" ")
    const providedSurname = surname.toLowerCase().trim()

    // Check if the provided surname matches any part of the name (typically the last name)
    const surnameMatches =
      nameParts.some((part) => part === providedSurname) || applicantName.toLowerCase().includes(providedSurname)

    if (!surnameMatches) {
      return { success: false, error: "Surname does not match our records" }
    }

    // Combine the data for response
    const responseData = {
      ...data,
      education: educationData,
      employment: employmentData,
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("Error fetching application status:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateApplicationInfo(personId: string, updateData: any) {
  try {
    const supabase = getSupabaseAdmin()

    // Update personal profile
    const { error: profileError } = await supabase
      .from("personal_profiles")
      .update({
        name: updateData.personal.name,
        email: updateData.personal.email,
        cellphone_number: updateData.personal.cellphone_number,
        city_address: updateData.personal.city_address,
        residential_address: updateData.personal.residential_address,
        birth_date: updateData.personal.birth_date,
        birth_place: updateData.personal.birth_place,
        sex: updateData.personal.sex,
        civil_status: updateData.personal.civil_status,
        citizenship: updateData.personal.citizenship,
        height: updateData.personal.height,
        weight: updateData.personal.weight,
        religion: updateData.personal.religion,
        father_name: updateData.personal.father_name,
        mother_name: updateData.personal.mother_name,
        emergency_contact_name: updateData.personal.emergency_contact_name,
        emergency_contact_number: updateData.personal.emergency_contact_number,
        languages: updateData.personal.languages,
        skills: updateData.personal.skills,
        // Add disclosure fields
        is_pwd: updateData.personal.isPwd,
        disability_details: updateData.personal.disabilityDetails,
        is_indigenous: updateData.personal.isIndigenous,
        indigenous_details: updateData.personal.indigenousDetails,
      })
      .eq("person_id", personId)

    if (profileError) throw profileError

    // Update education records
    if (updateData.education) {
      // Delete existing education records
      await supabase.from("education").delete().eq("person_id", personId)

      // Insert new education records
      for (const edu of updateData.education) {
        const educId = edu.educ_id.startsWith("temp_") ? uuidv4() : edu.educ_id
        const formattedGradYear = formatDateForDB(edu.year_graduated)

        if (formattedGradYear) {
          const { error: educError } = await supabase.from("education").insert({
            educ_id: educId,
            person_id: personId,
            education_level: edu.education_level,
            school: edu.school,
            year_graduated: formattedGradYear,
          })

          if (educError) throw educError
        }
      }
    }

    // Update employment records
    if (updateData.employment) {
      // Get existing employment records to handle references
      const { data: existingEmployment } = await supabase
        .from("employment")
        .select("employment_id, character_reference_id")
        .eq("person_id", personId)

      // Delete existing character references
      if (existingEmployment) {
        for (const emp of existingEmployment) {
          if (emp.character_reference_id) {
            await supabase
              .from("character_references")
              .delete()
              .eq("character_reference_id", emp.character_reference_id)
          }
        }
      }

      // Delete existing employment records
      await supabase.from("employment").delete().eq("person_id", personId)

      // Insert new employment records
      for (const emp of updateData.employment) {
        const employmentId = emp.employment_id.startsWith("temp_") ? uuidv4() : emp.employment_id
        let characterReferenceId = null

        const formattedStartDate = formatDateForDB(emp.occupation_start)
        const formattedEndDate = emp.occupation_end ? formatDateForDB(emp.occupation_end) : null

        if (!formattedStartDate) continue

        // Insert character reference if provided
        if (emp.character_references && emp.character_references.reference_name) {
          characterReferenceId = uuidv4()
          const { error: refError } = await supabase.from("character_references").insert({
            character_reference_id: characterReferenceId,
            reference_name: emp.character_references.reference_name,
            reference_occupation: emp.character_references.reference_occupation,
            reference_company: emp.character_references.reference_company,
          })

          if (refError) throw refError
        }

        // Insert employment record
        const { error: empError } = await supabase.from("employment").insert({
          employment_id: employmentId,
          person_id: personId,
          character_reference_id: characterReferenceId,
          position: emp.position,
          company: emp.company,
          occupation_start: formattedStartDate,
          occupation_end: formattedEndDate,
        })

        if (empError) throw empError
      }
    }

    // Get the updated application data to return
    const { data: appData, error: appError } = await supabase
      .from("applications")
      .select(`
        app_id,
        submission_date,
        status,
        person_id,
        personal_profiles(
          name, 
          cellphone_number, 
          email, 
          city_address,
          residential_address,
          birth_date,
          birth_place,
          sex,
          civil_status,
          citizenship,
          height,
          weight,
          religion,
          father_name,
          mother_name,
          emergency_contact_name,
          emergency_contact_number,
          is_pwd,
          disability_details,
          is_indigenous,
          indigenous_details,
          languages,
          skills
        )
      `)
      .eq("person_id", personId)
      .single()

    if (appError) throw appError

    // Get education and employment data separately
    const { data: educationData, error: educDataError } = await supabase
      .from("education")
      .select("*")
      .eq("person_id", personId)

    if (educDataError) throw educDataError

    const { data: employmentData, error: empDataError } = await supabase
      .from("employment")
      .select(`
        employment_id,
        position,
        company,
        occupation_start,
        occupation_end,
        character_references(
          reference_name,
          reference_occupation,
          reference_company
        )
      `)
      .eq("person_id", personId)

    if (empDataError) throw empDataError

    // Combine the data for response
    const responseData = {
      ...appData,
      education: educationData,
      employment: employmentData,
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("Error updating application info:", error)
    return { success: false, error: (error as Error).message }
  }
}
