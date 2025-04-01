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

interface GraphData {
  trendData: any[]
  riskZones: any
  pestActivityTimeline: any[]
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
  const [data, setData] = useState<GraphData | null>(null)

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
        const pestActivityTimeline = generatePestActivityTimeline(weatherData)

        setData({
          trendData,
          riskZones,
          pestActivityTimeline,
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
    // Calculate risk factors based on weather conditions
    const temperatureRisk = weather.temperature > 30 ? 80 : weather.temperature > 25 ? 60 : 40
    const humidityRisk = weather.humidity > 80 ? 90 : weather.humidity > 60 ? 70 : 50
    const precipitationRisk = weather.precip > 10 ? 85 : weather.precip > 5 ? 65 : 45
    const windRisk = weather.wind_speed > 20 ? 30 : weather.wind_speed > 10 ? 20 : 10

    return {
      x: ["Temperature", "Humidity", "Precipitation", "Wind"],
      y: [temperatureRisk, humidityRisk, precipitationRisk, windRisk],
      type: "bar",
      marker: {
        color: [
          temperatureRisk > 70 ? '#ef4444' : temperatureRisk > 40 ? '#f59e0b' : '#22c55e',
          humidityRisk > 70 ? '#ef4444' : humidityRisk > 40 ? '#f59e0b' : '#22c55e',
          precipitationRisk > 70 ? '#ef4444' : precipitationRisk > 40 ? '#f59e0b' : '#22c55e',
          windRisk > 70 ? '#ef4444' : windRisk > 40 ? '#f59e0b' : '#22c55e'
        ]
      }
    }
  }

  const generatePestActivityTimeline = (weather: WeatherData) => {
    // Generate hourly data points for a 24-hour period
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    
    // Calculate base activity level from current weather
    const baseActivity = (weather.temperature * 0.4 + weather.humidity * 0.3 + weather.precip * 0.3) / 100
    
    // Generate activity levels for each hour
    const activityLevels = hours.map((_, index) => {
      // Add time-of-day variations
      let timeMultiplier = 1
      if (index >= 6 && index <= 10) timeMultiplier = 1.2  // Morning peak
      if (index >= 16 && index <= 20) timeMultiplier = 1.3 // Evening peak
      if (index >= 22 || index <= 4) timeMultiplier = 0.7  // Night low
      
      // Add some random variation
      const randomFactor = 0.9 + Math.random() * 0.2
      
      return Math.round(baseActivity * timeMultiplier * randomFactor)
    })

    return [
      {
        x: hours,
        y: activityLevels,
        type: "scatter",
        mode: "lines+markers",
        line: {
          color: '#3b82f6',
          width: 2
        },
        marker: {
          color: activityLevels.map(level => 
            level > 70 ? '#ef4444' : level > 40 ? '#f59e0b' : '#22c55e'
          ),
          size: 8
        }
      }
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
            <div className="h-[200px] w-full">
              <Plot
                data={data.trendData}
                layout={{
                  height: 200,
                  width: undefined,
                  autosize: true,
                  margin: { t: 10, b: 30, l: 40, r: 10 },
                  showlegend: true,
                  legend: { orientation: "h", y: -0.2, x: 0.5 },
                  font: { size: 12 }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm font-medium mb-1">Current Risk Factors</h3>
            <div className="h-[180px] w-full">
              <Plot
                data={[data.riskZones]}
                layout={{
                  height: 180,
                  width: undefined,
                  autosize: true,
                  margin: { t: 10, b: 30, l: 40, r: 10 },
                  showlegend: false,
                  font: { size: 12 },
                  yaxis: {
                    title: 'Risk Level (%)',
                    range: [0, 100]
                  }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>High Risk ({'>'}70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Medium Risk (40-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low Risk ({'<'}40%)</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm font-medium mb-1">Pest Activity Timeline</h3>
            <div className="h-[180px] w-full">
              <Plot
                data={data.pestActivityTimeline}
                layout={{
                  height: 180,
                  width: undefined,
                  autosize: true,
                  margin: { t: 10, b: 30, l: 40, r: 10 },
                  showlegend: false,
                  font: { size: 12 },
                  yaxis: {
                    title: 'Expected Pest Activity (%)',
                    range: [0, 100]
                  },
                  xaxis: {
                    title: 'Time of Day',
                    tickangle: -45
                  }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p className="mb-1">Expected pest activity throughout the day:</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>High Activity ({'>'}70%) - Best time for pest control</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Medium Activity (40-70%) - Monitor and prepare</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low Activity ({'<'}40%) - Regular monitoring</span>
              </div>
              <p className="mt-1 text-xs italic">Peak activity typically occurs during morning (6-10 AM) and evening (4-8 PM) hours.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

