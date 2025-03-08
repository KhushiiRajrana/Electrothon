"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, MessageSquare, Share2, Search, Filter, Bell, User, LogOut, BarChart2, ChevronDown } from "lucide-react"

// Mock NGO data for the feed
const ngoPostsData = [
  {
    id: "1",
    ngo: {
      id: "1",
      name: "Global Health Initiative",
      category: "Health",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    content:
      "We're excited to announce the launch of our new mobile health clinic in rural Kenya! This initiative will provide essential healthcare services to over 5,000 people who previously had to travel more than 50km to reach the nearest medical facility.",
    images: ["/placeholder.svg?height=400&width=600"],
    likes: 42,
    comments: 8,
    date: "2 days ago",
  },
  {
    id: "2",
    ngo: {
      id: "2",
      name: "Education for All",
      category: "Education",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    content:
      "Today we distributed 500 school kits to children in underserved communities. Each kit contains textbooks, notebooks, and essential school supplies. Education is a fundamental right for every child! #EducationForAll",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    likes: 78,
    comments: 15,
    date: "3 days ago",
  },
  {
    id: "3",
    ngo: {
      id: "3",
      name: "Green Earth Alliance",
      category: "Environment",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    content:
      "Our team planted 1,000 trees this weekend as part of our reforestation project. Special thanks to all the volunteers who made this possible! Together, we're fighting climate change one tree at a time. 🌳 #ClimateAction",
    images: ["/placeholder.svg?height=400&width=600"],
    likes: 105,
    comments: 23,
    date: "4 days ago",
  },
  {
    id: "4",
    ngo: {
      id: "4",
      name: "Women Empowerment Network",
      category: "Women",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    content:
      "We just completed our quarterly skills training program for 50 women entrepreneurs. The program covered business planning, financial management, and digital marketing. Proud to see these women taking charge of their economic future!",
    images: [],
    likes: 67,
    comments: 12,
    date: "5 days ago",
  },
  {
    id: "5",
    ngo: {
      id: "1",
      name: "Global Health Initiative",
      category: "Health",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    content:
      "Our team conducted a successful vaccination drive in partnership with the local health department, reaching over 200 children in a single day. #HealthForAll #Vaccines",
    images: ["/placeholder.svg?height=400&width=600"],
    likes: 36,
    comments: 5,
    date: "1 week ago",
  },
]

// Mock NGO list for suggestions
const suggestedNGOs = [
  {
    id: "5",
    name: "Children's Aid Society",
    category: "Children",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 189,
  },
  {
    id: "6",
    name: "Disaster Relief Network",
    category: "Disaster",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 245,
  },
  {
    id: "7",
    name: "Food Security Alliance",
    category: "Poverty",
    profileImage: "/placeholder.svg?height=200&width=200",
    followers: 156,
  },
]

export default function FeedPage() {
  const [posts, setPosts] = useState(ngoPostsData)
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState("all")
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false)
  const [selectedNGOs, setSelectedNGOs] = useState<string[]>([])

  const handleLikePost = (postId: string) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const filterPostsByCategory = (category: string) => {
    setActiveCategory(category)
    if (category === "all") {
      setPosts(ngoPostsData)
    } else {
      setPosts(ngoPostsData.filter((post) => post.ngo.category.toLowerCase() === category.toLowerCase()))
    }
  }

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
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/">
              <span className="text-primary">NGO</span>Connect
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 px-4 mx-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search NGOs or posts..."
                className="w-full pl-8 rounded-full bg-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Link href="/logout">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <Link
                    href="/feed"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-muted"
                  >
                    <BarChart2 className="h-4 w-4" />
                    Feed
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <DialogTrigger asChild onClick={() => setIsCompareDialogOpen(true)}>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <BarChart2 className="h-4 w-4" />
                      Compare NGOs
                    </Button>
                  </DialogTrigger>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-3 px-3">Categories</h3>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className={`justify-start px-3 py-2 text-sm font-medium ${activeCategory === "all" ? "bg-muted" : "text-muted-foreground"}`}
                      onClick={() => filterPostsByCategory("all")}
                    >
                      All Categories
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start px-3 py-2 text-sm font-medium ${activeCategory === "education" ? "bg-muted" : "text-muted-foreground"}`}
                      onClick={() => filterPostsByCategory("education")}
                    >
                      Education
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start px-3 py-2 text-sm font-medium ${activeCategory === "health" ? "bg-muted" : "text-muted-foreground"}`}
                      onClick={() => filterPostsByCategory("health")}
                    >
                      Health
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start px-3 py-2 text-sm font-medium ${activeCategory === "environment" ? "bg-muted" : "text-muted-foreground"}`}
                      onClick={() => filterPostsByCategory("environment")}
                    >
                      Environment
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start px-3 py-2 text-sm font-medium ${activeCategory === "women" ? "bg-muted" : "text-muted-foreground"}`}
                      onClick={() => filterPostsByCategory("women")}
                    >
                      Women Empowerment
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start px-3 py-2 text-sm font-medium ${activeCategory === "children" ? "bg-muted" : "text-muted-foreground"}`}
                      onClick={() => filterPostsByCategory("children")}
                    >
                      Children's Welfare
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start px-3 py-2 text-sm font-medium text-muted-foreground"
                    >
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Show More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="md:col-span-2 space-y-6">
            {/* Mobile Search and Filter */}
            <div className="md:hidden space-y-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search NGOs or posts..."
                  className="w-full pl-8 rounded-full bg-muted"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterPostsByCategory("all")}
                >
                  All
                </Button>
                <Button
                  variant={activeCategory === "education" ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterPostsByCategory("education")}
                >
                  Education
                </Button>
                <Button
                  variant={activeCategory === "health" ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterPostsByCategory("health")}
                >
                  Health
                </Button>
                <Button
                  variant={activeCategory === "environment" ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterPostsByCategory("environment")}
                >
                  Environment
                </Button>
                <Button
                  variant={activeCategory === "women" ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterPostsByCategory("women")}
                >
                  Women
                </Button>
              </div>
            </div>

            {/* Feed Tabs */}
            <Tabs defaultValue="latest">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>

                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <TabsContent value="latest" className="mt-4 space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <Link href={`/profile/${post.ngo.id}`}>
                            <Image
                              src={post.ngo.profileImage || "/placeholder.svg"}
                              alt={post.ngo.name}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full"
                            />
                          </Link>
                          <div>
                            <Link href={`/profile/${post.ngo.id}`}>
                              <h3 className="font-medium hover:underline">{post.ngo.name}</h3>
                            </Link>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {post.ngo.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{post.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="whitespace-pre-line">{post.content}</p>
                        </div>
                      </div>

                      {post.images.length > 0 && (
                        <div className={`grid ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-1`}>
                          {post.images.map((img, index) => (
                            <div key={index} className="aspect-video overflow-hidden">
                              <Image
                                src={img || "/placeholder.svg"}
                                alt={`Post image ${index + 1}`}
                                width={600}
                                height={400}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-4 pt-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{post.likes + (isLiked[post.id] ? 1 : 0)} likes</span>
                          <span>{post.comments} comments</span>
                        </div>

                        <Separator className="my-2" />

                        <div className="flex justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`gap-2 ${isLiked[post.id] ? "text-primary" : ""}`}
                            onClick={() => handleLikePost(post.id)}
                          >
                            <Heart className="h-4 w-4" fill={isLiked[post.id] ? "currentColor" : "none"} />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="mt-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Trending posts will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="mt-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Follow NGOs to see their posts here.</p>
                    <Button className="mt-4">Discover NGOs</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">NGOs to Follow</h3>
                <div className="space-y-4">
                  {suggestedNGOs.map((ngo) => (
                    <div key={ngo.id} className="flex items-center gap-3">
                      <Link href={`/profile/${ngo.id}`}>
                        <Image
                          src={ngo.profileImage || "/placeholder.svg"}
                          alt={ngo.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/profile/${ngo.id}`}>
                          <h4 className="font-medium text-sm truncate hover:underline">{ngo.name}</h4>
                        </Link>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {ngo.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{ngo.followers} followers</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-2">
                  View More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Government Resources</h3>
                <div className="space-y-2">
                  <Link href="#" className="text-sm text-primary hover:underline block">
                    NGO Registration Guidelines
                  </Link>
                  <Link href="#" className="text-sm text-primary hover:underline block">
                    Funding Opportunities
                  </Link>
                  <Link href="#" className="text-sm text-primary hover:underline block">
                    Compliance Requirements
                  </Link>
                  <Link href="#" className="text-sm text-primary hover:underline block">
                    Annual Reporting Templates
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Compare NGOs Dialog */}
      <Dialog open={isCompareDialogOpen} onOpenChange={setIsCompareDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Compare NGOs</DialogTitle>
            <DialogDescription>Select up to 3 NGOs to compare their activities and impact</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <h3 className="font-medium mb-3">Select NGOs to Compare</h3>
            <div className="space-y-3">
              {[...suggestedNGOs, ...ngoPostsData.map((post) => post.ngo)]
                .filter((ngo, index, self) => index === self.findIndex((n) => n.id === ngo.id))
                .map((ngo) => (
                  <div key={ngo.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ngo-${ngo.id}`}
                      checked={selectedNGOs.includes(ngo.id)}
                      onCheckedChange={() => handleNGOSelection(ngo.id)}
                      disabled={!selectedNGOs.includes(ngo.id) && selectedNGOs.length >= 3}
                    />
                    <label htmlFor={`ngo-${ngo.id}`} className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={ngo.profileImage || "/placeholder.svg"}
                        alt={ngo.name}
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full"
                      />
                      <span>{ngo.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {ngo.category}
                      </Badge>
                    </label>
                  </div>
                ))}
            </div>

            {selectedNGOs.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-2 border-b"></th>
                        {selectedNGOs.map((id) => {
                          const ngo = [...suggestedNGOs, ...ngoPostsData.map((post) => post.ngo)].find(
                            (n) => n.id === id,
                          )
                          return (
                            <th key={id} className="text-left p-2 border-b">
                              <div className="flex items-center gap-2">
                                <Image
                                  src={ngo?.profileImage || ""}
                                  alt={ngo?.name || ""}
                                  width={24}
                                  height={24}
                                  className="h-6 w-6 rounded-full"
                                />
                                <span>{ngo?.name}</span>
                              </div>
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-b font-medium">Category</td>
                        {selectedNGOs.map((id) => {
                          const ngo = [...suggestedNGOs, ...ngoPostsData.map((post) => post.ngo)].find(
                            (n) => n.id === id,
                          )
                          return (
                            <td key={id} className="p-2 border-b">
                              <Badge variant="outline">{ngo?.category}</Badge>
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 border-b font-medium">Activity Level</td>
                        {selectedNGOs.map((id) => {
                          const postCount = ngoPostsData.filter((post) => post.ngo.id === id).length
                          return (
                            <td key={id} className="p-2 border-b">
                              {postCount > 2 ? "High" : postCount > 0 ? "Medium" : "Low"}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 border-b font-medium">Engagement</td>
                        {selectedNGOs.map((id) => {
                          const posts = ngoPostsData.filter((post) => post.ngo.id === id)
                          const avgLikes =
                            posts.length > 0
                              ? Math.round(posts.reduce((sum, post) => sum + post.likes, 0) / posts.length)
                              : 0
                          return (
                            <td key={id} className="p-2 border-b">
                              {avgLikes > 50 ? "High" : avgLikes > 20 ? "Medium" : "Low"}
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        <td className="p-2 border-b font-medium">Profile</td>
                        {selectedNGOs.map((id) => (
                          <td key={id} className="p-2 border-b">
                            <Link href={`/profile/${id}`}>
                              <Button size="sm" variant="outline">
                                View Profile
                              </Button>
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompareDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                // In a real app, you might generate a detailed report here
                setIsCompareDialogOpen(false)
              }}
              disabled={selectedNGOs.length === 0}
            >
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

