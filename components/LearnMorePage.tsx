"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/context/LanguageContext"
import { useTranslations } from "@/lib/translations"

export default function LearnMorePage() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">{t.learnMore.title}</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t.learnMore.introduction.title}</h2>
          <p className="text-lg">
            {t.learnMore.introduction.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t.learnMore.commonPests.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.learnMore.commonPests.pests.map((pest, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{pest.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={pest.image}
                    alt={pest.imageAlt}
                    width={300}
                    height={200}
                    className="mb-4 rounded-md object-cover h-48 w-full"
                  />
                  <p>
                    <strong>{t.learnMore.commonPests.affectedCrop}:</strong> {pest.affectedCrop}
                  </p>
                  <p>
                    <strong>{t.learnMore.commonPests.region}:</strong> {pest.region}
                  </p>
                  <p>
                    <strong>{t.learnMore.commonPests.severity}:</strong> {pest.severity}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t.learnMore.prevention.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.learnMore.prevention.organic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {t.learnMore.prevention.organic.methods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
                <p className="mt-4">
                  <a
                    href="https://livetoplant.com/organic-pest-control-vs-chemical-solutions-a-comparison/"
                    className="text-blue-600 hover:underline"
                  >
                    {t.learnMore.prevention.organic.readMore}
                  </a>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.learnMore.prevention.chemical.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {t.learnMore.prevention.chemical.methods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
                <p className="mt-4">
                  <a
                    href="https://www.groworganic.com/blogs/articles/how-to-do-the-best-organic-pest-control-with-integrated-pest-management-ipm"
                    className="text-blue-600 hover:underline"
                  >
                    {t.learnMore.prevention.chemical.readMore}
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">{t.learnMore.prevention.ai.title}</h3>
            <p>
              {t.learnMore.prevention.ai.description}
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t.learnMore.faq.title}</h2>
          <Accordion type="single" collapsible>
            {t.learnMore.faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                  <p className="mt-2">
                    <a href={item.link} className="text-blue-600 hover:underline">
                      {item.readMore}
                    </a>
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t.learnMore.takeAction.title}</h2>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard">{t.learnMore.takeAction.dashboard}</Link>
            </Button>
            <Button variant="outline">{t.learnMore.takeAction.downloadReport}</Button>
          </div>
        </section>
      </main>
    </div>
  );
}