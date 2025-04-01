"use client";

import { useLanguage } from "@/lib/context/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaChartLine, FaRobot, FaCloudSunRain, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export function AboutPageContent() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  return (
    <main className="flex min-h-screen flex-col relative">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lush-rice-paddy-field-neat-260nw-2499404003.jpg-S4wTCR3ERo0JqMsVGtoOWOHXFtnylE.jpeg"
        alt={t.about.imageAlt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <section className="container mx-auto py-12 relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">{t.about.title}</h1>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-8">
            {t.about.description}
          </p>

          <h2 className="text-2xl font-semibold mb-4">{t.about.keyFeatures}</h2>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaCloudSunRain className="mr-2" />
                  {t.about.features.weather.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{t.about.features.weather.description}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaChartLine className="mr-2" />
                  {t.about.features.dashboard.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{t.about.features.dashboard.description}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaRobot className="mr-2" />
                  {t.about.features.ai.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {t.about.features.ai.description}
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mb-4">{t.about.team.title}</h2>
          <p className="mb-8">
            {t.about.team.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {t.about.team.members.map((member, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold">{member}</h3>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">{t.about.contact.title}</h2>
          <p className="mb-4">
            {t.about.contact.description}{" "}
            <a href="mailto:predictivepestguard@gmail.com" className="text-blue-500 hover:underline">
              predictivepestguard@gmail.com
            </a>
          </p>
          <div className="flex space-x-4">
            <Button asChild className="flex items-center gap-2">
              <Link href="https://github.com/Kushagra-Gupta-755/Predictive-PestGuard">
                <FaGithub className="text-xl" /> {t.about.contact.github}
              </Link>
            </Button>
            <Button asChild className="flex items-center gap-2">
              <Link href="https://www.linkedin.com/in/kushagra-gupta-a1b6b4291/">
                <FaLinkedin className="text-xl" /> {t.about.contact.linkedin}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 