"use client";

import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader, Circle } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRideStore } from "@/store/rideStore";
import { motion } from "framer-motion";

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
  gestureHandling: "cooperative",
  clickableIcons: false,
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
      "stylers": [{ "color": "#f8f9fa" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#e9ecef" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#d4e4f7" }]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#f5f5f5" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#e8eaf6" }]
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
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>(defaultCenter);
  const [zoom, setZoom] = useState(13);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isUserPanning, setIsUserPanning] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const lastCenterRef = useRef<{lat: number, lng: number} | null>(null);

  // Fetch directions when both pickup and destination are set
  // useEffect(() => {
  //   if (!isLoaded || !pickup?.lat || !destination?.lat) {
  //     setDirections(null);
  //     return;
  //   }

  //   const directionsService = new google.maps.DirectionsService();

  //   directionsService.route(
  //     {
  //       origin: { lat: pickup.lat, lng: pickup.lng },
  //       destination: { lat: destination.lat, lng: destination.lng },
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK && result) {
  //         setDirections(result);
  //       } else {
  //         console.error("Directions request failed:", status);
  //         setDirections(null);
  //       }
  //     }
  //   );
  // }, [isLoaded, pickup, destination]);


  useEffect(() => {
  if (!isLoaded || !pickup?.lat || !destination?.lat) return;

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
        setIsMapLoading(false);
      } else {
        console.error("Directions request failed:", status);
        setDirections(null);
        setIsMapLoading(false);
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
    setIsMapLoading(false);
    
    // Add map event listeners
    map.addListener('dragstart', () => {
      setIsUserPanning(true);
    });
    
    map.addListener('dragend', () => {
      setTimeout(() => setIsUserPanning(false), 100);
    });
  }, []);

  // Custom pickup marker with pulse animation
  const createPickupMarker = useCallback(() => ({
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#02093A",
    fillOpacity: 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
    scale: 2.5,
    anchor: new google.maps.Point(12, 24),
  }), []);

  // Custom destination marker
  const createDestinationMarker = useCallback(() => ({
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#A20602",
    fillOpacity: 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
    scale: 2.5,
    anchor: new google.maps.Point(12, 24),
  }), []);

  if (!isLoaded) {
    return (
      <div
        style={containerStyle}
        className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-screen relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 backrop-blur-sm" />
        <motion.div 
          className="flex flex-col items-center gap-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-12 h-12  rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-[16px] text-[#666] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading amazing map experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[650px] rounded-[20px] overflow-hidden shadow-xl  relative">
      {/* Map loading overlay */}
      {isMapLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-10 h-10 border-3 border-[#02093A] border-t-transparent rounded-full animate-spin" />
            <p className="text-[14px] text-[#666] font-medium">Finding best route...</p>
          </motion.div>
        </div>
      )}
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={zoom}
        center={mapCenter}
        options={mapOptions}
        onLoad={onLoad}
        onZoomChanged={() => {
          if (mapRef.current && !isUserPanning) {
            const newZoom = mapRef.current.getZoom() || 13;
            if (newZoom !== zoom) {
              setZoom(newZoom);
            }
          }
        }}
        onCenterChanged={() => {
          if (mapRef.current && isUserPanning) {
            const center = mapRef.current.getCenter();
            if (center) {
              const newCenter = { lat: center.lat(), lng: center.lng() };
              
              // Only update state if center has actually changed significantly
              if (!lastCenterRef.current || 
                  Math.abs(lastCenterRef.current.lat - newCenter.lat) > 0.0001 ||
                  Math.abs(lastCenterRef.current.lng - newCenter.lng) > 0.0001) {
                lastCenterRef.current = newCenter;
                setMapCenter(newCenter);
              }
            }
          }
        }}
      >
        {/* Pickup marker with pulse effect */}
        {pickup?.lat && !directions && (
          <>
            <Circle
              center={{ lat: pickup.lat, lng: pickup.lng }}
              radius={30}
              options={{
                fillColor: "#02093A",
                fillOpacity: 0.1,
                strokeColor: "#02093A",
                strokeOpacity: 0.3,
                strokeWeight: 2,
              }}
            />
            <Marker
              position={{ lat: pickup.lat, lng: pickup.lng }}
              icon={createPickupMarker()}
              title="Pickup Location"
              animation={google.maps.Animation.DROP}
            />
          </>
        )}

        {/* Destination marker with pulse effect */}
        {destination?.lat && !directions && (
          <>
            <Circle
              center={{ lat: destination.lat, lng: destination.lng }}
              radius={30}
              options={{
                fillColor: "#A20602",
                fillOpacity: 0.1,
                strokeColor: "#A20602",
                strokeOpacity: 0.3,
                strokeWeight: 2,
              }}
            />
            <Marker
              position={{ lat: destination.lat, lng: destination.lng }}
              icon={createDestinationMarker()}
              title="Destination"
              animation={google.maps.Animation.DROP}
            />
          </>
        )}

        {/* Enhanced route */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#02093A",
                strokeWeight: 5,
                strokeOpacity: 0.8,
                geodesic: true,
              },
            }}
          />
        )}
        
        {/* Add custom markers for route when directions are available */}
        {directions && pickup?.lat && destination?.lat && (
          <>
            <Marker
              position={{ lat: pickup.lat, lng: pickup.lng }}
              icon={createPickupMarker()}
              title="Pickup Location"
              zIndex={1000}
            />
            <Marker
              position={{ lat: destination.lat, lng: destination.lng }}
              icon={createDestinationMarker()}
              title="Destination"
              zIndex={1000}
            />
          </>
        )}
      </GoogleMap>
      
      {/* Floating map controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <button
          onClick={() => {
            if (mapRef.current && pickup?.lat) {
              mapRef.current.panTo({ lat: pickup.lat, lng: pickup.lng });
              mapRef.current.setZoom(16);
            }
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          title="Center on pickup"
        >
          <svg className="w-5 h-5 text-[#02093A]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (mapRef.current) {
              const currentZoom = mapRef.current.getZoom() || 13;
              mapRef.current.setZoom(currentZoom + 1);
            }
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          title="Zoom in"
        >
          <svg className="w-5 h-5 text-[#02093A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (mapRef.current) {
              const currentZoom = mapRef.current.getZoom() || 13;
              mapRef.current.setZoom(Math.max(1, currentZoom - 1));
            }
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          title="Zoom out"
        >
          <svg className="w-5 h-5 text-[#02093A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
