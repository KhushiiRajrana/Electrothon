"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, BarChart2, Download, Filter } from "lucide-react"

// Mock NGO data for comparison
const ngosData = [
  {
    id: "1",
    name: "Global Health Initiative",
    category: "Health",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 245,
    established: "2015",
    location: "New York, USA",
    projects: 12,
    funding: "$1.2M",
    impact: "50,000 beneficiaries",
    compliance: "High",
    activityLevel: "High",
    engagement: 42,
    posts: 15,
    lastActive: "2 days ago",
  },
  {
    id: "2",
    name: "Education for All",
    category: "Education",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 189,
    established: "2017",
    location: "Chicago, USA",
    projects: 8,
    funding: "$850K",
    impact: "12,000 students",
    compliance: "Medium",
    activityLevel: "Medium",
    engagement: 78,
    posts: 10,
    lastActive: "3 days ago",
  },
  {
    id: "3",
    name: "Green Earth Alliance",
    category: "Environment",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 156,
    established: "2019",
    location: "Seattle, USA",
    projects: 5,
    funding: "$450K",
    impact: "1,000 acres preserved",
    compliance: "High",
    activityLevel: "High",
    engagement: 105,
    posts: 20,
    lastActive: "4 days ago",
  },
  {
    id: "4",
    name: "Women Empowerment Network",
    category: "Women",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 210,
    established: "2016",
    location: "Boston, USA",
    projects: 9,
    funding: "$780K",
    impact: "5,000 women trained",
    compliance: "Medium",
    activityLevel: "Medium",
    engagement: 67,
    posts: 12,
    lastActive: "5 days ago",
  },
  {
    id: "5",
    name: "Children's Aid Society",
    category: "Children",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 189,
    established: "2018",
    location: "Los Angeles, USA",
    projects: 7,
    funding: "$620K",
    impact: "8,500 children supported",
    compliance: "High",
    activityLevel: "Medium",
    engagement: 54,
    posts: 8,
    lastActive: "1 week ago",
  },
]

export default function ComparePage() {
  const [selectedNGOs, setSelectedNGOs] = useState<string[]>(["1", "2", "3"])
  const [category, setCategory] = useState<string>("all")
  const [comparisonMetric, setComparisonMetric] = useState<string>("impact")

  const filteredNGOs =
    category === "all" ? ngosData : ngosData.filter((ngo) => ngo.category.toLowerCase() === category.toLowerCase())

  const selectedNGOsData = ngosData.filter((ngo) => selectedNGOs.includes(ngo.id))

  const handleNGOSelection = (ngoId: string) => {
    if (selectedNGOs.includes(ngoId)) {
      setSelectedNGOs(selectedNGOs.filter((id) => id !== ngoId))
    } else {
      if (selectedNGOs.length < 3) {
        setSelectedNGOs([...selectedNGOs, ngoId])
      }
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/feed">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Compare NGOs</h1>
          <p className="text-muted-foreground">Analyze and compare NGOs to make informed decisions</p>
        </div>
        <div className="ml-auto">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter NGOs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="women">Women Empowerment</SelectItem>
                    <SelectItem value="children">Children's Welfare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="metric" className="text-sm font-medium">
                  Comparison Metric
                </label>
                <Select value={comparisonMetric} onValueChange={setComparisonMetric}>
                  <SelectTrigger id="metric" className="mt-1">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="impact">Impact</SelectItem>
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="activity">Activity Level</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected NGOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedNGOsData.map((ngo) => (
                  <div key={ngo.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={ngo.profileImage || "/placeholder.svg"}
                        alt={ngo.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="font-medium">{ngo.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleNGOSelection(ngo.id)}>
                      Remove
                    </Button>
                  </div>
                ))}

                {selectedNGOs.length === 0 && (
                  <p className="text-sm text-muted-foreground">No NGOs selected. Select up to 3 NGOs to compare.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Comparison Tabs */}
          <Tabs defaultValue="table">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>

              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>

            <TabsContent value="table" className="mt-4">
              {selectedNGOs.length > 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left p-2 border-b"></th>
                            {selectedNGOsData.map((ngo) => (
                              <th key={ngo.id} className="text-left p-2 border-b">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={ngo.profileImage || "/placeholder.svg"}
                                    alt={ngo.name}
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 rounded-full"
                                  />
                                  <div>
                                    <div>{ngo.name}</div>
                                    <Badge variant="outline" className="mt-1">
                                      {ngo.category}
                                    </Badge>
                                  </div>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border-b font-medium">Established</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.established}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Location</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.location}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Projects</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.projects}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Funding</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.funding}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Impact</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.impact}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Compliance</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                <Badge
                                  className={
                                    ngo.compliance === "High"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : ngo.compliance === "Medium"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {ngo.compliance}
                                </Badge>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Activity Level</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.activityLevel}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Engagement</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.engagement} avg. likes
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Posts</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.posts}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 border-b font-medium">Last Active</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2 border-b">
                                {ngo.lastActive}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-2 font-medium">Profile</td>
                            {selectedNGOsData.map((ngo) => (
                              <td key={ngo.id} className="p-2">
                                <Link href={`/profile/${ngo.id}`}>
                                  <Button size="sm">View Profile</Button>
                                </Link>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">Select NGOs to compare them</p>
                    <Button>Select NGOs</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chart" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">Chart visualization would appear here</p>
                      <p className="text-sm text-muted-foreground">Comparing {comparisonMetric} across selected NGOs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedNGOsData.map((ngo) => (
                  <Card key={ngo.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={ngo.profileImage || "/placeholder.svg"}
                          alt={ngo.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{ngo.name}</h3>
                          <Badge variant="outline">{ngo.category}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Established:</span>
                          <span>{ngo.established}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Projects:</span>
                          <span>{ngo.projects}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Funding:</span>
                          <span>{ngo.funding}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Impact:</span>
                          <span>{ngo.impact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Compliance:</span>
                          <Badge
                            className={
                              ngo.compliance === "High"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : ngo.compliance === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {ngo.compliance}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link href={`/profile/${ngo.id}`}>
                          <Button className="w-full">View Profile</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {selectedNGOs.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground mb-4">Select NGOs to compare them</p>
                      <Button>Select NGOs</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Available NGOs */}
          <Card>
            <CardHeader>
              <CardTitle>Available NGOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNGOs.map((ngo) => (
                  <div key={ngo.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ngo-${ngo.id}`}
                      checked={selectedNGOs.includes(ngo.id)}
                      onCheckedChange={() => handleNGOSelection(ngo.id)}
                      disabled={!selectedNGOs.includes(ngo.id) && selectedNGOs.length >= 3}
                    />
                    <label htmlFor={`ngo-${ngo.id}`} className="flex items-center gap-2 flex-1 cursor-pointer">
                      <Image
                        src={ngo.profileImage || "/placeholder.svg"}
                        alt={ngo.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{ngo.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {ngo.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{ngo.followers} followers</span>
                        </div>
                      </div>
                      <Link href={`/profile/${ngo.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

