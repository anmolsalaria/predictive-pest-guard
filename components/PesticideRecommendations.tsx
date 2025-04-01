"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Scale, Calculator } from "lucide-react"

interface PesticideRecommendationsProps {
  pestType: string
  area: number // in acres
  weatherData: {
    temperature: number
    humidity: number
    wind_speed: number
    precip: number
  } | null
}

interface Pesticide {
  name: string
  type: string
  dosage: string
  frequency: string
  precautions: string[]
  effectiveness: string
}

const pesticideDatabase: Record<string, Pesticide[]> = {
  aphids: [
    {
      name: "Imidacloprid",
      type: "Systemic Insecticide",
      dosage: "0.5-1.0 ml per liter of water",
      frequency: "Every 7-10 days",
      precautions: [
        "Apply during early morning or late evening",
        "Avoid application during high winds",
        "Wear protective clothing",
        "Keep away from water bodies"
      ],
      effectiveness: "90-95%"
    },
    {
      name: "Pyrethrin",
      type: "Natural Insecticide",
      dosage: "2-3 ml per liter of water",
      frequency: "Every 5-7 days",
      precautions: [
        "Apply in the evening",
        "Avoid direct sunlight",
        "Use within 24 hours of mixing",
        "Keep away from beneficial insects"
      ],
      effectiveness: "85-90%"
    }
  ],
  locusts: [
    {
      name: "Malathion",
      type: "Organophosphate Insecticide",
      dosage: "1.5-2.0 ml per liter of water",
      frequency: "Every 5-7 days",
      precautions: [
        "Apply during early morning",
        "Avoid application during rain",
        "Wear full protective gear",
        "Keep away from water sources"
      ],
      effectiveness: "95-98%"
    },
    {
      name: "Fipronil",
      type: "Phenylpyrazole Insecticide",
      dosage: "1.0-1.5 ml per liter of water",
      frequency: "Every 10-14 days",
      precautions: [
        "Apply in calm weather",
        "Avoid contact with skin",
        "Keep away from food crops",
        "Follow buffer zone guidelines"
      ],
      effectiveness: "92-95%"
    }
  ],
  whiteflies: [
    {
      name: "Buprofezin",
      type: "Insect Growth Regulator",
      dosage: "1.0-1.5 ml per liter of water",
      frequency: "Every 7-10 days",
      precautions: [
        "Apply during early morning",
        "Avoid application during high humidity",
        "Wear protective clothing",
        "Keep away from water bodies"
      ],
      effectiveness: "88-92%"
    },
    {
      name: "Spinetoram",
      type: "Natural Insecticide",
      dosage: "0.5-0.75 ml per liter of water",
      frequency: "Every 5-7 days",
      precautions: [
        "Apply in the evening",
        "Avoid direct sunlight",
        "Use within 24 hours of mixing",
        "Keep away from beneficial insects"
      ],
      effectiveness: "90-95%"
    }
  ],
  fall_armyworm: [
    {
      name: "Chlorantraniliprole",
      type: "Diamide Insecticide",
      dosage: "1.0-1.5 ml per liter of water",
      frequency: "Every 7-10 days",
      precautions: [
        "Apply during early morning",
        "Avoid application during rain",
        "Wear protective clothing",
        "Keep away from water bodies"
      ],
      effectiveness: "95-98%"
    },
    {
      name: "Emamectin Benzoate",
      type: "Macrolide Insecticide",
      dosage: "0.5-0.75 ml per liter of water",
      frequency: "Every 5-7 days",
      precautions: [
        "Apply in calm weather",
        "Avoid contact with skin",
        "Keep away from food crops",
        "Follow buffer zone guidelines"
      ],
      effectiveness: "92-95%"
    }
  ],
  rice_blast: [
    {
      name: "Tricyclazole",
      type: "Fungicide",
      dosage: "1.0-1.5 ml per liter of water",
      frequency: "Every 7-10 days",
      precautions: [
        "Apply during early morning",
        "Avoid application during rain",
        "Wear protective clothing",
        "Keep away from water bodies"
      ],
      effectiveness: "90-95%"
    },
    {
      name: "Azoxystrobin",
      type: "Strobilurin Fungicide",
      dosage: "0.75-1.0 ml per liter of water",
      frequency: "Every 5-7 days",
      precautions: [
        "Apply in calm weather",
        "Avoid contact with skin",
        "Keep away from food crops",
        "Follow buffer zone guidelines"
      ],
      effectiveness: "92-95%"
    }
  ]
}

export default function PesticideRecommendations({ pestType, area, weatherData }: PesticideRecommendationsProps) {
  const pesticides = pesticideDatabase[pestType] || []
  const waterPerAcre = 200 // liters per acre
  const totalWater = area * waterPerAcre

  const calculateDosage = (dosage: string) => {
    const [min, max] = dosage.split("-").map(d => parseFloat(d))
    const avg = (min + max) / 2
    return `${(avg * totalWater).toFixed(1)} ml for ${area} acres`
  }

  if (!pestType) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-5 w-5" />
            Pesticide Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">Please select a pest type to view pesticide recommendations.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplet className="h-5 w-5" />
          Pesticide Recommendations for {pestType}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pesticides.map((pesticide, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{pesticide.name}</h3>
                <span className="text-sm text-gray-500">{pesticide.type}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Dosage</div>
                    <div className="text-sm text-gray-500">{calculateDosage(pesticide.dosage)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Frequency</div>
                    <div className="text-sm text-gray-500">{pesticide.frequency}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Precautions:</div>
                <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                  {pesticide.precautions.map((precaution, idx) => (
                    <li key={idx}>{precaution}</li>
                  ))}
                </ul>
              </div>

              <div className="text-sm">
                <span className="font-medium">Effectiveness: </span>
                <span className="text-green-600">{pesticide.effectiveness}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 