import type React from "react"
import { AdminAuthCheck } from "@/components/admin-auth-check"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminAuthCheck>{children}</AdminAuthCheck>
}
