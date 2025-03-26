"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import MapSection from "./MapSection"
import WeatherCards from "./WeatherCards"
import Footer from "./Footer"
import { fetchApiData, type ApiResponse } from "../services/api"

const Dashboard = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadApiData = async () => {
      try {
        console.log("Iniciando carga de datos...")
        const data = await fetchApiData()
        console.log("Datos cargados:", data)
        setApiData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        setError("Error al cargar datos. Usando datos de respaldo.")
        setLoading(false)
      }
    }

    loadApiData()
  }, [])

  // Asegurarse de que hay datos antes de renderizar los componentes
  const sensoresData = apiData?.sensores || {
    humedad: 0,
    temperatura: 0,
    lluvia: 0,
    sol: 0,
  }

  const parcelasData = apiData?.parcelas || []

  return (
    <div className="flex flex-col min-h-screen bg-indigo-600 text-white">
      <Header />

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-medium mb-6">Dashboard</h1>

        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {loading ? (
            <div className="bg-white rounded-lg p-4 text-gray-800">Cargando datos...</div>
          ) : (
            <>
              <MapSection locations={parcelasData} />
              <WeatherCards data={sensoresData} />
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard

