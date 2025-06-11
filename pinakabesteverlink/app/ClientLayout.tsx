"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { StorageInitializer } from "@/components/storage-initializer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <StorageInitializer />
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  )
}

function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col theme-transition">
      <Header mounted={mounted} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function Header({
  mounted,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mounted: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Apply", href: "/apply" },
    { name: "Application Status", href: "/status" },
    { name: "Admin", href: "/admin" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm dark:dark-mode-shadow theme-transition">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary dark:text-primary">EverLink Telecom Inc.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-foreground font-semibold dark:dark-mode-glow" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {mounted && <ThemeToggle />}
          <Link href="/apply" className="hidden md:block">
            <Button>Apply Now</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t theme-transition">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-foreground font-semibold dark:dark-mode-glow" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2">Apply Now</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-background py-6 dark:dark-mode-border theme-transition">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EverLink Telecom Inc. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
