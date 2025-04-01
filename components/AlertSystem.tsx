"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Bell, CheckCircle } from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "critical" | "info"
  message: string
  timestamp: string
  location: string
  pestType: string
  severity: "low" | "medium" | "high"
}

interface AlertSystemProps {
  weatherData: {
    temperature: number
    humidity: number
    wind_speed: number
    precip: number
  } | null
  location: string
  pestType: string
  searchQuery?: string
}

export default function AlertSystem({ weatherData, location, pestType, searchQuery }: AlertSystemProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateAlerts = async () => {
      if (!weatherData) {
        setLoading(false)
        return
      }

      try {
        // Generate alerts based on weather conditions and pest type
        const newAlerts: Alert[] = []
        const timestamp = new Date().toISOString()

        // Temperature-based alerts
        if (weatherData.temperature > 30) {
          newAlerts.push({
            id: "temp-high",
            type: "warning",
            message: `High temperature alert: ${weatherData.temperature}°C detected. Increased risk of ${pestType} activity.`,
            timestamp,
            location,
            pestType,
            severity: "medium",
          })
        }

        // Humidity-based alerts
        if (weatherData.humidity > 80) {
          newAlerts.push({
            id: "humidity-high",
            type: "warning",
            message: `High humidity alert: ${weatherData.humidity}% detected. Favorable conditions for ${pestType} growth.`,
            timestamp,
            location,
            pestType,
            severity: "medium",
          })
        }

        // Precipitation-based alerts
        if (weatherData.precip > 10) {
          newAlerts.push({
            id: "precip-high",
            type: "warning",
            message: `Heavy precipitation alert: ${weatherData.precip}mm detected. Monitor ${pestType} activity.`,
            timestamp,
            location,
            pestType,
            severity: "high",
          })
        }

        // Combined risk alert
        const riskScore = (weatherData.temperature * 0.4 + weatherData.humidity * 0.3 + weatherData.precip * 0.3) / 100
        if (riskScore > 70) {
          newAlerts.push({
            id: "high-risk",
            type: "critical",
            message: `Critical risk alert: High probability of ${pestType} outbreak. Take immediate action.`,
            timestamp,
            location,
            pestType,
            severity: "high",
          })
        }

        // Filter alerts based on search query if provided
        const filteredAlerts = searchQuery
          ? newAlerts.filter(
              (alert) =>
                alert.pestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.severity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                alert.message.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : newAlerts

        setAlerts(filteredAlerts)
      } catch (err) {
        console.error("Error generating alerts:", err)
      } finally {
        setLoading(false)
      }
    }

    generateAlerts()
  }, [weatherData, location, pestType, searchQuery])

  if (loading) return <div>Loading alerts...</div>

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-50 text-red-700 border-red-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Pest Outbreak Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-md">
              <CheckCircle className="h-5 w-5" />
              <span>No active alerts for {pestType || "selected pest"} in {location}</span>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-4 rounded-md border ${getAlertColor(alert.type)}`}
              >
                <AlertTriangle className="h-5 w-5 mt-0.5" />
                <div>
                  <div className="font-medium">{alert.message}</div>
                  <div className="text-sm mt-1">
                    <span className={getSeverityColor(alert.severity)}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                    </span>
                    <span className="mx-2">•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

