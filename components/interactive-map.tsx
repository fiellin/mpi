"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Type declaration for Leaflet
interface LeafletMap {
  remove: () => void
  setView: (latlng: [number, number], zoom: number, options?: { animate?: boolean; duration?: number }) => void
}

interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker
  bindPopup: (content: string, options?: { maxWidth?: number; className?: string }) => LeafletMarker
  on: (event: string, handler: () => void) => LeafletMarker
  openPopup: () => void
  closePopup: () => void
}

interface LeafletModule {
  map: (element: HTMLElement, options?: {
    center: [number, number]
    zoom: number
    zoomControl?: boolean
    scrollWheelZoom?: boolean
  }) => LeafletMap
  tileLayer: (url: string, options?: {
    attribution?: string
    maxZoom?: number
  }) => { addTo: (map: LeafletMap) => void }
  divIcon: (options: {
    className: string
    html: string
    iconSize: [number, number]
    iconAnchor: [number, number]
  }) => unknown
  marker: (latlng: [number, number], options?: { icon?: unknown }) => LeafletMarker
  polyline: (latlngs: [number, number][], options?: {
    color?: string
    weight?: number
    opacity?: number
    dashArray?: string
  }) => { addTo: (map: LeafletMap) => void }
}

interface Location {
  id: number
  name: string
  address: string
  time: string
  description: string
  coordinates: { lat: number; lng: number }
  color: string
}

interface InteractiveMapProps {
  locations: Location[]
  selectedLocation: number | null
  onLocationSelect: (id: number | null) => void
}

export function InteractiveMap({ locations, selectedLocation, onLocationSelect }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<LeafletMarker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const loadMap = async () => {
      if (typeof window === "undefined") return

      try {
        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          link.crossOrigin = ""
          document.head.appendChild(link)

          // Wait for CSS to load
          await new Promise((resolve, reject) => {
            link.onload = resolve
            link.onerror = reject
          })
        }

        // Load Leaflet JS
        if (!(window as Window & { L?: LeafletModule }).L) {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          script.crossOrigin = ""
          document.head.appendChild(script)

          await new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
          })
        }

        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to load Leaflet:", error)
        setLoadError(true)
      }
    }

    loadMap()
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current || loadError) return

    try {
      // Initialize map
      const L = ((window as unknown) as Window & { L: LeafletModule }).L
      const map = L.map(mapRef.current, {
        center: [-6.1785, 106.8225],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map

      // Add markers for each location
      locations.forEach((location) => {
        // Create custom icon
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              width: 40px;
              height: 40px;
              background-color: ${location.color};
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              font-size: 16px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
              cursor: pointer;
              transition: transform 0.2s ease;
            ">
              ${location.id}
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        })

        // Create marker
        const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
          icon: customIcon,
        }).addTo(map)

        // Add popup
        const popupContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #354731; font-size: 16px; font-weight: bold;">
              ${location.name}
            </h3>
            <p style="margin: 0 0 4px 0; color: #6A994E; font-size: 12px; font-weight: 500;">
              ⏰ ${location.time}
            </p>
            <p style="margin: 0 0 8px 0; color: #B2A58D; font-size: 11px;">
              📍 ${location.address}
            </p>
            <p style="margin: 0; color: #354731; font-size: 12px; line-height: 1.4;">
              ${location.description}
            </p>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 250,
          className: "custom-popup",
        })

        // Add click event
        marker.on("click", () => {
          onLocationSelect(selectedLocation === location.id ? null : location.id)
        })

        markersRef.current.push(marker)
      })

      // Add route line connecting all locations
      const routeCoordinates = locations.map((loc): [number, number] => [loc.coordinates.lat, loc.coordinates.lng])
      L.polyline(routeCoordinates, {
        color: "#6A994E",
        weight: 3,
        opacity: 0.7,
        dashArray: "10, 10",
      }).addTo(map)

      // Add custom CSS for popups
      if (!document.querySelector("#leaflet-custom-styles")) {
        const style = document.createElement("style")
        style.id = "leaflet-custom-styles"
        style.textContent = `
          .custom-popup .leaflet-popup-content-wrapper {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1px solid rgba(106, 153, 78, 0.2);
            box-shadow: 0 8px 32px rgba(53, 71, 49, 0.15);
          }
          .custom-popup .leaflet-popup-tip {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(106, 153, 78, 0.2);
          }
          .custom-marker:hover div {
            transform: scale(1.1);
          }
          .leaflet-control-attribution {
            font-size: 10px;
            background: rgba(255, 255, 255, 0.8);
          }
        `
        document.head.appendChild(style)
      }
    } catch (error) {
      console.error("Failed to initialize map:", error)
      setLoadError(true)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
    }
  }, [isLoaded, locations, onLocationSelect, selectedLocation, loadError])

  // Handle selected location changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || loadError) return

    markersRef.current.forEach((marker, index) => {
      if (selectedLocation === locations[index].id) {
        marker.openPopup()
        // Animate to location
        mapInstanceRef.current?.setView([locations[index].coordinates.lat, locations[index].coordinates.lng], 13, {
          animate: true,
          duration: 1,
        })
      } else {
        marker.closePopup()
      }
    })
  }, [selectedLocation, locations, isLoaded, loadError])

  if (loadError) {
    return (
      <div className="relative bg-gradient-to-br from-[#A7D548]/20 to-[#8CBF26]/20 rounded-2xl h-96 overflow-hidden border border-[#6A994E]/20 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-3 text-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-[#354731] font-medium mb-2">Interactive Map Unavailable</p>
          <p className="text-[#6A994E] text-sm">Don&apos;t worry! All location details are listed on the right.</p>
        </motion.div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="relative bg-gradient-to-br from-[#A7D548]/20 to-[#8CBF26]/20 rounded-2xl h-96 overflow-hidden border border-[#6A994E]/20 flex items-center justify-center">
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-8 h-8 border-3 border-[#6A994E] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-[#6A994E] font-medium">Loading Jakarta Map...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-96 rounded-2xl overflow-hidden border border-[#6A994E]/20" />

      {/* Map Legend */}
      <motion.div
        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-[#6A994E]/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h4 className="text-[#354731] font-semibold text-sm mb-2">Our Route</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto styled-scrollbar pr-1">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: location.color }} />
              <span className="text-[#354731]">{location.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Map Controls Info */}
      <motion.div
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-[#6A994E]/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-[#6A994E] text-xs">Click markers for details</p>
      </motion.div>
    </div>
  )
}
