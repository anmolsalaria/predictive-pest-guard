import type { Metadata } from "next"
import EnhancedPestReportsPage from "@/components/reports/EnhancedPestReportsPage"
import AuthCheck from "@/components/auth/AuthCheck"

export const metadata: Metadata = {
  title: "Pest Outbreak Reports | Predictive PestGuard",
  description:
    "Comprehensive data on agricultural pests affecting crops in India, USA, and China, including scientific information, affected crops, and prevention methods.",
}

export default function Reports() {
  return (
    <AuthCheck>
      <EnhancedPestReportsPage />
    </AuthCheck>
  )
}

