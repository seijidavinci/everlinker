import Link from "next/link"
import { ArrowRight, Briefcase, Clock, FileText, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-500 to-emerald-600 text-white dark:from-teal-700 dark:to-emerald-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                EverLink Telecom Inc.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
                Join our growing team and help us deliver reliable and innovative connectivity solutions.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/jobs">
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-emerald-400 dark:hover:bg-gray-700">
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm text-gray-900 dark:text-gray-100">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
                Connecting People, Empowering Communities
              </h2>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EverLink Telecom Inc. is a growing telecommunications company dedicated to delivering reliable and
                innovative connectivity solutions. Our mission is to bridge communication gaps and provide cutting-edge
                technology that enhances lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/about">
                  <Button variant="outline">Meet Our Team</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Equal Opportunity Employer</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We welcome applications from all backgrounds and experience levels.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Diverse Career Paths</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      From technical roles to customer service, find your perfect fit.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Simple Application Process</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Our streamlined application system makes it easy to apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900 px-3 py-1 text-sm text-teal-600 dark:text-teal-300">
                Careers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
                Featured Opportunities
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our current openings and find your next career move with EverLink Telecom.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Network Engineer</CardTitle>
                <CardDescription>Technical Operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Design, implement, and maintain our telecommunications network infrastructure.
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Full-time</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/apply?position=Network%20Engineer" className="w-full">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Service Representative</CardTitle>
                <CardDescription>Customer Support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Provide exceptional support to our customers and resolve service inquiries.
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Full-time / Part-time</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/apply?position=Customer%20Service%20Representative" className="w-full">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales Executive</CardTitle>
                <CardDescription>Business Development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drive business growth by identifying and securing new client opportunities.
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Full-time</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/apply?position=Sales%20Executive" className="w-full">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/jobs">
              <Button variant="outline">View All Positions</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900 px-3 py-1 text-sm text-teal-600 dark:text-teal-300">
                How to Apply
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
                Our Application Process
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've made applying to EverLink Telecom simple and straightforward.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Browse Openings</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Explore our current job listings and find positions that match your skills and interests.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">Submit Application</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Complete our online application form with your personal and professional information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Interview Process</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Qualified candidates will be contacted for interviews and further assessment.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/apply">
              <Button>Start Your Application</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">EverLink Telecom Inc.</h3>
              <p className="text-sm text-gray-400">Delivering reliable and innovative connectivity solutions.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-white">
                    Apply
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sta. Mesa, Manila</li>
                <li>Philippines</li>
                <li>contact@everlink.com</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>© 2025 EverLink Telecom Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
