"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIModelPredictions() {
  const [predictions, setPredictions] = useState(null)

  useEffect(() => {
    // Fetch AI model predictions
    // This is a placeholder, replace with actual API call
    const fetchPredictions = async () => {
      // const response = await fetch('/api/ai-predictions')
      // const data = await response.json()
      // setPredictions(data)

      // Placeholder data
      setPredictions({
        riskScore: 75,
        riskLevel: "High",
      })
    }

    fetchPredictions()
  }, [])

  if (!predictions) return <div>Loading AI predictions...</div>

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Model Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">{predictions.riskScore}</div>
          <div className={`text-2xl font-semibold ${getRiskColor(predictions.riskLevel)}`}>
            {predictions.riskLevel} Risk
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Based on current weather conditions and historical data
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

