"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Camera, Upload, Facebook, Twitter, Linkedin, Globe, Instagram } from "lucide-react"

const profileFormSchema = z.object({
  mission: z.string().min(10, {
    message: "Mission statement must be at least 10 characters.",
  }),
  bio: z.string().min(20, {
    message: "Bio must be at least 20 characters.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
})

export default function ProfileSetupPage() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      mission: "",
      bio: "",
      website: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
    },
  })

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    // In a real app, you would save the profile data here
    router.push("/profile")
  }

  // Mock functions for image uploads
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file to a server
      // For demo purposes, we'll use a placeholder
      setProfileImage("/placeholder.svg?height=200&width=200")
    }
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file to a server
      // For demo purposes, we'll use a placeholder
      setCoverImage("/placeholder.svg?height=400&width=1200")
    }
  }

  return (
    <div className="container py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your NGO Profile</CardTitle>
          <CardDescription>
            Add details to help government officials understand your organization better
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile Images</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cover Image</label>
                <div className="relative mt-2 h-[200px] w-full overflow-hidden rounded-lg border border-dashed border-muted-foreground/25 bg-muted">
                  {coverImage ? (
                    <Image src={coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Recommended size: 1200 x 400px</p>
                      </div>
                    </div>
                  )}
                  <Input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleCoverImageChange}
                    accept="image/*"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Profile Photo</label>
                <div className="relative mt-2 h-[120px] w-[120px] overflow-hidden rounded-full border border-dashed border-muted-foreground/25 bg-muted">
                  {profileImage ? (
                    <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <Input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleProfileImageChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission Statement</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your organization's mission in a concise statement"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This will appear prominently on your profile.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Your Organization</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of your organization, its history, and impact"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h3 className="text-lg font-medium mb-4">Website & Social Media</h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://yourorganization.org" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Facebook className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="facebook.com/yourpage" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Twitter className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="@yourhandle" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="linkedin.com/company/yourorg" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Instagram className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="@yourhandle" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/feed")}>
                  Skip for Now
                </Button>
                <Button type="submit">Complete Profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

