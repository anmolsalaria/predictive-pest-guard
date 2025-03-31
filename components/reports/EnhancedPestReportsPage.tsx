"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Download, ExternalLink, FileText, MessageSquare } from "lucide-react"
import Image from "next/image"

// Pest data for the table
const pestData = [
  // India
  {
    id: "in-pb-01",
    country: "India",
    state: "Maharashtra",
    pestName: "Pink Bollworm",
    scientificName: "Pectinophora gossypiella",
    affectedCrops: "Cotton",
    occurrencePeriod: "June to October",
    severityLevel: "High",
    description:
      "Larvae bore into cotton bolls, feeding on seeds and fiber, causing lint contamination, yield reduction, and quality loss in cotton production, leading to economic damage.",
    signsSymptoms:
      "Bolls turn yellow, premature opening, exit holes with silk threads, distorted fiber, and secondary fungal infections due to larval feeding inside the boll.",
    preventiveMeasures:
      "Use Bt cotton, pheromone traps for early detection, biological controls like Trichogramma parasitoids, avoid late sowing, timely harvesting, and proper field sanitation.",
    lifeCycle:
      "Adults are small moths that lay eggs on cotton bolls. Larvae hatch and bore into bolls, feeding for 2-3 weeks before pupating. The complete life cycle takes 30-45 days with multiple generations per season.",
    economicImpact:
      "Annual losses of over $500 million in cotton-producing regions. Reduces yield by 20-80% and significantly degrades fiber quality, affecting textile industry supply chains.",
    geographicalSpread:
      "Widespread across cotton-growing regions in Asia, Africa, Australia, and the Americas. Particularly problematic in tropical and subtropical regions with extended growing seasons.",
    imageUrl: "/images/pests/pink-bollworm.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "ICAR Research on Pink Bollworm", url: "https://icar.org.in/pest-research" },
      { name: "Cotton Research Institute Studies", url: "https://www.researchgate.net/cotton-pests" },
    ],
  },
  {
    id: "in-bph-02",
    country: "India",
    state: "Uttar Pradesh",
    pestName: "Brown Planthopper",
    scientificName: "Nilaparvata lugens",
    affectedCrops: "Rice",
    occurrencePeriod: "July to September",
    severityLevel: "High",
    description:
      'Sap-sucking insects extract plant juices, causing "hopperburn" symptoms, stunted growth, drying of rice plants, and heavy infestations may lead to complete crop failure.',
    signsSymptoms:
      "Leaves turn yellow-brown, plants wilt, excessive honeydew secretion leads to sooty mold, reducing photosynthesis, and severe infestations cause complete field drying.",
    preventiveMeasures:
      "Grow resistant rice varieties, avoid excess nitrogen fertilization, promote biological control agents, use light traps, and apply selective insecticides when needed.",
    lifeCycle:
      "Eggs are laid inside rice plant tissues. Nymphs develop through 5 stages over 2-3 weeks before becoming adults. Complete life cycle takes 25-30 days with multiple generations per season.",
    economicImpact:
      "Causes annual losses of $300-500 million in Asia. Can destroy entire rice fields in severe outbreaks, affecting food security and farmer livelihoods in major rice-producing regions.",
    geographicalSpread:
      "Prevalent across rice-growing regions in South and Southeast Asia, including India, China, Indonesia, Vietnam, and the Philippines. Occasional outbreaks in Japan and Korea.",
    imageUrl: "/images/pests/brown-planthopper.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "IRRI Brown Planthopper Research", url: "https://www.irri.org/brown-planthopper" },
      { name: "ICAR Rice Pest Management", url: "https://icar.org.in/rice-pests" },
    ],
  },
  {
    id: "in-wa-03",
    country: "India",
    state: "Punjab",
    pestName: "Wheat Aphid",
    scientificName: "Sitobion avenae",
    affectedCrops: "Wheat",
    occurrencePeriod: "February to April",
    severityLevel: "Moderate",
    description:
      "Aphids suck sap from wheat leaves and ears, weakening plants and reducing grain formation, causing poor seed development and transmitting viral diseases affecting wheat yield.",
    signsSymptoms:
      "Leaves curl, sticky honeydew deposits encourage fungal growth, plant wilting, reduced grain weight, and uneven maturity of wheat heads.",
    preventiveMeasures:
      "Encourage natural predators like ladybugs, spray neem-based bio-pesticides, avoid excessive fertilizer use, and introduce aphid-resistant wheat varieties.",
    lifeCycle:
      "Females reproduce parthenogenetically, giving birth to live nymphs that mature in 7-10 days. Multiple overlapping generations occur during the wheat growing season.",
    economicImpact:
      "Reduces wheat yields by 10-40% in affected areas. Also transmits barley yellow dwarf virus, which can cause additional yield losses of up to 30%.",
    geographicalSpread:
      "Common in wheat-growing regions across Europe, Asia, North America, and parts of Africa. Particularly problematic in temperate regions with mild winters.",
    imageUrl: "/images/pests/wheat-aphid.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "Wheat Aphid Management Studies", url: "https://www.researchgate.net/wheat-aphids" },
      { name: "Punjab Agricultural University Research", url: "https://pau.edu/pest-research" },
    ],
  },
  {
    id: "in-msb-04",
    country: "India",
    state: "Haryana",
    pestName: "Maize Stem Borer",
    scientificName: "Chilo partellus",
    affectedCrops: "Maize",
    occurrencePeriod: "June to August",
    severityLevel: "High",
    description:
      "Larvae tunnel into maize stems, disrupting nutrient flow, weakening plants, causing stalk breakage, and reducing grain quality and quantity, resulting in severe economic losses.",
    signsSymptoms:
      "Deadhearts in young plants, holes in stems, frass accumulation, wilting leaves, and reduced cob formation, leading to poor grain setting.",
    preventiveMeasures:
      "Use resistant maize hybrids, remove infested plants, apply pheromone traps, promote biological control with Cotesia flavipes parasitoids, and use recommended insecticides.",
    lifeCycle:
      "Adults are moths that lay eggs on maize leaves. Larvae hatch and initially feed on leaves before boring into stems. Development takes 30-45 days with 2-3 generations per season.",
    economicImpact:
      "Causes yield losses of 20-80% in severely affected fields. Annual economic damage estimated at $250-300 million across maize-growing regions in Africa and Asia.",
    geographicalSpread:
      "Native to Asia but now widespread across Africa, particularly in eastern and southern regions. Also present in maize-growing areas of South and Southeast Asia.",
    imageUrl: "/images/pests/maize-stem-borer.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "CIMMYT Maize Pest Research", url: "https://www.cimmyt.org/maize-pests" },
      { name: "Haryana Agricultural University Studies", url: "https://hau.ac.in/pest-research" },
    ],
  },
  {
    id: "in-rlf-05",
    country: "India",
    state: "West Bengal",
    pestName: "Rice Leaf Folder",
    scientificName: "Cnaphalocrocis medinalis",
    affectedCrops: "Rice",
    occurrencePeriod: "July to September",
    severityLevel: "Moderate",
    description:
      "Larvae fold and attach rice leaves using silk threads, feeding within, reducing photosynthesis, stunting plant growth, and leading to poor tillering and grain filling.",
    signsSymptoms:
      "Leaves fold lengthwise, showing white streaks, reduced tillering, lower grain yield, and severe infestations affect overall crop productivity.",
    preventiveMeasures:
      "Encourage natural enemies like spiders, avoid dense planting, use light traps, remove damaged leaves, and apply biological or chemical control if needed.",
    lifeCycle:
      "Adults are small moths that lay eggs on rice leaves. Larvae hatch and fold leaves for protection while feeding. The complete life cycle takes 25-30 days with multiple generations per season.",
    economicImpact:
      "Causes yield losses of 10-30% in affected fields. Economic damage is particularly significant in high-yielding rice varieties and intensive cultivation systems.",
    geographicalSpread:
      "Common across rice-growing regions in South and Southeast Asia, including India, Bangladesh, Thailand, Vietnam, and the Philippines. Also present in parts of East Asia.",
    imageUrl: "/images/pests/rice-leaf-folder.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "Rice Research Institute Studies", url: "https://www.irri.org/rice-leaf-folder" },
      { name: "West Bengal Agricultural Research", url: "https://wbagri.gov.in/research" },
    ],
  },

  // USA
  {
    id: "us-now-01",
    country: "USA",
    state: "California",
    pestName: "Navel Orangeworm",
    scientificName: "Amyelois transitella",
    affectedCrops: "Almonds, Walnuts",
    occurrencePeriod: "May to September",
    severityLevel: "High",
    description:
      "Larvae feed on nuts, hollowing them out, introducing fungal infections, reducing yield quality, and causing post-harvest losses.",
    signsSymptoms: "Empty nut shells, frass deposits, moldy nuts, and premature fruit drop.",
    preventiveMeasures:
      "Timely harvest, orchard sanitation, pheromone mating disruption, and biological controls like Trichogramma wasps.",
    lifeCycle:
      "Adults are moths that lay eggs on nuts. Larvae develop inside nuts for 4-6 weeks before pupating. The complete life cycle takes 35-60 days with 3-4 generations annually.",
    economicImpact:
      "Annual losses of $100-150 million in California's nut industry. Reduces marketable yield and increases aflatoxin contamination, affecting export potential.",
    geographicalSpread:
      "Primarily found in California's Central Valley, but also present in Arizona, New Mexico, and parts of Mexico where tree nuts are grown commercially.",
    imageUrl: "/images/pests/navel-orangeworm.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "UC Davis Navel Orangeworm Research", url: "https://ucanr.edu/sites/NOW/" },
      { name: "Almond Board of California Studies", url: "https://www.almonds.com/research" },
    ],
  },
  {
    id: "us-faw-02",
    country: "USA",
    state: "Texas",
    pestName: "Fall Armyworm",
    scientificName: "Spodoptera frugiperda",
    affectedCrops: "Corn, Sorghum",
    occurrencePeriod: "June to October",
    severityLevel: "High",
    description:
      "Caterpillars cause severe defoliation, damaging young plants and reducing grain formation, leading to economic losses for maize and sorghum farmers.",
    signsSymptoms:
      "Skeletonized leaves, ragged leaf edges, visible caterpillars in leaf whorls, and delayed plant growth.",
    preventiveMeasures: "Rotate crops, use natural predators, plant early, and apply selective insecticides.",
    lifeCycle:
      "Adults are moths that lay egg masses on leaves. Larvae develop through 6 stages over 14-21 days before pupating in soil. Complete life cycle takes 30-45 days.",
    economicImpact:
      "Annual losses of $300-500 million in the United States. Can destroy entire fields if not controlled, particularly affecting small-scale farmers with limited resources.",
    geographicalSpread:
      "Native to the Americas but now invasive in Africa and Asia. In the USA, it migrates northward each year from overwintering sites in southern Texas and Florida.",
    imageUrl: "/images/pests/fall-armyworm.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "USDA Fall Armyworm Research", url: "https://www.ars.usda.gov/fall-armyworm" },
      { name: "Texas A&M University Studies", url: "https://agriliferesearch.tamu.edu/pests" },
    ],
  },
  {
    id: "us-cc-03",
    country: "USA",
    state: "Florida",
    pestName: "Citrus Canker",
    scientificName: "Xanthomonas citri",
    affectedCrops: "Citrus",
    occurrencePeriod: "Year-round",
    severityLevel: "High",
    description:
      "Bacterial infection causing leaf, stem, and fruit lesions, leading to reduced fruit quality and marketability, significantly impacting citrus production.",
    signsSymptoms: "Raised brown spots with yellow halos, premature fruit drop, leaf distortion, and twig dieback.",
    preventiveMeasures:
      "Use resistant varieties, apply copper sprays, prune infected parts, and follow strict orchard sanitation.",
    lifeCycle:
      "Bacteria enter plants through wounds or natural openings. They multiply in plant tissues, causing lesions that release bacteria that spread via rain, wind, and human activity.",
    economicImpact:
      "Has cost the Florida citrus industry over $1 billion in control efforts and lost production. Reduces marketable yield and restricts international trade due to quarantine regulations.",
    geographicalSpread:
      "Present in Florida and other Gulf Coast states. Also found in many citrus-producing regions worldwide, including Brazil, China, India, and parts of Africa and Southeast Asia.",
    imageUrl: "/images/pests/citrus-canker.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "University of Florida Citrus Research", url: "https://crec.ifas.ufl.edu/citrus-canker" },
      { name: "USDA Citrus Health Research", url: "https://www.ars.usda.gov/citrus-diseases" },
    ],
  },

  // China
  {
    id: "cn-rgm-01",
    country: "China",
    state: "Anhui",
    pestName: "Rice Gall Midge",
    scientificName: "Orseolia oryzae",
    affectedCrops: "Rice",
    occurrencePeriod: "June to August",
    severityLevel: "High",
    description:
      "Larvae develop inside rice shoots, causing tube-like galls, disrupting plant growth, leading to poor tillering and yield loss, significantly affecting rice productivity.",
    signsSymptoms:
      "Silver shoots replace panicles, plants show stunted growth, thin stems, excessive tillering, and reduced grain formation, making rice crops non-productive.",
    preventiveMeasures:
      "Grow resistant rice varieties, remove infected plants, maintain field sanitation, avoid excessive nitrogen fertilizers, and use biopesticides like neem extracts.",
    lifeCycle:
      "Adults are small mosquito-like flies that lay eggs on rice shoots. Larvae enter the growing point and induce gall formation. The complete life cycle takes 25-30 days.",
    economicImpact:
      "Causes yield losses of 10-70% in affected fields. Annual economic damage estimated at $200-300 million across rice-growing regions in Asia.",
    imageUrl: "/images/pests/rice-gall-midge.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "Chinese Academy of Agricultural Sciences Research", url: "https://www.caas.cn/en/research" },
      { name: "International Rice Research Institute Studies", url: "https://www.irri.org/rice-gall-midge" },
    ],
  },
  {
    id: "cn-cc-02",
    country: "China",
    state: "Anhui",
    pestName: "Cabbage Caterpillar",
    scientificName: "Pieris rapae",
    affectedCrops: "Cabbage, Mustard",
    occurrencePeriod: "April to October",
    severityLevel: "Moderate",
    description:
      "Green caterpillars feed on cabbage leaves, creating irregular holes, reducing photosynthesis, leading to unmarketable leafy vegetables and significant losses in cabbage and mustard farming.",
    signsSymptoms:
      "Skeletonized leaves, ragged edges, black fecal droppings on leaves, slow plant growth, and weak heads in cabbage plants.",
    preventiveMeasures:
      "Handpick caterpillars, introduce natural predators like parasitic wasps, use neem-based sprays, and apply Bacillus thuringiensis (Bt) insecticides.",
    lifeCycle:
      "Adults are white butterflies that lay eggs on leaf undersides. Larvae feed for 2-3 weeks before pupating. The complete life cycle takes 3-5 weeks with multiple generations per year.",
    economicImpact:
      "Reduces marketable yield by 20-40% in affected fields. Annual losses estimated at $50-100 million in China's vegetable production regions.",
    geographicalSpread:
      "Cosmopolitan pest found worldwide wherever brassica crops are grown. Particularly problematic in temperate regions of Asia, Europe, North America, and Australia.",
    imageUrl: "/images/pests/cabbage-caterpillar.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "Anhui Agricultural University Research", url: "https://www.ahau.edu.cn/research" },
      { name: "Chinese Vegetable Research Institute", url: "https://www.caas.cn/vegetables" },
    ],
  },
  {
    id: "cn-tl-03",
    country: "China",
    state: "Chongqing",
    pestName: "Tea Looper",
    scientificName: "Biston suppressaria",
    affectedCrops: "Tea",
    occurrencePeriod: "April to October",
    severityLevel: "Moderate",
    description:
      "Larvae feed on tea leaves, reducing plant vigor, affecting tea quality, and leading to economic losses in tea cultivation areas. Severe infestations result in poor leaf production.",
    signsSymptoms:
      "Leaves appear skeletonized with irregular feeding marks, lower branch defoliation, and affected plants show weakened growth and reduced tea leaf yield.",
    preventiveMeasures:
      "Promote biological control with natural predators, hand-pick larvae, introduce pheromone traps, and apply Bt-based insecticides if needed.",
    lifeCycle:
      "Adults are large moths that lay eggs on tea leaves. Larvae feed for 3-4 weeks before pupating. The complete life cycle takes 6-8 weeks with 2-3 generations annually.",
    economicImpact:
      "Reduces tea yield by 15-30% and affects quality of tea leaves. Annual economic losses estimated at $30-50 million in China's tea-producing regions.",
    geographicalSpread:
      "Found in major tea-growing regions of China, India, Sri Lanka, and other parts of Southeast Asia. Different species of loopers affect tea in different geographical regions.",
    imageUrl: "/images/pests/tea-looper.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "Tea Research Institute of China", url: "https://www.tricaas.com/en/research" },
      { name: "Chongqing Agricultural Research Center", url: "https://www.cqagri.gov.cn/research" },
    ],
  },
  {
    id: "cn-cb-04",
    country: "China",
    state: "Chongqing",
    pestName: "Corn Borer",
    scientificName: "Ostrinia furnacalis",
    affectedCrops: "Maize",
    occurrencePeriod: "May to September",
    severityLevel: "High",
    description:
      "Larvae bore into maize stalks, disrupting nutrient flow, weakening plants, causing yield losses, and making plants more susceptible to secondary infections and fungal growth.",
    signsSymptoms:
      "Deadhearts in young plants, holes in stems, frass deposits, stalk breakage, and cob deformities, leading to reduced grain quality.",
    preventiveMeasures:
      "Use pheromone traps, encourage natural predators like Trichogramma wasps, apply Bt maize varieties, and remove plant residues post-harvest.",
    lifeCycle:
      "Adults are moths that lay eggs on maize leaves. Larvae hatch and initially feed on leaves before boring into stems. Development takes 30-45 days with 2-3 generations per season.",
    economicImpact:
      "Causes yield losses of 10-30% in affected fields. Annual economic damage estimated at $200-300 million in China's maize-producing regions.",
    geographicalSpread:
      "Common across maize-growing regions in East and Southeast Asia, particularly in China, Korea, Japan, and parts of Southeast Asia. Different species of corn borers affect maize worldwide.",
    imageUrl: "/images/pests/corn-borer.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "Chinese Academy of Agricultural Sciences", url: "https://www.caas.cn/maize-research" },
      { name: "Chongqing Maize Research Institute", url: "https://www.cqmaize.cn/research" },
    ],
  },
  {
    id: "cn-rph-05",
    country: "China",
    state: "Chongqing",
    pestName: "Rice Planthopper",
    scientificName: "Nilaparvata lugens",
    affectedCrops: "Rice",
    occurrencePeriod: "July to September",
    severityLevel: "High",
    description:
      'Sap-feeding insects cause "hopperburn," weakening plants, reducing photosynthesis, and making crops prone to viral diseases. Large infestations lead to complete field drying and crop loss.',
    signsSymptoms:
      "Yellowing of leaves, plant wilting, excessive honeydew secretion causing mold formation, and in severe cases, complete drying of rice plants.",
    preventiveMeasures:
      "Grow resistant rice varieties, avoid excessive nitrogen fertilizer use, encourage natural predators, and apply recommended insecticides selectively.",
    lifeCycle:
      "Eggs are laid inside rice plant tissues. Nymphs develop through 5 stages over 2-3 weeks before becoming adults. Complete life cycle takes 25-30 days with multiple generations per season.",
    economicImpact:
      "Causes annual losses of $300-500 million in China. Can destroy entire rice fields in severe outbreaks, affecting food security and farmer livelihoods.",
    geographicalSpread:
      "Prevalent across rice-growing regions in East and Southeast Asia, including China, Japan, Korea, and Southeast Asian countries. Different biotypes exist with varying insecticide resistance.",
    imageUrl: "/images/pests/rice-planthopper.png",
    affectedCropImages: [],
    researchLinks: [
      { name: "China National Rice Research Institute", url: "https://www.cnrri.org/research" },
      { name: "International Rice Research Institute", url: "https://www.irri.org/planthopper" },
    ],
  },
]

// Research sources
const researchSources = [
  {
    name: "ResearchGate - Agricultural Pest Studies",
    description: "Comprehensive collection of research papers on agricultural pests and their management strategies",
    url: "https://www.researchgate.net/",
  },
  {
    name: "USDA Agricultural Research Service",
    description: "Official data and research on pest outbreaks in the USA and control methodologies",
    url: "https://www.ars.usda.gov/",
  },
  {
    name: "Indian Council of Agricultural Research (ICAR)",
    description: "Detailed pest reports and management recommendations for different Indian states",
    url: "https://icar.org.in/",
  },
  {
    name: "Chinese Academy of Agricultural Sciences",
    description: "Research on pest management and control strategies in Chinese agricultural systems",
    url: "https://www.caas.cn/en/",
  },
  {
    name: "International Rice Research Institute (IRRI)",
    description: "Specialized research on rice pests and sustainable management practices",
    url: "https://www.irri.org/",
  },
]

export default function EnhancedPestReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPest, setSelectedPest] = useState(null)
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

  // Handle PDF export
  const handleExportPDF = () => {
    alert(
      "Generating PDF report with the current filtered data. In a production environment, this would create and download a PDF file.",
    )
  }

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Pest Outbreak Reports</h1>
        <p className="text-lg mb-8">
          Monitoring and understanding pest outbreaks is crucial for sustainable agriculture. This database provides
          comprehensive information on agricultural pests affecting crops in India, the USA, and China, helping farmers
          and researchers implement effective pest management strategies and minimize crop losses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Download Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Generate and download detailed PDF reports of pest data for your region
              </p>
              <Button onClick={handleExportPDF} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Ask an Expert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about pest management? Connect with agricultural experts
              </p>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

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
                      <TableHead>View Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((pest) => (
                        <TableRow key={pest.id}>
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
                                <Button variant="outline" size="sm">
                                  View More Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl">{pest.pestName}</DialogTitle>
                                  <DialogDescription>
                                    <span className="italic">{pest.scientificName}</span> - {pest.country}, {pest.state}
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                  <div>
                                    <Image
                                      src={pest.imageUrl || "/placeholder.svg"}
                                      alt={pest.pestName}
                                      width={400}
                                      height={300}
                                      className="rounded-md object-cover w-full h-auto"
                                    />
                                    <p className="text-xs text-center text-muted-foreground mt-1">
                                      {pest.pestName} - {pest.scientificName}
                                    </p>
                                    <p className="text-sm mt-4 text-muted-foreground">
                                      <strong>Affected Crops:</strong> {pest.affectedCrops}
                                    </p>
                                  </div>

                                  <div>
                                    <Tabs defaultValue="overview">
                                      <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                                        <TabsTrigger value="management">Management</TabsTrigger>
                                      </TabsList>

                                      <TabsContent value="overview" className="space-y-4">
                                        <div>
                                          <h3 className="font-semibold">Description</h3>
                                          <p>{pest.description}</p>
                                        </div>
                                        <div>
                                          <h3 className="font-semibold">Signs & Symptoms</h3>
                                          <p>{pest.signsSymptoms}</p>
                                        </div>
                                        <div>
                                          <h3 className="font-semibold">Economic Impact</h3>
                                          <p>{pest.economicImpact}</p>
                                        </div>
                                        <div>
                                          <h3 className="font-semibold">Geographical Spread</h3>
                                          <p>{pest.geographicalSpread}</p>
                                        </div>
                                      </TabsContent>

                                      <TabsContent value="lifecycle">
                                        <div>
                                          <h3 className="font-semibold">Life Cycle</h3>
                                          <p>{pest.lifeCycle}</p>
                                        </div>
                                        <div className="mt-4">
                                          <h3 className="font-semibold">Occurrence Period</h3>
                                          <p>{pest.occurrencePeriod}</p>
                                        </div>
                                      </TabsContent>

                                      <TabsContent value="management">
                                        <div>
                                          <h3 className="font-semibold">Preventive Measures</h3>
                                          <p>{pest.preventiveMeasures}</p>
                                        </div>
                                        <div className="mt-4">
                                          <h3 className="font-semibold">Research Resources</h3>
                                          <ul className="list-disc pl-5 space-y-1 mt-2">
                                            {pest.researchLinks.map((link, idx) => (
                                              <li key={idx}>
                                                <a
                                                  href={link.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 hover:underline"
                                                >
                                                  {link.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </TabsContent>
                                    </Tabs>
                                  </div>
                                </div>
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
            <ul className="space-y-4">
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

