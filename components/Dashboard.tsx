"use client"

import { useState } from "react"
import WeatherData from "./WeatherData"
import PestPredictionGraphs from "./PestPredictionGraphs"
import AIModelPredictions from "./AIModelPredictions"
import UserInputFilters from "./UserInputFilters"
import AlertSystem from "./AlertSystem"

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    location: "",
    dateRange: "",
    pestType: "",
  })

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Pest Outbreak Dashboard</h1>
          <WeatherData />
          <UserInputFilters filters={filters} setFilters={setFilters} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <PestPredictionGraphs filters={filters} />
            <AIModelPredictions />
          </div>
          <AlertSystem />
        </div>
      </main>
    </div>
  )
}

