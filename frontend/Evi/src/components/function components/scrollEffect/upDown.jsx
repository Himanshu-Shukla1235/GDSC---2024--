import React, { useState, useEffect } from 'react';
import "../scrollEffect/updown.css"

const SlideInComponent2 = ({ children, elementId}) => {
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
    console.log('Component mounted 2');

    // Cleanup function, similar to componentWillUnmount
    return () => {
      console.log('Component will unmount 2');
    };
  }, [])

  return (
    <div id={elementId} className={`slide-in3 `}>
      {children}
    </div>
  );
};

export default SlideInComponent2;
