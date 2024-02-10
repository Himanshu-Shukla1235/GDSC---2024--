import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Footer from "../components/footer";
import Navbar from "../components/Nav";
import { NavLink } from "react-router-dom";
import "../pages/earth.css";
import axios from "axios";
import { DiscFull } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts/PieChart";
// import Whether from "../components/whether";
import AirIcon from "@mui/icons-material/Air";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";

//* ------------------------------------------------------------------------------------------- MAIN FUNCTION -------------------------------------------------------------------
const Earth = () => {
  const [mapLocation, setMapLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData1, setWeatherData1] = useState(null);
  const [airData, setAirData] = useState();
  const fetchData = async (latitude, longitude) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d07a3987fb6b1409e5e36912f397be05`;
      
      // Fetch data and handle response
      const response = await fetch(url);
      
      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Log the entire response to inspect its structure
        console.log("Full Response:", response);
  
        // Extract JSON data from the response
        const data = await response.json();
        
        // Log the data to the console
        console.log("Weather Data:", data);
  
        // Set the weather data state
        setWeatherData1(data);
      } else {
        // If the request was not successful, log the error
        console.error("Error fetching weather data. Status:", response.status);
        setWeatherData1(null);
      }
    } catch (error) {
      // Handle any other errors that may occur
      console.error("Error fetching weather data:", error);
      setWeatherData1(null);
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
      console.log("f456", response.data);
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
      console.log(response.data);
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
    fetchData(newLocation.lat, newLocation.lng);
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
          fetchData(latitude, longitude);
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

  // END ---------------------------------------------------------------------------------------------------------------------------------------------------

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
          <div className="boxE32">
            <div className="boxE321">
              {airData && (
                <>
                  <div className="boxE3211">
                    {weatherData && weatherData.location && (
                      <>
                        <h1
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontFamily: "sans-serif",
                            fontWeight: 1,
                            fontSize: 15,
                          }}
                        >
                          <LocationOnIcon></LocationOnIcon>
                          {weatherData.location.name},{" "}
                          {weatherData.location.region},{" "}
                          {weatherData.location.country}
                        </h1>

                        {/* Rest of the code */}
                      </>
                    )}
                    {!weatherData && (
                      <div>
                        <p>
                          Unable to fetch weather data. Please try again later.
                        </p>
                      </div>
                    )}

                    <h1
                      style={{
                        color: "greenyellow",
                        fontFamily: "sans-serif",
                        fontWeight: 8,
                      }}
                    >
                      <AirIcon></AirIcon> Over All AQI : {airData.overall_aqi}
                    </h1>

                    {weatherData && weatherData.current && (
                      <h1
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontFamily: "sans-serif",
                          fontWeight: 3,
                          fontSize: 15,
                          gap: 8,
                        }}
                      >
                        <TodayIcon></TodayIcon>
                        {weatherData.current.last_updated}
                      </h1>
                    )}
                  </div>
                  <div className="boxE3212">
                    <ul style={{ color: "white", fontFamily: "sans-serif" }}>
                      {" "}
                      <li style={{ color: "green" }}>
                        <strong
                          style={{
                            color: "yellow",
                            fontSize: 50,
                            borderBottom: "3px solid yellow",
                          }}
                        >
                          CO
                        </strong>{" "}
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          ~ A Q I : {airData.CO.aqi}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          ~ Concentration : {airData.CO.concentration}
                        </strong>
                      </li>
                      <li style={{ color: "green" }}>
                        <strong
                          style={{
                            color: "violet",
                            fontSize: 50,
                            borderBottom: "3px solid violet",
                          }}
                        >
                          NO2
                        </strong>{" "}
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          A Q I : {airData.NO2.aqi}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          Concentration : ({airData.NO2.concentration})
                        </strong>
                      </li>
                      <li style={{ color: "green" }}>
                        <strong
                          style={{
                            color: "aqua",
                            fontSize: 50,
                            borderBottom: "3px solid aqua",
                          }}
                        >
                          O3
                        </strong>{" "}
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          A Q I :{airData.O3.aqi}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          Concentration ({airData.O3.concentration})
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div className="boxE3212">
                    <ul style={{ color: "white", fontFamily: "sans-serif" }}>
                      {" "}
                      <li>
                        <strong
                          style={{
                            color: "orange",
                            fontSize: 50,
                            borderBottom: "3px solid orange",
                          }}
                        >
                          PM10:
                        </strong>{" "}
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          A Q I : {airData.PM10.aqi}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          Concentration : ({airData.PM10.concentration})
                        </strong>
                      </li>
                      {airData && airData["PM2.5"] && (
                        <li>
                          <strong
                            style={{
                              color: "greenyellow",
                              fontSize: 50,
                              borderBottom: "3px solid greenyellow",
                            }}
                          >
                            PM2.5:
                          </strong>{" "}
                          <strong
                            style={{
                              color: "white",
                              fontSize: 19,
                              fontWeight: 30,
                            }}
                          >
                            A Q I : {airData["PM2.5"]?.aqi}{" "}
                          </strong>
                          <strong
                            style={{
                              color: "white",
                              fontSize: 19,
                              fontWeight: 30,
                            }}
                          >
                            Concentration : ({airData["PM2.5"]?.concentration})
                          </strong>
                        </li>
                      )}
                      <li>
                        <strong
                          style={{
                            color: "pink",
                            fontSize: 50,
                            borderBottom: "3px solid pink",
                          }}
                        >
                          SO2:
                        </strong>{" "}
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          A Q I :{airData.SO2.aqi}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          Concentration : {airData.SO2.concentration}{" "}
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div className="boxE3213"></div>
                </>
              )}
              {!airData && (
                <div>
                  <p>
                    Unable to fetch air quality data. Please try again later.
                  </p>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 30,
              }}
            >
              <h1 style={{ color: "black", fontFamily: "sans-serif" }}>
                Concentration
              </h1>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: airData?.CO?.concentration || 0,
                        label: "CO",
                        color: "yellow",
                      },
                      {
                        id: 1,
                        value: airData?.NO2?.concentration || 0,
                        label: " NO2",
                        color: "violet",
                      },
                      {
                        id: 2,
                        value: airData?.O3?.concentration,
                        label: "O3",
                        color: "aqua",
                      },
                      {
                        id: 3,
                        value: airData?.SO2?.concentration,
                        label: "SO2",
                        color: "pink",
                      },
                      {
                        id: 4,
                        value: airData?.PM10?.concentration,
                        label: "PM10",
                        color: "orange",
                      },
                      {
                        id: 5,
                        value: airData?.["PM2.5"]?.concentration || 0,
                        label: "PM2.5",
                        color: "green",
                      },
                    ],

                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
          </div>

          {/* //FOOT PRINTS ------------------------------------------------------------------------------*/}
          <div className="boxE31"></div>
        </div>
      </main>
      <footer className="footerE">
        <Footer />
      </footer>
    </>
  );
};

export default Earth;
