"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, Plus, Trash2 } from "lucide-react"
import { updateApplicationInfo } from "@/app/actions/application-actions"
import { Checkbox } from "@/components/ui/checkbox"

interface UpdateApplicationFormProps {
  applicationData: any
  onSuccess: (updatedData: any) => void
  onCancel: () => void
}

interface Education {
  educ_id: string
  education_level: string
  school: string
  year_graduated: string
}

interface Employment {
  employment_id: string
  position: string
  company: string
  occupation_start: string
  occupation_end: string | null
  character_references?: {
    reference_name: string
    reference_occupation: string
    reference_company: string
  }
}

export function UpdateApplicationForm({ applicationData, onSuccess, onCancel }: UpdateApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cellphone_number: "",
    city_address: "",
    residential_address: "",
    birth_date: "",
    birth_place: "",
    sex: "",
    civil_status: "",
    citizenship: "",
    height: "",
    weight: "",
    religion: "",
    father_name: "",
    mother_name: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    is_pwd: false,
    indigenous_group: "",
    languages: [] as string[],
    skills: [] as string[],
    isPwd: false,
    disabilityDetails: "",
    isIndigenous: false,
    indigenousDetails: "",
  })

  const [education, setEducation] = useState<Education[]>([])
  const [employment, setEmployment] = useState<Employment[]>([])
  const [languagesInput, setLanguagesInput] = useState("")
  const [skillsInput, setSkillsInput] = useState("")

  useEffect(() => {
    if (applicationData?.personal_profiles) {
      const profile = applicationData.personal_profiles
      const newFormData = {
        name: profile.name || "",
        email: profile.email || "",
        cellphone_number: profile.cellphone_number || "",
        city_address: profile.city_address || "",
        residential_address: profile.residential_address || "",
        birth_date: profile.birth_date || "",
        birth_place: profile.birth_place || "",
        sex: profile.sex || "",
        civil_status: profile.civil_status || "",
        citizenship: profile.citizenship || "",
        height: profile.height?.toString() || "",
        weight: profile.weight?.toString() || "",
        religion: profile.religion || "",
        father_name: profile.father_name || "",
        mother_name: profile.mother_name || "",
        emergency_contact_name: profile.emergency_contact_name || "",
        emergency_contact_number: profile.emergency_contact_number || "",
        languages: profile.languages || [],
        skills: profile.skills || [],
        // Add disclosure fields
        isPwd: profile.is_pwd || false,
        disabilityDetails: profile.disability_details || "",
        isIndigenous: profile.is_indigenous || false,
        indigenousDetails: profile.indigenous_details || "",
      }
      setFormData(newFormData)
      setLanguagesInput((profile.languages || []).join(", "))
      setSkillsInput((profile.skills || []).join(", "))
    }

    // Load education data
    if (applicationData?.education) {
      setEducation(Array.isArray(applicationData.education) ? applicationData.education : [applicationData.education])
    }

    // Load employment data
    if (applicationData?.employment) {
      setEmployment(
        Array.isArray(applicationData.employment) ? applicationData.employment : [applicationData.employment],
      )
    }
  }, [applicationData])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addEducation = () => {
    const newEducation: Education = {
      educ_id: `temp_${Date.now()}`,
      education_level: "",
      school: "",
      year_graduated: "",
    }
    setEducation([...education, newEducation])
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
  }

  const addEmployment = () => {
    const newEmployment: Employment = {
      employment_id: `temp_${Date.now()}`,
      position: "",
      company: "",
      occupation_start: "",
      occupation_end: null,
      character_references: {
        reference_name: "",
        reference_occupation: "",
        reference_company: "",
      },
    }
    setEmployment([...employment, newEmployment])
  }

  const removeEmployment = (index: number) => {
    setEmployment(employment.filter((_, i) => i !== index))
  }

  const updateEmployment = (index: number, field: string, value: string) => {
    const updated = [...employment]
    if (field.startsWith("reference_")) {
      updated[index] = {
        ...updated[index],
        character_references: {
          ...updated[index].character_references,
          [field]: value,
        },
      }
    } else {
      updated[index] = { ...updated[index], [field]: value }
    }
    setEmployment(updated)
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Process languages and skills
      const languages = languagesInput
        .split(",")
        .map((lang) => lang.trim())
        .filter((lang) => lang)
      const skills = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill)

      const updateData = {
        personal: {
          ...formData,
          languages,
          skills,
          height: formData.height ? Number.parseFloat(formData.height) : null,
          weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        },
        education: education.map((edu) => ({
          ...edu,
          year_graduated: edu.year_graduated,
        })),
        employment: employment.map((emp) => ({
          ...emp,
          occupation_end: emp.occupation_end || null,
        })),
      }

      const result = await updateApplicationInfo(applicationData.person_id, updateData)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess(result.data)
        }, 1500)
      } else {
        setError(result.error || "Failed to update application")
      }
    } catch (error) {
      console.error("Error updating application:", error)
      setError("Failed to update application information")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Information Updated Successfully</h3>
        <p className="text-gray-500 dark:text-gray-400">Your application information has been updated.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sex">Sex *</Label>
                  <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="civil_status">Civil Status *</Label>
                  <Select
                    value={formData.civil_status}
                    onValueChange={(value) => handleInputChange("civil_status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select civil status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birth_date">Birth Date *</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleInputChange("birth_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="birth_place">Birth Place *</Label>
                  <Input
                    id="birth_place"
                    value={formData.birth_place}
                    onChange={(e) => handleInputChange("birth_place", e.target.value)}
                    placeholder="Enter your birth place"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="Height in cm"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="Weight in kg"
                  />
                </div>
                <div>
                  <Label htmlFor="citizenship">Citizenship *</Label>
                  <Input
                    id="citizenship"
                    value={formData.citizenship}
                    onChange={(e) => handleInputChange("citizenship", e.target.value)}
                    placeholder="Enter your citizenship"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) => handleInputChange("religion", e.target.value)}
                  placeholder="Enter your religion (optional)"
                />
              </div>

              <div>
                <Label htmlFor="indigenous_group">Indigenous Group</Label>
                <Input
                  id="indigenous_group"
                  value={formData.indigenous_group}
                  onChange={(e) => handleInputChange("indigenous_group", e.target.value)}
                  placeholder="Enter indigenous group (if applicable)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    value={languagesInput}
                    onChange={(e) => setLanguagesInput(e.target.value)}
                    placeholder="e.g., English, Filipino, Spanish"
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="e.g., Communication, Leadership, Computer Skills"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Optional Disclosure Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPwd"
                      checked={formData.isPwd}
                      onCheckedChange={(checked) => handleInputChange("isPwd", checked)}
                    />
                    <Label htmlFor="isPwd">I am a Person with Disability (PWD)</Label>
                  </div>

                  {formData.isPwd && (
                    <div className="ml-6">
                      <Label htmlFor="disabilityDetails">Disability Details</Label>
                      <Textarea
                        id="disabilityDetails"
                        value={formData.disabilityDetails}
                        onChange={(e) => handleInputChange("disabilityDetails", e.target.value)}
                        placeholder="Please describe your disabilities"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isIndigenous"
                      checked={formData.isIndigenous}
                      onCheckedChange={(checked) => handleInputChange("isIndigenous", checked)}
                    />
                    <Label htmlFor="isIndigenous">I belong to an Indigenous People (IP) community</Label>
                  </div>

                  {formData.isIndigenous && (
                    <div className="ml-6">
                      <Label htmlFor="indigenousDetails">Indigenous Community/Tribe</Label>
                      <Input
                        id="indigenousDetails"
                        value={formData.indigenousDetails}
                        onChange={(e) => handleInputChange("indigenousDetails", e.target.value)}
                        placeholder="e.g., Igorot, Lumad, Mangyan"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your contact details and family information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cellphone_number">Contact Number *</Label>
                <Input
                  id="cellphone_number"
                  value={formData.cellphone_number}
                  onChange={(e) => handleInputChange("cellphone_number", e.target.value)}
                  placeholder="Enter your contact number"
                />
              </div>

              <div>
                <Label htmlFor="city_address">City Address *</Label>
                <Textarea
                  id="city_address"
                  value={formData.city_address}
                  onChange={(e) => handleInputChange("city_address", e.target.value)}
                  placeholder="Enter your city address"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="residential_address">Residential Address *</Label>
                <Textarea
                  id="residential_address"
                  value={formData.residential_address}
                  onChange={(e) => handleInputChange("residential_address", e.target.value)}
                  placeholder="Enter your residential address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="father_name">Father's Name *</Label>
                  <Input
                    id="father_name"
                    value={formData.father_name}
                    onChange={(e) => handleInputChange("father_name", e.target.value)}
                    placeholder="Enter your father's name"
                  />
                </div>
                <div>
                  <Label htmlFor="mother_name">Mother's Name *</Label>
                  <Input
                    id="mother_name"
                    value={formData.mother_name}
                    onChange={(e) => handleInputChange("mother_name", e.target.value)}
                    placeholder="Enter your mother's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency_contact_name">Emergency Contact Person</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_contact_number">Emergency Contact Number</Label>
                  <Input
                    id="emergency_contact_number"
                    value={formData.emergency_contact_number}
                    onChange={(e) => handleInputChange("emergency_contact_number", e.target.value)}
                    placeholder="Enter emergency contact number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Education Background</CardTitle>
              <CardDescription>Update your educational qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((edu, index) => (
                <div key={edu.educ_id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    {education.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeEducation(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Education Level *</Label>
                      <Select
                        value={edu.education_level}
                        onValueChange={(value) => updateEducation(index, "education_level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Elementary">Elementary</SelectItem>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Senior High School">Senior High School</SelectItem>
                          <SelectItem value="College">College</SelectItem>
                          <SelectItem value="Vocational">Vocational</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>School/Institution *</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(index, "school", e.target.value)}
                        placeholder="Enter school name"
                      />
                    </div>
                    <div>
                      <Label>Year Graduated *</Label>
                      <Input
                        type="date"
                        value={edu.year_graduated}
                        onChange={(e) => updateEducation(index, "year_graduated", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employment History</CardTitle>
              <CardDescription>Update your work experience and references</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {employment.map((emp, index) => (
                <div key={emp.employment_id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Employment {index + 1}</h4>
                    {employment.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeEmployment(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Position *</Label>
                      <Input
                        value={emp.position}
                        onChange={(e) => updateEmployment(index, "position", e.target.value)}
                        placeholder="Enter position"
                      />
                    </div>
                    <div>
                      <Label>Company *</Label>
                      <Input
                        value={emp.company}
                        onChange={(e) => updateEmployment(index, "company", e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        type="date"
                        value={emp.occupation_start}
                        onChange={(e) => updateEmployment(index, "occupation_start", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={emp.occupation_end || ""}
                        onChange={(e) => updateEmployment(index, "occupation_end", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-medium mb-3">Character Reference</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Reference Name</Label>
                        <Input
                          value={emp.character_references?.reference_name || ""}
                          onChange={(e) => updateEmployment(index, "reference_name", e.target.value)}
                          placeholder="Enter reference name"
                        />
                      </div>
                      <div>
                        <Label>Reference Occupation</Label>
                        <Input
                          value={emp.character_references?.reference_occupation || ""}
                          onChange={(e) => updateEmployment(index, "reference_occupation", e.target.value)}
                          placeholder="Enter reference occupation"
                        />
                      </div>
                      <div>
                        <Label>Reference Company</Label>
                        <Input
                          value={emp.character_references?.reference_company || ""}
                          onChange={(e) => updateEmployment(index, "reference_company", e.target.value)}
                          placeholder="Enter reference company"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEmployment} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Employment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Updating..." : "Update Information"}
        </Button>
      </div>
    </div>
  )
}
