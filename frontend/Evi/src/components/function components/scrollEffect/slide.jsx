import React, { useState, useEffect } from 'react';
import "../scrollEffect/Slide.css"

const SlideInComponent = ({ children, elementId }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById(elementId);
    const rect = element.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    
    // Check if the element is in the viewport
    if (rect.top <= viewHeight && rect.bottom >= 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    console.log('Component mounted');

    // Cleanup function, similar to componentWillUnmount
    return () => {
      console.log('Component will unmount');
    };
  }, [])

  return (
    <div id={elementId} className={`slide-in ${isVisible ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export default SlideInComponent;
