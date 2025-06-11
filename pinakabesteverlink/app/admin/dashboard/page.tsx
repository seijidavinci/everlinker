"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, isAfter, sub } from "date-fns"
import {
  CheckCircle,
  Clock,
  Filter,
  LogOut,
  RefreshCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Download,
  Eye,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  getFullApplicationDetails,
  exportApplicationsCSV,
  exportStatisticsCSV,
} from "@/app/actions/admin-actions"
import { ApplicationDetailsDialog } from "@/components/application-details-dialog"

// Define application type based on our database schema
type Application = {
  app_id: string
  submission_date: string
  status: string
  personal_profiles: {
    name: string
    cellphone_number: string
    email: string
  }
}

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null)
  const [newStatus, setNewStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedApplicationData, setSelectedApplicationData] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [chartData, setChartData] = useState<any>({
    statusData: [],
    monthlyData: [],
  })
  const router = useRouter()

  const itemsPerPage = 10
  const oneYearAgo = sub(new Date(), { years: 1 })

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications()
  }, [])

  // Apply filters when search term or status filter changes
  useEffect(() => {
    applyFilters()
    prepareChartData()
  }, [searchTerm, statusFilter, applications])

  const fetchApplications = async () => {
    setIsLoading(true)
    try {
      const result = await getApplications()
      if (result.success) {
        setApplications(result.data)
      } else {
        console.error("Failed to fetch applications:", result.error)
      }
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...applications]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (app) => app.personal_profiles.name.toLowerCase().includes(term) || app.app_id.toLowerCase().includes(term),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleUpdateStatus = async () => {
    if (!selectedApplication || !newStatus) return

    setIsUpdating(true)
    try {
      const result = await updateApplicationStatus(selectedApplication.app_id, newStatus)
      if (result.success) {
        // Update local state
        const updatedApplications = applications.map((app) =>
          app.app_id === selectedApplication.app_id ? { ...app, status: newStatus } : app,
        )
        setApplications(updatedApplications)
        setIsUpdateDialogOpen(false)
      } else {
        console.error("Failed to update status:", result.error)
      }
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteApplication = async () => {
    if (!applicationToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteApplication(applicationToDelete.app_id)
      if (result.success) {
        // Remove from local state
        const updatedApplications = applications.filter((app) => app.app_id !== applicationToDelete.app_id)
        setApplications(updatedApplications)
        setIsDeleteDialogOpen(false)
        setApplicationToDelete(null)
      } else {
        console.error("Failed to delete application:", result.error)
      }
    } catch (error) {
      console.error("Error deleting application:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated")
    router.push("/admin")
  }

  const handleViewApplication = async (applicationId: string) => {
    setIsLoadingDetails(true)
    try {
      const result = await getFullApplicationDetails(applicationId)
      if (result.success) {
        setSelectedApplicationData(result.data)
        setIsDetailsDialogOpen(true)
      } else {
        console.error("Failed to fetch application details:", result.error)
      }
    } catch (error) {
      console.error("Error fetching application details:", error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  const handleExportApplications = async () => {
    setIsExporting(true)
    try {
      const result = await exportApplicationsCSV()
      if (result.success) {
        const blob = new Blob([result.data], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `applications_${format(new Date(), "yyyy-MM-dd")}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error("Failed to export applications:", result.error)
      }
    } catch (error) {
      console.error("Error exporting applications:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportStatistics = async () => {
    setIsExporting(true)
    try {
      const result = await exportStatisticsCSV()
      if (result.success) {
        const blob = new Blob([result.data], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `statistics_${format(new Date(), "yyyy-MM-dd")}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error("Failed to export statistics:", result.error)
      }
    } catch (error) {
      console.error("Error exporting statistics:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const prepareChartData = () => {
    // Status distribution for pie chart
    const statusCounts = applications.reduce((acc: any, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    }, {})

    const statusData = Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color: getStatusColor(status),
    }))

    // Monthly submissions for line chart
    const monthlySubmissions = applications.reduce((acc: any, app) => {
      const month = format(new Date(app.submission_date), "MMM yyyy")
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {})

    const monthlyData = Object.entries(monthlySubmissions)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([month, count]) => ({
        month,
        applications: count,
      }))

    setChartData({ statusData, monthlyData })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "#3b82f6"
      case "Under Review":
        return "#eab308"
      case "Shortlisted":
        return "#22c55e"
      case "Interview Scheduled":
        return "#a855f7"
      case "Rejected":
        return "#ef4444"
      case "Offer":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredApplications.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Submitted
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            Under Review
          </Badge>
        )
      case "Shortlisted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Shortlisted
          </Badge>
        )
      case "Interview Scheduled":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Interview
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Rejected
          </Badge>
        )
      case "Offer":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
            Offer
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const isApplicationOld = (submissionDate: string) => {
    const date = new Date(submissionDate)
    return isAfter(oneYearAgo, date)
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage job applications</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Application Management</CardTitle>
                  <CardDescription>View and manage all job applications</CardDescription>
                </div>
                <Button variant="outline" onClick={handleExportApplications} disabled={isExporting}>
                  <Download className="mr-2 h-4 w-4" />
                  {isExporting ? "Exporting..." : "Export CSV"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or application ID"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-[180px]">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" onClick={fetchApplications}>
                    <RefreshCcw className="h-4 w-4" />
                    <span className="sr-only">Refresh</span>
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Clock className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Application ID</TableHead>
                          <TableHead>Submission Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentItems.length > 0 ? (
                          currentItems.map((application) => {
                            const isOld = isApplicationOld(application.submission_date)
                            return (
                              <TableRow
                                key={application.app_id}
                                className={isOld ? "bg-red-50 dark:bg-red-900/20" : ""}
                              >
                                <TableCell className="font-medium">{application.personal_profiles.name}</TableCell>
                                <TableCell>{application.app_id}</TableCell>
                                <TableCell>
                                  {format(new Date(application.submission_date), "MMM d, yyyy")}
                                  {isOld && <span className="ml-2 text-red-500 text-xs">(Over 1 year old)</span>}
                                </TableCell>
                                <TableCell>{getStatusBadge(application.status)}</TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    <div>{application.personal_profiles.email}</div>
                                    <div className="text-muted-foreground">
                                      {application.personal_profiles.cellphone_number}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewApplication(application.app_id)}
                                      disabled={isLoadingDetails}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedApplication(application)
                                        setNewStatus(application.status)
                                        setIsUpdateDialogOpen(true)
                                      }}
                                    >
                                      Update Status
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setApplicationToDelete(application)
                                        setIsDeleteDialogOpen(true)
                                      }}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No applications found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {filteredApplications.length > 0 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredApplications.length)} of{" "}
                        {filteredApplications.length} entries
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous</span>
                        </Button>
                        <div className="text-sm">
                          Page {currentPage} of {totalPages || 1}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages || totalPages === 0}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Application Statistics</CardTitle>
                    <CardDescription>Overview of application data</CardDescription>
                  </div>
                  <Button variant="outline" onClick={handleExportStatistics} disabled={isExporting}>
                    <Download className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export Statistics CSV"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{applications.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {applications.filter((app) => app.status === "Submitted").length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {
                          applications.filter(
                            (app) => app.status === "Shortlisted" || app.status === "Interview Scheduled",
                          ).length
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Status Distribution Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData.statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.statusData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Monthly Submissions Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData.monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="applications" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Submissions Trend Line Chart */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Submissions Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Status Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>Change the status for application {selectedApplication?.app_id}</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Applicant</p>
              <p>{selectedApplication?.personal_profiles.name}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Current Status</p>
              <p>{selectedApplication?.status}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">New Status</p>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update Status
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the application for{" "}
              <strong>{applicationToDelete?.personal_profiles.name}</strong>? This action cannot be undone and will
              permanently remove all associated data including education, employment, and character references.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteApplication}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Application
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Application Details Dialog */}
      <ApplicationDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        applicationData={selectedApplicationData}
      />
    </div>
  )
}
