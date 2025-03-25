"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react"

const API_KEY = "ffc322db90c023e830389eace379678e"
const API_BASE_URL = "https://api.weatherstack.com/current"

interface WeatherData {
  temperature: number
  humidity: number
  wind_speed: number
  precip: number
}

export default function WeatherData() {
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
        const response = await fetch(`${API_BASE_URL}?access_key=${API_KEY}&query=New Delhi&units=m`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (!data.current || Object.keys(data.current).length === 0) {
          throw new Error("Weather data is empty or invalid")
        }
        if (data.error) {
          throw new Error(data.error.info || "Unknown API error")
        }
        setWeatherData({
          temperature: data.current.temperature,
          humidity: data.current.humidity,
          wind_speed: data.current.wind_speed,
          precip: data.current.precip,
        })
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setError(`Error fetching weather data: ${err instanceof Error ? err.message : "Unknown error occurred"}`)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

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
          <div className="text-2xl font-bold">{weatherData.wind_speed} m/s</div>
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

