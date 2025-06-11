import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            How EverLink Telecom Inc. handles your personal information
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300">
            EverLink Telecom Inc. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you apply for a position with
            our company.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
            do not access the application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Information We Collect</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We collect personal information that you voluntarily provide to us when you apply for a position, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Personal identification information (name, address, contact details)</li>
            <li>Educational background</li>
            <li>Employment history</li>
            <li>Character references</li>
            <li>Skills and qualifications</li>
            <li>Resume/CV and cover letter</li>
            <li>Any other information you choose to provide in your application</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">How We Use Your Information</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Processing your job application</li>
            <li>Communicating with you about your application status</li>
            <li>Evaluating your qualifications for employment</li>
            <li>Conducting background checks (with your consent)</li>
            <li>Complying with legal obligations</li>
            <li>Improving our recruitment processes</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Data Retention</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We will retain your application information for a period of one year after the position is filled or the
            application process ends. After this period, your information will be securely deleted unless we have a
            legitimate business purpose for retaining it or you have given us consent to keep your information for
            future opportunities.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Your Rights</h2>
          <p className="text-gray-700 dark:text-gray-300">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing your personal information</li>
            <li>Request transfer of your personal information</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            EverLink Telecom Inc.
            <br />
            Sta. Mesa, Manila
            <br />
            Philippines
            <br />
            Email: privacy@everlink.com
          </p>
        </section>

        <div className="pt-8">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
