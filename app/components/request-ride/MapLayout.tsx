"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
height: "150vh",
};

const center = {
  lat: 6.5244,   // Lagos example
  lng: 3.3792,
};

export default function MapLayout() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      />
    </LoadScript>
  );
}
