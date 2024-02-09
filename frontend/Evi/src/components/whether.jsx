
// import React, { useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css"; // Make sure to import the Leaflet CSS

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AutocompletePl from "../components/function components/autocomplete"
// import "../components/Whether.css"

// const AirQuality = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [weatherData, setWeatherData] = useState(null);
//   const [airQualityData, setAirQualityData] = useState(null);

//   const fetchData = async (latitude, longitude) => {
//     const weatherOptions = {
//       method: "GET",
//       url: "https://weatherapi-com.p.rapidapi.com/current.json",
//       params: {
//         q: `${latitude},${longitude}`,
//       },
//       headers: {
//         "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
//         "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await axios.request(weatherOptions);
//       setWeatherData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

// //   const fetchAirQuality = async (latitude, longitude) => {
// //     const airQualityOptions = {
// //       method: "GET",
// //       url: "https://air-quality.p.rapidapi.com/current/airquality",
// //       params: {
// //         lon: longitude.toString(),
// //         lat: latitude.toString(),
// //       },
// //       headers: {
// //         "X-RapidAPI-Key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
// //         "X-RapidAPI-Host": "air-quality.p.rapidapi.com",
// //       },
// //     };

// //     try {
// //       const response = await axios.request(airQualityOptions);
// //       setAirQualityData(response.data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ lat: latitude, lon: longitude });
//           fetchData(latitude, longitude);
//           fetchAirQuality(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };


// const WeatherMap = () => {
//   useEffect(() => {
//     const map = L.map("map").setView([0, 0], 2);


//     L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=d07a3987fb6b1409e5e36912f397be05", {
//       attribution: "© OpenWeatherMap",
//       layer: "clouds_new",  // Correct parameter name
//       maxZoom: 18,
//     }).addTo(map);
//   }, []);

//   return <div id="map" style={{ height: "500px" }} />;

//   return (<> <div>
      
     
//     </div>
//     <div>{currentLocation && (
//         <h2>
//           Current Location: {currentLocation.lat}, {currentLocation.lon}
//         </h2>
//       )}

//       {weatherData && (
//         <div>
//           <h2>Location: {weatherData.location.name}</h2>
//           <p>Current Temperature: {weatherData.current.temp_c}°C</p>
//           {/* Add more weather details as needed */}
//         </div>
//       )}</div></>
   
//   );

// };

// export default WeatherMap;
