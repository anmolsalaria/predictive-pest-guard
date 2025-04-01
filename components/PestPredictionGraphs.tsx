"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface WeatherData {
  temperature: number
  humidity: number
  wind_speed: number
  precip: number
}

interface PestPredictionGraphsProps {
  filters: {
    location: string
    dateRange: string
    pestType: string
  }
  weatherData: WeatherData | null
}

export default function PestPredictionGraphs({ filters, weatherData }: PestPredictionGraphsProps) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!weatherData) {
        setData(null)
        return
      }

      try {
        // Generate prediction data based on weather conditions
        const trendData = generateTrendData(weatherData)
        const riskZones = generateRiskZones(weatherData)
        const densityData = generateDensityData(weatherData)

        setData({
          trendData,
          riskZones,
          densityData,
        })
      } catch (err) {
        console.error("Error generating prediction data:", err)
      }
    }

    fetchData()
  }, [filters, weatherData])

  const generateTrendData = (weather: WeatherData) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
    const historicalValues = months.map(() => {
      // Generate historical values based on current weather
      const baseTemp = weather.temperature
      const baseHumidity = weather.humidity
      return Math.round(
        (baseTemp * 0.7 + baseHumidity * 0.3) * (0.8 + Math.random() * 0.4)
      )
    })

    const predictedValues = months.map(() => {
      // Generate predicted values based on current weather
      const baseTemp = weather.temperature
      const baseHumidity = weather.humidity
      return Math.round(
        (baseTemp * 0.7 + baseHumidity * 0.3) * (1.2 + Math.random() * 0.3)
      )
    })

    return [
      {
        x: months,
        y: historicalValues,
        type: "scatter",
        mode: "lines+markers",
        name: "Historical",
      },
      {
        x: months,
        y: predictedValues,
        type: "scatter",
        mode: "lines+markers",
        name: "Predicted",
      },
    ]
  }

  const generateRiskZones = (weather: WeatherData) => {
    const zones = ["Zone A", "Zone B", "Zone C", "Zone D"]
    const values = zones.map(() => {
      // Generate risk values based on weather conditions
      const baseRisk = (weather.temperature * 0.4 + weather.humidity * 0.3 + weather.precip * 0.3) / 100
      return Math.round(baseRisk * 100 * (0.8 + Math.random() * 0.4))
    })

    return {
      x: zones,
      y: values,
      type: "bar",
    }
  }

  const generateDensityData = (weather: WeatherData) => {
    // Generate a 3x3 heatmap based on weather conditions
    const baseValue = (weather.temperature * 0.4 + weather.humidity * 0.3 + weather.precip * 0.3) / 100
    return [
      {
        z: [
          [baseValue * 100, baseValue * 120, baseValue * 90],
          [baseValue * 110, baseValue * 100, baseValue * 130],
          [baseValue * 95, baseValue * 115, baseValue * 105],
        ],
        type: "heatmap",
      },
    ]
  }

  if (!data) return <div>Loading prediction data...</div>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pest Prediction Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="w-full">
            <h3 className="text-sm font-medium mb-1">Historical and Predicted Trends</h3>
            <div className="h-[120px] w-full">
              <Plot
                data={data.trendData}
                layout={{
                  height: 120,
                  width: undefined,
                  autosize: true,
                  margin: { t: 5, b: 15, l: 25, r: 5 },
                  showlegend: true,
                  legend: { orientation: "h", y: -0.2, x: 0.5 },
                  font: { size: 10 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm font-medium mb-1">Risk Zones</h3>
            <div className="h-[100px] w-full">
              <Plot
                data={[data.riskZones]}
                layout={{
                  height: 100,
                  width: undefined,
                  autosize: true,
                  margin: { t: 5, b: 15, l: 25, r: 5 },
                  showlegend: false,
                  font: { size: 10 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm font-medium mb-1">Density Map</h3>
            <div className="h-[100px] w-full">
              <Plot
                data={data.densityData}
                layout={{
                  height: 100,
                  width: undefined,
                  autosize: true,
                  margin: { t: 5, b: 15, l: 25, r: 5 },
                  showlegend: false,
                  font: { size: 10 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

