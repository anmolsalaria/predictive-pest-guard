import type { Metadata } from "next"
import Dashboard from "@/components/Dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Predictive PestGuard",
  description: "Monitor and predict pest outbreaks with real-time data and AI-powered insights.",
}

export default function DashboardPage() {
  return <Dashboard />
}

