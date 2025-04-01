'use client';

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, LineChart, Map, Upload } from "lucide-react"
import { useLanguage } from "@/lib/context/LanguageContext"

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col bg-[#F8DEB9]">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lush-rice-paddy-field-neat-260nw-2499404003.jpg-S4wTCR3ERo0JqMsVGtoOWOHXFtnylE.jpeg"
          alt={t('website.heroTitle')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {t('website.heroTitle')}
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-gray-200">
              {t('website.heroDescription')}
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="/auth">{t('common.signIn')}</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-black border-black hover:text-white hover:bg-black"
                asChild
              >
                <Link href="/learn-more">{t('common.learnMore')}</Link>
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
              <CardTitle>{t('website.features.pestTracking.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {t('website.features.pestTracking.description')}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Upload className="h-10 w-10 text-primary" />
              <CardTitle>{t('website.features.dataReporting.title')}</CardTitle>
            </CardHeader>
            <CardContent>{t('website.features.dataReporting.description')}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Map className="h-10 w-10 text-primary" />
              <CardTitle>{t('website.features.visualization.title')}</CardTitle>
            </CardHeader>
            <CardContent>{t('website.features.visualization.description')}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-primary" />
              <CardTitle>{t('website.features.forecasting.title')}</CardTitle>
            </CardHeader>
            <CardContent>{t('website.features.forecasting.description')}</CardContent>
          </Card>
        </div>
      </section>

      {/* Info Sections */}
      <section className="container mx-auto grid gap-12 pb-24 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold">{t('website.sections.mission.title')}</h2>
          <p className="mt-4 text-muted-foreground">
            {t('website.sections.mission.description')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t('website.sections.audience.title')}</h2>
          <p className="mt-4 text-muted-foreground">
            {t('website.sections.audience.description')}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t('website.sections.products.title')}</h2>
          <p className="mt-4 text-muted-foreground">
            {t('website.sections.products.description')}
          </p>
        </div>
      </section>
    </main>
  )
}

