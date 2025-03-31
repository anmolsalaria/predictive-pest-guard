"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, Line } from "react-chartjs-2"
import { Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  BarController,
)

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/visualize/Map"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full flex items-center justify-center bg-gray-100">Loading map...</div>,
})

// Updated pest data based on the provided dataset
const pestData = [
  { pestName: "Locusts", country: "India", region: "Maharashtra", severityLevel: "High", casesReported: 120 },
  { pestName: "Aphids", country: "India", region: "Uttar Pradesh", severityLevel: "Medium", casesReported: 85 },
  { pestName: "Borers", country: "India", region: "Punjab", severityLevel: "Critical", casesReported: 150 },
  { pestName: "Fungal Infections", country: "India", region: "Haryana", severityLevel: "High", casesReported: 110 },
  { pestName: "Whiteflies", country: "India", region: "West Bengal", severityLevel: "Low", casesReported: 60 },
  { pestName: "Locusts", country: "USA", region: "California", severityLevel: "Critical", casesReported: 200 },
  { pestName: "Aphids", country: "USA", region: "Texas", severityLevel: "Medium", casesReported: 90 },
  { pestName: "Borers", country: "USA", region: "Florida", severityLevel: "High", casesReported: 130 },
  { pestName: "Fungal Infections", country: "China", region: "Anhui", severityLevel: "High", casesReported: 140 },
  { pestName: "Whiteflies", country: "China", region: "Chongqing", severityLevel: "Low", casesReported: 75 },
]

// Time series data for line chart (simulated monthly data for the past year)
const timeSeriesData = [
  // Locusts
  { pestName: "Locusts", month: "Jan", cases: 80 },
  { pestName: "Locusts", month: "Feb", cases: 95 },
  { pestName: "Locusts", month: "Mar", cases: 120 },
  { pestName: "Locusts", month: "Apr", cases: 150 },
  { pestName: "Locusts", month: "May", cases: 180 },
  { pestName: "Locusts", month: "Jun", cases: 210 },
  { pestName: "Locusts", month: "Jul", cases: 230 },
  { pestName: "Locusts", month: "Aug", cases: 200 },
  { pestName: "Locusts", month: "Sep", cases: 170 },
  { pestName: "Locusts", month: "Oct", cases: 140 },
  { pestName: "Locusts", month: "Nov", cases: 110 },
  { pestName: "Locusts", month: "Dec", cases: 90 },

  // Aphids
  { pestName: "Aphids", month: "Jan", cases: 40 },
  { pestName: "Aphids", month: "Feb", cases: 55 },
  { pestName: "Aphids", month: "Mar", cases: 70 },
  { pestName: "Aphids", month: "Apr", cases: 85 },
  { pestName: "Aphids", month: "May", cases: 100 },
  { pestName: "Aphids", month: "Jun", cases: 110 },
  { pestName: "Aphids", month: "Jul", cases: 105 },
  { pestName: "Aphids", month: "Aug", cases: 95 },
  { pestName: "Aphids", month: "Sep", cases: 85 },
  { pestName: "Aphids", month: "Oct", cases: 75 },
  { pestName: "Aphids", month: "Nov", cases: 65 },
  { pestName: "Aphids", month: "Dec", cases: 50 },

  // Borers
  { pestName: "Borers", month: "Jan", cases: 60 },
  { pestName: "Borers", month: "Feb", cases: 80 },
  { pestName: "Borers", month: "Mar", cases: 100 },
  { pestName: "Borers", month: "Apr", cases: 120 },
  { pestName: "Borers", month: "May", cases: 140 },
  { pestName: "Borers", month: "Jun", cases: 160 },
  { pestName: "Borers", month: "Jul", cases: 170 },
  { pestName: "Borers", month: "Aug", cases: 150 },
  { pestName: "Borers", month: "Sep", cases: 130 },
  { pestName: "Borers", month: "Oct", cases: 110 },
  { pestName: "Borers", month: "Nov", cases: 90 },
  { pestName: "Borers", month: "Dec", cases: 70 },

  // Fungal Infections
  { pestName: "Fungal Infections", month: "Jan", cases: 50 },
  { pestName: "Fungal Infections", month: "Feb", cases: 70 },
  { pestName: "Fungal Infections", month: "Mar", cases: 90 },
  { pestName: "Fungal Infections", month: "Apr", cases: 110 },
  { pestName: "Fungal Infections", month: "May", cases: 130 },
  { pestName: "Fungal Infections", month: "Jun", cases: 150 },
  { pestName: "Fungal Infections", month: "Jul", cases: 140 },
  { pestName: "Fungal Infections", month: "Aug", cases: 130 },
  { pestName: "Fungal Infections", month: "Sep", cases: 120 },
  { pestName: "Fungal Infections", month: "Oct", cases: 110 },
  { pestName: "Fungal Infections", month: "Nov", cases: 100 },
  { pestName: "Fungal Infections", month: "Dec", cases: 80 },

  // Whiteflies
  { pestName: "Whiteflies", month: "Jan", cases: 30 },
  { pestName: "Whiteflies", month: "Feb", cases: 40 },
  { pestName: "Whiteflies", month: "Mar", cases: 50 },
  { pestName: "Whiteflies", month: "Apr", cases: 60 },
  { pestName: "Whiteflies", month: "May", cases: 70 },
  { pestName: "Whiteflies", month: "Jun", cases: 80 },
  { pestName: "Whiteflies", month: "Jul", cases: 75 },
  { pestName: "Whiteflies", month: "Aug", cases: 70 },
  { pestName: "Whiteflies", month: "Sep", cases: 65 },
  { pestName: "Whiteflies", month: "Oct", cases: 60 },
  { pestName: "Whiteflies", month: "Nov", cases: 50 },
  { pestName: "Whiteflies", month: "Dec", cases: 40 },
]

// Map coordinates for each region
const regionCoordinates = {
  India: {
    Maharashtra: { lat: 19.7515, lng: 75.7139 },
    "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
    Punjab: { lat: 31.1471, lng: 75.3412 },
    Haryana: { lat: 29.0588, lng: 76.0856 },
    "West Bengal": { lat: 22.9868, lng: 87.855 },
  },
  USA: {
    California: { lat: 36.7783, lng: -119.4179 },
    Texas: { lat: 31.9686, lng: -99.9018 },
    Florida: { lat: 27.6648, lng: -81.5158 },
  },
  China: {
    Anhui: { lat: 31.8612, lng: 117.2865 },
    Chongqing: { lat: 29.4316, lng: 106.9123 },
  },
}

export default function VisualizePage() {
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedPestType, setSelectedPestType] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  // Get unique pest types from data
  const pestTypes = useMemo(() => {
    return [...new Set(pestData.map((item) => item.pestName))]
  }, [])

  // Get unique countries from data
  const countries = useMemo(() => {
    return [...new Set(pestData.map((item) => item.country))]
  }, [])

  // Filter pest data based on selections
  const filteredPestData = useMemo(() => {
    return pestData.filter((item) => {
      if (selectedCountry !== "all" && item.country !== selectedCountry) return false
      if (selectedPestType !== "all" && item.pestName !== selectedPestType) return false
      if (selectedSeverity !== "all" && item.severityLevel !== selectedSeverity) return false
      return true
    })
  }, [selectedCountry, selectedPestType, selectedSeverity])

  // Filter time series data based on selections
  const filteredTimeSeriesData = useMemo(() => {
    return timeSeriesData.filter((item) => {
      if (selectedPestType !== "all" && item.pestName !== selectedPestType) return false
      return true
    })
  }, [selectedPestType])

  // Prepare map locations data
  const mapLocations = useMemo(() => {
    return filteredPestData
      .map((item) => {
        const coordinates = regionCoordinates[item.country]?.[item.region]
        return {
          lat: coordinates?.lat || 0,
          lng: coordinates?.lng || 0,
          country: item.country,
          region: item.region,
          pestType: item.pestName,
          severity: item.severityLevel,
          cases: item.casesReported,
        }
      })
      .filter((item) => item.lat !== 0 && item.lng !== 0)
  }, [filteredPestData])

  // Prepare bar chart data for pest severity by country
  const barChartData = useMemo(() => {
    const countries =
      selectedCountry === "all" ? [...new Set(filteredPestData.map((item) => item.country))] : [selectedCountry]

    const severityLevels = ["Low", "Medium", "High", "Critical"]
    const datasets = severityLevels.map((severity) => {
      return {
        label: severity,
        data: countries.map((country) => {
          return filteredPestData
            .filter((item) => item.country === country && item.severityLevel === severity)
            .reduce((sum, item) => sum + item.casesReported, 0)
        }),
        backgroundColor:
          severity === "Low"
            ? "rgba(75, 192, 192, 0.6)"
            : severity === "Medium"
              ? "rgba(255, 205, 86, 0.6)"
              : severity === "High"
                ? "rgba(255, 99, 132, 0.6)"
                : "rgba(153, 50, 204, 0.6)",
      }
    })

    return {
      labels: countries,
      datasets: datasets,
    }
  }, [filteredPestData, selectedCountry])

  // Prepare line chart data for pest trends over time
  const lineChartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const pestTypes =
      selectedPestType === "all"
        ? [...new Set(filteredTimeSeriesData.map((item) => item.pestName))]
        : [selectedPestType]

    const datasets = pestTypes.map((pest) => {
      const color =
        pest === "Locusts"
          ? "rgb(255, 99, 132)"
          : pest === "Aphids"
            ? "rgb(54, 162, 235)"
            : pest === "Borers"
              ? "rgb(255, 205, 86)"
              : pest === "Fungal Infections"
                ? "rgb(75, 192, 192)"
                : "rgb(153, 102, 255)"

      return {
        label: pest,
        data: months.map((month) => {
          const entry = filteredTimeSeriesData.find((item) => item.pestName === pest && item.month === month)
          return entry ? entry.cases : 0
        }),
        borderColor: color,
        backgroundColor: color + "40",
        tension: 0.3,
        fill: false,
      }
    })

    return {
      labels: months,
      datasets: datasets,
    }
  }, [filteredTimeSeriesData, selectedPestType])

  // Prepare regional distribution data
  const regionalData = useMemo(() => {
    const regions = selectedCountry === "all" ? [] : Object.keys(regionCoordinates[selectedCountry] || {})

    return {
      labels: regions,
      datasets: [
        {
          label: "Total Pest Cases",
          data: regions.map((region) => {
            return filteredPestData
              .filter((item) => item.region === region)
              .reduce((sum, item) => sum + item.casesReported, 0)
          }),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    }
  }, [filteredPestData, selectedCountry])

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Pest Visualization Dashboard</h1>
          <p className="text-muted-foreground">
            Interactive visualizations showing pest outbreaks and trends across different countries and regions.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPestType} onValueChange={(value) => setSelectedPestType(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select pest type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pest Types</SelectItem>
                  {pestTypes.map((pest) => (
                    <SelectItem key={pest} value={pest}>
                      {pest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSeverity} onValueChange={(value) => setSelectedSeverity(value)}>
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
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <Card className="bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle>Regional Distribution Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MapComponent locations={mapLocations} />
          </CardContent>
        </Card>

        {/* Bar Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Pest Severity by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] relative">
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: true,
                        text: "Total Cases by Severity Level",
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                        title: {
                          display: true,
                          text: "Number of Cases",
                        },
                      },
                    },
                    animation: {
                      duration: 500,
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {selectedCountry !== "all" ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Regional Distribution in {selectedCountry}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] relative">
                  <Bar
                    data={regionalData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: "y" as const,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: true,
                          text: `Pest Cases by Region in ${selectedCountry}`,
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Number of Cases",
                          },
                        },
                      },
                      animation: {
                        duration: 500,
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Pest Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] relative">
                  <Bar
                    data={{
                      labels: pestTypes,
                      datasets: [
                        {
                          label: "Total Cases",
                          data: pestTypes.map((pest) =>
                            filteredPestData
                              .filter((item) => item.pestName === pest)
                              .reduce((sum, item) => sum + item.casesReported, 0),
                          ),
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 205, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                          ],
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
                        title: {
                          display: true,
                          text: "Total Cases by Pest Type",
                        },
                      },
                      scales: {
                        y: {
                          title: {
                            display: true,
                            text: "Number of Cases",
                          },
                        },
                      },
                      animation: {
                        duration: 500,
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Line Chart Section */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Pest Severity Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] relative">
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: true,
                      text: "Monthly Trend of Reported Cases",
                    },
                    tooltip: {
                      mode: "index",
                      intersect: false,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Number of Cases",
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Month",
                      },
                    },
                  },
                  interaction: {
                    mode: "nearest",
                    axis: "x",
                    intersect: false,
                  },
                  animation: {
                    duration: 1000,
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

