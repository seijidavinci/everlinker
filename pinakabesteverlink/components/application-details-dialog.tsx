"use client"

import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ApplicationDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  applicationData: any
}

export function ApplicationDetailsDialog({ isOpen, onClose, applicationData }: ApplicationDetailsDialogProps) {
  if (!applicationData) return null

  const { application, education, employment } = applicationData

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Submitted
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            Under Review
          </Badge>
        )
      case "Shortlisted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Shortlisted
          </Badge>
        )
      case "Interview Scheduled":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Interview
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Rejected
          </Badge>
        )
      case "Offer":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
            Offer
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Application Details - {application.personal_profiles?.name}
            {getStatusBadge(application.status)}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Application Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Application Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Application ID:</span> {application.app_id}
                </div>
                <div>
                  <span className="font-medium">Submission Date:</span>{" "}
                  {format(new Date(application.submission_date), "MMM d, yyyy")}
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Full Name:</span> {application.personal_profiles?.name || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Sex:</span> {application.personal_profiles?.sex || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Birth Date:</span>{" "}
                  {application.personal_profiles?.birth_date
                    ? format(new Date(application.personal_profiles.birth_date), "MMM d, yyyy")
                    : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Birth Place:</span>{" "}
                  {application.personal_profiles?.birth_place || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Civil Status:</span>{" "}
                  {application.personal_profiles?.civil_status || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Citizenship:</span>{" "}
                  {application.personal_profiles?.citizenship || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Height:</span>{" "}
                  {application.personal_profiles?.height ? `${application.personal_profiles.height} cm` : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Weight:</span>{" "}
                  {application.personal_profiles?.weight ? `${application.personal_profiles.weight} kg` : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Religion:</span> {application.personal_profiles?.religion || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {application.personal_profiles?.cellphone_number || "N/A"}
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium">Email:</span> {application.personal_profiles?.email || "N/A"}
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium">City Address:</span>{" "}
                  {application.personal_profiles?.city_address || "N/A"}
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium">Residential Address:</span>{" "}
                  {application.personal_profiles?.residential_address || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Father's Name:</span>{" "}
                  {application.personal_profiles?.father_name || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Mother's Name:</span>{" "}
                  {application.personal_profiles?.mother_name || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Emergency Contact:</span>{" "}
                  {application.personal_profiles?.emergency_contact_name || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Emergency Phone:</span>{" "}
                  {application.personal_profiles?.emergency_contact_number || "N/A"}
                </div>
              </div>

              {/* Disclosure Information */}
              {(application.personal_profiles?.is_pwd || application.personal_profiles?.is_indigenous) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Disclosure Information</h4>
                  {application.personal_profiles?.is_pwd && (
                    <div className="mb-2">
                      <span className="font-medium">Person with Disability:</span> Yes
                      {application.personal_profiles?.disability_details && (
                        <div className="mt-1 text-sm text-gray-600">
                          <span className="font-medium">Details:</span>{" "}
                          {application.personal_profiles.disability_details}
                        </div>
                      )}
                    </div>
                  )}
                  {application.personal_profiles?.is_indigenous && (
                    <div>
                      <span className="font-medium">Indigenous People:</span> Yes
                      {application.personal_profiles?.indigenous_details && (
                        <div className="mt-1 text-sm text-gray-600">
                          <span className="font-medium">Community/Tribe:</span>{" "}
                          {application.personal_profiles.indigenous_details}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Educational Background</h3>
              {education && education.length > 0 ? (
                <div className="space-y-3">
                  {education.map((edu: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Level:</span> {edu.education_level || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">School:</span> {edu.school || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">Year Graduated:</span> {edu.year_graduated || "N/A"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No educational background provided</p>
              )}
            </div>

            <Separator />

            {/* Employment */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Employment History</h3>
              {employment && employment.length > 0 ? (
                <div className="space-y-4">
                  {employment.map((emp: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="font-medium">Position:</span> {emp.position || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">Company:</span> {emp.company || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">Start Date:</span>{" "}
                          {emp.occupation_start ? format(new Date(emp.occupation_start), "MMM yyyy") : "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">End Date:</span>{" "}
                          {emp.occupation_end ? format(new Date(emp.occupation_end), "MMM yyyy") : "Present"}
                        </div>
                      </div>

                      {/* Character Reference */}
                      {emp.character_references && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <h5 className="font-medium text-sm mb-2">Character Reference</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Name:</span>{" "}
                              {emp.character_references.reference_name || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Occupation:</span>{" "}
                              {emp.character_references.reference_occupation || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Company:</span>{" "}
                              {emp.character_references.reference_company || "N/A"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No employment history provided</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
