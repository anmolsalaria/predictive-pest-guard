"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CountryWisePestData from "./reports/CountryWisePestData"
import AffectedCommodities from "./reports/AffectedCommodities"
import PestIdentificationPrevention from "./reports/PestIdentificationPrevention"
import { Download, Upload } from "lucide-react"

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...")
  }

  const handleUpload = () => {
    // Implement image upload and AI recognition
    console.log("Uploading image for pest recognition...")
  }

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Pest & Disease Reports</h1>

        <div className="flex justify-between items-center mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search pests, locations, or commodities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button type="submit">Search</Button>
          </form>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" /> Upload Image for AI Recognition
            </Button>
          </div>
        </div>

        <Tabs defaultValue="country-wise" className="w-full">
          <TabsList>
            <TabsTrigger value="country-wise">Country-wise Pest Data</TabsTrigger>
            <TabsTrigger value="commodities">Affected Commodities</TabsTrigger>
            <TabsTrigger value="identification">Pest Identification & Prevention</TabsTrigger>
          </TabsList>
          <TabsContent value="country-wise">
            <CountryWisePestData />
          </TabsContent>
          <TabsContent value="commodities">
            <AffectedCommodities />
          </TabsContent>
          <TabsContent value="identification">
            <PestIdentificationPrevention />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

