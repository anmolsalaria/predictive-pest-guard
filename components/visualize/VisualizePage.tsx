"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/visualize/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p>Loading map...</p>
      </div>
    </div>
  )
})

// Preload the Map component
const preloadMap = () => {
  void import("@/components/visualize/Map")
}

// Trigger preload when component mounts
if (typeof window !== 'undefined') {
  preloadMap()
}

const mockData = {
  pestTypes: ["Fall Armyworm", "Desert Locust", "Rice Blast", "Wheat Rust"],
  regions: ["Asia", "Africa", "Europe", "North America", "South America"],
  locations: [
    { lat: 20.5937, lng: 78.9629, country: "India", pestType: "Fall Armyworm", severity: "High" },
    { lat: 35.8617, lng: 104.1954, country: "China", pestType: "Rice Blast", severity: "Medium" },
    { lat: 9.082, lng: 8.6753, country: "Nigeria", pestType: "Desert Locust", severity: "Critical" },
    { lat: 37.0902, lng: -95.7129, country: "USA", pestType: "Wheat Rust", severity: "Low" },
  ],
}

export default function VisualizePage() {
  const [selectedPestType, setSelectedPestType] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting visualization data...")
  }

  const filteredLocations = mockData.locations.filter((location) => {
    if (selectedPestType !== "all" && location.pestType !== selectedPestType) return false
    if (selectedSeverity !== "all" && location.severity !== selectedSeverity) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Global Pest Visualization</h1>
          <p className="text-muted-foreground">
            Interactive map showing pest outbreaks and trends across different countries and continents.
          </p>
        </div>

        <div className="grid gap-6 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Select onValueChange={setSelectedPestType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select pest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pest Types</SelectItem>
                    {mockData.pestTypes.map((pest) => (
                      <SelectItem key={pest} value={pest}>
                        {pest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {mockData.regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <DatePickerWithRange className="w-[300px]" />

                <Button onClick={handleExport} variant="outline">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <MapComponent locations={filteredLocations} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 flex items-center justify-center">
                  Regional distribution chart placeholder
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Severity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 flex items-center justify-center">
                  Severity trends chart placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

