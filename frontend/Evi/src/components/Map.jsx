import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AutocompletePl from "../components/function components/autocomplete";

const Gmap = ({ onMapChange}) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Getting the current location
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

  // Getting location from search
  const [selectedLocationFromSearch, setSelectedLocationFromSearch] =
    useState(null);

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocationFromSearch(selectedLocation);
    
  };

  // Setting the lon and lat on map
  const [attribute, setAttribute] = useState({
    lat: currentLocation?.lat,
    lng: currentLocation?.lng,
  });

  useEffect(() => {
    setAttribute({
      lat: selectedLocationFromSearch?.lat || currentLocation?.lat,
      lng: selectedLocationFromSearch?.lon || currentLocation?.lng,
    });
    onMapChange(attribute);
  }, [selectedLocationFromSearch, currentLocation]);

  // Setting up Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:  "AIzaSyA341iZktrv-k3TxPm5EF-ypykTYBa3Kes", // Replace with your API key
   
  });

  const [map, setMap] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  if (!isLoaded) {
    return <CircularProgress />;
  }
  //giving location


  //exporting the map seted location
  

 

  return (
    <>
       <div></div>
    {/* --------------------------------------------------------------------------------------| boxE1 |-------------*/}
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
      
      <div style={{ border: "3px solid black", width: "100%", height: "100%" }}>
        <GoogleMap
          style={{ border: "3px solid black" }}
          center={attribute}
          zoom={16}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{ zoomControl: false, fullscreenControl: false }}
          onLoad={onLoad}
        >
          <Marker position={attribute} />
        </GoogleMap>
      </div>
    </>
  );
};

export default Gmap;
