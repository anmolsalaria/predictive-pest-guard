"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Filters {
  location: string
  dateRange: string
  pestType: string
  search?: string
  area: number
}

interface UserInputFiltersProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export default function UserInputFilters({ filters, setFilters }: UserInputFiltersProps) {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const locationOptions = [
    // Indian Cities
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    // USA Cities
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    // China Cities
    "Beijing",
    "Shanghai",
    "Guangzhou",
    "Shenzhen",
    "Chengdu",
    "Xi'an",
    "Chongqing",
    "Hangzhou"
  ]

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select onValueChange={(value) => handleFilterChange("location", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {locationOptions.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange("dateRange", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">Last 7 days</SelectItem>
          <SelectItem value="30days">Last 30 days</SelectItem>
          <SelectItem value="90days">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange("pestType", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select pest type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="aphids">Aphids</SelectItem>
          <SelectItem value="locusts">Locusts</SelectItem>
          <SelectItem value="whiteflies">Whiteflies</SelectItem>
          <SelectItem value="fall_armyworm">Fall Armyworm</SelectItem>
          <SelectItem value="rice_blast">Rice Blast</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1">
        <Label htmlFor="search">Search Outbreaks</Label>
        <Input
          id="search"
          placeholder="Search by outbreak type, severity, or region..."
          value={filters.search || ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Search for: outbreak types (e.g., "Aphids", "Locusts"), severity levels (e.g., "High", "Medium"), or regions (e.g., "North", "South")
        </p>
      </div>

      <div className="w-[180px]">
        <Label htmlFor="area">Farm Area (acres)</Label>
        <Input
          id="area"
          type="number"
          min="1"
          placeholder="Enter area"
          value={filters.area || ""}
          onChange={(e) => handleFilterChange("area", e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}

