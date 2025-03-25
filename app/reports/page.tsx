import type { Metadata } from "next"
import ReportsPage from "@/components/ReportsPage"

export const metadata: Metadata = {
  title: "Reports | Predictive PestGuard",
  description: "Comprehensive pest and plant disease data with interactive visualizations and detailed insights.",
}

export default function Reports() {
  return <ReportsPage />
}

