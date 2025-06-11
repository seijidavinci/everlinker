"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Plus, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PersonalInfoFormProps {
  data: any
  updateData: (data: any) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

export function PersonalInfoForm({ data, updateData, errors, setErrors }: PersonalInfoFormProps) {
  const [newLanguage, setNewLanguage] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const handleInputChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value }
    updateData(newData)

    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleDisclosureChange = (field: string, checked: boolean) => {
    handleInputChange(field, checked)

    // Clear the specification field if unchecked
    if (!checked) {
      if (field === "isPwd") {
        handleInputChange("disabilityDetails", "")
      } else if (field === "isIndigenous") {
        handleInputChange("indigenousDetails", "")
      }
    }
  }

  // Language management functions
  const addLanguage = () => {
    if (newLanguage.trim() && !data.languages?.includes(newLanguage.trim())) {
      const updatedLanguages = [...(data.languages || []), newLanguage.trim()]
      handleInputChange("languages", updatedLanguages)
      setNewLanguage("")
    }
  }

  const removeLanguage = (languageToRemove: string) => {
    const updatedLanguages = (data.languages || []).filter((lang: string) => lang !== languageToRemove)
    handleInputChange("languages", updatedLanguages)
  }

  const handleLanguageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addLanguage()
    }
  }

  // Skill management functions
  const addSkill = () => {
    if (newSkill.trim() && !data.skills?.includes(newSkill.trim())) {
      const updatedSkills = [...(data.skills || []), newSkill.trim()]
      handleInputChange("skills", updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = (data.skills || []).filter((skill: string) => skill !== skillToRemove)
    handleInputChange("skills", updatedSkills)
  }

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Please provide your basic personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={data.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sex">Sex *</Label>
              <Select value={data.sex || ""} onValueChange={(value) => handleInputChange("sex", value)}>
                <SelectTrigger className={errors.sex ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.sex && <p className="text-sm text-red-500 mt-1">{errors.sex}</p>}
            </div>
            <div>
              <Label htmlFor="civilStatus">Civil Status *</Label>
              <Select value={data.civilStatus || ""} onValueChange={(value) => handleInputChange("civilStatus", value)}>
                <SelectTrigger className={errors.civilStatus ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select civil status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.civilStatus && <p className="text-sm text-red-500 mt-1">{errors.civilStatus}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthdate">Birth Date *</Label>
              <Input
                id="birthdate"
                type="date"
                value={data.birthdate || ""}
                onChange={(e) => handleInputChange("birthdate", e.target.value)}
                className={errors.birthdate ? "border-red-500" : ""}
              />
              {errors.birthdate && <p className="text-sm text-red-500 mt-1">{errors.birthdate}</p>}
            </div>
            <div>
              <Label htmlFor="birthPlace">Birth Place *</Label>
              <Input
                id="birthPlace"
                value={data.birthPlace || ""}
                onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                placeholder="Enter your birth place"
                className={errors.birthPlace ? "border-red-500" : ""}
              />
              {errors.birthPlace && <p className="text-sm text-red-500 mt-1">{errors.birthPlace}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="height">Height (cm) *</Label>
              <Input
                id="height"
                type="number"
                value={data.height || ""}
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="Height in cm"
                className={errors.height ? "border-red-500" : ""}
              />
              {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                value={data.weight || ""}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="Weight in kg"
                className={errors.weight ? "border-red-500" : ""}
              />
              {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
            </div>
            <div>
              <Label htmlFor="citizenship">Citizenship *</Label>
              <Input
                id="citizenship"
                value={data.citizenship || ""}
                onChange={(e) => handleInputChange("citizenship", e.target.value)}
                placeholder="Enter your citizenship"
                className={errors.citizenship ? "border-red-500" : ""}
              />
              {errors.citizenship && <p className="text-sm text-red-500 mt-1">{errors.citizenship}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="religion">Religion</Label>
            <Input
              id="religion"
              value={data.religion || ""}
              onChange={(e) => handleInputChange("religion", e.target.value)}
              placeholder="Enter your religion (optional)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Please provide your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input
              id="contactNumber"
              value={data.contactNumber || ""}
              onChange={(e) => handleInputChange("contactNumber", e.target.value)}
              placeholder="Enter your contact number"
              className={errors.contactNumber ? "border-red-500" : ""}
            />
            {errors.contactNumber && <p className="text-sm text-red-500 mt-1">{errors.contactNumber}</p>}
          </div>

          <div>
            <Label htmlFor="cityAddress">City Address *</Label>
            <Textarea
              id="cityAddress"
              value={data.cityAddress || ""}
              onChange={(e) => handleInputChange("cityAddress", e.target.value)}
              placeholder="Enter your city address"
              rows={2}
              className={errors.cityAddress ? "border-red-500" : ""}
            />
            {errors.cityAddress && <p className="text-sm text-red-500 mt-1">{errors.cityAddress}</p>}
          </div>

          <div>
            <Label htmlFor="residentialAddress">Residential Address *</Label>
            <Textarea
              id="residentialAddress"
              value={data.residentialAddress || ""}
              onChange={(e) => handleInputChange("residentialAddress", e.target.value)}
              placeholder="Enter your residential address"
              rows={2}
              className={errors.residentialAddress ? "border-red-500" : ""}
            />
            {errors.residentialAddress && <p className="text-sm text-red-500 mt-1">{errors.residentialAddress}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Family Information */}
      <Card>
        <CardHeader>
          <CardTitle>Family Information</CardTitle>
          <CardDescription>Please provide your family details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fatherName">Father's Name *</Label>
              <Input
                id="fatherName"
                value={data.fatherName || ""}
                onChange={(e) => handleInputChange("fatherName", e.target.value)}
                placeholder="Enter your father's name"
                className={errors.fatherName ? "border-red-500" : ""}
              />
              {errors.fatherName && <p className="text-sm text-red-500 mt-1">{errors.fatherName}</p>}
            </div>
            <div>
              <Label htmlFor="motherName">Mother's Name *</Label>
              <Input
                id="motherName"
                value={data.motherName || ""}
                onChange={(e) => handleInputChange("motherName", e.target.value)}
                placeholder="Enter your mother's name"
                className={errors.motherName ? "border-red-500" : ""}
              />
              {errors.motherName && <p className="text-sm text-red-500 mt-1">{errors.motherName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyPerson">Emergency Contact Person</Label>
              <Input
                id="emergencyPerson"
                value={data.emergencyPerson || ""}
                onChange={(e) => handleInputChange("emergencyPerson", e.target.value)}
                placeholder="Enter emergency contact name"
              />
            </div>
            <div>
              <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
              <Input
                id="emergencyNumber"
                value={data.emergencyNumber || ""}
                onChange={(e) => handleInputChange("emergencyNumber", e.target.value)}
                placeholder="Enter emergency contact number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills and Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Skills and Languages</CardTitle>
          <CardDescription>Add your skills and language proficiencies one at a time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Languages Section */}
          <div className="space-y-3">
            <Label>Languages</Label>
            <div className="flex gap-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={handleLanguageKeyPress}
                placeholder="Enter a language (e.g., English, Filipino)"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addLanguage}
                disabled={!newLanguage.trim() || data.languages?.includes(newLanguage.trim())}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {/* Display added languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Added languages:</p>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((language: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {language}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeLanguage(language)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500">Press Enter or click Add to add a language</p>
          </div>

          <Separator />

          {/* Skills Section */}
          <div className="space-y-3">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                placeholder="Enter a skill (e.g., Communication, Leadership)"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addSkill}
                disabled={!newSkill.trim() || data.skills?.includes(newSkill.trim())}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {/* Display added skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Added skills:</p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500">Press Enter or click Add to add a skill</p>
          </div>
        </CardContent>
      </Card>

      {/* Optional Disclosure Information */}
      <Card>
        <CardHeader>
          <CardTitle>Optional Disclosure Information</CardTitle>
          <CardDescription>
            The following information is optional and will only be used for diversity and inclusion purposes. You may
            choose not to disclose this information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This information is completely voluntary and will be kept confidential. It helps us ensure equal
              opportunity and diversity in our workplace.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {/* PWD Disclosure */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPwd"
                  checked={data.isPwd || false}
                  onCheckedChange={(checked) => handleDisclosureChange("isPwd", checked as boolean)}
                />
                <Label
                  htmlFor="isPwd"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am a Person with Disability (PWD)
                </Label>
              </div>

              {data.isPwd && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="disabilityDetails" className="text-sm">
                    Please specify your disabilities (if any)
                  </Label>
                  <Textarea
                    id="disabilityDetails"
                    value={data.disabilityDetails || ""}
                    onChange={(e) => handleInputChange("disabilityDetails", e.target.value)}
                    placeholder="Please describe your disabilities or specific accommodations you may need"
                    rows={3}
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    This information helps us provide appropriate accommodations and support.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Indigenous People Disclosure */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isIndigenous"
                  checked={data.isIndigenous || false}
                  onCheckedChange={(checked) => handleDisclosureChange("isIndigenous", checked as boolean)}
                />
                <Label
                  htmlFor="isIndigenous"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I belong to an Indigenous People (IP) community
                </Label>
              </div>

              {data.isIndigenous && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="indigenousDetails" className="text-sm">
                    Please specify your indigenous community or tribe (if any)
                  </Label>
                  <Input
                    id="indigenousDetails"
                    value={data.indigenousDetails || ""}
                    onChange={(e) => handleInputChange("indigenousDetails", e.target.value)}
                    placeholder="e.g., Igorot, Lumad, Mangyan, etc."
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    This information helps us promote cultural diversity and inclusion.
                  </p>
                </div>
              )}
            </div>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>Privacy Notice:</strong> All disclosure information is voluntary and confidential. This data will
              not be used in hiring decisions and will only be used for diversity reporting and accommodation purposes.
              You have the right to decline providing this information without any impact on your application.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
