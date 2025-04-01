"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react"

const API_KEY = "3582d2a39f0d4828bc5234838253103"
const API_BASE_URL = "https://api.weatherapi.com/v1"

interface WeatherData {
  temperature: number
  humidity: number
  wind_speed: number
  precip: number
}

interface WeatherDataProps {
  location?: string
  onDataUpdate?: (data: WeatherData | null) => void
}

export default function WeatherData({ location = "New Delhi", onDataUpdate }: WeatherDataProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!API_KEY) {
        setError("Weather API key is missing")
        setLoading(false)
        return
      }

      try {
        console.log("Fetching weather data for:", location)
        const response = await fetch(
          `${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
        )
        const data = await response.json()
        console.log("Weather API response:", data)

        if (data.error) {
          throw new Error(data.error.message || "API Error")
        }

        if (!data.current) {
          throw new Error("Weather data is empty or invalid")
        }

        const newWeatherData = {
          temperature: data.current.temp_c,
          humidity: data.current.humidity,
          wind_speed: data.current.wind_kph / 3.6, // Convert km/h to m/s
          precip: data.current.precip_mm || 0,
        }

        console.log("Processed weather data:", newWeatherData)
        setWeatherData(newWeatherData)
        onDataUpdate?.(newWeatherData)
      } catch (err) {
        console.error("Error fetching weather data:", err)
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        setError(`Error fetching weather data: ${errorMessage}`)
        onDataUpdate?.(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [location, onDataUpdate])

  if (loading) return <div>Loading weather data...</div>
  if (error) return <div className="text-red-500 p-4 bg-red-100 rounded-md">{error}</div>
  if (!weatherData) return <div>No weather data available</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weatherData.humidity}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
          <Wind className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weatherData.wind_speed.toFixed(1)} m/s</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precipitation</CardTitle>
          <CloudRain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weatherData.precip} mm</div>
        </CardContent>
      </Card>
    </div>
  )
}

