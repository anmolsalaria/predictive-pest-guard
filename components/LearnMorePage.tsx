import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Learn More About Pest Outbreaks</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg">
            Discover how Predictive Pest Guard leverages AI and real-time weather data to predict pest outbreaks, reduce
            crop losses, and promote sustainable farming. Our platform offers interactive dashboards, automated alerts,
            and risk assessments, empowering farmers, researchers, and agribusinesses with data-driven insights for
            smarter pest control and improved agricultural productivity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Common Pests & Their Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fall Armyworm</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/fall-armyworm.png"
                  alt="Fall Armyworm larva on a leaf"
                  width={300}
                  height={200}
                  className="mb-4 rounded-md object-cover h-48 w-full"
                />
                <p>
                  <strong>Affected Crop:</strong> Maize
                </p>
                <p>
                  <strong>Region:</strong> Africa, Asia
                </p>
                <p>
                  <strong>Severity:</strong> High
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rice Blast</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/rice-blast.png"
                  alt="Rice Blast disease on rice leaves"
                  width={300}
                  height={200}
                  className="mb-4 rounded-md object-cover h-48 w-full"
                />
                <p>
                  <strong>Affected Crop:</strong> Rice
                </p>
                <p>
                  <strong>Region:</strong> Global
                </p>
                <p>
                  <strong>Severity:</strong> Medium
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Desert Locust</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/desert-locust.png"
                  alt="Desert Locust on sandy ground"
                  width={300}
                  height={200}
                  className="mb-4 rounded-md object-cover h-48 w-full"
                />
                <p>
                  <strong>Affected Crop:</strong> Various
                </p>
                <p>
                  <strong>Region:</strong> Africa, Middle East
                </p>
                <p>
                  <strong>Severity:</strong> Critical
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Prevention & Control Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organic Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  <li>Crop Rotation – Prevents pest buildup by changing crops each season.</li>
                  <li>Neem Oil Spray – Natural pesticide effective against various pests.</li>
                  <li>Companion Planting – Plants like marigolds deter harmful insects.</li>
                  <li>Sticky Traps – Captures flying pests like whiteflies and aphids.</li>
                  <li>Biological Control – Introduce natural predators like ladybugs or nematodes.</li>
                </ul>
                <p className="mt-4">
                  <a
                    href="https://livetoplant.com/organic-pest-control-vs-chemical-solutions-a-comparison/"
                    className="text-blue-600 hover:underline"
                  >
                    Read more about organic solutions
                  </a>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chemical Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  <li>Insecticidal Soaps – Mild chemicals targeting soft-bodied insects.</li>
                  <li>Pyrethroid Sprays – Fast-acting insecticides for severe infestations.</li>
                  <li>Systemic Pesticides – Absorbed by plants to kill pests from within.</li>
                  <li>Fungicides – Controls fungal infections affecting plant health.</li>
                  <li>Herbicides – Prevent weed growth, reducing pest habitats.</li>
                </ul>
                <p className="mt-4">
                  <a
                    href="https://www.groworganic.com/blogs/articles/how-to-do-the-best-organic-pest-control-with-integrated-pest-management-ipm"
                    className="text-blue-600 hover:underline"
                  >
                    Learn about integrated pest management
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">AI-powered Prediction Techniques</h3>
            <p>
              AI-powered prediction techniques use machine learning, deep learning, and data analytics to forecast pest
              outbreaks. Techniques like time-series analysis, neural networks, and decision trees analyze weather
              patterns, crop health, and historical pest data to detect trends, assess risks, and generate early
              warnings, enabling proactive pest management and sustainable agriculture.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Interactive FAQ</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How can AI help in predicting pest outbreaks?</AccordionTrigger>
              <AccordionContent>
                AI-driven solutions analyze environmental data and historical trends to provide accurate pest forecasts
                and mitigation strategies.
                <p className="mt-2">
                  <a href="https://www.fao.org/pest-control/ai" className="text-blue-600 hover:underline">
                    Read more: FAO – AI in Pest Control
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the signs of a pest infestation?</AccordionTrigger>
              <AccordionContent>
                Common signs include visible damage to plants, such as holes in leaves, discoloration, wilting, or
                stunted growth. You may also notice the presence of insects, eggs, or larvae on plants.
                <p className="mt-2">
                  <a href="https://ipm.ucanr.edu/" className="text-blue-600 hover:underline">
                    Read more: UC IPM Online
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How often should I monitor my crops for pests?</AccordionTrigger>
              <AccordionContent>
                Regular monitoring is essential for early pest detection. Learn best practices and recommended
                monitoring frequencies for different crops.
                <p className="mt-2">
                  <a href="https://www.fao.org/pest-monitoring-guidelines" className="text-blue-600 hover:underline">
                    Read more: FAO Pest Monitoring Guidelines
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Take Action</h2>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline">Download Sample Report (PDF)</Button>
          </div>
        </section>
      </main>
    </div>
  )
}