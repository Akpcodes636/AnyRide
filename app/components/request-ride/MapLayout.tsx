"use client";
import React from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "650px",
};

const center = {
  lat: 4.3160,   // Kinshasa example from Figma (Rond-Point de la Victoire)
  lng: 15.3120,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [{ "weight": "2.00" }]
    },
    {
      "featureType": "all",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#9c9c9c" }]
    },
    {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [{ "visibility": "on" }]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{ "color": "#f2f2f2" }]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#eeeeee" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#7b7b7b" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{ "visibility": "simplified" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#c8d7d4" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#070707" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#ffffff" }]
    }
  ]
};

export default function MapLayout() {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[650px] rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          options={mapOptions}
        />
      </LoadScript>
    </div>
  );
}

