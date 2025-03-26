"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData, type ChartOptions } from "chart.js"

// Registrar los componentes necesarios
ChartJS.register(ArcElement, Tooltip, Legend)

interface GraficoPastelProps {
  data: ChartData<"pie">
}

const GraficoPastel = ({ data }: GraficoPastelProps) => {
  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 12,
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        padding: 10,
        displayColors: true,
      },
    },
  }

  return <Pie data={data} options={options} />
}

export default GraficoPastel

