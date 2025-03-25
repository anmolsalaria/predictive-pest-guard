"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function PestIdentificationPrevention() {
  const [pestData, setPestData] = useState([
    {
      name: "Fall Armyworm",
      scientificName: "Spodoptera frugiperda",
      cropsAffected: ["Maize", "Rice", "Sorghum"],
      signsSymptoms: "Leaf damage, holes in leaves, caterpillar presence",
      prevention: "Crop rotation, natural enemies, early planting",
      image: "/placeholder.svg",
    },
    {
      name: "Desert Locust",
      scientificName: "Schistocerca gregaria",
      cropsAffected: ["Wheat", "Barley", "Vegetables"],
      signsSymptoms: "Complete defoliation, swarm presence",
      prevention: "Early warning systems, biological control",
      image: "/placeholder.svg",
    },
  ])
  const [selectedPest, setSelectedPest] = useState(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/get_pest_identification_data")
  //       const data = await response.json()
  //       setPestData(data)
  //     } catch (error) {
  //       console.error("Error fetching pest identification data:", error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pest Name</TableHead>
            <TableHead>Scientific Name</TableHead>
            <TableHead>Crops Affected</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pestData.map((pest, index) => (
            <TableRow key={index}>
              <TableCell>{pest.name}</TableCell>
              <TableCell>{pest.scientificName}</TableCell>
              <TableCell>{pest.cropsAffected.join(", ")}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedPest(pest)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPest && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedPest.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Image
                src={selectedPest.image || "/placeholder.svg"}
                alt={selectedPest.name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="space-y-4">
              <p>
                <strong>Scientific Name:</strong> {selectedPest.scientificName}
              </p>
              <p>
                <strong>Crops Affected:</strong> {selectedPest.cropsAffected.join(", ")}
              </p>
              <p>
                <strong>Signs & Symptoms:</strong> {selectedPest.signsSymptoms}
              </p>
              <p>
                <strong>Best Practices for Prevention:</strong> {selectedPest.prevention}
              </p>
              <Button asChild>
                <Link href={`/pest-management/${selectedPest.name.toLowerCase().replace(" ", "-")}`}>
                  Learn More About Management Strategies
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

