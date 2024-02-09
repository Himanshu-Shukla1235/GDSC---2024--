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
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";

const Earth = () => {
  const [mapLocation, setMapLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData1, setWeatherData1] = useState(null);
  const [airData, setAirData] = useState();
  const fetchData = async (latitude, longitude) => {
    const apiKey = "d07a3987fb6b1409e5e36912f397be05";

    // Check if latitude and longitude are valid
    if (latitude !== undefined && longitude !== undefined) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
          { withCredentials: false } // Set withCredentials to false
        );

        setWeatherData1(response.data);
      } catch (error) {
        console.error("Error fetching weather data 123:", error);
        setWeatherData1(null); // Set weatherData to null in case of an error
      }
    } else {
      console.error("Latitude or longitude is undefined");
      setWeatherData1(null); // Set weatherData to null if latitude or longitude is undefined
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
          <FontAwesomeIcon icon="faCloudSun" style={{ color: "#FFD43B" }} />
          {/* <div className="boxE31">
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
                      fontWeight: 8,
                    }}
                  >
                    {weatherData.location.name}, {weatherData.location.region},{" "}
                    {weatherData.location.country}
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
                      fontWeight: 10,
                    }}
                  >
                    {weatherData.current.temp_c}°C
                  </h1>
                </p>
              </div>
            )}
          </div> */}
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
                          gap:8
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
                      {/* <li >
                        <strong style={{ color: "violet" ,fontSize:50 }}>:</strong>{" "}
                        <strong style={{ color: "white", }}>  {airData..aqi} </strong>
                        <strong style={{ color: "white", }}> ({airData..concentration})</strong>
                      
                      </li> */}
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
