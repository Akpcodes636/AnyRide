"use client";

import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRideStore } from "@/store/rideStore";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "650px",
  borderRadius: "32px",
};

const defaultCenter = {
  lat: 4.3160,
  lng: 15.3120,
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }],
    },
    {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }],
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#eeeeee" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#c8d7d4" }]
    }
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
    if (!isLoaded || !pickup?.lat || !destination?.lat) {
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

    if (pickup?.lat && destination?.lat) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat: pickup.lat, lng: pickup.lng });
      bounds.extend({ lat: destination.lat, lng: destination.lng });
      mapRef.current.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    } else if (pickup?.lat) {
      mapRef.current.panTo({ lat: pickup.lat, lng: pickup.lng });
      mapRef.current.setZoom(15);
    } else if (destination?.lat) {
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
        className="bg-[#F0F0F5] flex items-center justify-center border border-gray-100 shadow-sm"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-3 border-[#02093A] border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-[#999]">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[650px] rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={13}
        center={!pickup?.lat && !destination?.lat ? defaultCenter : undefined}
        options={mapOptions}
        onLoad={onLoad}
      >
        {/* Pickup marker */}
        {pickup?.lat && !directions && (
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

        {/* Destination marker */}
        {destination?.lat && !directions && (
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
    </div>
  );
}
