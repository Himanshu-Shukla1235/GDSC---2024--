import React, { useState, useEffect } from "react";
import axios from "axios";

const AirQuality = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  const fetchData = async (latitude, longitude) => {
    const weatherOptions = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: {
        q: `${latitude},${longitude}`,
      },
      headers: {
        "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(weatherOptions);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAirQuality = async (latitude, longitude) => {
    const airQualityOptions = {
      method: "GET",
      url: "https://air-quality.p.rapidapi.com/current/airquality",
      params: {
        lon: longitude.toString(),
        lat: latitude.toString(),
      },
      headers: {
        "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
        "X-RapidAPI-Host": "air-quality.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(airQualityOptions);
      setAirQualityData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lon: longitude });
          fetchData(latitude, longitude);
          fetchAirQuality(latitude, longitude);
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

  return (
    <div>
      {currentLocation && (
        <h2>
          Current Location: {currentLocation.lat}, {currentLocation.lon}
        </h2>
      )}

      {weatherData && (
        <div>
          <h2>Location: {weatherData.location.name}</h2>
          <p>Current Temperature: {weatherData.current.temp_c}°C</p>
          {/* Add more weather details as needed */}
        </div>
      )}
      {airQualityData && (
        <div>
          <h2>Air Quality Index: {airQualityData.data[0].aqi}</h2>
          {/* Add more air quality details as needed */}
        </div>
      )}
    </div>
  );
};

export default AirQuality;
