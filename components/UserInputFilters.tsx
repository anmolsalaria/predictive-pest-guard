"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function UserInputFilters({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select onValueChange={(value) => handleFilterChange("location", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="location1">Location 1</SelectItem>
          <SelectItem value="location2">Location 2</SelectItem>
          <SelectItem value="location3">Location 3</SelectItem>
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
          <SelectItem value="pest1">Pest Type 1</SelectItem>
          <SelectItem value="pest2">Pest Type 2</SelectItem>
          <SelectItem value="pest3">Pest Type 3</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Search outbreaks..."
        className="w-[200px]"
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />
    </div>
  )
}

