import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "../function components/autocomplete.css";

const LocationSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showResults, setShowResults] = useState(true); // New state for controlling visibility

  const [Data, set] = useState("/");

  const fetching = async () => {
    var data = await axios.get("http://localhost:8000/api/auth/data");
    set(data.data);
    console.log(data);
  };

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

  const fetchLocationDetails = async (locationId) => {
    // Use the locationId to fetch more details about the selected location
    // Replace the following URL and headers with your actual API details
    const detailsOptions = {
      method: "GET",
      url: "YOUR_DETAILS_API_URL",
      params: { id: locationId },
      headers: {
        "Your-API-Key": "Your-API-Key",
        "Your-Other-Headers": "Your-Other-Headers",
      },
    };

    try {
      const detailsResponse = await axios.request(detailsOptions);
      console.log("Location Details:", detailsResponse.data);
      // Handle the location details as needed
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const handleSelectLocation = (selectedLocation) => {
    setSearchTerm(`${selectedLocation.name}, ${selectedLocation.country}`);
    setSelectedLocation(selectedLocation);
    setShowResults(false); // Hide search results
    console.log(selectedLocation.lat,selectedLocation.lon);
    // fetchLocationDetails(selectedLocation.id);
    // Do something with the selected location, e.g., store it in state or use it in your application
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
      <div className="navigate">
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
            style={{ width: "200px" }}
          />
        </div>
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
    </>
  );
};

export default LocationSearch;
