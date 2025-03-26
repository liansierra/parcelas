import { Cloud, Droplets, Sun, Thermometer } from "lucide-react"
import type { Sensor } from "../services/api"

interface WeatherCardsProps {
  data: Sensor
}

const WeatherCards = ({ data }: WeatherCardsProps) => {
  console.log("WeatherCards recibió datos:", data)

  // Función para determinar la intensidad de lluvia
  const getRainIntensity = (value: number) => {
    if (value === 0) return "Sin lluvia"
    if (value < 1) return "Ligera"
    if (value < 2) return "Moderada"
    return "Fuerte"
  }

  // Función para determinar la intensidad del sol
  const getSunIntensity = (value: number) => {
    if (value < 30) return "Baja"
    if (value < 60) return "Media"
    return "Alta"
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-teal-50 rounded-lg p-3 shadow-md text-gray-800 flex flex-col items-center justify-center h-full">
        <h3 className="text-sm font-medium text-gray-500 mb-2 text-center">Temperatura</h3>
        <div className="flex flex-col items-center justify-center">
          <Thermometer size={24} className="text-gray-600" />
          <span className="text-2xl font-semibold text-red-500">{data.temperatura.toFixed(1)} °C</span>
        </div>
      </div>

      <div className="bg-teal-50 rounded-lg p-3 shadow-md text-gray-800 flex flex-col items-center justify-center h-full">
        <h3 className="text-sm font-medium text-gray-500 mb-2 text-center">Humedad</h3>
        <div className="flex flex-col items-center justify-center">
          <Droplets size={24} className="text-gray-600" />
          <span className="text-2xl font-semibold text-blue-500">{data.humedad.toFixed(1)}%</span>
        </div>
      </div>

      <div className="bg-teal-50 rounded-lg p-3 shadow-md text-gray-800 flex flex-col items-center justify-center h-full">
        <h3 className="text-sm font-medium text-gray-500 mb-2 text-center">Lluvia</h3>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Cloud size={32} className="text-gray-600" />
            {data.lluvia > 0 && (
              <div className="absolute bottom-0 left-3 w-2 h-2.5 bg-blue-500 rounded-full shadow-[2px_-1px_0_0_#3b82f6,-2px_-1px_0_0_#3b82f6]"></div>
            )}
          </div>
          <span className="text-sm font-medium mt-1">{getRainIntensity(data.lluvia)}</span>
          <span className="text-xs text-gray-500">{data.lluvia.toFixed(1)} mm</span>
        </div>
      </div>

      <div className="bg-teal-50 rounded-lg p-3 shadow-md text-gray-800 flex flex-col items-center justify-center h-full">
        <h3 className="text-sm font-medium text-gray-500 mb-2 text-center">Intensidad del sol</h3>
        <div className="flex flex-col items-center justify-center">
          <Sun size={32} className="text-amber-500" />
          <span className="text-sm font-medium mt-1">{getSunIntensity(data.sol)}</span>
          <span className="text-xs text-gray-500">{data.sol}%</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCards

