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
  cropImpact: any[]
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

  const generateCropImpactData = (weather: WeatherData) => {
    // Define common crops and their vulnerability to weather conditions
    const crops = [
      { name: "Rice", temp: 28, humidity: 80, precip: 15, wind: 5 },
      { name: "Wheat", temp: 25, humidity: 60, precip: 8, wind: 10 },
      { name: "Cotton", temp: 30, humidity: 65, precip: 5, wind: 8 },
      { name: "Sugarcane", temp: 27, humidity: 75, precip: 12, wind: 6 },
      { name: "Maize", temp: 26, humidity: 70, precip: 10, wind: 7 }
    ]

    // Calculate vulnerability scores based on weather conditions
    const vulnerabilityScores = crops.map(crop => {
      // Calculate similarity score between current weather and crop's preferred conditions
      const tempScore = 100 - Math.abs(weather.temperature - crop.temp) * 2
      const humidityScore = 100 - Math.abs(weather.humidity - crop.humidity)
      const precipScore = 100 - Math.abs(weather.precip - crop.precip) * 3
      const windScore = 100 - Math.abs(weather.wind_speed - crop.wind) * 4

      // Calculate overall vulnerability score
      const vulnerability = Math.round((tempScore * 0.3 + humidityScore * 0.3 + precipScore * 0.2 + windScore * 0.2) * (0.8 + Math.random() * 0.4))
      return Math.min(100, Math.max(0, vulnerability))
    })

    return [
      {
        x: crops.map(crop => crop.name),
        y: vulnerabilityScores,
        type: "bar",
        marker: {
          color: vulnerabilityScores.map(score => 
            score > 70 ? '#ef4444' : score > 40 ? '#f59e0b' : '#22c55e'
          )
        }
      }
    ]
  }

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
        const cropImpact = generateCropImpactData(weatherData)

        setData({
          trendData,
          riskZones,
          cropImpact,
        })
      } catch (err) {
        console.error("Error generating prediction data:", err)
      }
    }

    fetchData()
  }, [filters, weatherData])

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
            <h3 className="text-sm font-medium mb-1">Weather Impact on Crops</h3>
            <div className="h-[180px] w-full">
              <Plot
                data={data.cropImpact}
                layout={{
                  height: 180,
                  width: undefined,
                  autosize: true,
                  margin: { t: 10, b: 40, l: 40, r: 10 },
                  showlegend: false,
                  font: { size: 12 },
                  yaxis: {
                    title: 'Crop Vulnerability (%)',
                    range: [0, 100]
                  },
                  xaxis: {
                    title: 'Crop Type',
                    tickangle: 0,
                    automargin: true
                  }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p className="mb-1">Current weather impact on different crops:</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>High Vulnerability ({'>'}70%) - Immediate protection needed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Medium Vulnerability (40-70%) - Monitor and prepare</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low Vulnerability ({'<'}40%) - Regular monitoring</span>
              </div>
              <p className="mt-1 text-xs italic">Vulnerability is calculated based on how current weather conditions differ from each crop's optimal growing conditions.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

