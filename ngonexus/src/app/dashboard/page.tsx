"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Bell,
  Calendar,
  FileText,
  Filter,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  Users,
} from "lucide-react"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data for NGOs
  const ngoData = [
    { id: 1, name: "Global Health Initiative", type: "Healthcare", status: "Active", lastUpdated: "2025-03-01" },
    { id: 2, name: "Education for All", type: "Educational", status: "Pending Review", lastUpdated: "2025-02-28" },
    { id: 3, name: "Green Earth Alliance", type: "Environmental", status: "Active", lastUpdated: "2025-02-25" },
    {
      id: 4,
      name: "Human Rights Watch",
      type: "Human Rights",
      status: "Under Investigation",
      lastUpdated: "2025-02-20",
    },
    { id: 5, name: "Children's Aid Society", type: "Humanitarian", status: "Active", lastUpdated: "2025-02-15" },
  ]

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">NGO</span>Connect
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Dashboard
            </h2>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium bg-muted"
              >
                <Home className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/ngos"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Users className="h-4 w-4" />
                NGOs
              </Link>
              <Link
                href="/dashboard/reports"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <FileText className="h-4 w-4" />
                Reports
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="/dashboard/calendar"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </Link>
              <Link
                href="/dashboard/messages"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Settings</h2>
            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/logout"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[300px] rounded-full bg-muted"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-muted"></div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total NGOs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+5 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+2 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">-1 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">+87 this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All NGOs</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="investigation">Under Investigation</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                  <Link href="/dashboard/ngos/add">
                    <Button size="sm" className="h-8">
                      Add NGO
                    </Button>
                  </Link>
                </div>
              </div>
              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>NGO Directory</CardTitle>
                    <CardDescription>A list of all registered NGOs in the system.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-auto">
                      <table className="w-full min-w-[600px] text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2 pl-0">Name</th>
                            <th className="text-left font-medium p-2">Type</th>
                            <th className="text-left font-medium p-2">Status</th>
                            <th className="text-left font-medium p-2">Last Updated</th>
                            <th className="text-right font-medium p-2 pr-0">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ngoData.map((ngo) => (
                            <tr key={ngo.id} className="border-b">
                              <td className="p-2 pl-0">
                                <Link href={`/dashboard/ngos/${ngo.id}`} className="font-medium hover:underline">
                                  {ngo.name}
                                </Link>
                              </td>
                              <td className="p-2">{ngo.type}</td>
                              <td className="p-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    ngo.status === "Active"
                                      ? "bg-green-100 text-green-800"
                                      : ngo.status === "Pending Review"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {ngo.status}
                                </span>
                              </td>
                              <td className="p-2">{ngo.lastUpdated}</td>
                              <td className="p-2 pr-0 text-right">
                                <Link href={`/dashboard/ngos/${ngo.id}`}>
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active NGOs</CardTitle>
                    <CardDescription>NGOs that are currently active and in good standing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-auto">
                      <table className="w-full min-w-[600px] text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2 pl-0">Name</th>
                            <th className="text-left font-medium p-2">Type</th>
                            <th className="text-left font-medium p-2">Last Updated</th>
                            <th className="text-right font-medium p-2 pr-0">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ngoData
                            .filter((ngo) => ngo.status === "Active")
                            .map((ngo) => (
                              <tr key={ngo.id} className="border-b">
                                <td className="p-2 pl-0">
                                  <Link href={`/dashboard/ngos/${ngo.id}`} className="font-medium hover:underline">
                                    {ngo.name}
                                  </Link>
                                </td>
                                <td className="p-2">{ngo.type}</td>
                                <td className="p-2">{ngo.lastUpdated}</td>
                                <td className="p-2 pr-0 text-right">
                                  <Link href={`/dashboard/ngos/${ngo.id}`}>
                                    <Button variant="ghost" size="sm">
                                      View
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending NGOs</CardTitle>
                    <CardDescription>NGOs awaiting approval or additional documentation.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-auto">
                      <table className="w-full min-w-[600px] text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2 pl-0">Name</th>
                            <th className="text-left font-medium p-2">Type</th>
                            <th className="text-left font-medium p-2">Last Updated</th>
                            <th className="text-right font-medium p-2 pr-0">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ngoData
                            .filter((ngo) => ngo.status === "Pending Review")
                            .map((ngo) => (
                              <tr key={ngo.id} className="border-b">
                                <td className="p-2 pl-0">
                                  <Link href={`/dashboard/ngos/${ngo.id}`} className="font-medium hover:underline">
                                    {ngo.name}
                                  </Link>
                                </td>
                                <td className="p-2">{ngo.type}</td>
                                <td className="p-2">{ngo.lastUpdated}</td>
                                <td className="p-2 pr-0 text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm">
                                      Approve
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      View
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="investigation" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Under Investigation</CardTitle>
                    <CardDescription>NGOs currently under review for compliance issues.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-auto">
                      <table className="w-full min-w-[600px] text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2 pl-0">Name</th>
                            <th className="text-left font-medium p-2">Type</th>
                            <th className="text-left font-medium p-2">Last Updated</th>
                            <th className="text-right font-medium p-2 pr-0">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ngoData
                            .filter((ngo) => ngo.status === "Under Investigation")
                            .map((ngo) => (
                              <tr key={ngo.id} className="border-b">
                                <td className="p-2 pl-0">
                                  <Link href={`/dashboard/ngos/${ngo.id}`} className="font-medium hover:underline">
                                    {ngo.name}
                                  </Link>
                                </td>
                                <td className="p-2">{ngo.type}</td>
                                <td className="p-2">{ngo.lastUpdated}</td>
                                <td className="p-2 pr-0 text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm">
                                      Review
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      View
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

