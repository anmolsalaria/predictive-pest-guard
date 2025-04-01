"use client"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"

// Fix for default marker icon in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Location {
  lat: number
  lng: number
  country: string
  region: string
  pestType: string
  severity: string
  cases?: number
}

interface MapProps {
  locations: Location[]
}

export default function Map({ locations }: MapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  // Create custom markers based on severity
  const createCustomMarker = (severity: string, cases = 0) => {
    let markerColor = ""

    switch (severity.toLowerCase()) {
      case "low":
        markerColor = "green"
        break
      case "medium":
        markerColor = "orange"
        break
      case "high":
        markerColor = "red"
        break
      case "critical":
        markerColor = "purple"
        break
      default:
        markerColor = "blue"
    }

    // Size based on number of cases (min 24px, max 40px)
    const size = Math.max(24, Math.min(40, 24 + cases / 50))

    return L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: ${markerColor}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: ${size / 2}px;">${cases > 0 ? cases : ""}</div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    })
  }

  // Get severity color for the popup badge
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      case "critical":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isMounted) {
    return <div className="h-[500px] w-full bg-gray-100" />
  }

  return (
    <MapContainer
      center={[20, 0]} // Center at a point that shows most of the world
      zoom={2} // Lower zoom level to show all continents
      style={{ height: "500px", width: "100%" }}
      className="z-0"
      scrollWheelZoom={true}
      dragging={false} // Disable panning
      doubleClickZoom={true}
      zoomControl={false} // Remove default zoom control
      minZoom={2} // Set minimum zoom level
      maxZoom={6} // Limit maximum zoom to keep context
    >
      <ZoomControl position="bottomright" /> {/* Add zoom control in a better position */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={`${location.country}-${location.region}-${index}`}
          position={[location.lat, location.lng]}
          icon={createCustomMarker(location.severity, location.cases)}
        >
          <Popup>
            <div className="p-3">
              <h3 className="font-bold text-lg">
                {location.region}, {location.country}
              </h3>
              <div className="mt-2">
                <p className="font-semibold">Pest Type:</p>
                <p className="text-sm">{location.pestType}</p>
              </div>
              <div className="mt-2">
                <p className="font-semibold">Severity:</p>
                <span className={`px-2 py-1 rounded-full text-xs text-white ${getSeverityColor(location.severity)}`}>
                  {location.severity}
                </span>
              </div>
              {location.cases && (
                <div className="mt-2">
                  <p className="font-semibold">Cases Reported:</p>
                  <p className="text-sm">{location.cases}</p>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

