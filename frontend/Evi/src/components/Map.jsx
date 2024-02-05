import { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AutocompletePl from "../components/function components/autocomplete";

const Gmap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
         console.log(currentLocation)
         console.log("searchl")
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
   
    getLocation();
    
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA341iZktrv-k3TxPm5EF-ypykTYBa3Kes",
    libraries: ["places"],
  });
  
  const [map, setmap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (map) => {
    setmap(map);
  };

  // const onPlaceChanged = () => {
  //   if (autocomplete !== null) {
  //     // Do something with the selected place, e.g., get its details
  //     const place = autocomplete.getPlace();
  //     console.log("Selected Place:", place);
  //   }
  // };

  if (!isLoaded) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <>
      <div className="boxE1">
        <AutocompletePl userLocation={currentLocation}></AutocompletePl>

        {/* <div className="boxE11">
          <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={onPlaceChanged}>
            <TextField
             id="standard-basic"  variant="standard"
              color="primary"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search"  onClick={() => map.panTo(currentLocation)}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
             
              }}
            />
          </Autocomplete>
        </div> */}

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
        center={currentLocation}
        zoom={16}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ zoomControl: false }}
        onLoad={onLoad}
      >
        <Marker position={currentLocation} />
      </GoogleMap>
    </>
  );
};

export default Gmap;
