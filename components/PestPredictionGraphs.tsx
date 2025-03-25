"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

export default function PestPredictionGraphs({ filters }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch pest prediction data based on filters
    // This is a placeholder, replace with actual API call
    const fetchData = async () => {
      // const response = await fetch(`/api/pest-predictions?${new URLSearchParams(filters)}`)
      // const data = await response.json()
      // setData(data)

      // Placeholder data
      setData({
        trendData: [
          {
            x: ["Jan", "Feb", "Mar", "Apr", "May"],
            y: [10, 15, 13, 17, 20],
            type: "scatter",
            mode: "lines+markers",
            name: "Historical",
          },
          {
            x: ["Jun", "Jul", "Aug", "Sep", "Oct"],
            y: [22, 25, 23, 20, 18],
            type: "scatter",
            mode: "lines+markers",
            name: "Predicted",
          },
        ],
        riskZones: [{ x: ["Zone A", "Zone B", "Zone C", "Zone D"], y: [20, 14, 23, 18], type: "bar" }],
        densityData: [
          {
            z: [
              [1, 20, 30],
              [20, 1, 60],
              [30, 60, 1],
            ],
            type: "heatmap",
          },
        ],
      })
    }

    fetchData()
  }, [])

  if (!data) return <div>Loading pest prediction data...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pest Outbreak Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={data.trendData}
            layout={{ autosize: true, title: "Historical and Predicted Pest Occurrences" }}
            useResizeHandler={true}
            style={{ width: "100%", height: "300px" }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>High-Risk Pest Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={data.riskZones}
            layout={{ autosize: true, title: "Pest Risk by Region" }}
            useResizeHandler={true}
            style={{ width: "100%", height: "300px" }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pest Density Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={data.densityData}
            layout={{ autosize: true, title: "Pest Density Across Locations" }}
            useResizeHandler={true}
            style={{ width: "100%", height: "300px" }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

