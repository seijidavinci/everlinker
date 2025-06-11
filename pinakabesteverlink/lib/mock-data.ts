import type { Application, CharacterReference, Education, Employment, PersonalProfile } from "./types"

// Generate a random ID
export const generateID = (prefix: string) => {
  return `${prefix}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`
}

// Mock data for testing
export const mockApplications: Application[] = [
  {
    appID: "APP-1234",
    personID: "PER-1234",
    submissionDate: "2025-04-01",
    status: "Under Review",
  },
  {
    appID: "APP-5678",
    personID: "PER-5678",
    submissionDate: "2025-04-02",
    status: "Submitted",
  },
]

export const mockPersonalProfiles: PersonalProfile[] = [
  {
    personID: "PER-1234",
    applicantID: "APP-1234",
    name: "John Doe",
    sex: "Male",
    cityAddress: "123 City St, Manila",
    residentialAddress: "123 City St, Manila",
    birthDate: "1990-01-01",
    birthPlace: "Manila",
    civilStatus: "Single",
    citizenship: "Filipino",
    height: 175,
    weight: 70,
    religion: "Catholic",
    cellphoneNumber: "+639123456789",
    fatherName: "John Doe Sr.",
    motherName: "Jane Doe",
    emergencyContactName: "Jane Doe",
    emergencyContactNumber: "+639123456789",
    languages: ["English", "Filipino"],
    skills: ["Communication", "Customer Service"],
  },
]

export const mockEducations: Education[] = [
  {
    educID: "EDU-1234",
    personID: "PER-1234",
    educationLevel: "College",
    school: "Polytechnic University of the Philippines",
    yearGraduated: "2020",
  },
]

export const mockEmployments: Employment[] = [
  {
    employmentID: "EMP-1234",
    personID: "PER-1234",
    characterReferenceID: "REF-1234",
    position: "Customer Service Representative",
    company: "ABC Telecom",
    occupationStart: "2020-01-01",
    occupationEnd: "2022-12-31",
  },
]

export const mockCharacterReferences: CharacterReference[] = [
  {
    characterReferenceID: "REF-1234",
    referenceName: "Maria Santos",
    referenceOccupation: "Manager",
    referenceCompany: "ABC Telecom",
  },
]

// Function to get application status by ID
export const getApplicationByID = (id: string): Application | undefined => {
  return mockApplications.find((app) => app.appID === id)
}

// Function to get personal profile by ID
export const getPersonalProfileByID = (id: string): PersonalProfile | undefined => {
  return mockPersonalProfiles.find((profile) => profile.personID === id)
}

// Function to get application details with related data
export const getApplicationDetails = (appID: string) => {
  const application = mockApplications.find((app) => app.appID === appID)

  if (!application) return null

  const personalProfile = mockPersonalProfiles.find((profile) => profile.personID === application.personID)

  // Get all education records for this person
  const education = mockEducations.filter((edu) => edu.personID === application.personID)

  // Get all employment records for this person
  const employment = mockEmployments.filter((emp) => emp.personID === application.personID)

  // Get all character references for this person's employment records
  const characterReferences = employment
    .map((emp) => {
      if (!emp.characterReferenceID) return null
      return mockCharacterReferences.find((ref) => ref.characterReferenceID === emp.characterReferenceID)
    })
    .filter((ref) => ref !== null)

  return {
    application,
    personalProfile,
    education,
    employment,
    characterReferences,
  }
}
