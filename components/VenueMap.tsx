'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Roscoe's Jazz Lounge coordinates
const VENUE_LNG = -118.1862
const VENUE_LAT = 33.7701
const VENUE_NAME = "Roscoe's Jazz Lounge"
const VENUE_ADDRESS = '730 E Broadway, Long Beach, CA 90802'
const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${VENUE_LAT},${VENUE_LNG}`

export default function VenueMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) {
      setMapError(true)
      return
    }

    let map: mapboxgl.Map

    const initMap = async () => {
      try {
        const mapboxgl = (await import('mapbox-gl')).default
        await import('mapbox-gl/dist/mapbox-gl.css')

        mapboxgl.accessToken = MAPBOX_TOKEN

        map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [VENUE_LNG, VENUE_LAT],
          zoom: 16.5,
          pitch: 45,
          bearing: -10,
          antialias: true,
          attributionControl: false,
          scrollZoom: false,
        })

        map.addControl(
          new mapboxgl.NavigationControl({ showCompass: false }),
          'top-right'
        )

        // Custom marker element
        const markerEl = document.createElement('div')
        markerEl.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          ">
            <div style="
              background: #0052FF;
              border: 3px solid rgba(255,255,255,0.9);
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 20px rgba(0, 82, 255, 0.4);
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
            <div style="
              width: 3px;
              height: 12px;
              background: linear-gradient(to bottom, #0052FF, transparent);
              margin-top: -2px;
            "></div>
          </div>
        `

        // Popup
        const popup = new mapboxgl.Popup({
          offset: 30,
          closeButton: false,
          className: 'venue-popup',
        }).setHTML(`
          <div style="
            background: #1e2025;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 16px;
            min-width: 200px;
          ">
            <p style="color: #0052FF; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 4px 0; font-family: Inter, system-ui, sans-serif;">VENUE</p>
            <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0 0 6px 0; font-family: Inter, system-ui, sans-serif;">${VENUE_NAME}</p>
            <p style="color: #8a919e; font-size: 12px; margin: 0; font-family: Inter, system-ui, sans-serif;">${VENUE_ADDRESS}</p>
          </div>
        `)

        new mapboxgl.Marker({ element: markerEl })
          .setLngLat([VENUE_LNG, VENUE_LAT])
          .setPopup(popup)
          .addTo(map)

        map.on('load', () => {
          setMapLoaded(true)

          // Add building extrusions for 3D feel
          const layers = map.getStyle().layers
          if (layers) {
            const labelLayerId = layers.find(
              (layer) => layer.type === 'symbol' && layer.layout && 'text-field' in layer.layout
            )?.id

            if (labelLayerId) {
              map.addLayer(
                {
                  id: '3d-buildings',
                  source: 'composite',
                  'source-layer': 'building',
                  filter: ['==', 'extrude', 'true'],
                  type: 'fill-extrusion',
                  minzoom: 13,
                  paint: {
                    'fill-extrusion-color': '#1e2025',
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-base': ['get', 'min_height'],
                    'fill-extrusion-opacity': 0.6,
                  },
                },
                labelLayerId
              )
            }
          }
        })

        mapRef.current = map
      } catch {
        setMapError(true)
      }
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative overflow-hidden bg-surface">
      {/* Map container */}
      <div
        ref={mapContainer}
        className="w-full"
        style={{ height: '400px' }}
      />

      {/* Loading state */}
      {!mapLoaded && !mapError && MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <div className="text-text-muted text-sm animate-pulse">Loading map...</div>
        </div>
      )}

      {/* Fallback when no API key or error */}
      {(mapError || !MAPBOX_TOKEN) && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <div className="text-center p-8">
            <MapPin className="w-8 h-8 text-cb-blue mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">{VENUE_NAME}</p>
            <p className="text-text-muted text-sm mb-4">{VENUE_ADDRESS}</p>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cb-blue text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      {mapLoaded && (
        <div className="absolute top-4 left-4 z-10">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-surface/90 backdrop-blur-sm border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-surface transition-colors"
          >
            <Navigation className="w-4 h-4 text-cb-blue" />
            Get Directions
          </a>
        </div>
      )}
    </div>
  )
}
