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
import Corboncal from "../components/carboncalc";
import Popup from "../components/function components/popupPage";
import PopupModal from "../components/function components/modalpop";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import Carbcal2 from "../components/carboncal2";
import Carbcal3 from "../components/carbocal3";
import Overview from "../components/overallcrabonuserData"

//* ------------------------------------------------------------------------------------------- MAIN FUNCTION -------------------------------------------------------------------
const Earth = () => {
  const [mapLocation, setMapLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData1, setWeatherData1] = useState(null);
  const [airData, setAirData] = useState();
  const dayOnly = new Date().getDate();
  const monthOnly = new Date().getMonth() + 1;
  const yearOnly = new Date().getFullYear();
  const [CFPdatabyday, setCFPdatabyday] = useState([]);
  const [todayCFP, settodayCFP] = useState(0);
  //----------------------------------------------------------fetching CFP data from database

  const fetchCFPdata = async () => {
    try {
      console.log("by day", dayOnly);
      const todayCFP = await axios.get(
        `http://localhost:5000/api/v1/carbonFootPrint/getCFPbyday?day=${dayOnly}&month=${monthOnly}&year=${yearOnly}`
      );
      setCFPdatabyday(todayCFP.data);
      console.log(
        "this is fetching cfp data from backent ",
        CFPdatabyday[13].carbonFootprint
      );
    } catch (err) {
      console.log("err in finding  CFP by day", err);
    }
  };

  const todayTotalCFP = () => {
    var totalCFP = 0;
    for (let index = 0; index < CFPdatabyday.length; index++) {
      totalCFP += CFPdatabyday[index].carbonFootprint;
    }
    return totalCFP.toFixed(3);
  };
  //--------------------------------------------------------fetching whether data
  const fetchData = async (latitude, longitude) => {
    try {
      const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=d07a3987fb6b1409e5e36912f397be05`;

      // Fetch data and handle response
      const response = await fetch(url);

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Log the entire response to inspect its structure
        console.log("Full Response:", response);

        // Extract JSON data from the response
        const data = await response.json();

        // Log the data to the console
        console.log("Weather Data:", data.list[0]);

        // Set the weather data state
        setWeatherData1(data.list[0]);
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
        "X-RapidAPI-Key": "ba17dc5fd4msh36ef13c21568fccp1f4367jsnc763b4dcd3f5",
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
    fetchCFPdata();
    Overview
  }, []);

  useEffect(() => {
    const x = todayTotalCFP();
    settodayCFP(x);
  }, [CFPdatabyday]);

  // END ---------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* --- -------------------------------------------------/ header /------------------------------------------------------------------------>>>*/}
      <header className="headerE">
        <Navbar />
      </header>
      {/* -----------------------------------------------------/ main /------------------------------------------------------------------------->>> */}
      <main className="mainE">
        {/* -------------------------box2--------- --------------*/}
        <div className="boxE2">
          <Map onMapChange={handleMapChange}></Map>
        </div>

        {/* -------------------------box3------------------------ */}
        <div className="boxE3">
          {/* ------------------------------------------- */}
          <div className="boxE32">
            {/* ------------------------ */}
            <div className="boxE321">
              {weatherData1 && (
                <>
                  <div className="boxE3211">
                    {weatherData && weatherData.location && (
                      <>
                        <h1
                          className="aiqLocation"
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
                        <p>?</p>
                      </div>
                    )}

                    <h1
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        // border:"solid 3px red",
                        color: "greenyellow",
                        fontFamily: "sans-serif",
                        fontWeight: 8,
                      }}
                    >
                      <AirIcon style={{ opacity: "0" }}></AirIcon>{" "}
                      <p
                        style={{
                          fontSize: "1.7rem",

                          width: "20rem",
                        }}
                      >
                        Over All AQI : 3
                      </p>{" "}
                    </h1>

                    {weatherData && weatherData.current && (
                      <h1
                        className="aiqLocation"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontFamily: "sans-serif",
                          fontWeight: 3,
                          fontSize: "1rem",
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
                          ~ A Q I : {}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          ~ Concentration : {weatherData1.components.co}
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
                          A Q I : {}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          Concentration : ({weatherData1.components.no2})
                        </strong>
                      </li>
                      <li className="oxy" style={{ color: "green" }}>
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
                          A Q I :{}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          Concentration ({weatherData1.components.o3})
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
                          A Q I : {}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          Concentration : ({weatherData1.components.PM10})
                        </strong>
                      </li>
                      {weatherData1 && weatherData1["PM2.5"] && (
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
                            A Q I : {}{" "}
                          </strong>
                          <strong
                            style={{
                              color: "white",
                              fontSize: 19,
                              fontWeight: 30,
                            }}
                          >
                            Concentration : ({})
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
                          A Q I :{}{" "}
                        </strong>
                        <strong
                          style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: 30,
                          }}
                        >
                          {" "}
                          Concentration : {weatherData1.components.so2}{" "}
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <div className="boxE3213"></div>
                </>
              )}
              {!weatherData1 && (
                <div>
                  <p>
                    Unable to fetch air quality data. Please try again later.
                  </p>
                </div>
              )}
            </div>

            <div
              className="boxE322"
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
  className="piechart1"
  series={[
    {
      data: [
        {
          id: 0,
          value: weatherData1?.components?.co || 0,
          label: "CO",
          color: "yellow",
        },
        {
          id: 1,
          value: weatherData1?.components?.no2 || 0,
          label: " NO2",
          color: "violet",
        },
        {
          id: 2,
          value: weatherData1?.components?.o3 || 0,
          label: "O3",
          color: "aqua",
        },
        {
          id: 3,
          value: weatherData1?.components?.so2 || 0,
          label: "SO2",
          color: "pink",
        },
        // {
        //   id: 4,
        //   value: 4,
        //   label: "PM10",
        //   color: "orange",
        // },
        // {
        //   id: 5,
        //   value: 5,
        //   label: "PM2.5",
        //   color: "green",
        // },
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
          <div className="boxE31">
            <div className="boxE331">
              {" "}
              <h1 className="HeadingE1">Caculate your carbon Footprints</h1>
              <div className="boxE3311">
                {" "}
                <h2 style={{ color: "black", fontWeight: 10 }}>
                  {" "}
                  Calculate Electricity Foot print
                </h2>{" "}
                <button
                  onClick={() => {
                    setIsModalOpen2(false);
                    setIsModalOpen(true);
                    setIsModalOpen3(false);
                  }}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    border: "solid 1px black",
                  }}
                >
                  <TouchAppIcon
                    style={{
                      fontSize: "3em",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  ></TouchAppIcon>
                </button>
              </div>
              {/* ----------------------------------------------- */}
              <div className="boxE3311">
                {" "}
                <h2 style={{ color: "black", fontWeight: 10 }}>
                  {" "}
                  Calculate Fuel Foot print
                </h2>{" "}
                <button
                  onClick={() => {
                    setIsModalOpen2(true);
                    setIsModalOpen(false);
                    setIsModalOpen3(false);
                  }}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    border: "solid 1px black",
                  }}
                >
                  <TouchAppIcon
                    style={{
                      fontSize: "3em",
                      color: "green",
                      cursor: "pointer",
                    }}
                  ></TouchAppIcon>
                </button>
              </div>
              {/* ----------------------------------------------- */}
              <div className="boxE3311">
                {" "}
                <h2 style={{ color: "black", fontWeight: 10 }}>
                  {" "}
                  Calculate vehicle Foot print
                </h2>{" "}
                <button
                  onClick={() => {
                    setIsModalOpen3(true), setIsModalOpen2(false);
                    setIsModalOpen(false);
                  }}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    border: "solid 1px black",
                    backgroundColor: "none",
                  }}
                >
                  <TouchAppIcon
                    style={{
                      fontSize: "3em",
                      color: "skyblue",
                      cursor: "pointer",
                    }}
                  ></TouchAppIcon>
                </button>
              </div>
              <Overview></Overview>
            </div>

            <div className="boxE332">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "60%",
                }}
              >
                {" "}
                <h1
                  style={{
                    marginRight: "6.2rem",
                    marginBottom: "1rem",
                    fontWeight: 10,
                    borderBottom: "solid 1.7px black ",
                  }}
                >
                  Yearly
                </h1>{" "}
                <PieChart
                  sx={{}}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 2000 - todayCFP,
                          label: "Limit",
                          color: "Green",
                        },
                        {
                          id: 1,
                          value: todayCFP,
                          label: " Total  Usage",
                          color: "red",
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
              </div>{" "}
              {/* --------------------------------------------boxE3321----*/}
              <div className="boxE3321">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "97%",
                    position: "sticky",
                    top: "0", // Stick to the top of the viewport
                    zIndex: "100",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "solid 1px blue",
                    backgroundColor: "white", // Optional: Add background color
                    borderRadius: "1px",
                  }}
                >
                  <span style={{ color: "gray", marginRight: "1px" }}>
                    {dayOnly}/{monthOnly}/{yearOnly}
                  </span>{" "}
                  <span style={{ color: "green" }}>| Your Todays C.F.P |</span>{" "}
                  <span>
                    <span>Total:</span> {todayCFP} kg
                  </span>
                </div>

                {CFPdatabyday.map((item) => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        gap: "3rem",
                        width: "97%",
                        height: "",

                        // borderBottom: "solid 0.7px grey",
                        borderRadius: "3px",
                        marginBottom: "0.2em",
                        padding: "10px",
                      }}
                    >
                      <p>
                        {" "}
                        <span
                          style={{
                            color: "blue",
                            fontSize: "0.9em",
                            fontWeight: "10px",
                          }}
                        >
                          CO2 :
                        </span>{" "}
                        {item.carbonFootprint}kg
                      </p>
                      <p> | {item.time}</p>
                    </div>
                  </>
                ))}
              </div>{" "}
              {isModalOpen && (
                <PopupModal onClose={() => setIsModalOpen(false)}>
                  <Corboncal addlist={fetchCFPdata}></Corboncal>
                </PopupModal>
              )}
              {isModalOpen2 && !isModalOpen && (
                <PopupModal onClose={() => setIsModalOpen2(false)}>
                  <Carbcal2 addlist={fetchCFPdata}></Carbcal2>
                </PopupModal>
              )}
              {isModalOpen3 && (
                <PopupModal onClose={() => setIsModalOpen3(false)}>
                  <Carbcal3 addlist={fetchCFPdata}></Carbcal3>
                </PopupModal>
              )}
            </div>
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
