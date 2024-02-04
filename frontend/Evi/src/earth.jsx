import { useState ,useEffect} from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import axios from "axios";

const Gmap = () => {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: "AIzaSyA341iZktrv-k3TxPm5EF-ypykTYBa3Kes" }); // Replace with your actual API key
  const center = { lat: 48.8584, lng: 2.2945 };
 

  if (!isLoaded) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <>
      <GoogleMap center={center} zoom={16} mapContainerStyle={{ width: "100%", height: "100%" }} options={{zoomControl:false}}>
       
        <Marker position={center} options={{icon:<AddLocationAltIcon/>}}/>

        {/* You can add more markers by using multiple Marker components */}
        {/* <Marker position={{ lat: 48.8585, lng: 2.2946 }} /> */}
        {/* <Marker position={{ lat: 48.8586, lng: 2.2947 }} /> */}
        {/* ... Add as many markers as needed */}
      </GoogleMap>
    </>
  );
};

export default Gmap;
