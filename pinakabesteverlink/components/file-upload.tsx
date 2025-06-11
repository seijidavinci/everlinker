"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  label: string
  required?: boolean
  accept?: string
  maxSize?: number
  onChange: (file: File | null) => void
}

export function FileUpload({
  label,
  required = false,
  accept = ".pdf,.doc,.docx",
  maxSize = 5,
  onChange,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selectedFile: File | null) => {
    setError(null)

    if (!selectedFile) {
      setFile(null)
      onChange(null)
      return
    }

    // Check file type
    const fileType = selectedFile.name.split(".").pop()?.toLowerCase()
    const acceptedTypes = accept.split(",").map((type) => type.trim().replace(".", ""))

    if (!acceptedTypes.includes(fileType || "")) {
      setError(`Invalid file type. Accepted types: ${accept}`)
      return
    }

    // Check file size (in MB)
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    setFile(selectedFile)
    onChange(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setFile(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {file && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="h-6 px-2 text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            <span className="ml-1 text-xs">Remove</span>
          </Button>
        )}
      </div>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-800"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Drag & drop your file here or</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {accept.split(",").join(", ")} (Max: {maxSize}MB)
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={handleButtonClick}>
              Browse files
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4 rounded-lg border p-4">
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 space-y-1 text-sm">
            <p className="font-medium">{file.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
