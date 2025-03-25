"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function LineChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Pest Outbreaks",
        data: data.map((item) => item.outbreakCount),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Pest Outbreak Trends",
      },
    },
  }

  return <Line data={chartData} options={options} />
}

