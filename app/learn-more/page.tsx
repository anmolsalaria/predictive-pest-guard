import type { Metadata } from "next"
import LearnMorePage from "@/components/LearnMorePage"

export const metadata: Metadata = {
  title: "Learn More About Pest Outbreaks | Predictive PestGuard",
  description: "Detailed information on pest outbreaks, causes, prevention methods, and impact on agriculture.",
}

export default function LearnMore() {
  return <LearnMorePage />
}

