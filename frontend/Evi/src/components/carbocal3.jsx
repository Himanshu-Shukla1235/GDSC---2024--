import React, { useState } from 'react';
import axios from 'axios';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const vehicleTypes = [
  'Car-Type-Mini',
  'Car-Type-Supermini',
  'Car-Type-LowerMedium',
  'Car-Type-UpperMedium',
  'Car-Type-Executive',
  'Car-Type-Luxury',
  'Car-Type-Sports',
  'Car-Type-4x4',
  'Car-Type-MPV',
  'Car-Size-Small',
  'Car-Size-Medium',
  'Car-Size-Large',
  'Car-Size-Average',
  'Motorbike-Size-Small',
  'Motorbike-Size-Medium',
  'Motorbike-Size-Large',
  'Motorbike-Size-Average',
  'Bus-LocalAverage',
  'Bus-Coach',
  'Taxi-Local',
  'Train-National',
  'Train-Local',
  'Train-Tram',
];

const distanceUnits = ['km', 'mi'];

const CarbonCalculator = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('mi'); // Default to 'mi'
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set('vehicle_type', vehicleType);
    encodedParams.set('distance_value', distanceValue);
    encodedParams.set('distance_unit', distanceUnit);

    const options = {
      method: 'POST',
      url: 'https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_type',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
        'X-RapidAPI-Key': 'd8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd',
        'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
      setError(null);
    } catch (error) {
      setResult(null);
      setError('Error calculating carbon footprint. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Vehicle Type:
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="" disabled>Select vehicle type</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Distance Value:
          <input
            type="text"
            value={distanceValue}
            onChange={(e) => setDistanceValue(e.target.value)}
          />
        </label>
        <br />
        <label>
          Distance Unit:
          <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)}>
            {distanceUnits.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </label>
        <br />
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:20}}><button type="submit">Calculate Carbon Footprint</button> {result&&<h4>|</h4>}{result&&<Fab
            color="primary"
            aria-label="add"
            size="small"
            sx={{  }}
          >
            <AddIcon />
          </Fab>}</div>
        
      </form>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>Carbon Footprint: {result.data.co2e_kg} kg</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default CarbonCalculator;
