import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AutocompletePl from "../components/function components/autocomplete";

const Gmap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const [selectedLocationFromSearch, setSelectedLocationFromSearch] = useState(null);
  

  

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    console.log("Selected Location:", selectedLocationFromSearch?.lat, selectedLocationFromSearch?.lon);
  }, [selectedLocationFromSearch]);
  

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocationFromSearch(selectedLocation);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA341iZktrv-k3TxPm5EF-ypykTYBa3Kes",
    libraries: ["places"],
  });

  const [map, setmap] = useState(null);

  const onLoad = (map) => {
    setmap(map);
  };

  if (!isLoaded) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <>
      <div className="boxE1">
        <AutocompletePl onLocationSelect={handleLocationSelect} />
        <div className="boxE12">
          <button
            type="button"
            onClick={() => map.panTo(currentLocation)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <MyLocationIcon sx={{ color: "green" }} />
          </button>
        </div>
      </div>

      <GoogleMap
        center={{lat:selectedLocationFromSearch?.lat,lng:selectedLocationFromSearch?.lon}}
        zoom={16}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ zoomControl: false, fullscreenControl: false }}
        onLoad={onLoad}
      >
        <Marker position={currentLocation} />
      </GoogleMap>
    </>
  );
};

export default Gmap;
