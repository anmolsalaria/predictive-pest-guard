"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function AlertSystem() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Fetch alerts
    // This is a placeholder, replace with actual API call
    const fetchAlerts = async () => {
      // const response = await fetch('/api/alerts')
      // const data = await response.json()
      // setAlerts(data)

      // Placeholder data
      setAlerts([
        {
          id: 1,
          title: "High Risk of Aphid Outbreak",
          description: "Predicted in Northern region within next 7 days",
          severity: "high",
        },
        {
          id: 2,
          title: "Medium Risk of Grasshopper Infestation",
          description: "Possible in Southern region within 2 weeks",
          severity: "medium",
        },
      ])
    }

    fetchAlerts()
  }, [])

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Pest Outbreak Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === "high" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
        <div className="mt-6 h-[300px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Map Placeholder</p>
        </div>
      </CardContent>
    </Card>
  )
}

