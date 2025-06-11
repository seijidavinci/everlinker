"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Employment {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string
  location?: string
  responsibilities?: string
  achievements?: string
}

interface EmploymentFormProps {
  data: Employment[]
  updateData: (data: Employment[]) => void
}

export function EmploymentForm({ data, updateData }: EmploymentFormProps) {
  const [newEmployment, setNewEmployment] = useState<Employment>({
    id: "",
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    location: "",
    responsibilities: "",
    achievements: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEmployment({
      ...newEmployment,
      [name]: value,
    })
  }

  const addEmployment = () => {
    if (newEmployment.position && newEmployment.company && newEmployment.startDate) {
      const id = `emp-${Date.now()}`
      updateData([...data, { ...newEmployment, id }])
      setNewEmployment({
        id: "",
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        responsibilities: "",
        achievements: "",
      })
    }
  }

  const removeEmployment = (id: string) => {
    updateData(data.filter((emp) => emp.id !== id))
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-gray-50">
        <AlertDescription>
          Employment history is optional. You can skip this section if not applicable.
        </AlertDescription>
      </Alert>

      {data.length > 0 && (
        <div className="space-y-4">
          {data.map((employment) => (
            <Card key={employment.id}>
              <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-base font-medium">{employment.position}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEmployment(employment.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-medium">Company:</span> {employment.company}
                  </p>
                  {employment.location && (
                    <p>
                      <span className="font-medium">Location:</span> {employment.location}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Period:</span> {employment.startDate} -{" "}
                    {employment.endDate || "Present"}
                  </p>

                  {employment.responsibilities && (
                    <div>
                      <p className="font-medium">Responsibilities/Projects:</p>
                      <p className="whitespace-pre-line">{employment.responsibilities}</p>
                    </div>
                  )}

                  {employment.achievements && (
                    <div>
                      <p className="font-medium">Achievements:</p>
                      <p className="whitespace-pre-line">{employment.achievements}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4 border p-4 rounded-lg">
        <h3 className="font-medium">Add Employment</h3>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            value={newEmployment.position}
            onChange={handleChange}
            placeholder="Enter position"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={newEmployment.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={newEmployment.location}
            onChange={handleChange}
            placeholder="Enter job location (city, country)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={newEmployment.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date (leave blank if current)</Label>
            <Input id="endDate" name="endDate" type="date" value={newEmployment.endDate} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsibilities">Responsibilities/Projects</Label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            value={newEmployment.responsibilities}
            onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
            placeholder="Describe your key responsibilities and projects"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="achievements">Achievements</Label>
          <textarea
            id="achievements"
            name="achievements"
            value={newEmployment.achievements}
            onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
            placeholder="Describe your key achievements in this role"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </div>

        <Button
          type="button"
          onClick={addEmployment}
          disabled={!newEmployment.position || !newEmployment.company || !newEmployment.startDate}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Employment
        </Button>
      </div>
    </div>
  )
}
