import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
          <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Terms and conditions for using EverLink Telecom Inc.'s job application system
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300">
            These Terms of Service ("Terms") govern your use of the EverLink Telecom Inc. job application system. By
            accessing or using our application system, you agree to be bound by these Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Use of the Application System</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Our job application system is provided for the purpose of allowing individuals to apply for employment
            opportunities at EverLink Telecom Inc. You agree to use the system only for its intended purpose and in
            compliance with all applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Account Responsibility</h2>
          <p className="text-gray-700 dark:text-gray-300">
            You are responsible for maintaining the confidentiality of your application information and for all
            activities that occur under your application. You agree to notify us immediately of any unauthorized use of
            your application or any other breach of security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Accuracy of Information</h2>
          <p className="text-gray-700 dark:text-gray-300">
            You agree to provide accurate, current, and complete information in your job application. Providing false or
            misleading information may result in the rejection of your application or termination of employment if
            discovered after hiring.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Intellectual Property</h2>
          <p className="text-gray-700 dark:text-gray-300">
            The content, organization, graphics, design, and other matters related to the application system are
            protected under applicable copyrights, trademarks, and other proprietary rights. Copying, redistributing,
            using, or publishing any such matters or any part of the application system is strictly prohibited without
            our prior written consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Limitation of Liability</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To the maximum extent permitted by law, EverLink Telecom Inc. shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
            from your access to or use of or inability to access or use the application system.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Changes to Terms</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to modify these Terms at any time. We will provide notice of any material changes by
            posting the new Terms on the application system. Your continued use of the application system after such
            modifications will constitute your acknowledgment of the modified Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            EverLink Telecom Inc.
            <br />
            Sta. Mesa, Manila
            <br />
            Philippines
            <br />
            Email: legal@everlink.com
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
