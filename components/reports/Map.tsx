"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
})

export default function Map({ data }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((item, index) => (
        <Marker key={index} position={[item.lat, item.lng]}>
          <Popup>
            <div>
              <h3>{item.country}</h3>
              <p>Region: {item.region}</p>
              <p>Pest: {item.pestType}</p>
              <p>Severity: {item.severity}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

