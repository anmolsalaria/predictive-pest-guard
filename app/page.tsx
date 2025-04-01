import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, LineChart, Map, Upload } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8DEB9]">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lush-rice-paddy-field-neat-260nw-2499404003.jpg-S4wTCR3ERo0JqMsVGtoOWOHXFtnylE.jpeg"
          alt="Lush green rice paddy field stretching towards mountains under golden sunset sky"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Predictive PestGuard
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-gray-200">
            Predictive Pest Guard: AI-powered pest monitoring, real-time weather insights, and smart predictions to protect crops and ensure sustainable farming.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-black border-black hover:text-white hover:bg-black"
                asChild
              >
                <Link href="/learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Bug className="h-10 w-10 text-primary" />
              <CardTitle>Pest Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              Monitor and track agricultural pests including insects, diseases, weeds, and nematodes.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Upload className="h-10 w-10 text-primary" />
              <CardTitle>Data Reporting</CardTitle>
            </CardHeader>
            <CardContent>Submit and share field observations and pest activity data with the community.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Map className="h-10 w-10 text-primary" />
              <CardTitle>Visualization</CardTitle>
            </CardHeader>
            <CardContent>View interactive maps and visualizations of pest distribution and activity.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-primary" />
              <CardTitle>Forecasting</CardTitle>
            </CardHeader>
            <CardContent>Access predictive models and forecasts for pest outbreaks and population trends.</CardContent>
          </Card>
        </div>
      </section>

      {/* Info Sections */}
      <section className="container mx-auto grid gap-12 pb-24 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold">MISSION</h2>
          <p className="mt-4 text-muted-foreground">
          Our mission is to empower farmers, researchers, and agribusinesses with AI-driven pest predictions, minimizing crop damage, optimizing pesticide use, and promoting sustainable agriculture.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">AUDIENCE</h2>
          <p className="mt-4 text-muted-foreground">
          Our audience includes farmers needing real-time pest alerts, researchers analyzing outbreak trends, government 
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">PRODUCTS</h2>
          <p className="mt-4 text-muted-foreground">
          An AI-powered system that uses machine learning and real-time weather data to predict pest outbreaks and prevent infestations.
          </p>
        </div>
      </section>
    </main>
  )
}

