"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CharacterReference {
  id: string
  name: string
  occupation: string
  company: string
  relatedEmploymentId: string
}

interface Employment {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string
}

interface CharacterReferenceFormProps {
  data: CharacterReference[]
  updateData: (data: CharacterReference[]) => void
  employmentData: Employment[]
}

export function CharacterReferenceForm({ data, updateData, employmentData }: CharacterReferenceFormProps) {
  const [newReference, setNewReference] = useState<CharacterReference>({
    id: "",
    name: "",
    occupation: "",
    company: "",
    relatedEmploymentId: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewReference({
      ...newReference,
      [name]: value,
    })
  }

  const handleSelectChange = (value: string) => {
    setNewReference({
      ...newReference,
      relatedEmploymentId: value,
    })
  }

  const addReference = () => {
    if (newReference.name && newReference.occupation && newReference.company && newReference.relatedEmploymentId) {
      const id = `ref-${Date.now()}`
      updateData([...data, { ...newReference, id }])
      setNewReference({
        id: "",
        name: "",
        occupation: "",
        company: "",
        relatedEmploymentId: "",
      })
    }
  }

  const removeReference = (id: string) => {
    updateData(data.filter((ref) => ref.id !== id))
  }

  const getEmploymentName = (id: string) => {
    const employment = employmentData.find((emp) => emp.id === id)
    return employment ? `${employment.position} at ${employment.company}` : ""
  }

  return (
    <div className="space-y-6">
      {data.length > 0 && (
        <div className="space-y-4">
          {data.map((reference) => (
            <Card key={reference.id}>
              <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-base font-medium">{reference.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeReference(reference.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Occupation:</span> {reference.occupation}
                  </p>
                  <p>
                    <span className="font-medium">Company:</span> {reference.company}
                  </p>
                  <p>
                    <span className="font-medium">For Employment:</span> {reference.company}
                  </p>
                  <p>
                    <span className="font-medium">For Employment:</span>{" "}
                    {getEmploymentName(reference.relatedEmploymentId)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4 border p-4 rounded-lg">
        <h3 className="font-medium">Add Character Reference</h3>

        <div className="space-y-2">
          <Label htmlFor="relatedEmploymentId">Related Employment</Label>
          <Select value={newReference.relatedEmploymentId} onValueChange={handleSelectChange}>
            <SelectTrigger id="relatedEmploymentId">
              <SelectValue placeholder="Select related employment" />
            </SelectTrigger>
            <SelectContent>
              {employmentData.map((employment) => (
                <SelectItem key={employment.id} value={employment.id}>
                  {employment.position} at {employment.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Reference Name</Label>
          <Input
            id="name"
            name="name"
            value={newReference.name}
            onChange={handleChange}
            placeholder="Enter reference name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            name="occupation"
            value={newReference.occupation}
            onChange={handleChange}
            placeholder="Enter occupation"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={newReference.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <Button
          type="button"
          onClick={addReference}
          disabled={
            !newReference.name || !newReference.occupation || !newReference.company || !newReference.relatedEmploymentId
          }
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Reference
        </Button>
      </div>
    </div>
  )
}
