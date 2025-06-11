"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Education {
  id: string
  level: string
  school: string
  yearGraduated: string
}

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [newEducation, setNewEducation] = useState<Education>({
    id: "",
    level: "",
    school: "",
    yearGraduated: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEducation({
      ...newEducation,
      [name]: value,
    })
  }

  const handleSelectChange = (value: string) => {
    setNewEducation({
      ...newEducation,
      level: value,
    })
  }

  const addEducation = () => {
    if (newEducation.level && newEducation.school && newEducation.yearGraduated) {
      const id = `edu-${Date.now()}`
      updateData([...data, { ...newEducation, id }])
      setNewEducation({
        id: "",
        level: "",
        school: "",
        yearGraduated: "",
      })
    }
  }

  const removeEducation = (id: string) => {
    updateData(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-gray-50">
        <AlertDescription>
          Educational background is optional. You can skip this section if not applicable.
        </AlertDescription>
      </Alert>

      {data.length > 0 && (
        <div className="space-y-4">
          {data.map((education) => (
            <Card key={education.id}>
              <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-base font-medium">{education.level}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(education.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm">
                  <p>
                    <span className="font-medium">School:</span> {education.school}
                  </p>
                  <p>
                    <span className="font-medium">Year Graduated:</span> {education.yearGraduated}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4 border p-4 rounded-lg">
        <h3 className="font-medium">Add Education</h3>
        <div className="space-y-2">
          <Label htmlFor="level">Education Level</Label>
          <Select value={newEducation.level} onValueChange={handleSelectChange}>
            <SelectTrigger id="level">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Elementary">Elementary</SelectItem>
              <SelectItem value="High School">High School</SelectItem>
              <SelectItem value="Vocational">Vocational</SelectItem>
              <SelectItem value="College">College</SelectItem>
              <SelectItem value="Post Graduate">Post Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="school">School</Label>
          <Input
            id="school"
            name="school"
            value={newEducation.school}
            onChange={handleChange}
            placeholder="Enter school name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearGraduated">Year Graduated</Label>
          <Input
            id="yearGraduated"
            name="yearGraduated"
            value={newEducation.yearGraduated}
            onChange={handleChange}
            placeholder="Enter year graduated"
          />
        </div>

        <Button
          type="button"
          onClick={addEducation}
          disabled={!newEducation.level || !newEducation.school || !newEducation.yearGraduated}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>
    </div>
  )
}
