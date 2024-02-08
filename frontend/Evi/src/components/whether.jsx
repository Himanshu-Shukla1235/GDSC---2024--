import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Make sure to import the Leaflet CSS

const WeatherMap = () => {
  useEffect(() => {
    const map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=d07a3987fb6b1409e5e36912f397be05", {
      attribution: "© OpenWeatherMap",
      layer: "clouds_new",  // Correct parameter name
      maxZoom: 18,
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: "500px" }} />;
};

export default WeatherMap;
