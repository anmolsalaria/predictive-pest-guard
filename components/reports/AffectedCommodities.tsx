"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const mockCommoditiesData = [
  {
    name: "Rice",
    image: "/placeholder.svg",
    severity: "High",
    commonPests: ["Rice Blast", "Brown Planthopper", "Stem Borer"],
    impact: "30% yield reduction",
    regionsAffected: ["South Asia", "Southeast Asia", "East Asia"],
  },
  {
    name: "Wheat",
    image: "/placeholder.svg",
    severity: "Medium",
    commonPests: ["Wheat Rust", "Aphids", "Powdery Mildew"],
    impact: "20% yield reduction",
    regionsAffected: ["North America", "Europe", "Central Asia"],
  },
  {
    name: "Corn",
    image: "/placeholder.svg",
    severity: "Critical",
    commonPests: ["Fall Armyworm", "Corn Borer", "Rootworm"],
    impact: "40% yield reduction",
    regionsAffected: ["North America", "Africa", "Latin America"],
  },
]

export default function AffectedCommodities() {
  const [commoditiesData, setCommoditiesData] = useState(mockCommoditiesData)
  const [selectedCommodity, setSelectedCommodity] = useState(null)

  const handleCommodityClick = (commodity) => {
    setSelectedCommodity(commodity)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {commoditiesData.map((commodity, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedCommodity === commodity ? "ring-2 ring-primary" : ""
            } bg-stone-50`}
            onClick={() => handleCommodityClick(commodity)}
          >
            <CardHeader>
              <CardTitle>{commodity.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={commodity.image || "/placeholder.svg"}
                alt={commodity.name}
                width={200}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <Badge
                className={
                  commodity.severity === "High"
                    ? "bg-orange-500"
                    : commodity.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }
              >
                {commodity.severity}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCommodity && (
        <Card className="bg-stone-50">
          <CardHeader>
            <CardTitle>{selectedCommodity.name} - Detailed Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Common Pests</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Regions Affected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{selectedCommodity.commonPests.join(", ")}</TableCell>
                  <TableCell>{selectedCommodity.impact}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        selectedCommodity.severity === "High"
                          ? "bg-orange-500"
                          : selectedCommodity.severity === "Medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    >
                      {selectedCommodity.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{selectedCommodity.regionsAffected.join(", ")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

