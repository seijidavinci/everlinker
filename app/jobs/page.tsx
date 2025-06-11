"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Clock, MapPin, Search, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

// Job data
const jobsData = [
  {
    id: 1,
    title: "Network Engineer",
    department: "Technical Operations",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱50,000 - ₱70,000 per month",
    description:
      "Design, implement, and maintain our telecommunications network infrastructure to ensure optimal performance and reliability.",
    category: "technical",
    slug: "network-engineer",
  },
  {
    id: 2,
    title: "Customer Service Representative",
    department: "Customer Support",
    location: "Manila, Philippines",
    type: "Full-time / Part-time",
    salary: "₱25,000 - ₱35,000 per month",
    description:
      "Provide exceptional support to our customers and resolve service inquiries with professionalism and efficiency.",
    category: "customer-service",
    slug: "customer-service-representative",
  },
  {
    id: 3,
    title: "Sales Executive",
    department: "Business Development",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱30,000 - ₱50,000 per month + commission",
    description:
      "Drive business growth by identifying and securing new client opportunities and maintaining strong relationships with existing clients.",
    category: "business",
    slug: "sales-executive",
  },
  {
    id: 4,
    title: "IT Support Specialist",
    department: "Technical Operations",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱35,000 - ₱45,000 per month",
    description:
      "Provide technical support to internal teams and troubleshoot hardware and software issues to maintain operational efficiency.",
    category: "technical",
    slug: "it-support-specialist",
  },
  {
    id: 5,
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱30,000 - ₱40,000 per month",
    description:
      "Develop and implement marketing strategies to promote our services and enhance brand awareness in the telecommunications market.",
    category: "business",
    slug: "marketing-coordinator",
  },
  {
    id: 6,
    title: "Human Resources Assistant",
    department: "Human Resources",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱25,000 - ₱35,000 per month",
    description:
      "Support the HR department in recruitment, onboarding, and employee relations to maintain a positive workplace culture.",
    category: "business",
    slug: "human-resources-assistant",
  },
]

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter jobs based on search query and active tab
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") {
      return matchesSearch
    } else {
      return job.category === activeTab && matchesSearch
    }
  })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Open Positions</h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore current job opportunities at EverLink Telecom Inc.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search by department or position..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-8 w-full max-w-4xl mx-auto" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                department={job.department}
                location={job.location}
                type={job.type}
                salary={job.salary}
                description={job.description}
                slug={job.slug}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No jobs found matching your search criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                }}
              >
                Clear search
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function JobCard({
  title,
  department,
  location,
  type,
  salary,
  description,
  slug,
}: {
  title: string
  department: string
  location: string
  type: string
  salary: string
  description: string
  slug: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{department}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{type}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              <span>{salary}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/apply?position=${encodeURIComponent(title)}`}>
          <Button>
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/jobs/${slug}`}>
          <Button variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
