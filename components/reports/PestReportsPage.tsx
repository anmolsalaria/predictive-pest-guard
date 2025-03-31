"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Info, ExternalLink } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Pest data for the table
const pestData = [
  // India
  {
    country: "India",
    state: "Maharashtra",
    pestName: "Pink Bollworm",
    scientificName: "Pectinophora gossypiella",
    affectedCrops: "Cotton",
    occurrencePeriod: "June to October",
    severityLevel: "High",
    description:
      "Larvae bore into cotton bolls, damaging seeds and fiber. This pest is one of the most destructive cotton pests worldwide, causing significant economic losses.",
    signsSymptoms: "Stunted bolls, exit holes, lint contamination, rosette flowers, and damaged seeds.",
    preventiveMeasures:
      "Use pheromone traps, Bt cotton, timely harvesting, crop rotation, and destroy crop residues after harvest.",
  },
  {
    country: "India",
    state: "Uttar Pradesh",
    pestName: "Brown Plant Hopper",
    scientificName: "Nilaparvata lugens",
    affectedCrops: "Rice",
    occurrencePeriod: "July to September",
    severityLevel: "High",
    description:
      "Sap-sucking pest causing 'hopperburn' and crop loss. It can transmit viral diseases and cause complete crop failure in severe infestations.",
    signsSymptoms: "Yellowing, drying of rice plants, honeydew secretion, and sooty mold development.",
    preventiveMeasures:
      "Use resistant varieties, avoid over-fertilization, apply insecticides, maintain field hygiene, and encourage natural enemies.",
  },
  {
    country: "India",
    state: "Punjab",
    pestName: "Wheat Aphid",
    scientificName: "Sitobion avenae",
    affectedCrops: "Wheat",
    occurrencePeriod: "February to April",
    severityLevel: "Moderate",
    description:
      "Feeds on wheat leaves and ears, reducing yield. These small insects can multiply rapidly under favorable conditions.",
    signsSymptoms: "Curled leaves, honeydew deposits, stunted growth, and reduced grain quality.",
    preventiveMeasures:
      "Encourage natural predators, use neem-based sprays, timely sowing, and balanced fertilization.",
  },
  {
    country: "India",
    state: "Haryana",
    pestName: "Maize Stem Borer",
    scientificName: "Chilo partellus",
    affectedCrops: "Maize",
    occurrencePeriod: "June to August",
    severityLevel: "High",
    description:
      "Larvae bore into maize stems, leading to plant lodging. This pest can cause yield losses of up to 80% in severe cases.",
    signsSymptoms: "Deadhearts, holes in stalks, sawdust-like frass, and broken stems.",
    preventiveMeasures:
      "Remove crop residues, use pheromone traps, biological control with Trichogramma, and resistant varieties.",
  },

  // USA
  {
    country: "USA",
    state: "California",
    pestName: "Navel Orangeworm",
    scientificName: "Amyelois transitella",
    affectedCrops: "Almonds, Walnuts",
    occurrencePeriod: "May to September",
    severityLevel: "High",
    description:
      "Larvae infest nuts, reducing quality. This pest is the primary insect pest of almonds and walnuts in California.",
    signsSymptoms: "Hollowed-out nuts, frass deposits, webbing, and presence of larvae inside nuts.",
    preventiveMeasures: "Timely harvest, orchard sanitation, mating disruption techniques, and winter sanitation.",
  },
  {
    country: "USA",
    state: "Texas",
    pestName: "Fall Armyworm",
    scientificName: "Spodoptera frugiperda",
    affectedCrops: "Corn, Sorghum",
    occurrencePeriod: "June to October",
    severityLevel: "High",
    description: "Defoliates crops, affecting yield. This migratory pest can cause rapid and severe damage to crops.",
    signsSymptoms: "Ragged leaf edges, presence of larvae, skeletonized leaves, and frass in leaf whorls.",
    preventiveMeasures: "Use early planting, natural predators, selective insecticides, and resistant varieties.",
  },
  {
    country: "USA",
    state: "Florida",
    pestName: "Citrus Canker",
    scientificName: "Xanthomonas citri",
    affectedCrops: "Citrus",
    occurrencePeriod: "Year-round",
    severityLevel: "High",
    description:
      "Bacterial disease causing leaf lesions and fruit drop. This disease affects all citrus varieties and can spread rapidly.",
    signsSymptoms: "Raised brown lesions on leaves and fruit, premature leaf and fruit drop, and water-soaked margins.",
    preventiveMeasures: "Use resistant varieties, copper-based sprays, orchard sanitation, and windbreaks.",
  },

  // China
  {
    country: "China",
    state: "Anhui",
    pestName: "Rice Gall Midge",
    scientificName: "Orseolia oryzae",
    affectedCrops: "Rice",
    occurrencePeriod: "June to August",
    severityLevel: "High",
    description:
      "Larvae form tubular galls, stunting growth. This pest can cause significant yield losses in rice crops.",
    signsSymptoms: "Silver shoots replacing panicles, onion-like leaf galls, and stunted plants.",
    preventiveMeasures: "Use resistant varieties, field sanitation, insecticides, and early planting.",
  },
  {
    country: "China",
    state: "Chongqing",
    pestName: "Tea Looper",
    scientificName: "Biston suppressaria",
    affectedCrops: "Tea",
    occurrencePeriod: "April to October",
    severityLevel: "Moderate",
    description:
      "Larvae feed on leaves, reducing plant health. This pest can defoliate tea bushes, affecting quality and yield.",
    signsSymptoms: "Skeletonized leaves, presence of caterpillars, and defoliation of tea bushes.",
    preventiveMeasures: "Handpicking, natural predators, biological control, and targeted insecticide application.",
  },
]

// Research sources
const researchSources = [
  {
    name: "ResearchGate",
    description: "Study on major agricultural pests in China",
    url: "https://www.researchgate.net/",
  },
  {
    name: "USDA Agricultural Research",
    description: "Official data on pest outbreaks in the USA",
    url: "https://www.ars.usda.gov/",
  },
  {
    name: "Indian Council of Agricultural Research",
    description: "Pest reports for different Indian states",
    url: "https://icar.org.in/",
  },
]

export default function PestReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter data based on search query and selected filters
  const filteredData = useMemo(() => {
    return pestData.filter((pest) => {
      const matchesSearch =
        pest.pestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pest.affectedCrops.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pest.scientificName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCountry = selectedCountry === "all" || pest.country === selectedCountry
      const matchesSeverity = selectedSeverity === "all" || pest.severityLevel === selectedSeverity

      return matchesSearch && matchesCountry && matchesSeverity
    })
  }, [searchQuery, selectedCountry, selectedSeverity])

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  // Get severity badge color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Pest Outbreak Reports</h1>
        <p className="text-lg mb-8">
          This page provides comprehensive information on major agricultural pests affecting crops in India, the USA,
          and China. Use the filters and search functionality to find specific pest data.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search and Filter</CardTitle>
            <CardDescription>
              Find specific pest information by country, severity level, or keyword search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by pest name, crop, or region..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity Levels</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pest Data Table</CardTitle>
            <CardDescription>
              Showing {paginatedData.length} of {filteredData.length} entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>State/Province</TableHead>
                      <TableHead>Pest Name</TableHead>
                      <TableHead>Affected Crops</TableHead>
                      <TableHead>Occurrence Period</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((pest, index) => (
                        <TableRow key={index}>
                          <TableCell>{pest.country}</TableCell>
                          <TableCell>{pest.state}</TableCell>
                          <TableCell>
                            <div>
                              <div>{pest.pestName}</div>
                              <div className="text-xs text-muted-foreground italic">{pest.scientificName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{pest.affectedCrops}</TableCell>
                          <TableCell>{pest.occurrencePeriod}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(pest.severityLevel)}>{pest.severityLevel}</Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Info className="h-4 w-4 mr-1" /> View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>{pest.pestName}</DialogTitle>
                                  <DialogDescription>
                                    <span className="italic">{pest.scientificName}</span> - {pest.country}, {pest.state}
                                  </DialogDescription>
                                </DialogHeader>
                                <Tabs defaultValue="description">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                    <TabsTrigger value="symptoms">Signs & Symptoms</TabsTrigger>
                                    <TabsTrigger value="prevention">Prevention</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="description" className="mt-4">
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-semibold">Description</h4>
                                        <p>{pest.description}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">Affected Crops</h4>
                                        <p>{pest.affectedCrops}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">Occurrence Period</h4>
                                        <p>{pest.occurrencePeriod}</p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="symptoms" className="mt-4">
                                    <div>
                                      <h4 className="font-semibold">Signs & Symptoms</h4>
                                      <p>{pest.signsSymptoms}</p>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="prevention" className="mt-4">
                                    <div>
                                      <h4 className="font-semibold">Preventive Measures</h4>
                                      <p>{pest.preventiveMeasures}</p>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No results found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Research Sources</CardTitle>
            <CardDescription>Data on this page is compiled from the following trusted sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {researchSources.map((source, index) => (
                <li key={index} className="flex items-start">
                  <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline text-blue-600"
                    >
                      {source.name}
                    </a>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

