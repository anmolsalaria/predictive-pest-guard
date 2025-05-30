"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

// Mock data (replace with actual API calls later)
const mockPestData = [
  { country: "India", region: "Maharashtra", pestType: "Aphids", date: "2025-02-15", severity: "High" },
  { country: "China", region: "Sichuan", pestType: "Locusts", date: "2025-02-10", severity: "Critical" },
  { country: "USA", region: "California", pestType: "Whiteflies", date: "2025-02-05", severity: "Medium" },
  { country: "Nigeria", region: "Kano", pestType: "Fall Armyworm", date: "2025-02-01", severity: "High" },
]

export default function CountryWisePestData() {
  const [pestData, setPestData] = useState(mockPestData)
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedSeverity, setSelectedSeverity] = useState("All")

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredData = pestData.filter(
    (item) =>
      (selectedCountry === "All" || item.country === selectedCountry) &&
      (selectedSeverity === "All" || item.severity === selectedSeverity),
  )

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Select onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Countries</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="USA">USA</SelectItem>
            <SelectItem value="Nigeria">Nigeria</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedSeverity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Severities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Country</TableHead>
            <TableHead>Region/State</TableHead>
            <TableHead>Type of Pest</TableHead>
            <TableHead>Date of Occurrence</TableHead>
            <TableHead>Severity Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.country}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.pestType}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pest-Affected Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Bar
                data={{
                  labels: ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"],
                  datasets: [
                    {
                      label: "Affected Areas",
                      data: [12, 19, 3, 5, 2],
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outbreak Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Outbreaks",
                      data: [12, 19, 3, 5, 2, 3],
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

