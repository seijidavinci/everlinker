"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "./file-upload"

interface ApplicationMaterialsProps {
  onFilesChange: (files: {
    resume: File | null
    coverLetter: File | null
    supportingMaterials: File | null
  }) => void
}

export function ApplicationMaterials({ onFilesChange }: ApplicationMaterialsProps) {
  const [files, setFiles] = useState({
    resume: null as File | null,
    coverLetter: null as File | null,
    supportingMaterials: null as File | null,
  })

  useEffect(() => {
    onFilesChange(files)
  }, [files, onFilesChange])

  const handleResumeChange = (file: File | null) => {
    setFiles((prev) => ({ ...prev, resume: file }))
  }

  const handleCoverLetterChange = (file: File | null) => {
    setFiles((prev) => ({ ...prev, coverLetter: file }))
  }

  const handleSupportingMaterialsChange = (file: File | null) => {
    setFiles((prev) => ({ ...prev, supportingMaterials: file }))
  }

  return (
    <div className="space-y-6">
      <FileUpload label="Resume/CV" required accept=".pdf,.doc,.docx" onChange={handleResumeChange} />

      <FileUpload label="Cover Letter" accept=".pdf,.doc,.docx" onChange={handleCoverLetterChange} />

      <FileUpload
        label="Supporting Materials"
        accept=".pdf,.doc,.docx,.zip,.rar"
        onChange={handleSupportingMaterialsChange}
      />
    </div>
  )
}
