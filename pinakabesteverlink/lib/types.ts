// Types based on the data dictionary

// Personal Profile
export interface PersonalProfile {
  personID: string // Primary Key
  applicantID: string // Foreign Key
  name: string
  sex: "Male" | "Female" | "Other"
  cityAddress: string
  residentialAddress: string
  birthDate: string
  birthPlace: string
  civilStatus: "Single" | "Married" | "Widowed" | "Other"
  citizenship: string
  height: number
  weight: number
  religion?: string // Optional
  cellphoneNumber: string
  fatherName: string
  motherName: string
  emergencyContactName?: string // Optional
  emergencyContactNumber?: string // Optional
  languages?: string[] // Additional field not in data dictionary
  skills?: string[] // Additional field not in data dictionary
}

// Education
export interface Education {
  educID: string // Primary Key
  personID: string // Foreign Key
  educationLevel?: string // Optional
  school?: string // Optional
  yearGraduated?: string // Optional
}

// Employment
export interface Employment {
  employmentID: string // Primary Key
  personID: string // Foreign Key
  characterReferenceID?: string // Foreign Key, Optional
  position?: string // Optional
  company?: string // Optional
  occupationStart?: string // Optional
  occupationEnd?: string // Optional
}

// Character Reference
export interface CharacterReference {
  characterReferenceID: string // Primary Key
  referenceName?: string // Optional
  referenceOccupation?: string // Optional
  referenceCompany?: string // Optional
}

// Application
export interface Application {
  appID: string // Primary Key
  personID: string // Foreign Key
  submissionDate: string
  status: ApplicationStatus
}

// Application Status Enum
export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Awaiting Evaluation"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Rejected"
  | "Offer"
  | "Withdrawn"
