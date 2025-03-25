"use client"
import dynamic from "next/dynamic"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useRef } from "react"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

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
  pestType: string
  severity: string
}

interface MapProps {
  locations: Location[]
}

export default function Map({ locations }: MapProps) {
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer: any) => {
        if (layer._leaflet_id) {
          mapRef.current.removeLayer(layer)
        }
      })
    }
  }, [locations])

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "600px", width: "100%" }}
      className="z-0"
      scrollWheelZoom={true}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{location.country}</h3>
              <p className="text-sm">Pest Type: {location.pestType}</p>
              <div className="mt-1">
                Severity:{" "}
                <span className="px-2 py-1 rounded-full text-xs text-white bg-red-500">
                  {location.severity}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}