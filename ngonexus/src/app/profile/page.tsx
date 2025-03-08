"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Edit,
  ImageIcon,
  Plus,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Share2,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock NGO data
const ngoData = {
  id: "1",
  name: "Global Health Initiative",
  category: "Health",
  profileImage: "/placeholder.svg?height=200&width=200",
  coverImage: "/placeholder.svg?height=400&width=1200",
  mission:
    "To improve healthcare access in underserved communities worldwide through sustainable programs and partnerships.",
  bio: "Global Health Initiative was founded in 2015 with a mission to bridge healthcare gaps in underserved communities. We work with local partners to establish sustainable healthcare solutions, train healthcare workers, and provide essential medical supplies. Our programs have reached over 50,000 people across 12 countries.",
  location: "New York, USA",
  email: "contact@globalhealthinitiative.org",
  phone: "+1 (555) 123-4567",
  website: "https://www.globalhealthinitiative.org",
  facebook: "facebook.com/globalhealthinitiative",
  twitter: "@globalhealth",
  linkedin: "linkedin.com/company/global-health-initiative",
  instagram: "@globalhealth",
  followers: 245,
  following: 78,
  posts: [
    {
      id: "1",
      content:
        "We're excited to announce the launch of our new mobile health clinic in rural Kenya! This initiative will provide essential healthcare services to over 5,000 people who previously had to travel more than 50km to reach the nearest medical facility.",
      images: ["/placeholder.svg?height=400&width=600"],
      likes: 42,
      comments: 8,
      date: "2 days ago",
    },
    {
      id: "2",
      content:
        "Our team conducted a successful vaccination drive in partnership with the local health department, reaching over 200 children in a single day. #HealthForAll #Vaccines",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 36,
      comments: 5,
      date: "1 week ago",
    },
    {
      id: "3",
      content:
        "Thank you to all our donors and supporters who made our annual fundraising gala a huge success! Together, we raised over $50,000 for our healthcare programs.",
      images: [],
      likes: 89,
      comments: 12,
      date: "2 weeks ago",
    },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImages, setNewPostImages] = useState<string[]>([])
  const [posts, setPosts] = useState(ngoData.posts)
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({})

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: `post-${Date.now()}`,
        content: newPostContent,
        images: newPostImages,
        likes: 0,
        comments: 0,
        date: "Just now",
      }

      setPosts([newPost, ...posts])
      setNewPostContent("")
      setNewPostImages([])
      setIsPostDialogOpen(false)
    }
  }

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handleLikePost = (postId: string) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  // Mock function for image upload
  const handleImageUpload = () => {
    // In a real app, you would upload the file to a server
    // For demo purposes, we'll use a placeholder
    setNewPostImages([...newPostImages, "/placeholder.svg?height=400&width=600"])
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Cover and Profile Section */}
      <div className="relative">
        <div className="h-[250px] w-full overflow-hidden">
          <Image
            src={ngoData.coverImage || "/placeholder.svg"}
            alt="Cover"
            width={1200}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <div className="container relative">
          <div className="absolute -top-16 left-4 h-32 w-32 overflow-hidden rounded-full border-4 border-background">
            <Image
              src={ngoData.profileImage || "/placeholder.svg"}
              alt="Profile"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-20 pb-4">
            <div>
              <h1 className="text-2xl font-bold">{ngoData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge>{ngoData.category}</Badge>
                <span className="text-sm text-muted-foreground">{ngoData.followers} followers</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button size="sm">Follow</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Mission</h3>
                    <p className="text-muted-foreground">{ngoData.mission}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Bio</h3>
                    <p className="text-muted-foreground">{ngoData.bio}</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{ngoData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{ngoData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{ngoData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={ngoData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {ngoData.website}
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Social Media</h3>
                    <div className="flex gap-3">
                      <a
                        href={`https://${ngoData.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://twitter.com/${ngoData.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://${ngoData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://instagram.com/${ngoData.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Create Post Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={ngoData.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <Button
                    variant="outline"
                    className="w-full justify-start text-muted-foreground font-normal"
                    onClick={() => setIsPostDialogOpen(true)}
                  >
                    Share an update about your work...
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Posts, About, etc. */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-4 mt-4">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Image
                              src={ngoData.profileImage || "/placeholder.svg"}
                              alt="Profile"
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <h3 className="font-medium">{ngoData.name}</h3>
                              <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Post</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>Delete Post</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

              <TabsContent value="projects" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Projects</h2>
                    <p className="text-muted-foreground">
                      No projects to display yet. Add your first project to showcase your work.
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Impact</h2>
                    <p className="text-muted-foreground">
                      Share your organization's impact metrics and success stories here.
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Impact Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Media Gallery</h2>
                    <p className="text-muted-foreground">
                      No media to display yet. Upload photos and videos to showcase your work.
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Media
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>Share an update about your organization's work</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="What would you like to share?"
              className="min-h-[150px]"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />

            {newPostImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {newPostImages.map((img, index) => (
                  <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                    <Image src={img || "/placeholder.svg"} alt={`Upload ${index + 1}`} fill className="object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => setNewPostImages(newPostImages.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <Button type="button" variant="outline" onClick={handleImageUpload}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

