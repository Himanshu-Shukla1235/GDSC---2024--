// ParentComponent.js
import { Autocomplete } from "../function components/autocomplete";;

const ParentComponent = () => {
  const handleLocationSelect = (selectedLocation) => {
    // Perform axios request or any other action with the selected location data
    console.log("Selected Location:", selectedLocation);
    // You can use axios or any other method to send the data to the server
    // Example: axios.post('/api/someEndpoint', selectedLocation);
  };

  return (
    <Autocomplete onLocationSelect={handleLocationSelect} />
    // ... (other JSX)
  );
};

export default ParentComponent;
