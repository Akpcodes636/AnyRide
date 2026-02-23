"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MapPin, Loader2, X } from "lucide-react";
import cn from "classnames";

interface LocationSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
   label?: string; // ✅ optional label prop
}

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function LocationSearchInput({
  value,
  onChange,
  onSelect,
  placeholder = "Enter location",
  className,
  disabled = false,
  label
}: LocationSearchInputProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize Google Services
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      if (!autocompleteService.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
      if (!placesService.current) {
        // PlacesService requires a DOM node, even if we don't use it for map display
        const dummyNode = document.createElement("div");
        placesService.current = new window.google.maps.places.PlacesService(dummyNode);
      }
    }
  }, []); // Run once on mount, check for window.google

  // Fetch predictions
  const fetchPredictions = useCallback((input: string) => {
    if (!input || !autocompleteService.current) {
      setPredictions([]);
      return;
    }

    try {
        autocompleteService.current.getPlacePredictions(
        {
            input,
            componentRestrictions: { country: [] }, // Remove or customize country restriction
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPredictions(
                results.map((place) => ({
                place_id: place.place_id,
                description: place.description,
                structured_formatting: {
                    main_text: place.structured_formatting.main_text,
                    secondary_text: place.structured_formatting.secondary_text,
                },
                }))
            );
            setIsOpen(true);
            } else {
            setPredictions([]);
            }
        }
        );
    } catch (error) {
        console.error("Error fetching predictions:", error);
    }
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    if (newVal.length > 2) {
      fetchPredictions(newVal);
    } else {
      setIsOpen(false);
    }
  };

  // Handle selection
  const handleSelect = (prediction: Prediction) => {
    // 1. Update text immediately
    onChange(prediction.description);
    setIsOpen(false);
    setIsLoading(true);

    // 2. Get details (lat/lng)
    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: ["geometry", "formatted_address"],
        },
        (place, status) => {
          setIsLoading(false);
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
          ) {
            onSelect(
              place.formatted_address || prediction.description,
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
          } else {
            console.error("Failed to fetch place details");
          }
        }
      );
    }
  };

  const clearInput = () => {
    onChange("");
    setPredictions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative w-full h-full flex items-center bg-purple-800">
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value.length > 2 && predictions.length > 0) setIsOpen(true);
          }}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full h-full px-4 py-3 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            "bg-transparent text-gray-900 placeholder:text-gray-400"
          )}
        />

      </div>

      {/* Dropdown */}
      {isOpen && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleSelect(prediction)}
              className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-start gap-3 group border-b border-gray-50 last:border-none"
            >
              <div className="mt-1 p-2 bg-gray-50 rounded-full group-hover:bg-red-100 transition-colors">
                <MapPin className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-[15px]">
                  {prediction.structured_formatting.main_text}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {prediction.structured_formatting.secondary_text}
                </p>
              </div>
            </button>
          ))}
          
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex justify-end">
             <img src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png" alt="Powered by Google" className="h-4 opacity-70" />
          </div>
        </div>
      )}
    </div>
  );
}
