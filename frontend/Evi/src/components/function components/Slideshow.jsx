import React, { useState, useEffect } from 'react';
import "../function components/slideshow.css"

const Slideshow = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length, interval]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
        
          key={index}
          className="image"
        >
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
