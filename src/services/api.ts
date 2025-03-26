import axios from "axios"

export interface Sensor {
  humedad: number
  temperatura: number
  lluvia: number
  sol: number
}

export interface Parcela {
  id: number
  nombre: string
  ubicacion: string
  responsable: string
  tipo_cultivo: string
  ultimo_riego: string
  sensor: Sensor
  latitud: number
  longitud: number
}

export interface ApiResponse {
  sensores: Sensor
  parcelas: Parcela[]
}

// URL del backend
const API_URL = "http://localhost:3001/api/data"

// Función para obtener los datos de la API
export const fetchApiData = async (): Promise<ApiResponse> => {
  try {
    console.log("Realizando petición a:", API_URL)
    const response = await axios.get<ApiResponse>(API_URL)
    console.log("Respuesta recibida:", response.data)
    return response.data
  } catch (error) {
    console.error("Error al obtener datos de la API:", error)

    // Si hay un error, intentamos obtener los datos de la API de respaldo
    try {
      console.log("Intentando obtener datos de respaldo...")
      const backupResponse = await axios.get<ApiResponse>("https://moriahmkt.com/iotapp/test/")
      console.log("Respuesta de respaldo recibida:", backupResponse.data)
      return backupResponse.data
    } catch (backupError) {
      console.error("Error al obtener datos de respaldo:", backupError)
      throw new Error("No se pudieron obtener los datos de la API")
    }
  }
}

