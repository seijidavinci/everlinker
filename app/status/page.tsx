"use client"

import { useState } from "react"
import { Search, AlertCircle, CheckCircle2, Clock, Info, Edit, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getApplicationStatus } from "../actions/application-actions"
import { UpdateApplicationForm } from "@/components/update-application-form"

export default function StatusPage() {
  const [applicationId, setApplicationId] = useState("")
  const [surname, setSurname] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applicationData, setApplicationData] = useState<any>(null)
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError("Please enter an application ID")
      return
    }

    if (!surname.trim()) {
      setError("Please enter your surname")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const result = await getApplicationStatus(applicationId.trim(), surname.trim())

      if (result.success && result.data) {
        setApplicationData(result.data)
      } else {
        setError(result.error || "Application not found or surname doesn't match")
        setApplicationData(null)
      }
    } catch (error) {
      console.error("Error fetching application:", error)
      setError("Failed to fetch application status")
      setApplicationData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateSuccess = (updatedData: any) => {
    setApplicationData(updatedData)
    setShowUpdateForm(false)
  }

  const handleUpdateCancel = () => {
    setShowUpdateForm(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "Under Review":
      case "Awaiting Evaluation":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "Shortlisted":
      case "Interview Scheduled":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Rejected":
      case "Withdrawn":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "Offer":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
      case "Under Review":
      case "Awaiting Evaluation":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "Shortlisted":
      case "Interview Scheduled":
        return "text-green-500 bg-green-50 dark:bg-green-900/20"
      case "Rejected":
      case "Withdrawn":
        return "text-red-500 bg-red-50 dark:bg-red-900/20"
      case "Offer":
        return "text-green-500 bg-green-50 dark:bg-green-900/20"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800"
    }
  }

  // If showing update form, render it as a full-screen overlay
  if (showUpdateForm) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold">Update Application Information</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your personal information and application details
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleUpdateCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <UpdateApplicationForm
              applicationData={applicationData}
              onSuccess={handleUpdateSuccess}
              onCancel={handleUpdateCancel}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Application Status</h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Check the status of your job application
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Track Your Application</CardTitle>
            <CardDescription>Enter your application ID and surname to check the status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="applicationId" className="block text-sm font-medium mb-2">
                    Application ID *
                  </label>
                  <Input
                    id="applicationId"
                    placeholder="Enter application ID (e.g., APP-1234)"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium mb-2">
                    Surname *
                  </label>
                  <Input
                    id="surname"
                    placeholder="Enter your surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSearch} disabled={isLoading} className="w-full">
                {isLoading ? "Searching..." : "Search Application"}
                {!isLoading && <Search className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {applicationData && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{applicationData.personal_profiles?.name || "Applicant"}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Application ID: {applicationData.app_id}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(
                          applicationData.status,
                        )}`}
                      >
                        {getStatusIcon(applicationData.status)}
                        <span>{applicationData.status}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log("Update button clicked") // Debug log
                          setShowUpdateForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Update Info
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Submission Date</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(applicationData.submission_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact Number</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {applicationData.personal_profiles?.cellphone_number || "Not available"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {applicationData.personal_profiles?.email || "Not available"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {applicationData.personal_profiles?.city_address || "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Application Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Application Submitted</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(applicationData.submission_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {applicationData.status !== "Submitted" && (
                        <div className="flex items-start space-x-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                            <CheckCircle2 className="h-3 w-3" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Application {applicationData.status}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Alert className="bg-gray-50 dark:bg-gray-800">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Our HR team will contact you if your application is shortlisted for the next steps. You can update
                    your information anytime using the "Update Info" button above.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              If you have any questions, please contact our HR department at hr@everlink.com
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
