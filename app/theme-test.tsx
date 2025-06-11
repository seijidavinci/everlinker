"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ThemeTest() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Theme Test Page</h1>
        <p className="text-muted-foreground">Current theme: {theme}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => setTheme("light")}>Light Mode</Button>
          <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
          <Button onClick={() => setTheme("system")}>System</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>Testing card styling in different themes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is a card component with some content. The styling should adapt to the current theme.</p>
          </CardContent>
          <CardFooter>
            <Button>Action Button</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Testing form elements in different themes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="tab1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Card>
            <CardHeader>
              <CardTitle>Tab 1 Content</CardTitle>
              <CardDescription>Testing tabs in different themes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the content for Tab 1. The styling should adapt to the current theme.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab2">
          <Card>
            <CardHeader>
              <CardTitle>Tab 2 Content</CardTitle>
              <CardDescription>Testing tabs in different themes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the content for Tab 2. The styling should adapt to the current theme.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab3">
          <Card>
            <CardHeader>
              <CardTitle>Tab 3 Content</CardTitle>
              <CardDescription>Testing tabs in different themes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the content for Tab 3. The styling should adapt to the current theme.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
