import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './education.css';

const options = {
  method: 'GET',
  url: 'https://climate-news-feed.p.rapidapi.com/page/1',
  params: { limit: '10' },
  headers: {
    'X-RapidAPI-Key': 'd8eda76f95msh9261a8d374f5391p1b4c64jsnb3786b0069df',
    'X-RapidAPI-Host': 'climate-news-feed.p.rapidapi.com'
  }
};

const Education = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setNews(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array or include dependencies if needed

  return (
    <>
      <div className="newsContainer">
        {news.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <img className='newsImageSet' src={article.thumbnail} alt="" />
            <a href={article.url}>check</a>
            {/* Additional details can be displayed here */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Education;
