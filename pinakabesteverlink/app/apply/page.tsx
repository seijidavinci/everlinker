"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { EducationForm } from "@/components/education-form"
import { EmploymentForm } from "@/components/employment-form"
import { CharacterReferenceForm } from "@/components/character-reference-form"
import { ReviewForm } from "@/components/review-form"
import { ApplicationMaterials } from "@/components/application-materials"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitApplication } from "../actions/application-actions"

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const position = searchParams.get("position") || ""

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      sex: "",
      cityAddress: "",
      birthdate: "",
      birthPlace: "",
      residentialAddress: "",
      civilStatus: "",
      citizenship: "",
      height: "",
      weight: "",
      religion: "",
      contactNumber: "",
      email: "",
      fatherName: "",
      motherName: "",
      emergencyPerson: "",
      emergencyNumber: "",
      languages: [],
      skills: [],
      // Add disclosure fields
      isPwd: false,
      disabilityDetails: "",
      isIndigenous: false,
      indigenousDetails: "",
    },
    education: [],
    employment: [],
    characterReferences: [],
    position: position,
    submissionDate: "",
    status: "Submitted",
    files: {
      resume: null,
      coverLetter: null,
      supportingMaterials: null,
    },
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasEmployment, setHasEmployment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  const updateFormData = (section: string, data: any) => {
    console.log(`Updating ${section} with:`, data)
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const validateDate = (dateString: string): boolean => {
    if (!dateString || dateString.trim() === "") return false

    // Check if it's just a year (4 digits)
    if (/^\d{4}$/.test(dateString.trim())) {
      const year = Number.parseInt(dateString.trim())
      return year >= 1900 && year <= new Date().getFullYear() + 10
    }

    // Check if it's a valid date
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  const validatePersonalInfo = () => {
    const requiredFields = [
      "name",
      "sex",
      "cityAddress",
      "birthdate",
      "birthPlace",
      "residentialAddress",
      "civilStatus",
      "citizenship",
      "height",
      "weight",
      "contactNumber",
      "fatherName",
      "motherName",
    ]

    const newErrors: Record<string, string> = {}

    requiredFields.forEach((field) => {
      if (!formData.personal[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Validate birthdate
    if (formData.personal.birthdate && !validateDate(formData.personal.birthdate)) {
      newErrors.birthdate = "Please enter a valid birth date"
    }

    // Validate height and weight are positive numbers
    if (
      formData.personal.height &&
      (isNaN(Number(formData.personal.height)) || Number(formData.personal.height) <= 0)
    ) {
      newErrors.height = "Height must be a positive number"
    }

    if (
      formData.personal.weight &&
      (isNaN(Number(formData.personal.weight)) || Number(formData.personal.weight) <= 0)
    ) {
      newErrors.weight = "Weight must be a positive number"
    }

    // Validate age (must be at least 18)
    if (formData.personal.birthdate && validateDate(formData.personal.birthdate)) {
      const birthDate = new Date(formData.personal.birthdate)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      if (age < 18) {
        newErrors.birthdate = "You must be at least 18 years old to apply"
      }
    }

    // Validate email format if provided
    if (formData.personal.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.personal.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateFiles = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.files.resume) {
      newErrors.resume = "Resume is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1) {
      const isValid = validatePersonalInfo()
      if (!isValid) {
        // Scroll to the first error
        const firstErrorField = document.querySelector(".border-red-500")
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        return
      }
    }

    if (currentStep === 5) {
      const isValid = validateFiles()
      if (!isValid) {
        // Show error message
        return
      }
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
      // Reset errors when moving to next step
      setErrors({})
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Reset errors when moving to previous step
      setErrors({})
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      console.log("=== CLIENT SIDE SUBMISSION ===")
      console.log("Form data before submission:", formData)

      // Validate all dates before submission
      if (formData.personal.birthdate && !validateDate(formData.personal.birthdate)) {
        throw new Error(`Invalid birth date format: ${formData.personal.birthdate}`)
      }

      // Validate education dates
      for (const edu of formData.education) {
        if (edu.yearGraduated && !validateDate(edu.yearGraduated)) {
          throw new Error(`Invalid graduation year: ${edu.yearGraduated}`)
        }
      }

      // Validate employment dates
      for (const emp of formData.employment) {
        if (emp.startDate && !validateDate(emp.startDate)) {
          throw new Error(`Invalid employment start date: ${emp.startDate}`)
        }
        if (emp.endDate && !validateDate(emp.endDate)) {
          throw new Error(`Invalid employment end date: ${emp.endDate}`)
        }
      }

      // Create FormData object for submission
      const submitFormData = new FormData()

      // Add all the form data as JSON strings
      const personalInfoJson = JSON.stringify(formData.personal)
      const educationJson = JSON.stringify(formData.education)
      const employmentJson = JSON.stringify(formData.employment)
      const referencesJson = JSON.stringify(formData.characterReferences)

      console.log("Personal info JSON:", personalInfoJson)
      console.log("Education JSON:", educationJson)
      console.log("Employment JSON:", employmentJson)
      console.log("References JSON:", referencesJson)

      submitFormData.append("personalInfo", personalInfoJson)
      submitFormData.append("education", educationJson)
      submitFormData.append("employment", employmentJson)
      submitFormData.append("references", referencesJson)
      submitFormData.append("position", formData.position)

      // Add files
      if (formData.files.resume) {
        submitFormData.append("resume", formData.files.resume)
        console.log("Resume file added:", formData.files.resume.name)
      }

      if (formData.files.coverLetter) {
        submitFormData.append("coverLetter", formData.files.coverLetter)
        console.log("Cover letter file added:", formData.files.coverLetter.name)
      }

      if (formData.files.supportingMaterials) {
        submitFormData.append("supportingMaterials", formData.files.supportingMaterials)
        console.log("Supporting materials file added:", formData.files.supportingMaterials.name)
      }

      console.log("Submitting to server action...")

      // Submit to server action
      const result = await submitApplication(submitFormData)

      console.log("Server response:", result)

      if (result.success) {
        setApplicationId(result.applicationId)
        // Move to confirmation step
        setCurrentStep(7)
      } else {
        throw new Error(result.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("Failed to submit application:", error)
      alert(`Error submitting application: ${(error as Error).message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFilesChange = (files: any) => {
    console.log("Files changed:", files)
    updateFormData("files", files)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {position ? `Apply for ${position}` : "Job Application"}
          </h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Complete the application form to join EverLink Telecom Inc.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Application Guidelines</AlertTitle>
          <AlertDescription>
            Fields marked with an asterisk (*) are required. Educational background and employment history are optional.
            Character references are only required if you provide employment history.
          </AlertDescription>
        </Alert>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Validation Error</AlertTitle>
            <AlertDescription>Please fill in all required fields before proceeding.</AlertDescription>
          </Alert>
        )}

        {/* Application Progress */}
        <div className="mb-8">
          <div className="flex justify-between">
            {["Personal Information", "Education", "Employment", "References", "Materials", "Review"].map(
              (step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${index + 1 === currentStep ? "text-teal-600" : "text-gray-400"}`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                      index + 1 === currentStep
                        ? "border-teal-600 bg-teal-100"
                        : index + 1 < currentStep
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-gray-200 bg-gray-100"
                    }`}
                  >
                    {index + 1 < currentStep ? <CheckCircle2 className="h-4 w-4" /> : <span>{index + 1}</span>}
                  </div>
                  <span className="mt-2 text-xs hidden md:block">{step}</span>
                </div>
              ),
            )}
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-2 rounded-full bg-teal-600 transition-all"
              style={{ width: `${(currentStep - 1) * 20}%` }}
            ></div>
          </div>
        </div>

        {/* Application Form Steps */}
        <Card>
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please provide your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm
                  data={formData.personal}
                  updateData={(data) => updateFormData("personal", data)}
                  errors={errors}
                  setErrors={setErrors}
                />
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Educational Background</CardTitle>
                <CardDescription>Please provide your educational history (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <EducationForm data={formData.education} updateData={(data) => updateFormData("education", data)} />
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle>Employment History</CardTitle>
                <CardDescription>Please provide your work experience (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                <EmploymentForm
                  data={formData.employment}
                  updateData={(data) => {
                    updateFormData("employment", data)
                    setHasEmployment(data.length > 0)
                  }}
                />
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle>Character References</CardTitle>
                <CardDescription>
                  {hasEmployment
                    ? "Please provide character references from your previous employment"
                    : "Character references are only required if you have employment history"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasEmployment ? (
                  <CharacterReferenceForm
                    data={formData.characterReferences}
                    updateData={(data) => updateFormData("characterReferences", data)}
                    employmentData={formData.employment}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Info className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No employment history provided. You can skip this step.
                    </p>
                  </div>
                )}
              </CardContent>
            </>
          )}

          {currentStep === 5 && (
            <>
              <CardHeader>
                <CardTitle>Application Materials</CardTitle>
                <CardDescription>Upload your resume and other supporting documents</CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationMaterials onFilesChange={handleFilesChange} />
              </CardContent>
            </>
          )}

          {currentStep === 6 && (
            <>
              <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <CardDescription>Please review your information before submitting</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewForm formData={formData} />
              </CardContent>
            </>
          )}

          {currentStep === 7 && (
            <>
              <CardHeader>
                <CardTitle>Application Submitted</CardTitle>
                <CardDescription>Thank you for applying to EverLink Telecom Inc.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">Application Received</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Your application has been successfully submitted. You can check the status of your application using
                  your application ID.
                </p>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Application ID</p>
                  <p className="text-lg font-medium">
                    {applicationId ||
                      "APP-" +
                        Math.floor(Math.random() * 10000)
                          .toString()
                          .padStart(4, "0")}
                  </p>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            {currentStep < 7 && (
              <>
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < 6 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </>
            )}
            {currentStep === 7 && (
              <Button className="w-full" onClick={() => router.push("/status")}>
                Check Application Status
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
