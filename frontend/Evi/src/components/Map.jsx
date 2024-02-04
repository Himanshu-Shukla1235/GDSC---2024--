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

const Gmap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA341iZktrv-k3TxPm5EF-ypykTYBa3Kes",
    libraries: ["places"],
  });
  const center = { lat: 48.8584, lng: 2.2945 };
  const [map, setmap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (map) => {
    setmap(map);
  };
  

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      // Do something with the selected place, e.g., get its details
      const place = autocomplete.getPlace();
      console.log("Selected Place:", place);
    }
  };

  if (!isLoaded) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <>
      <div className="boxE1">
        <div className="boxE11">
          <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={onPlaceChanged}>
            <TextField
             id="standard-basic"  variant="standard"
              color="primary"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search"  onClick={() => map.panTo(center)}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
             
              }}
            />
          </Autocomplete>
        </div>
       
          
       
        <div className="boxE12">
          <button
            type="button"
            onClick={() => map.panTo(center)}
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
        center={center}
        zoom={16}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ zoomControl: false }}
        onLoad={onLoad}
      >
        <Marker position={center} />
      </GoogleMap>
    </>
  );
};

export default Gmap;
