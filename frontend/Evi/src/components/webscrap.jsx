// ScrapingPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ScrapingPage = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleScrape = async () => {
    try {
        const internalUuid = uuidv4(); // Replace this with your actual internal_uuid

      const options = {
        method: 'POST',
        url: `https://surfsky-scraping-api.p.rapidapi.com/profiles/${internalUuid}/scrape`,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'd8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd',
          'X-RapidAPI-Host': 'surfsky-scraping-api.p.rapidapi.com'
        },
        data: {
          url: encodeURIComponent(url),
          screenshot: true,
          wait: 10,
          wait_until: 'networkidle',
          wait_for: '.content'
        }
      };

      const response = await axios.request(options);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Website Scraping Page</h1>
      <label>
        Enter Website URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <button onClick={handleScrape}>Scrape Website</button>

      {response && (
        <div>
          <h2>Scraping Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ScrapingPage;
