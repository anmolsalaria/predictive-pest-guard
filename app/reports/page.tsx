import type { Metadata } from "next"
import ReportsPage from "@/components/ReportsPage"
import AuthCheck from "@/components/auth/AuthCheck"

export const metadata: Metadata = {
  title: "Reports | Predictive PestGuard",
  description: "Comprehensive pest and plant disease data with interactive visualizations and detailed insights.",
}

export default function Reports() {
  return (
    <AuthCheck>
      <ReportsPage />
    </AuthCheck>
  )
}

