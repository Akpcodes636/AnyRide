"use client";

import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRideStore } from "@/store/rideStore";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "60vh",
  borderRadius: "20px",
};

const defaultCenter = {
  lat: 6.5244,
  lng: 3.3792,
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const libraries: ("places")[] = ["places"];

export default function MapLayout() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const pickup = useRideStore((s) => s.rideData.pickup);
  const destination = useRideStore((s) => s.rideData.destination);

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Fetch directions when both pickup and destination are set
  useEffect(() => {
    if (!isLoaded || !pickup || !destination) {
      setDirections(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: pickup.lat, lng: pickup.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
          setDirections(null);
        }
      }
    );
  }, [isLoaded, pickup, destination]);

  // Fit bounds when markers change
  useEffect(() => {
    if (!mapRef.current) return;

    if (pickup && destination) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat: pickup.lat, lng: pickup.lng });
      bounds.extend({ lat: destination.lat, lng: destination.lng });
      mapRef.current.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    } else if (pickup) {
      mapRef.current.panTo({ lat: pickup.lat, lng: pickup.lng });
      mapRef.current.setZoom(15);
    } else if (destination) {
      mapRef.current.panTo({ lat: destination.lat, lng: destination.lng });
      mapRef.current.setZoom(15);
    }
  }, [pickup, destination]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded) {
    return (
      <div
        style={containerStyle}
        className="bg-[#F0F0F5] flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-3 border-[#02093A] border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-[#999]">Loading map...</p>
        </div>
      </div>
    );
  }

  const center = pickup
    ? { lat: pickup.lat, lng: pickup.lng }
    : destination
    ? { lat: destination.lat, lng: destination.lng }
    : defaultCenter;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={13}
      center={!pickup && !destination ? defaultCenter : undefined}
      options={mapOptions}
      onLoad={onLoad}
    >
      {/* Pickup marker (green) */}
      {pickup && !directions && (
        <Marker
          position={{ lat: pickup.lat, lng: pickup.lng }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#02093A",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 3,
          }}
          title="Pickup"
        />
      )}

      {/* Destination marker (red) */}
      {destination && !directions && (
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#A20602",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 3,
          }}
          title="Destination"
        />
      )}

      {/* Route */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#02093A",
              strokeWeight: 4,
              strokeOpacity: 0.8,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
