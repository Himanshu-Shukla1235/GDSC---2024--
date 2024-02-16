import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AirQualityData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await axios.get('https://air-quality.p.rapidapi.com/history/airquality', {
          params: {
            lon: '-78.638',
            lat: '35.779'
          },
          headers: {
            'X-RapidAPI-Key': 'd8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd',
            'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
          }
        });
        setData(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchAirQualityData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Air Quality Data</h1>
      <p>Location: {data && data.location}</p>
      <p>Date: {data && data.date}</p>
      <p>Air Quality Index: {data && data.aqi}</p>
      {/* Display other air quality data as needed */}
    </div>
  );
}

export default AirQualityData;
