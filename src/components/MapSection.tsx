"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { Parcela } from "../services/api"

// Token de Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoibGlhbi1zaWVycmEiLCJhIjoiY204NTd6OGNpMmE1ZzJrcWJsd2pram50biJ9.Z1OkDwsM9EhsSJ_9goQF2A"

interface MapSectionProps {
  locations: Parcela[]
}

const MapSection = ({ locations }: MapSectionProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    console.log("MapSection recibió locations:", locations)

    // Verificar que el contenedor existe
    if (!mapContainer.current) {
      console.error("El contenedor del mapa no existe")
      return
    }

    // Crear el mapa centrado en Cancún por defecto
    const defaultCenter = [-86.8515, 21.1619] // Cancún, México

    try {
      console.log("Inicializando mapa...")
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: defaultCenter,
        zoom: 12,
      })

      // Añadir controles de navegación
      map.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Añadir marcadores cuando el mapa termine de cargar
      map.on("load", () => {
        console.log("Mapa cargado, añadiendo marcadores...")

        if (locations.length === 0) {
          console.warn("No hay ubicaciones para mostrar en el mapa")
          return
        }

        // Añadir marcadores para cada parcela
        locations.forEach((parcela) => {
          console.log(`Añadiendo marcador para ${parcela.nombre} en [${parcela.longitud}, ${parcela.latitud}]`)

          try {
            const marker = new mapboxgl.Marker({ color: "#e74c3c" })
              .setLngLat([parcela.longitud, parcela.latitud])
              .setPopup(
                new mapboxgl.Popup({ maxWidth: "300px" }).setHTML(
                  `<div style="color: black;">
                    <h3 style="margin: 0; font-weight: bold; font-size: 16px;">${parcela.nombre}</h3>
                    <p style="margin: 5px 0 0;"><strong>Cultivo:</strong> ${parcela.tipo_cultivo}</p>
                    <p style="margin: 2px 0;"><strong>Responsable:</strong> ${parcela.responsable}</p>
                    <p style="margin: 2px 0;"><strong>Ubicación:</strong> ${parcela.ubicacion}</p>
                    <p style="margin: 2px 0;"><strong>Último riego:</strong> ${parcela.ultimo_riego}</p>
                    
                    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
                      <p style="margin: 2px 0; font-weight: bold;">Datos del sensor:</p>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
                        <div style="text-align: center; padding: 6px; background-color: #f8f9fa; border-radius: 4px;">
                          <div style="color: #ef4444; font-weight: bold; font-size: 15px;">${parcela.sensor.temperatura.toFixed(1)} °C</div>
                          <div style="font-size: 12px; color: #6b7280;">Temperatura</div>
                        </div>
                        <div style="text-align: center; padding: 6px; background-color: #f8f9fa; border-radius: 4px;">
                          <div style="color: #3b82f6; font-weight: bold; font-size: 15px;">${parcela.sensor.humedad.toFixed(1)}%</div>
                          <div style="font-size: 12px; color: #6b7280;">Humedad</div>
                        </div>
                        <div style="text-align: center; padding: 6px; background-color: #f8f9fa; border-radius: 4px;">
                          <div style="font-weight: bold; font-size: 15px;">${parcela.sensor.lluvia.toFixed(1)} mm</div>
                          <div style="font-size: 12px; color: #6b7280;">Lluvia</div>
                        </div>
                        <div style="text-align: center; padding: 6px; background-color: #f8f9fa; border-radius: 4px;">
                          <div style="color: #f59e0b; font-weight: bold; font-size: 15px;">${parcela.sensor.sol}%</div>
                          <div style="font-size: 12px; color: #6b7280;">Sol</div>
                        </div>
                      </div>
                    </div>
                  </div>`,
                ),
              )
              .addTo(map)

            // Eliminar estas líneas:
            // marker.getElement().addEventListener('click', () => {
            //   if (onSelectParcela) {
            //     onSelectParcela(parcela);
            //   }
            // });
          } catch (err) {
            console.error(`Error al añadir marcador para ${parcela.nombre}:`, err)
          }
        })

        // Ajustar el mapa para mostrar todos los marcadores
        if (locations.length > 0) {
          const bounds = new mapboxgl.LngLatBounds()
          locations.forEach((parcela) => {
            bounds.extend([parcela.longitud, parcela.latitud])
          })
          map.fitBounds(bounds, { padding: 50 })
        }
      })

      // Manejar errores del mapa
      map.on("error", (e) => {
        console.error("Error en el mapa:", e)
        setMapError("Error al cargar el mapa. Verifica tu conexión a internet.")
      })

      // Limpiar al desmontar
      return () => {
        console.log("Desmontando mapa")
        map.remove()
      }
    } catch (error) {
      console.error("Error al inicializar el mapa:", error)
      setMapError("Error al inicializar el mapa. Verifica tu conexión a internet.")
    }
  }, [locations]) // Se ejecuta cuando cambian las ubicaciones

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
      <h2 className="p-4 text-base font-medium text-gray-800 bg-teal-50 border-b border-gray-200">Mapa de parcelas</h2>
      {mapError ? (
        <div className="p-4 text-red-500">{mapError}</div>
      ) : (
        <div ref={mapContainer} className="h-[400px] w-full" />
      )}
    </div>
  )
}

export default MapSection

