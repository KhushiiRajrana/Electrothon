"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Download,
  FileText,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"

export default function NGODetailsPage({ params }: { params: { id: string } }) {
  // Mock data for a single NGO
  const ngo = {
    id: params.id,
    name: "Global Health Initiative",
    type: "Healthcare",
    status: "Active",
    registrationNumber: "NGO-2025-001",
    registrationDate: "2023-01-15",
    address: "123 Main Street, Cityville, Country",
    phone: "+1 (555) 123-4567",
    email: "contact@globalhealthinitiative.org",
    website: "https://www.globalhealthinitiative.org",
    mission:
      "To improve healthcare access in underserved communities worldwide through sustainable programs and partnerships.",
    director: "Dr. Jane Smith",
    employees: 45,
    volunteers: 120,
    fundingSources: ["Government Grants", "Private Donations", "Corporate Sponsorships"],
    operatingAreas: ["Africa", "South Asia", "Latin America"],
    lastReportDate: "2025-02-15",
    complianceStatus: "Compliant",
    documents: [
      { id: 1, name: "Annual Report 2024", type: "PDF", date: "2025-01-30" },
      { id: 2, name: "Financial Statement Q4 2024", type: "PDF", date: "2025-01-15" },
      { id: 3, name: "Project Impact Assessment", type: "DOCX", date: "2024-12-10" },
      { id: 4, name: "Registration Certificate", type: "PDF", date: "2023-01-15" },
    ],
    projects: [
      { id: 1, name: "Rural Health Clinics", status: "Active", location: "Kenya", budget: "$250,000" },
      { id: 2, name: "Medical Training Program", status: "Active", location: "India", budget: "$175,000" },
      { id: 3, name: "Vaccination Campaign", status: "Completed", location: "Brazil", budget: "$120,000" },
      { id: 4, name: "Healthcare Technology Initiative", status: "Planning", location: "Multiple", budget: "$300,000" },
    ],
    timeline: [
      { date: "2025-02-15", event: "Quarterly Report Submitted", type: "report" },
      { date: "2025-01-30", event: "Annual Audit Completed", type: "audit" },
      { date: "2024-12-05", event: "Compliance Review", type: "review" },
      { date: "2024-11-10", event: "Project Funding Approved", type: "funding" },
      { date: "2024-10-20", event: "Site Inspection", type: "inspection" },
      { date: "2024-09-15", event: "Quarterly Report Submitted", type: "report" },
    ],
  }

  return (
    <div className="container py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{ngo.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{ngo.type}</Badge>
            <Badge
              className={
                ngo.status === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : ngo.status === "Pending Review"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {ngo.status}
            </Badge>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Flag for Review</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-[120px_1fr] items-start pb-2 border-b">
                  <span className="font-medium text-muted-foreground">Registration #:</span>
                  <span>{ngo.registrationNumber}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start pb-2 border-b">
                  <span className="font-medium text-muted-foreground">Registered On:</span>
                  <span>{ngo.registrationDate}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start pb-2 border-b">
                  <span className="font-medium text-muted-foreground">Address:</span>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                    <span>{ngo.address}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start pb-2 border-b">
                  <span className="font-medium text-muted-foreground">Phone:</span>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{ngo.phone}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start pb-2 border-b">
                  <span className="font-medium text-muted-foreground">Email:</span>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{ngo.email}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start pb-2 border-b">
                  <span className="font-medium text-muted-foreground">Website:</span>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={ngo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {ngo.website}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start">
                  <span className="font-medium text-muted-foreground">Director:</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <span>{ngo.director}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mission & Scope</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Mission Statement</h3>
                  <p className="text-muted-foreground">{ngo.mission}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Operating Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {ngo.operatingAreas.map((area, index) => (
                      <Badge key={index} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Funding Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {ngo.fundingSources.map((source, index) => (
                      <Badge key={index} variant="outline">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <Users className="h-5 w-5 mb-2 text-muted-foreground" />
                    <span className="text-2xl font-bold">{ngo.employees}</span>
                    <span className="text-sm text-muted-foreground">Employees</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <Users className="h-5 w-5 mb-2 text-muted-foreground" />
                    <span className="text-2xl font-bold">{ngo.volunteers}</span>
                    <span className="text-sm text-muted-foreground">Volunteers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Current and past projects managed by this NGO</CardDescription>
              </div>
              <Button>Add Project</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2 pl-0">Project Name</th>
                      <th className="text-left font-medium p-2">Status</th>
                      <th className="text-left font-medium p-2">Location</th>
                      <th className="text-left font-medium p-2">Budget</th>
                      <th className="text-right font-medium p-2 pr-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngo.projects.map((project) => (
                      <tr key={project.id} className="border-b">
                        <td className="p-2 pl-0 font-medium">{project.name}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              project.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : project.status === "Completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="p-2">{project.location}</td>
                        <td className="p-2">{project.budget}</td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Official documents and reports</CardDescription>
              </div>
              <Button>Upload Document</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2 pl-0">Document Name</th>
                      <th className="text-left font-medium p-2">Type</th>
                      <th className="text-left font-medium p-2">Date</th>
                      <th className="text-right font-medium p-2 pr-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngo.documents.map((doc) => (
                      <tr key={doc.id} className="border-b">
                        <td className="p-2 pl-0">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="p-2">{doc.type}</td>
                        <td className="p-2">{doc.date}</td>
                        <td className="p-2 pr-0 text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Compliant</h3>
                  <p className="text-muted-foreground mb-4">
                    This organization is currently in compliance with all regulations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">Last Report</span>
                      <span className="font-medium">{ngo.lastReportDate}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">Next Due</span>
                      <span className="font-medium">2025-05-15</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <div className="rounded-full bg-green-100 p-1.5 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Annual Audit Completed</h4>
                      <p className="text-sm text-muted-foreground">All financial records were found to be in order.</p>
                      <p className="text-xs text-muted-foreground mt-1">January 30, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <div className="rounded-full bg-green-100 p-1.5 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Quarterly Report Submitted</h4>
                      <p className="text-sm text-muted-foreground">Q4 2024 report submitted on time.</p>
                      <p className="text-xs text-muted-foreground mt-1">February 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <div className="rounded-full bg-yellow-100 p-1.5 mt-0.5">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Document Update Requested</h4>
                      <p className="text-sm text-muted-foreground">
                        Additional information requested for project funding.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">December 10, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-red-100 p-1.5 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Late Submission Warning</h4>
                      <p className="text-sm text-muted-foreground">Q3 2024 report was submitted 5 days late.</p>
                      <p className="text-xs text-muted-foreground mt-1">October 20, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>History of events, reports, and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l">
                {ngo.timeline.map((item, index) => (
                  <div key={index} className="mb-6 relative">
                    <div className="absolute -left-[41px] rounded-full bg-background p-1 border">
                      {item.type === "report" && <FileText className="h-4 w-4 text-blue-500" />}
                      {item.type === "audit" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      {item.type === "review" && <Users className="h-4 w-4 text-purple-500" />}
                      {item.type === "funding" && <Download className="h-4 w-4 text-amber-500" />}
                      {item.type === "inspection" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.event}</h4>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

