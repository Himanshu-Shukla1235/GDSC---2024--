import React, { useState, useEffect } from 'react';
import "./scrolleEffect.css"

const SlideInComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById('your-element-id');
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

  return (
    <div id="your-element-id" className={`slide-in ${isVisible ? 'active' : ''}`}>
      {/* Your content goes here */}
      <p>Your sliding content</p>
    </div>
  );
};

export default SlideInComponent;
