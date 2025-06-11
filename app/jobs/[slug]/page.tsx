import Link from "next/link"
import { ArrowLeft, Briefcase, Clock, MapPin, Calendar, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Job data with detailed information
const jobsData = {
  "network-engineer": {
    title: "Network Engineer",
    department: "Technical Operations",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱50,000 - ₱70,000 per month",
    posted: "May 1, 2025",
    description:
      "Design, implement, and maintain our telecommunications network infrastructure to ensure optimal performance and reliability.",
    responsibilities: [
      "Design and implement network infrastructure including LAN, WAN, and wireless networks",
      "Configure and maintain network equipment such as routers, switches, and firewalls",
      "Monitor network performance and troubleshoot issues to ensure minimal downtime",
      "Implement security measures to protect network infrastructure from threats",
      "Collaborate with cross-functional teams to support business requirements",
      "Document network architecture, configurations, and procedures",
      "Perform regular network audits and recommend improvements",
      "Stay current with emerging technologies and industry best practices",
    ],
    requirements: [
      "Bachelor's degree in Computer Science, Information Technology, or related field",
      "3+ years of experience in network engineering or similar role",
      "CCNA certification required, CCNP preferred",
      "Strong knowledge of networking protocols (TCP/IP, DHCP, DNS, etc.)",
      "Experience with Cisco, Juniper, or similar network equipment",
      "Familiarity with network security principles and best practices",
      "Excellent problem-solving and analytical skills",
      "Strong communication and documentation abilities",
    ],
    benefits: [
      "Competitive salary package with performance bonuses",
      "Comprehensive health insurance for you and your dependents",
      "Professional development opportunities and certification support",
      "Flexible work arrangements",
      "13th month pay and performance bonuses",
      "HMO coverage from day one",
      "Generous paid time off and holidays",
      "Career advancement opportunities",
    ],
  },
  "customer-service-representative": {
    title: "Customer Service Representative",
    department: "Customer Support",
    location: "Manila, Philippines",
    type: "Full-time / Part-time",
    salary: "₱25,000 - ₱35,000 per month",
    posted: "April 28, 2025",
    description:
      "Provide exceptional support to our customers and resolve service inquiries with professionalism and efficiency.",
    responsibilities: [
      "Handle inbound customer calls, emails, and chat inquiries regarding telecommunications services",
      "Resolve customer issues and complaints in a timely and professional manner",
      "Process service orders, upgrades, and account changes accurately",
      "Educate customers about products, services, billing procedures, and promotions",
      "Maintain detailed records of all customer interactions in our CRM system",
      "Meet or exceed performance metrics for call handling, resolution rates, and customer satisfaction",
      "Escalate complex issues to appropriate departments when necessary",
      "Identify opportunities for service improvements based on customer feedback",
    ],
    requirements: [
      "High school diploma required, some college education preferred",
      "1+ year of customer service experience, preferably in telecommunications or call center environment",
      "Excellent verbal and written communication skills in English and Filipino",
      "Strong problem-solving abilities and patience when dealing with challenging situations",
      "Computer literacy and ability to learn new software applications quickly",
      "Ability to work in shifts, including evenings, weekends, and holidays as needed",
      "Strong attention to detail and ability to multitask",
      "Positive attitude and customer-first mindset",
    ],
    benefits: [
      "Competitive base salary plus performance incentives",
      "Health insurance coverage",
      "Paid training and onboarding program",
      "Career advancement opportunities",
      "Employee discounts on company services",
      "13th month pay",
      "HMO coverage",
      "Transportation allowance for night shifts",
    ],
  },
  "sales-executive": {
    title: "Sales Executive",
    department: "Business Development",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱30,000 - ₱50,000 per month + commission",
    posted: "April 25, 2025",
    description:
      "Drive business growth by identifying and securing new client opportunities and maintaining strong relationships with existing clients.",
    responsibilities: [
      "Develop and execute sales strategies to meet or exceed targets",
      "Identify and pursue new business opportunities through prospecting and lead generation",
      "Conduct product demonstrations and presentations to potential clients",
      "Negotiate contracts and close deals with new and existing customers",
      "Maintain accurate records of all sales activities in CRM system",
      "Develop and maintain strong relationships with clients",
      "Collaborate with marketing and product teams to align sales strategies",
      "Stay informed about industry trends, competitor activities, and market conditions",
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "2+ years of successful sales experience, preferably in telecommunications or B2B sales",
      "Proven track record of meeting or exceeding sales targets",
      "Strong negotiation and closing skills",
      "Excellent communication and presentation abilities",
      "Proficiency in CRM software and MS Office applications",
      "Self-motivated with ability to work independently and as part of a team",
      "Valid driver's license and willingness to travel within the service area",
    ],
    benefits: [
      "Competitive base salary plus uncapped commission structure",
      "Performance bonuses and sales incentives",
      "Comprehensive health insurance",
      "Sales training and professional development opportunities",
      "Mobile phone and transportation allowance",
      "13th month pay",
      "HMO coverage",
      "Retirement savings plan",
    ],
  },
  "it-support-specialist": {
    title: "IT Support Specialist",
    department: "Technical Operations",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱35,000 - ₱45,000 per month",
    posted: "April 30, 2025",
    description:
      "Provide technical support to internal teams and troubleshoot hardware and software issues to maintain operational efficiency.",
    responsibilities: [
      "Respond to and resolve IT support tickets in a timely manner",
      "Troubleshoot hardware, software, and network issues for employees",
      "Set up and configure workstations, peripherals, and software for new hires",
      "Maintain inventory of IT equipment and software licenses",
      "Perform regular system maintenance and updates",
      "Document technical solutions and maintain knowledge base",
      "Provide basic training to users on company systems and applications",
      "Assist with implementation of new technologies and systems",
    ],
    requirements: [
      "Bachelor's degree in Information Technology, Computer Science, or related field",
      "2+ years of experience in IT support or help desk role",
      "Strong knowledge of Windows and Mac operating systems",
      "Experience with troubleshooting hardware and software issues",
      "Familiarity with networking concepts and troubleshooting",
      "CompTIA A+ certification preferred",
      "Excellent customer service and communication skills",
      "Ability to explain technical concepts to non-technical users",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development and certification support",
      "Flexible work arrangements",
      "13th month pay",
      "HMO coverage",
      "Paid time off and holidays",
      "Career advancement opportunities",
    ],
  },
  "marketing-coordinator": {
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱30,000 - ₱40,000 per month",
    posted: "April 27, 2025",
    description:
      "Develop and implement marketing strategies to promote our services and enhance brand awareness in the telecommunications market.",
    responsibilities: [
      "Assist in planning and executing marketing campaigns across various channels",
      "Manage social media accounts and create engaging content",
      "Coordinate with design team to develop marketing materials",
      "Monitor and report on campaign performance metrics",
      "Conduct market research and competitor analysis",
      "Support event planning and coordination for promotional activities",
      "Maintain marketing calendar and ensure timely execution of initiatives",
      "Collaborate with sales team to align marketing efforts with sales goals",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "1-2 years of experience in marketing or related role",
      "Strong understanding of digital marketing channels and best practices",
      "Experience with social media management and content creation",
      "Excellent written and verbal communication skills",
      "Proficiency in MS Office and basic design tools (Canva, Adobe Creative Suite)",
      "Analytical mindset with ability to interpret marketing data",
      "Creative thinking and attention to detail",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development opportunities",
      "Flexible work arrangements",
      "13th month pay",
      "HMO coverage",
      "Paid time off and holidays",
      "Team building activities and events",
    ],
  },
  "human-resources-assistant": {
    title: "Human Resources Assistant",
    department: "Human Resources",
    location: "Manila, Philippines",
    type: "Full-time",
    salary: "₱25,000 - ₱35,000 per month",
    posted: "April 29, 2025",
    description:
      "Support the HR department in recruitment, onboarding, and employee relations to maintain a positive workplace culture.",
    responsibilities: [
      "Assist with full-cycle recruitment process including posting job ads and screening resumes",
      "Coordinate interviews and prepare offer letters for selected candidates",
      "Facilitate new employee onboarding and orientation",
      "Maintain employee records and HR database",
      "Process payroll documentation and benefits administration",
      "Assist with performance management processes",
      "Support employee engagement initiatives and company events",
      "Respond to basic HR inquiries from employees",
    ],
    requirements: [
      "Bachelor's degree in Human Resources, Business Administration, or related field",
      "0-2 years of experience in HR or administrative role",
      "Knowledge of HR principles and best practices",
      "Strong organizational and time management skills",
      "Excellent interpersonal and communication abilities",
      "Proficiency in MS Office applications",
      "Attention to detail and ability to maintain confidentiality",
      "Customer service orientation and problem-solving skills",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development opportunities",
      "Flexible work arrangements",
      "13th month pay",
      "HMO coverage",
      "Paid time off and holidays",
      "Supportive work environment",
    ],
  },
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const job = jobsData[slug as keyof typeof jobsData]

  if (!job) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Job Not Found</h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The job position you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/jobs">
            <Button>View All Positions</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mb-8">
        <Link href="/jobs">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{job.title}</h1>
              <div className="mt-4 flex flex-wrap gap-4">
                <Badge className="bg-teal-500">{job.department}</Badge>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Briefcase className="mr-1 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Posted: {job.posted}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Job Description</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{job.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Key Responsibilities</h2>
              <ul className="mt-2 space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Requirements</h2>
              <ul className="mt-2 space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Benefits</h2>
              <ul className="mt-2 space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
              <CardDescription>Submit your application for this position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Position</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.title}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Department</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.department}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Location</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">How to Apply</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click the button below to start your application process. You'll need to create an account or sign in
                  to continue.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/apply?position=${encodeURIComponent(job.title)}`} className="w-full">
                <Button className="w-full">Apply for This Position</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Positions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(jobsData)
            .filter(([key]) => key !== slug)
            .slice(0, 3)
            .map(([key, similarJob]) => (
              <Card key={key} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>{similarJob.title}</CardTitle>
                  <CardDescription>{similarJob.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{similarJob.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{similarJob.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{similarJob.type}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/apply?position=${encodeURIComponent(similarJob.title)}`}>
                    <Button>Apply Now</Button>
                  </Link>
                  <Link href={`/jobs/${key}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
