import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The talented individuals behind EverLink Telecom Inc.&apos;s job listing system
          </p>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900 px-3 py-1 text-sm text-teal-600 dark:text-teal-300">
            BSCS 2-2
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Team members in alphabetical order */}
          <TeamMemberCard
            name="Drixelle L. Morales"
            role="System Administrator"
            description="Managed system infrastructure and ensured platform reliability and security."
            imageSrc="/images/drixelle.png"
          />
          <TeamMemberCard
            name="Eujin Rod L. Sagun"
            role="Developer / Project Manager"
            description="Led the development team and coordinated project milestones while contributing to development."
            imageSrc="/images/eujin-rod.png"
          />
          <TeamMemberCard
            name="Harold Jr. C. Alpino"
            role="UI/UX Designer"
            description="Designed the user interface and experience to ensure the platform is intuitive and accessible."
            imageSrc="/images/harold.png"
          />
          <TeamMemberCard
            name="Nicko Adrian E. Baptista"
            role="Database Specialist"
            description="Architected the database schema and ensured efficient data management."
            imageSrc="/images/nick.png"
          />
          <TeamMemberCard
            name="Rhomer Siegfred S. Agustin"
            role="Developer"
            description="Responsible for implementing core functionality and features of the job listing system."
            imageSrc="/images/rhomer.png"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Development Process</h2>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
            The EverLink job listing system was developed using modern web technologies and best practices to create a
            seamless experience for both job seekers and recruiters.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Planning & Design</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                We began with comprehensive planning and UI/UX design to ensure a user-friendly experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Development</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Our development team built the platform using Next.js, React, and Tailwind CSS for a modern, responsive
                interface.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Testing & Deployment</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Rigorous testing ensured a bug-free experience before deploying to production.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

function TeamMemberCard({
  name,
  role,
  description,
  imageSrc,
}: {
  name: string
  role: string
  description: string
  imageSrc: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`Photo of ${name}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-teal-600 dark:text-teal-400 font-medium text-sm mb-3">{role}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
