import type { Metadata } from "next"
import VisualizePage from "@/components/visualize/VisualizePage"
import AuthCheck from "@/components/auth/AuthCheck"

export const metadata: Metadata = {
  title: "Visualize | Predictive PestGuard",
  description: "Interactive visualization of pest outbreaks and trends across different countries and continents.",
}

export default function Visualize() {
  return (
    <AuthCheck>
      <VisualizePage />
    </AuthCheck>
  )
}

