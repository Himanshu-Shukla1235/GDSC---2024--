import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Footer from "../components/footer";
import Navbar from "../components/Nav";
import { NavLink } from "react-router-dom";
import "../pages/earth.css";

import axios from "axios";
// import Whether from "../components/whether";

const Earth = () => {
  const [mapLocation, setMapLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData1, setWeatherData1] = useState(null);
  const [airData, setAirData] = useState();
  const fetchData = async (latitude,longitude) => {
      
    const apiKey = "d07a3987fb6b1409e5e36912f397be05";

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      setWeatherData1(response.data);
    } catch (error) {
      console.error("Error fetching weather data 123:", error);
      setWeatherData1(null); // Set weatherData to null in case of an error
    }
  };

  const fetchingAirQuality = async (latitude, longitude) => {
    const options = {
      method: "GET",
      url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
      params: { lat: latitude, lon: longitude },
      headers: {
        "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
        "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setAirData(response.data);
    } catch (error) {
      console.error("Error fetching air quality data:", error);
      setAirData(null); // Set airData to null in case of an error
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
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
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Set weatherData to null in case of an error
    }
  };

  const handleMapChange = (newLocation) => {
    console.log("New Location:", newLocation);
    fetchWeatherData(newLocation.lat, newLocation.lng);
    fetchingAirQuality(newLocation.lat, newLocation.lng);
    fetchData(newLocation.lat, newLocation.lng)
    setMapLocation(newLocation);
  };

  const getDefaultLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapLocation({ lat: latitude, lng: longitude });
          fetchWeatherData(latitude, longitude);
          fetchingAirQuality(latitude, longitude);
          fetchData(latitude, longitude)
          console.log("User current location:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setAirData(null); // Set airData to null if there's an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setAirData(null); // Set airData to null if geolocation is not supported
    }
  };

  useEffect(() => {
    getDefaultLocation();
   
  }, []);



  return (
    <>
      <header className="headerE">
        <Navbar />
      </header>
      <main className="mainE">
        <div className="boxE2">

          <Map onMapChange={handleMapChange}></Map>
        </div>
        <div className="boxE3">
          <div className="boxE31">
            {weatherData && (
              <div className="boxE311">
                <h2
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "sans-serif",
                    gap: 10,
                  }}
                >
                  <h1
                    style={{
                      color: "aqua",
                      fontFamily: "sans-serif",
                      fontSize: 40,
                      fontWeight: 10,
                    }}
                  >
                    Location:{" "}
                  </h1>
                  <h1
                    style={{
                      color: "yellow",
                      fontFamily: "sans-serif",
                      fontSize: 40,
                      fontWeight:8
                    }}
                  >
                    {weatherData.location.name}
                  </h1>
                </h2>
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "sans-serif",
                    gap: 10,
                  }}
                >
                  <h1
                    style={{
                      color: "aqua",
                      fontFamily: "sans-serif",
                      fontSize: 40,
                      fontWeight: 10,
                    }}
                  >
                    CurrentTemp :
                  </h1>{" "}
                  <h1
                    style={{
                      color: "yellow",
                      fontFamily: "sans-serif",
                      fontSize: 40,
                      fontWeight:10
                    }}
                  >
                    {weatherData.current.temp_c}°C
                  </h1>
                </p>
              </div>
            )}
          </div>
          <div className="boxE32">
            <div className="boxE321">
              {airData && (
                <div>
                  <h2 style={{ color: "white", fontFamily: "sans-serif" }}>
                    Air Quality Index:{" "}
                  </h2>
                  <ul style={{ color: "white", fontFamily: "sans-serif" }}>
                    {Object.entries(airData).map(([pollutant, info]) => (
                      <li key={pollutant}>
                        <strong>{pollutant}:</strong> {info.aqi} (
                        {info.concentration})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!airData && (
                <div>
                  <p>
                    Unable to fetch air quality data. Please try again later.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="boxE31">
           
          </div>

          <Map  />
        </div>
        <div className="boxE3">
          <div className="boxE31"></div>
          <div className="boxE31">
            <NavLink to={"/airQuality"}>AIR QUALITY</NavLink>
          </div>
          <div className="boxE31">
            <NavLink to={"/airQuality"}>AIR QUALITY</NavLink>
          </div>

        </div>
      </main>
      <footer className="footerE">
        <Footer />
      </footer>
    </>
  );
};

export default Earth;
