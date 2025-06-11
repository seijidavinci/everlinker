import { Loader2 } from "lucide-react"

export default function AdminDashboardLoading() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    </div>
  )
}
