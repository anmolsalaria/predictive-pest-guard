"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface PredictionData {
  riskScore: number
  riskLevel: "Low" | "Medium" | "High"
  confidence: number
  recommendations: string[]
}

interface AIModelPredictionsProps {
  weatherData: {
    temperature: number
    humidity: number
    wind_speed: number
    precip: number
  } | null
  location: string
  pestType: string
}

export default function AIModelPredictions({ weatherData, location, pestType }: AIModelPredictionsProps) {
  const [predictions, setPredictions] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!weatherData) {
        setLoading(false)
        return
      }

      try {
        console.log("Generating predictions for weather data:", weatherData)
        // In a real application, this would be an API call to your trained model
        // For now, we'll simulate the prediction based on weather conditions
        const riskScore = calculateRiskScore(weatherData)
        const riskLevel = getRiskLevel(riskScore)
        const confidence = calculateConfidence(weatherData)
        const recommendations = generateRecommendations(riskLevel, weatherData, pestType)

        const predictionData = {
          riskScore,
          riskLevel,
          confidence,
          recommendations,
        }

        console.log("Generated predictions:", predictionData)
        setPredictions(predictionData)
      } catch (err) {
        console.error("Error generating predictions:", err)
        setError("Failed to generate predictions")
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [weatherData, pestType])

  const calculateRiskScore = (weather: typeof weatherData): number => {
    if (!weather) return 0
    // This is a simplified risk calculation based on weather conditions
    // In a real application, this would be your trained model's prediction
    const tempRisk = weather.temperature > 30 ? 0.4 : weather.temperature > 25 ? 0.3 : 0.2
    const humidityRisk = weather.humidity > 80 ? 0.3 : weather.humidity > 60 ? 0.2 : 0.1
    const precipRisk = weather.precip > 10 ? 0.3 : weather.precip > 5 ? 0.2 : 0.1
    const score = Math.round((tempRisk + humidityRisk + precipRisk) * 100)
    console.log("Calculated risk score:", score)
    return score
  }

  const getRiskLevel = (score: number): "Low" | "Medium" | "High" => {
    if (score < 40) return "Low"
    if (score < 70) return "Medium"
    return "High"
  }

  const calculateConfidence = (weather: typeof weatherData): number => {
    if (!weather) return 0
    // Simplified confidence calculation based on data completeness
    return 85
  }

  const generateRecommendations = (riskLevel: string, weather: typeof weatherData, pestType: string): string[] => {
    if (!weather) return ["Weather data unavailable"]
    
    const recommendations: string[] = []
    
    // Base recommendations based on risk level
    if (riskLevel === "High") {
      recommendations.push(`Schedule immediate ${pestType} inspection`)
      recommendations.push(`Consider preventive pesticide application for ${pestType}`)
    } else if (riskLevel === "Medium") {
      recommendations.push(`Monitor ${pestType} activity closely`)
      recommendations.push(`Prepare ${pestType} control measures`)
    } else {
      recommendations.push(`Regular monitoring recommended for ${pestType}`)
      recommendations.push(`Maintain preventive measures for ${pestType}`)
    }

    // Weather-based recommendations
    if (weather.humidity > 80) {
      recommendations.push("High humidity detected - check for fungal growth")
    }
    if (weather.temperature > 30) {
      recommendations.push("High temperature alert - increase monitoring frequency")
    }

    // Region-specific recommendations
    const isUSACity = location.match(/New York|Los Angeles|Chicago|Houston|Phoenix|Philadelphia|San Antonio|San Diego/)
    const isChinaCity = location.match(/Beijing|Shanghai|Guangzhou|Shenzhen|Chengdu|Xi'an|Chongqing|Hangzhou/)
    const isIndianCity = location.match(/New Delhi|Mumbai|Bangalore|Chennai|Kolkata|Hyderabad|Pune|Ahmedabad/)

    if (isUSACity) {
      recommendations.push("Follow USDA guidelines for pest control")
      recommendations.push("Check local agricultural extension office for region-specific advice")
    } else if (isChinaCity) {
      recommendations.push("Adhere to China's agricultural pest control regulations")
      recommendations.push("Consult local agricultural bureau for specific guidelines")
    } else if (isIndianCity) {
      recommendations.push("Follow ICAR guidelines for pest management")
      recommendations.push("Check with local agricultural department for region-specific advice")
    }

    return recommendations
  }

  if (loading) return <div>Generating predictions...</div>
  if (error) return <div className="text-red-500 p-4 bg-red-100 rounded-md">{error}</div>
  if (!predictions) return <div>No predictions available</div>

  const getRiskColor = (level: string) => {
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
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Pest Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{predictions.riskScore}</div>
              <div className={`text-lg font-semibold ${getRiskColor(predictions.riskLevel)}`}>
                {predictions.riskLevel} Risk
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Confidence</div>
              <div className="text-lg font-semibold">{predictions.confidence}%</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Risk Level</div>
            <Progress value={predictions.riskScore} className="h-2" />
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Recommendations</div>
            <ul className="space-y-2">
              {predictions.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {predictions.riskLevel === "High" && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
              <AlertTriangle className="h-5 w-5" />
              <span>High risk of pest outbreak detected. Take immediate action.</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

