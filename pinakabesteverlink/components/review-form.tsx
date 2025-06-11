import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ReviewFormProps {
  formData: any
}

export function ReviewForm({ formData }: ReviewFormProps) {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="personal" className="w-full">
        <AccordionItem value="personal">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p>{formData.personal.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Sex</p>
                  <p>{formData.personal.sex || "Not provided"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">City Address</p>
                <p>{formData.personal.cityAddress || "Not provided"}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Residential Address</p>
                <p>{formData.personal.residentialAddress || "Not provided"}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Birthdate</p>
                  <p>{formData.personal.birthdate || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Birth Place</p>
                  <p>{formData.personal.birthPlace || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Civil Status</p>
                  <p>{formData.personal.civilStatus || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Citizenship</p>
                  <p>{formData.personal.citizenship || "Not provided"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Height</p>
                  <p>{formData.personal.height ? `${formData.personal.height} cm` : "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p>{formData.personal.weight ? `${formData.personal.weight} kg` : "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Religion</p>
                  <p>{formData.personal.religion || "Not provided"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Contact Number</p>
                <p>{formData.personal.contactNumber || "Not provided"}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Father's Name</p>
                  <p>{formData.personal.fatherName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mother's Name</p>
                  <p>{formData.personal.motherName || "Not provided"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Emergency Contact Person</p>
                  <p>{formData.personal.emergencyPerson || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Emergency Contact Number</p>
                  <p>{formData.personal.emergencyNumber || "Not provided"}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Educational Background</AccordionTrigger>
          <AccordionContent>
            {formData.education && formData.education.length > 0 ? (
              <div className="space-y-4">
                {formData.education.map((edu: any, index: number) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <p className="font-medium">{edu.level}</p>
                    <p className="text-sm text-gray-500">School: {edu.school}</p>
                    <p className="text-sm text-gray-500">Year Graduated: {edu.yearGraduated}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No educational background provided</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="employment">
          <AccordionTrigger>Employment History</AccordionTrigger>
          <AccordionContent>
            {formData.employment && formData.employment.length > 0 ? (
              <div className="space-y-4">
                {formData.employment.map((emp: any, index: number) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <p className="font-medium">{emp.position}</p>
                    <p className="text-sm text-gray-500">Company: {emp.company}</p>
                    {emp.location && <p className="text-sm text-gray-500">Location: {emp.location}</p>}
                    <p className="text-sm text-gray-500">
                      Period: {emp.startDate} - {emp.endDate || "Present"}
                    </p>

                    {emp.responsibilities && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-500">Responsibilities/Projects:</p>
                        <p className="text-sm whitespace-pre-line">{emp.responsibilities}</p>
                      </div>
                    )}

                    {emp.achievements && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-500">Achievements:</p>
                        <p className="text-sm whitespace-pre-line">{emp.achievements}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No employment history provided</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="references">
          <AccordionTrigger>Character References</AccordionTrigger>
          <AccordionContent>
            {formData.characterReferences && formData.characterReferences.length > 0 ? (
              <div className="space-y-4">
                {formData.characterReferences.map((ref: any, index: number) => {
                  const relatedEmployment = formData.employment.find((emp: any) => emp.id === ref.relatedEmploymentId)
                  return (
                    <div key={index} className="border p-4 rounded-lg">
                      <p className="font-medium">{ref.name}</p>
                      <p className="text-sm text-gray-500">Occupation: {ref.occupation}</p>
                      <p className="text-sm text-gray-500">Company: {ref.company}</p>
                      {relatedEmployment && (
                        <p className="text-sm text-gray-500">
                          For Employment: {relatedEmployment.position} at {relatedEmployment.company}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500">No character references provided</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="application">
          <AccordionTrigger>Application Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Position Applied For</p>
                <p>{formData.position || "Not specified"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials">
          <AccordionTrigger>Application Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Resume/CV</p>
                <p>{formData.files?.resume ? formData.files.resume.name : "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cover Letter</p>
                <p>{formData.files?.coverLetter ? formData.files.coverLetter.name : "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Supporting Materials</p>
                <p>{formData.files?.supportingMaterials ? formData.files.supportingMaterials.name : "Not provided"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disclosure">
          <AccordionTrigger>Optional Disclosure Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Person with Disability (PWD)</p>
                <p>{formData.personal.isPwd ? "Yes" : "No"}</p>
                {formData.personal.isPwd && formData.personal.disabilityDetails && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-500">Disability Details</p>
                    <p className="text-sm whitespace-pre-line">{formData.personal.disabilityDetails}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Indigenous People (IP) Community</p>
                <p>{formData.personal.isIndigenous ? "Yes" : "No"}</p>
                {formData.personal.isIndigenous && formData.personal.indigenousDetails && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-500">Indigenous Community/Tribe</p>
                    <p className="text-sm">{formData.personal.indigenousDetails}</p>
                  </div>
                )}
              </div>

              {!formData.personal.isPwd && !formData.personal.isIndigenous && (
                <p className="text-gray-500 italic">No disclosure information provided</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
