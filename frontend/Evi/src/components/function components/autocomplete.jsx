import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "../function components/autocomplete.css";

const LocationSearch = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showResults, setShowResults] = useState(true); // New state for controlling visibility

  // #when the text changes in search the function call...
  const handleChange = async (value) => {
    setSearchTerm(value);

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/search.json",
      params: { q: value },
      headers: {
        "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //#to handle the selected location on search
  const handleSelectLocation = (selectedLocation) => {
    setSearchTerm(
      `${selectedLocation.name},${selectedLocation.region}, ${selectedLocation.country}`
    );
    setSelectedLocation(selectedLocation);
    setShowResults(false); // Hide search results
    console.log(selectedLocation.lat, selectedLocation.lon);
    onLocationSelect(selectedLocation); // Callback to pass selected location to the parent component
  };

  useEffect(() => {
    // Fetch user's current position and use it as the initial search term
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleChange(`${latitude},${longitude}`);
      },
      (error) => {
        console.error("Error getting current position:", error);
        // You can set a default location or handle the error as needed
      }
    );
  }, []);

  return (
    <>
      {/*  ----------------------------------------------------------| navigate |-------------- */}
      <div className="navigate">

   {/* --------------------------------------------------------------| boxE11 |-------------- */}
        <div className="boxE11">
          <TextField
            id="standard-basic"
            variant="standard"
            color="primary"
            fullWidth
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    aria-label="search"
                    onClick={() => setShowResults(true)} // Show search results on search icon click
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ width: "350px" }}
          />
        </div>
        {/* ------------------------------------------------------------------------|            |-------------- */}
        
        {showResults && ( // Only render search results if showResults is true
          <div className="searchre">
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSelectLocation(result)}
                  style={{ cursor: "pointer" }}
                >
                  {result.name}, {result.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* ----------------------------------------------------------------|      |-------------- */}
    </>
  );
};

export default LocationSearch;
